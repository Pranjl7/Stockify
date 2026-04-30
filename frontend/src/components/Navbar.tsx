import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const links = [
    {
      href: '/product',
      title: 'Product',
    },
    {
      href: '/resources',
      title: 'Resources',
    },
    {
      href: '/customers',
      title: 'Customers',
    },
    {
      href: '/community',
      title: 'Community',
    },
    {
      href: '/pricing',
      title: 'Pricing',
    },
  ];

  return (
    <nav className="sticky top-0 w-full py-5 px-5 z-100 flex items-center justify-between backdrop-blur-2xl">
      <Link to={'/'} className="flex space-x-1 items-center">
        <img className="size-6" src="/assets/stockify-logo.svg" alt="" />
        <p className="text-lg font-bold">Stockify</p>
      </Link>

      <div className="flex items-center justify-center space-x-8 text-sm font-medium">
        {links.map((link, index) => (
          <Link key={index} to={link.href} onClick={() => setDropdown(e => !e)}>
            {link.title}
            <img
              className="inline-block size-4 ml-1"
              src={dropdown ? '/assets/arrow-up.svg' : '/assets/arrow-down.svg'}
              alt=""
            />
          </Link>
        ))}
      </div>

      <div className="flex space-x-2 text-sm font-semibold">
        <button className="border border-slate-200 rounded-md px-4 py-1 cursor-pointer">Log in</button>
        <Link to="/app" className="border border-transparent rounded-md px-4 py-1.5 bg-slate-900 text-white cursor-pointer hover:bg-slate-800 transition">
          Try for free
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
