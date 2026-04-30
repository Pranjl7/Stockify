import React from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const AppLayout = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/app/dashboard', label: 'Home' },
    { path: '/app/news', label: 'News' },
    { path: '/app/stockify-ai', label: 'Stockify ai' },
  ];

  return (
    <div className="flex justify-center min-h-screen w-full bg-slate-50 font-roboto">
      
      {/* Container: Sidebar + Max 6XL App Area */}
      <div className="flex w-full max-w-[88rem]"> {/* 1152px + 256px */}
        
        {/* Left Sidebar (Non-removable) */}
        <aside className="w-64 bg-white hidden md:flex flex-col py-8 px-2 h-screen sticky top-0">
          <Link to="/" className="flex items-center space-x-3 mb-10 px-4 hover:opacity-80 transition-opacity">
            <img className="w-7 h-7 object-contain" src="/assets/stockify-logo.svg" alt="Stockify" />
            <span className="font-sans font-extrabold text-slate-900 text-[22px] tracking-tight">Stockify</span>
          </Link>

          <nav className="flex flex-col space-y-3 w-full">
            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Link 
                  key={link.path}
                  to={link.path}
                  className={`px-1 py-1 mx-3 mt-2 w-max transition-colors font-medium text-md relative ${isActive ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-underline"
                      className="absolute bottom-[-2px] left-[2px] right-[2px] h-[2px] bg-slate-900 rounded-full"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area (6xl width constraint) */}
        <main className="flex-1 w-full max-w-6xl bg-slate-50/70 flex flex-col relative h-screen overflow-y-auto">
          {/* Dynamic Nested Route Content */}
          <div className="flex-1 px-8 pt-8 pb-12 flex flex-col min-h-0">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default AppLayout;
