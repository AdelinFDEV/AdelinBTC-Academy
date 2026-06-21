import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center relative z-50">
        {/* Logo (Left) */}
        <Link to="/" onClick={closeMobileMenu} className="text-2xl font-bold tracking-tight flex items-center gap-2 group transition-transform duration-300 hover:scale-105">
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
            Aprende Gratis
          </Link>
          <Link
            to="/herramientas"
            className={`text-[0.85rem] font-semibold px-5 py-2.5 rounded-full transition-all duration-300 ${location.pathname === '/herramientas' ? 'bg-white/10 text-white shadow-inner' : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'}`}
          >
            Herramientas
          </Link>
          <div className="w-px h-5 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-1"></div>
          <Link 
            to="/empieza" 
            className="flex items-center gap-2 text-[0.85rem] font-bold px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_4px_15px_rgba(249,115,22,0.4)] hover:shadow-[0_4px_25px_rgba(249,115,22,0.6)] hover:from-orange-400 hover:to-amber-400 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-[pulse_2s_ease-in-out_infinite]"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
            Empieza Aquí
          </Link>
        </div>
        
        {/* Right Side (Social Icons + Hamburger Menu) */}
        <div className="flex items-center gap-4">
          
          {/* Social Icons (Premium Buttons) - Hidden on very small screens */}
          <div className="hidden sm:flex items-center gap-3">
            <a href="https://www.instagram.com/adelinbtc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-500/20 via-pink-500/25 to-purple-600/20 border border-pink-500/50 text-pink-400 hover:from-yellow-500 hover:via-pink-500 hover:to-purple-600 hover:border-transparent hover:text-white shadow-[0_0_10px_rgba(236,72,153,0.15)] hover:shadow-[0_0_20px_rgba(236,72,153,0.6)] transition-all duration-300 group">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_4px_rgba(236,72,153,0.4)]">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://www.youtube.com/@AdelinBTC?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600/20 border border-red-500/50 text-red-400 hover:bg-red-600 hover:border-red-600 hover:text-white shadow-[0_0_10px_rgba(239,68,68,0.15)] hover:shadow-[0_0_20px_rgba(239,68,68,0.6)] transition-all duration-300 group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">
                <path d="M21.582 6.186a2.684 2.684 0 0 0-1.884-1.895C17.985 3.843 12 3.843 12 3.843s-5.985 0-7.698.448A2.684 2.684 0 0 0 2.418 6.186C2 7.904 2 12 2 12s0 4.096.418 5.814a2.684 2.684 0 0 0 1.884 1.895c1.713.448 7.698.448 7.698.448s5.985 0 7.698-.448a2.684 2.684 0 0 0 1.884-1.895C22 16.096 22 12 22 12s0-4.096-.418-5.814zM9.912 15.352V8.648L15.688 12l-5.776 3.352z"/>
              </svg>
            </a>
          </div>

          {/* Hamburger Menu Toggle */}
          <button 
            onClick={toggleMobileMenu} 
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 text-white hover:text-orange-400 focus:outline-none transition-colors z-50 relative"
            aria-label="Toggle menu"
          >
            <div className={`transition-all duration-300 transform ${isMobileMenuOpen ? 'rotate-90 opacity-0 absolute' : 'rotate-0 opacity-100'}`}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="15" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </div>
            <div className={`transition-all duration-300 transform ${isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0 absolute'}`}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
          </button>
        </div>
      </nav>

      {/* Dark Overlay Background */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
      ></div>

      {/* Right Side Sliding Drawer Menu */}
      <div 
        ref={menuRef}
        className={`fixed top-0 right-0 h-[100dvh] w-64 bg-zinc-950 border-l border-white/5 shadow-2xl z-50 md:hidden transform transition-transform duration-400 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer Header (Close button only since Logo is in nav) */}
        <div className="flex justify-end p-5">
          <button 
            onClick={closeMobileMenu} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.05] hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col px-6 gap-3 mt-4 flex-1">
          <Link 
            to="/" 
            onClick={closeMobileMenu}
            className={`px-4 py-3 rounded-xl text-[0.95rem] font-medium transition-all ${location.pathname === '/' ? 'bg-white/10 text-white shadow-inner border border-white/5' : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'}`}
          >
            Academia
          </Link>
          <Link
            to="/actualidad"
            onClick={closeMobileMenu}
            className={`px-4 py-3 rounded-xl text-[0.95rem] font-medium transition-all ${location.pathname === '/actualidad' ? 'bg-white/10 text-white shadow-inner border border-white/5' : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'}`}
          >
            Aprende Gratis
          </Link>
          <Link
            to="/herramientas"
            onClick={closeMobileMenu}
            className={`px-4 py-3 rounded-xl text-[0.95rem] font-medium transition-all ${location.pathname === '/herramientas' ? 'bg-white/10 text-white shadow-inner border border-white/5' : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'}`}
          >
            Herramientas
          </Link>
          
          <div className="my-2 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          
          <Link 
            to="/empieza" 
            onClick={closeMobileMenu}
            className="mt-2 flex items-center justify-center gap-2 text-[1rem] font-bold px-4 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_4px_15px_rgba(249,115,22,0.4)] hover:shadow-[0_4px_25px_rgba(249,115,22,0.6)] hover:from-orange-400 hover:to-amber-400 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-[pulse_2s_ease-in-out_infinite]"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
            Empieza Aquí
          </Link>
        </div>

        {/* Social Links Footer */}
        <div className="px-6 pb-8 pt-4">
          <p className="text-xs text-gray-500 mb-4 uppercase tracking-wider font-semibold">Síguenos</p>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/adelinbtc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-500/20 via-pink-500/25 to-purple-600/20 border border-pink-500/50 text-pink-400 hover:from-yellow-500 hover:via-pink-500 hover:to-purple-600 hover:border-transparent hover:text-white shadow-[0_0_10px_rgba(236,72,153,0.15)] hover:shadow-[0_0_20px_rgba(236,72,153,0.6)] transition-all duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_4px_rgba(236,72,153,0.4)]">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://www.youtube.com/@AdelinBTC?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600/20 border border-red-500/50 text-red-400 hover:bg-red-600 hover:border-transparent hover:text-white shadow-[0_0_10px_rgba(239,68,68,0.15)] hover:shadow-[0_0_20px_rgba(239,68,68,0.6)] transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">
                <path d="M21.582 6.186a2.684 2.684 0 0 0-1.884-1.895C17.985 3.843 12 3.843 12 3.843s-5.985 0-7.698.448A2.684 2.684 0 0 0 2.418 6.186C2 7.904 2 12 2 12s0 4.096.418 5.814a2.684 2.684 0 0 0 1.884 1.895c1.713.448 7.698.448 7.698.448s5.985 0 7.698-.448a2.684 2.684 0 0 0 1.884-1.895C22 16.096 22 12 22 12s0-4.096-.418-5.814zM9.912 15.352V8.648L15.688 12l-5.776 3.352z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

