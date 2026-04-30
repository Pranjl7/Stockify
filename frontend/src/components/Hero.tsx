import React from 'react';
import Collaborations from './Collaborations';

function Hero() {
  return (
    <main className="w-full flex flex-col gap-y-5 items-center mt-12">
      <p className="text-xs text-black/70 font-medium tracking-tight">
        <span className="border-r border-black/10 pr-2 mr-2 font-bold">What's new</span>Our vision
        for ai in Stockify{' '}
        <img className="size-3 inline-block ml-1" src="/assets/arrow-right.svg" alt="" />
      </p>

      <h1 className="font-bold text-5xl max-w-2xl text-center leading-15 mt-2">
        AI-Powered Stock Analysis Using Smart <span className="bg-[#c9b9ff]">Algorithms</span>
      </h1>

      <p className="max-w-md text-center text-md tracking-tight font-medium text-black/70">
        The AI-powered market insights platform that helps you move from data to decisions faster.
      </p>

      <div className="flex space-x-2 text-sm font-semibold">
        <button className="border rounded-md px-4 py-1.5 bg-slate-900 text-white cursor-pointer">
          Try for free
        </button>
        <button className="border rounded-md px-4 py-1 cursor-pointer">View Pricing</button>
      </div>
      <Collaborations />
      <div className="my-8 w-[80%] h-fit">
        <img
        loading='lazy'
          src="/assets/dashboard-image.jpg"
          alt="Dashhboard-Image"
          className="object-cover object-center w-auto rounded-lg"
        />
      </div>
    </main>
  );
}

export default Hero;
