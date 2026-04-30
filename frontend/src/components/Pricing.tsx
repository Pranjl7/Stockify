import React from 'react';

function Pricing() {
  return (
    <div className="flex flex-col gap-y-10 w-full my-20">
      <div className="flex flex-col items-center gap-y-3">
        <h1 className="text-3xl font-semibold">Friendly Pricing</h1>
        <p className="text-xs text-black/70 font-medium border rounded-full px-3 py-1 border-dotted">
          A new and better way to acquire, engage and support customers
        </p>
      </div>

      <div className="flex items-center justify-center gap-x-4">
        <div className="border border-black/10 rounded-2xl p-1">
          <div className="rounded-2xl flex flex-col p-4 pr-5 pt-4 bg-linear-to-b from-[#eff6ff] via-[#ffff] to-[#ffff]">
            <h1 className="text-sm font-semibold mb-0.5">FREE</h1>
            <p className="text-xs font-medium text-black/50">
              Essentials tools for individuals and talents
            </p>
            <p className="font-semibold text-3xl my-6">$0</p>
            <p className="text-xs font-medium text-black/50 mb-2.5">What's included?</p>
            <ul className="text-sm font-semibold flex flex-col gap-y-2">
              <li>
                <img className="mr-1 inline-block size-3.5" src="/assets/check-dark.svg" alt="" />
                Dashboard Access
              </li>
              <li>
                <img className="mr-1 inline-block size-3.5" src="/assets/check-dark.svg" alt="" />{' '}
                Cutomer Support
              </li>
              <li className="text-black/40">
                <img className="mr-1 inline-block size-3.5" src="/assets/cross-dark.svg" alt="" />{' '}
                Unlimited Campaigns
              </li>
              <li className="text-black/40">
                <img className="mr-1 inline-block size-3.5" src="/assets/cross-dark.svg" alt="" />{' '}
                Unlimited Influencers
              </li>
              <li className="text-black/40">
                <img className="mr-1 inline-block size-3.5" src="/assets/cross-dark.svg" alt="" />{' '}
                Fraud Prevention
              </li>
              <li className="text-black/40">
                <img className="mr-1 inline-block size-3.5" src="/assets/cross-dark.svg" alt="" />{' '}
                AI Processing
              </li>
            </ul>
            <button className="bg-slate-900 text-white py-2.5 rounded-lg text-sm mt-6 cursor-pointer shadow-2xl">
              Get Started
            </button>
          </div>
        </div>
        <div className="border border-black/10 rounded-2xl p-1">
          <div className="rounded-2xl flex flex-col p-4 pr-5 pt-4 bg-linear-to-b from-[#fefce8] to-[#ffff]">
            <h1 className="text-sm font-semibold mb-0.5">ENTERPRICE</h1>
            <p className="text-xs font-medium text-black/50">
              Essentials tools for individuals and talents
            </p>
            <p className="font-semibold text-3xl my-6">
              $79 <span className="text-sm text-black/50">/Per month</span>
            </p>
            <p className="text-xs font-medium text-black/50 mb-2.5">What's included?</p>
            <ul className="text-sm font-semibold flex flex-col gap-y-2">
              <li>
                <img className="mr-1 inline-block size-3.5" src="/assets/check-dark.svg" alt="" />
                Dashboard Access
              </li>
              <li>
                <img className="mr-1 inline-block size-3.5" src="/assets/check-dark.svg" alt="" />{' '}
                Cutomer Support
              </li>
              <li>
                <img className="mr-1 inline-block size-3.5" src="/assets/check-dark.svg" alt="" />{' '}
                Unlimited Campaigns
              </li>
              <li>
                <img className="mr-1 inline-block size-3.5" src="/assets/check-dark.svg" alt="" />{' '}
                Unlimited Influencers
              </li>
              <li>
                <img className="mr-1 inline-block size-3.5" src="/assets/check-dark.svg" alt="" />{' '}
                Fraud Prevention
              </li>
              <li>
                <img className="mr-1 inline-block size-3.5" src="/assets/check-dark.svg" alt="" />{' '}
                AI Processing
              </li>
            </ul>
            <button className="bg-slate-900 text-white py-2.5 rounded-lg text-sm mt-6 cursor-pointer shadow-2xl">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
