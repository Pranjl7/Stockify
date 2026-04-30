"""
Flask API – LSTM Stock Price Prediction Service
Runs on http://localhost:8000
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from lstm_model import StockPredictor, STOCK_META

app = Flask(__name__)
CORS(app)

predictor = StockPredictor()

DEFAULT_SYMBOLS = list(STOCK_META.keys())

# ─── Routes ────────────────────────────────────────────────────────────────────

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "lstm-stock-predictor"})


@app.route("/predict/<symbol>", methods=["GET"])
def predict_single(symbol: str):
    try:
        result = predictor.predict(symbol.upper())
        return jsonify({"success": True, "data": result})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/predict/batch", methods=["POST"])
def predict_batch():
    try:
        body = request.get_json(force=True, silent=True) or {}
        symbols = body.get("symbols", DEFAULT_SYMBOLS)

        if not isinstance(symbols, list) or len(symbols) == 0:
            return jsonify({"success": False, "error": "Provide a non-empty 'symbols' list"}), 400

        results, errors = predictor.predict_batch(symbols)

        return jsonify({
            "success": True,
            "data": results,
            "errors": errors,
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# ─── Startup ───────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("LSTM Stock Prediction Service starting on http://localhost:8000")
    print(f"Tracking: {', '.join(DEFAULT_SYMBOLS)}")
    app.run(host="0.0.0.0", port=8000, debug=False, threaded=True)
