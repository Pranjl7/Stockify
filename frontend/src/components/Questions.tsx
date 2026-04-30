import React, { useState } from 'react';

function Questions() {
  const [dropdown, setDropdown] = useState(false);

  const questions = [
    {
      question: 'What is Stockify, and how does it help me analyze stocks smarter?',
      answer:
        'Stockify is an AI-powered stock market analysis platform that helps users make smarter investment decisions using data-driven insights. It processes large volumes of market data and presents meaningful trends, signals, and predictions so you can move from raw data to confident decisions faster.',
    },
    {
      question: 'How does Stockify use AI and algorithms to predict stock trends?',
      answer:
        'Stockify uses machine learning models combined with algorithmic techniques like trend analysis, pattern recognition, and optimization strategies. These models learn from historical and real-time market data to identify patterns and forecast potential price movements more efficiently than manual analysis.',
    },
    {
      question: 'What type of data does Stockify analyze to generate insights?',
      answer:
        'Stockify analyzes multiple data sources, including historical stock prices, trading volume, technical indicators, and market trends. This data is processed using efficient algorithms and AI models to generate actionable insights and predictions.',
    },
    {
      question: 'Is Stockify suitable for beginners, or is it built for advanced traders?',
      answer:
        'Stockify is designed for both. Beginners get simplified insights and easy-to-understand visualizations, while advanced users can explore deeper analytics, algorithm-based signals, and AI-driven predictions for more strategic decision-making.',
    },
    {
      question:
        "How accurate are Stockify's predictions, and how should I use them in decision making?",
      answer:
        "Stockify's predictions are based on data patterns and probabilistic models, not guarantees. They are best used as decision-support tools alongside personal research, market news, and risk analysis—not as sole investment advice.",
    },
  ];
  return (
    <div className="w-[60%] mx-auto flex flex-col items-center gap-y-12 my-20">
      <div className="flex flex-col items-center gap-y-4">
        <img className="size-18" src="/assets/questions.svg" alt="" />
        <h1 className="text-3xl font-semibold">Frequently asked questions</h1>
        <p className="font-medium text-sm text-black/70">
          Everything you need to know about Stockify
        </p>
      </div>
      <div className="w-full flex flex-col gap-y-4 items-center">
        {questions.map((e, index) => (
          <div
            onClick={() => setDropdown(e => !e)}
            className="flex justify-between w-full px-8 border border-black/10 rounded-lg py-5 cursor-pointer overflow-hidden"
          >
            <div className="text-md font-medium" key={index}>
              {e.question}
            </div>
            <img
              className="size-5 ml-4"
              src={dropdown ? '/assets/arrow-up.svg' : '/assets/arrow-down.svg'}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Questions;
