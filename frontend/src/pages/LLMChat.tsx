import React, { useState, useRef, useEffect, Component } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Error boundary to prevent white screen crash on markdown render errors
class MarkdownErrorBoundary extends Component<{ content: string }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <p className="whitespace-pre-wrap text-sm">{this.props.content}</p>;
    }
    return this.props.children;
  }
}

const MarkdownMessage = ({ content }: { content: string }) => (
  <MarkdownErrorBoundary content={content}>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <h1 className="text-xl font-bold mt-4 mb-2">{children}</h1>,
        h2: ({ children }) => <h2 className="text-lg font-bold mt-4 mb-2">{children}</h2>,
        h3: ({ children }) => <h3 className="text-base font-semibold mt-3 mb-1">{children}</h3>,
        p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
        ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-0.5">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 space-y-0.5">{children}</ol>,
        li: ({ children }) => <li className="mb-0.5">{children}</li>,
        pre: ({ children }) => (
          <pre className="bg-slate-800 text-slate-100 p-4 rounded-xl overflow-x-auto text-sm my-3 font-mono shadow-inner">
            {children}
          </pre>
        ),
        code: ({ className, children }) => {
          const isBlock = /language-(\w+)/.exec(className || '');
          return isBlock ? (
            <code className={className}>{children}</code>
          ) : (
            <code className="bg-slate-100 border border-slate-200 text-slate-800 px-1.5 py-0.5 rounded text-[13px] font-mono">
              {children}
            </code>
          );
        },
        table: ({ children }) => (
          <div className="overflow-x-auto my-3">
            <table className="border-collapse w-full text-sm">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-slate-200 bg-slate-50 px-4 py-2 font-semibold text-left text-slate-700">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-slate-200 px-4 py-2 text-slate-600">{children}</td>
        ),
        a: ({ href, children }) => (
          <a href={href} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-slate-300 pl-4 my-3 text-slate-500 italic">{children}</blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  </MarkdownErrorBoundary>
);

const LLMChat = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'user', content: trimmed }),
      });

      const data = await res.json();

      if (data.success && data.data?.content) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.data.content }]);
      } else {
        const errMsg = data.message || 'An error occurred. Please try again.';
        setMessages((prev) => [...prev, { role: 'assistant', content: errMsg }]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Failed to reach the server. Make sure the backend is running.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full mx-auto max-w-4xl relative">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-8 relative">
        <div className="w-full flex flex-col space-y-6">
          {messages.length === 0 && !isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-80 space-y-6 pt-10 pointer-events-none">
              <div className="size-15 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-center shadow-sm">
                <img src="/assets/stockify-logo.svg" className="size-7 opacity-40 grayscale" alt="logo" />
              </div>
              <span className="text-slate-400 text-md font-medium tracking-wide">
                What market insights are you looking for today?
              </span>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`p-4 rounded-2xl max-w-[80%] break-words text-[15px] ${
                    msg.role === 'user'
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-800 shadow-sm'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <MarkdownMessage content={msg.content} />
                  )}
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex justify-start">
              <div className="px-5 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-500 text-sm animate-pulse">
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Box */}
      <div className="w-full max-w-4xl mx-auto px-4 pb-0 pt-6 shrink-0 sticky bottom-[-2rem] z-10 bg-slate-50/95 backdrop-blur-md rounded-t-3xl">
        <div className="border border-slate-200 bg-white rounded-2xl px-4 py-3 shadow-md transition relative max-w-3xl mx-auto">
          <div className="flex items-center pb-3">
            <input
              type="text"
              placeholder="Ask Stockify AI anything..."
              className="flex-1 bg-transparent pr-4 outline-none text-slate-900 placeholder:text-slate-400 text-[15px]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 rounded-full bg-black hover:bg-slate-800 text-white transition disabled:opacity-40 flex items-center justify-center shrink-0 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
              </svg>
            </button>
          </div>

          <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
            <div className="flex items-center border border-slate-200 bg-slate-50 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-slate-600">
              <div className="w-3.5 h-3.5 mr-2 bg-blue-500 rounded flex items-center justify-center text-white text-[9px] font-bold">
                S
              </div>
              StepFun: Step 3.5 Flash
            </div>
            <div className="text-[11px] font-medium text-slate-400">Unlimited Tokens</div>
          </div>
        </div>
        <p className="text-center text-[11px] text-slate-400 mt-4 mb-4 font-medium tracking-wide">
          Stockify AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
};

export default LLMChat;
