import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center relative z-10">
      {/* Logo (Left) */}
      <Link to="/" className="text-2xl font-bold tracking-tight flex items-center gap-2 group transition-transform duration-300 hover:scale-105">
        <div className="flex items-center">
          <span className="text-white drop-shadow-md">Adelin</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-amber-500 font-extrabold text-[1.1em]">BTC</span>
        </div>
      </Link>
      
      {/* Centered Navigation Links (Desktop Glass Pill) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-white/[0.03] border border-white/[0.08] p-1.5 rounded-full backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
        <Link 
          to="/" 
          className={`text-[0.85rem] font-semibold px-5 py-2.5 rounded-full transition-all duration-300 ${location.pathname === '/' ? 'bg-white/10 text-white shadow-inner' : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'}`}
        >
          Academia
        </Link>
        <Link 
          to="/actualidad" 
          className={`text-[0.85rem] font-semibold px-5 py-2.5 rounded-full transition-all duration-300 ${location.pathname === '/actualidad' ? 'bg-white/10 text-white shadow-inner' : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'}`}
        >
          Actualidad
        </Link>
        <div className="w-px h-5 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-1"></div>
        <Link 
          to="/empieza" 
          className={`text-[0.85rem] font-bold px-6 py-2.5 rounded-full transition-all duration-300 ${location.pathname === '/empieza' ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_4px_15px_rgba(249,115,22,0.4)]' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 hover:border-orange-500/40 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)]'}`}
        >
          🚀 Empieza Aquí
        </Link>
      </div>
      
      {/* Right Side (Mobile Links + Social Icons) */}
      <div className="flex items-center gap-4">
        {/* Mobile Navigation Pill */}
        <div className="flex md:hidden items-center gap-2 mr-2 bg-white/[0.03] p-1.5 rounded-full border border-white/[0.05] backdrop-blur-md">
          <Link to="/" className={`text-[0.65rem] font-semibold px-3 py-1.5 rounded-full transition-all ${location.pathname === '/' ? 'bg-white/10 text-white' : 'text-gray-400'}`}>Academia</Link>
          <Link to="/actualidad" className={`text-[0.65rem] font-semibold px-3 py-1.5 rounded-full transition-all ${location.pathname === '/actualidad' ? 'bg-white/10 text-white' : 'text-gray-400'}`}>Vlog</Link>
          <Link to="/empieza" className={`text-[0.65rem] font-bold px-3 py-1.5 rounded-full transition-all ${location.pathname === '/empieza' ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' : 'bg-orange-500/15 text-orange-400 border border-orange-500/20'}`}>🚀 Empezar</Link>
        </div>
        
        {/* Social Icons (Premium Buttons) */}
        <div className="hidden sm:flex items-center gap-3">
          <a href="https://www.instagram.com/adelinbtc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.02] border border-white/[0.05] text-gray-400 hover:text-white hover:bg-gradient-to-tr hover:from-[#FFDC80] hover:via-[#F56040] hover:to-[#C13584] hover:border-transparent hover:shadow-[0_4px_15px_rgba(225,48,108,0.4)] transition-all duration-300 group">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="https://www.youtube.com/@AdelinBTC?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.02] border border-white/[0.05] text-gray-400 hover:text-white hover:bg-[#ff0000] hover:border-[#ff0000] hover:shadow-[0_4px_15px_rgba(255,0,0,0.4)] transition-all duration-300 group">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="group-hover:scale-110 transition-transform duration-300">
              <path d="M21.582 6.186a2.684 2.684 0 0 0-1.884-1.895C17.985 3.843 12 3.843 12 3.843s-5.985 0-7.698.448A2.684 2.684 0 0 0 2.418 6.186C2 7.904 2 12 2 12s0 4.096.418 5.814a2.684 2.684 0 0 0 1.884 1.895c1.713.448 7.698.448 7.698.448s5.985 0 7.698-.448a2.684 2.684 0 0 0 1.884-1.895C22 16.096 22 12 22 12s0-4.096-.418-5.814zM9.912 15.352V8.648L15.688 12l-5.776 3.352z"/>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
