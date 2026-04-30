const News = () => {
  return (
    <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full">
      <h1 className="text-3xl font-bold mb-4">Market News</h1>
      <p className="text-slate-600 mb-8 leading-relaxed">
        Stay updated with the latest market trends, financial news, and economic indicators.
      </p>
      
      <div className="flex space-x-6 border-b border-slate-200 mb-6 text-sm font-medium text-slate-600 overflow-x-auto">
        <button className="pb-2 text-slate-900 border-b-2 border-slate-900 font-semibold">Top Stories</button>
      </div>

      <div className="space-y-6">
        {[
          { title: "Global Markets Rally as Tech Stocks Surge", source: "Financial Times", time: "2 hours ago", summary: "Major indices hit record highs today driven by strong earnings reports from leading technology companies." },
          { title: "Central Bank Announces Interest Rate Decision", source: "Reuters", time: "4 hours ago", summary: "The central bank decided to hold interest rates steady, citing stabilizing inflation figures." },
          { title: "New AI Regulations Proposed by European Union", source: "Bloomberg", time: "5 hours ago", summary: "Lawmakers outline strict new guidelines for generative AI models deployed within member states." },
          { title: "Oil Prices Dip Amidst Supply Increase", source: "Wall Street Journal", time: "7 hours ago", summary: "Crude oil futures fell 2% following reports of unexpected inventory builds in the US." }
        ].map((news, i) => (
          <a
            key={i}
            href="https://www.financialexpress.com/market/bernstein-sets-nifty-december-target-at-26000-why-the-12-upside-comes-with-a-neutral-warning-4199556/"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 border border-slate-200 rounded-xl hover:shadow-md transition-shadow bg-white cursor-pointer"
          >
            <div className="flex items-center space-x-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>{news.source}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>{news.time}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{news.title}</h3>
            <p className="text-slate-600 text-sm">{news.summary}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default News;
