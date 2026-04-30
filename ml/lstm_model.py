"""
LSTM Stock Price Predictor
Uses yfinance Ticker.history() to fetch NSE data and a Keras LSTM model
to predict the next-day closing price.
Results are cached in memory for 1 hour to avoid re-training on every request.
"""

import time
import threading
import numpy as np
from sklearn.preprocessing import MinMaxScaler

# Use yfinance Ticker API – avoids multi-level column issue with yf.download()
import yfinance as yf

# TensorFlow / Keras
try:
    from tensorflow.keras.models import Sequential
    from tensorflow.keras.layers import LSTM, Dense, Dropout
    from tensorflow.keras.callbacks import EarlyStopping
    TF_AVAILABLE = True
except ImportError:
    TF_AVAILABLE = False

# ─── Configuration ─────────────────────────────────────────────────────────────
LOOKBACK    = 60      # days of history fed into each LSTM step
EPOCHS      = 20
BATCH_SIZE  = 32
CACHE_TTL   = 3600    # seconds – re-train after 1 hour
NSE_SUFFIX  = ".NS"

# Static metadata
STOCK_META = {
    "RELIANCE":   {"name": "Reliance Industries Limited",       "mcap": "190.04 B USD", "sector": "Energy Minerals"},
    "HDFCBANK":   {"name": "HDFC Bank Limited",                 "mcap": "127.92 B USD", "sector": "Finance"},
    "BHARTIARTL": {"name": "Bharti Airtel Limited",             "mcap": "112.39 B USD", "sector": "Communications"},
    "SBIN":       {"name": "State Bank of India",               "mcap": "102.37 B USD", "sector": "Finance"},
    "TCS":        {"name": "Tata Consultancy Services Limited", "mcap": "98.91 B USD",  "sector": "Technology Services"},
    "ICICIBANK":  {"name": "ICICI Bank Limited",                "mcap": "96.06 B USD",  "sector": "Finance"},
    "INFY":       {"name": "Infosys Limited",                   "mcap": "58.50 B USD",  "sector": "Technology Services"},
}


def _analyst_rating(change_pct: float) -> str:
    if change_pct > 3:    return "Strong Buy"
    if change_pct > 1:    return "Buy"
    if change_pct > -1:   return "Hold"
    if change_pct > -3:   return "Sell"
    return "Strong Sell"


class StockPredictor:
    """Thread-safe, in-memory-cached LSTM predictor."""

    def __init__(self):
        if not TF_AVAILABLE:
            raise RuntimeError("TensorFlow is not installed. Run: pip install tensorflow")
        self._cache: dict = {}
        self._lock = threading.Lock()

    # ── Public API ─────────────────────────────────────────────────────────────

    def predict(self, symbol: str) -> dict:
        symbol = symbol.upper()

        # Return cached result if still fresh
        with self._lock:
            entry = self._cache.get(symbol)
            if entry and (time.time() - entry["ts"]) < CACHE_TTL:
                print(f"[cache hit] {symbol}")
                return entry["data"]

        # Train + predict outside the lock so other threads aren't blocked
        result = self._run(symbol)

        with self._lock:
            self._cache[symbol] = {"ts": time.time(), "data": result}
        return result

    def predict_batch(self, symbols: list):
        results, errors = [], []
        lock = threading.Lock()

        def worker(sym):
            try:
                r = self.predict(sym)
                with lock:
                    results.append(r)
            except Exception as e:
                print(f"[error] {sym}: {e}")
                with lock:
                    errors.append({"symbol": sym, "error": str(e)})

        threads = [threading.Thread(target=worker, args=(s,), daemon=True) for s in symbols]
        for t in threads:
            t.start()
        for t in threads:
            t.join()

        return results, errors

    # ── Private ────────────────────────────────────────────────────────────────

    def _run(self, symbol: str) -> dict:
        yf_symbol = symbol if "." in symbol else f"{symbol}{NSE_SUFFIX}"
        print(f"[lstm] fetching data for {yf_symbol} ...")

        # ── Fetch data via Ticker.history() – returns clean single-level columns
        ticker = yf.Ticker(yf_symbol)
        df = ticker.history(period="2y")

        if df.empty:
            raise ValueError(f"No price data returned for {yf_symbol}. It may be delisted or the symbol is wrong.")
        if len(df) < LOOKBACK + 20:
            raise ValueError(
                f"Not enough history for {symbol}: got {len(df)} rows, need at least {LOOKBACK + 20}."
            )

        # ── Extract closes as a clean 1-D float array
        closes = df["Close"].values.astype(float).flatten()
        current_price = float(closes[-1])
        print(f"[lstm] {symbol}: {len(closes)} rows, current price = {current_price:.2f}")

        # ── Normalise
        scaler = MinMaxScaler(feature_range=(0, 1))
        scaled = scaler.fit_transform(closes.reshape(-1, 1))

        # ── Build supervised sequences
        X, y = [], []
        for i in range(LOOKBACK, len(scaled)):
            X.append(scaled[i - LOOKBACK : i, 0])
            y.append(scaled[i, 0])

        X = np.array(X).reshape(-1, LOOKBACK, 1)
        y = np.array(y)

        split = int(len(X) * 0.8)
        X_train, y_train = X[:split], y[:split]

        # ── Build & train model
        model = Sequential([
            LSTM(64, return_sequences=True, input_shape=(LOOKBACK, 1)),
            Dropout(0.2),
            LSTM(32, return_sequences=False),
            Dropout(0.2),
            Dense(16, activation="relu"),
            Dense(1),
        ])
        model.compile(optimizer="adam", loss="mean_squared_error")

        early_stop = EarlyStopping(monitor="loss", patience=3, restore_best_weights=True)
        model.fit(
            X_train, y_train,
            epochs=EPOCHS,
            batch_size=BATCH_SIZE,
            callbacks=[early_stop],
            verbose=0,
        )

        # ── Predict next day
        last_seq = scaled[-LOOKBACK:].reshape(1, LOOKBACK, 1)
        pred_scaled = model.predict(last_seq, verbose=0)
        predicted_price = float(scaler.inverse_transform(pred_scaled)[0][0])

        change_pct = ((predicted_price - current_price) / current_price) * 100
        meta = STOCK_META.get(symbol, {})

        print(f"[lstm] {symbol}: predicted = {predicted_price:.2f} ({change_pct:+.2f}%)")

        return {
            "symbol":          symbol,
            "name":            meta.get("name", symbol),
            "mcap":            meta.get("mcap", "N/A"),
            "sector":          meta.get("sector", "N/A"),
            "current_price":   round(current_price, 2),
            "predicted_price": round(predicted_price, 2),
            "change_pct":      round(change_pct, 2),
            "is_up":           change_pct >= 0,
            "rating":          _analyst_rating(change_pct),
        }
