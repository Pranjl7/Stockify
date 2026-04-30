import React from 'react';
import { href, Link } from 'react-router-dom';

function Footer() {
  const Links = [
    {
      href: '/features',
      title: 'Feautures',
    },
    {
      href: '/pricing',
      title: 'Pricing',
    },
    {
      href: '/api',
      title: 'API',
    },
    {
      href: '/signup',
      title: 'Sign up',
    },
    {
      href: '/login',
      title: 'Log in',
    },
  ];

  const Resources = [
    {
      href: '/helpdocs',
      title: 'Help docs',
    },
    {
      href: '/quickstartguide',
      title: 'Quick start guide',
    },
    {
      href: '/changelog',
      title: 'Changelog',
    },
    {
      href: '/blog',
      title: 'Blog',
    },
  ];

  const Companys = [
    {
      href: '/aboutus',
      title: 'About us',
    },
    {
      href: '/privacypolicy',
      title: 'Privacy policy',
    },
    {
      href: '/termsofservice',
      title: 'Terms of service',
    },
    {
      href: '/contactus',
      title: 'Contact us',
    },
    {
      href: '/discord',
      title: 'Discord',
    },
    {
      href: '/twitter',
      title: 'Twitter',
    },
  ];
  return (
    <div className=" bg-slate-900 text-white flex pt-15 justify-between mt-10 px-15 h-100 rounded-t-2xl mx-10">
      <div className="flex flex-col gap-y-4">
        <Link to={'/'} className="flex space-x-1 items-center">
          <img className="size-7" src="/assets/stockify-logo-white.svg" alt="" />
          <p className="text-xl font-bold">Stockify</p>
        </Link>

        <p className="max-w-sm text-sm tracking-tight font-medium text-white/70">
          The AI-powered market insights platform that helps you move from data to decisions faster.
        </p>
        <a href="#" className="text-xs text-[#d5d5d5]">
          @2026 Stockify Research.inc
        </a>
      </div>
      <div className="flex gap-x-15">
        <ul className="flex flex-col gap-y-3">
          <h1 className="text-md font-semibold">Links</h1>
          {Links.map((e, index) => (
            <Link to={e.href}>
              <li key={index} className="text-sm text-[#d5d5d5] hover:text-white">
                {e.title}
              </li>
            </Link>
          ))}
        </ul>
        <ul className="flex flex-col gap-y-3">
          <h1 className="text-md font-semibold">Resources</h1>
          {Resources.map((e, index) => (
            <Link to={e.href}>
              <li key={index} className="text-sm text-[#d5d5d5] hover:text-white">
                {e.title}
              </li>
            </Link>
          ))}
        </ul>
        <ul className="flex flex-col gap-y-3">
          <h1 className="text-md font-semibold">Company</h1>
          {Companys.map((e, index) => (
            <Link to={e.href}>
              <li key={index} className="text-sm text-[#d5d5d5] hover:text-white">
                {e.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Footer;
