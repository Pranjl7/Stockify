import React, { useState, useEffect, useCallback } from 'react';

interface StockData {
  symbol: string;
  name: string;
  mcap: string;
  sector: string;
  current_price: number;
  predicted_price: number;
  change_pct: number;
  is_up: boolean;
  rating: string;
}

type FetchState = 'idle' | 'loading' | 'success' | 'error';

const fmt = (n: number) =>
  n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const ratingColor = (rating: string) => {
  if (rating === 'Strong Buy') return 'text-emerald-600 font-semibold';
  if (rating === 'Buy') return 'text-teal-600 font-medium';
  if (rating === 'Hold') return 'text-amber-500 font-medium';
  if (rating === 'Sell') return 'text-orange-500 font-medium';
  return 'text-red-500 font-semibold';
};

const ratingLabel = (rating: string) => {
  if (rating === 'Strong Buy') return '[^^] Strong Buy';
  if (rating === 'Buy') return '[^] Buy';
  if (rating === 'Hold') return '[--] Hold';
  if (rating === 'Sell') return '[v] Sell';
  return '[vv] Strong Sell';
};

const SkeletonRow = () => (
  <tr className="border-b border-slate-100 animate-pulse">
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <td key={i} className="py-3.5 px-2">
        <div className="h-3.5 bg-slate-200 rounded-full w-full max-w-[120px]" />
      </td>
    ))}
  </tr>
);

const Dashboard = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [state, setState] = useState<FetchState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchPrices = useCallback(async () => {
    setState('loading');
    setError(null);
    try {
      const res = await fetch('/api/stocks/prices');
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to fetch stock predictions');
      }
      setStocks(json.data);
      setLastUpdated(new Date());
      setState('success');
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      setState('error');
    }
  }, []);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  const isLoading = state === 'loading';

  return (
    <div className="flex-1 overflow-y-auto px-8 pb-8 pt-5">

      <div className="flex items-center space-x-5 mb-8">
        <div className="flex-shrink-0">
          <img
            src="https://th.bing.com/th/id/OIP.RW0k7mzbhXlg3Qn_9l-4bQHaCc?w=340&h=115&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
            alt="Nifty 100 Quality 30"
            className="w-[100px] h-auto object-contain rounded-full shadow-sm border border-slate-100"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-4xl leading-tight font-bold text-slate-900 mb-2 tracking-tight">
            Nifty 100 Quality 30 Index
          </h1>

          <div className="flex items-center space-x-2.5 mb-2.5">
            <div className="flex items-center border border-slate-200 shadow-sm rounded-md px-2 py-0.5 text-[11px] font-semibold text-slate-700 bg-white">
              <span>NIFTYQUALITY30</span>
              <span className="mx-1.5 text-slate-300">|</span>
              <div className="w-3 h-3 rounded-full bg-orange-500 mr-1 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-yellow-200 rounded-full" />
              </div>
              <span>NSE</span>
            </div>

            <div className="flex items-center gap-1 border border-indigo-200 bg-indigo-50 rounded-md px-2 py-0.5 text-[11px] font-semibold text-indigo-700">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .28 2.716-1.07 2.716H3.87c-1.353 0-2.073-1.715-1.072-2.716L4 15.3" />
              </svg>
              LSTM AI Predictions
            </div>
          </div>

          <div className="flex items-center gap-4">
            {state === 'success' && lastUpdated && (
              <p className="text-[11px] text-slate-400 font-medium">
                Last updated: {lastUpdated.toLocaleTimeString('en-IN')}
              </p>
            )}
            <button
              id="refresh-stocks-btn"
              onClick={fetchPrices}
              disabled={isLoading}
              className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 bg-white hover:bg-slate-50 rounded-md px-2.5 py-1 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              {isLoading ? 'Predicting...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex space-x-6 border-b border-slate-200 mb-6 text-sm font-medium text-slate-600 overflow-x-auto">
        <button className="pb-2 text-slate-900 border-b-2 border-slate-900 font-semibold">Overview</button>
      </div>

      {state === 'error' && (
        <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
          <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-red-700">Could not fetch LSTM predictions</p>
            <p className="text-xs text-red-500 mt-0.5">{error}</p>
            <p className="text-xs text-red-400 mt-1">
              If you just started the app, the ML service may still be warming up — wait a few seconds and click Refresh.
            </p>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 font-normal">
              <th className="py-3 px-2 font-medium">
                <span className="text-xs text-slate-400 mr-1">7</span>Symbol
              </th>
              <th className="py-3 px-2 font-medium">Market Cap</th>
              <th className="py-3 px-2 font-medium">Current Price</th>
              <th className="py-3 px-2 font-medium">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3" />
                  </svg>
                  LSTM Predicted
                </span>
              </th>
              <th className="py-3 px-2 font-medium">Change %</th>
              <th className="py-3 px-2 font-medium">Sector</th>
              <th className="py-3 px-2 font-medium">AI Rating</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && stocks.length === 0
              ? [0, 1, 2, 3, 4, 5, 6].map((i) => <SkeletonRow key={i} />)
              : stocks.map((stock, i) => (
                <tr
                  key={i}
                  id={`stock-row-${stock.symbol}`}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() =>
                    window.open(
                      `https://www.nseindia.com/get-quotes/equity?symbol=${encodeURIComponent(stock.symbol)}`,
                      '_blank'
                    )
                  }
                >
                  <td className="py-3.5 px-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold overflow-hidden flex-shrink-0">
                        <img
                          src={`https://ui-avatars.com/api/?name=${stock.symbol}&background=random&color=fff&size=24`}
                          alt={stock.symbol}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{stock.symbol}</div>
                        <div className="text-slate-500 text-xs truncate max-w-[130px]" title={stock.name}>
                          {stock.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-2 text-slate-600">{stock.mcap}</td>

                  <td className="py-3.5 px-2 font-medium text-slate-800">
                    Rs.{fmt(stock.current_price)}
                  </td>

                  <td className="py-3.5 px-2">
                    <span className={`font-semibold ${stock.is_up ? 'text-indigo-700' : 'text-rose-600'}`}>
                      Rs.{fmt(stock.predicted_price)}
                    </span>
                  </td>

                  <td className={`py-3.5 px-2 font-semibold ${stock.is_up ? 'text-teal-600' : 'text-red-500'}`}>
                    {stock.is_up ? '+' : ''}{stock.change_pct.toFixed(2)}%
                  </td>

                  <td className="py-3.5 px-2 text-slate-600">{stock.sector}</td>

                  <td className={`py-3.5 px-2 whitespace-nowrap ${ratingColor(stock.rating)}`}>
                    {ratingLabel(stock.rating)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {state === 'idle' && stocks.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-sm">
            Click Refresh to load LSTM predictions.
          </div>
        )}
      </div>

      {state === 'success' && (
        <p className="mt-6 text-[11px] text-slate-400 text-center">
          Prices are LSTM next-day predictions trained on 2 years of NSE data via Yahoo Finance.
          Not financial advice.
        </p>
      )}
    </div>
  );
};

export default Dashboard;
