import React, { useState, useEffect } from 'react';

const StickyBuyBar = () => {
  const [visible, setVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const DEADLINE_KEY = 'adelinbtc_deadline';
    const stored = localStorage.getItem(DEADLINE_KEY);
    let deadline;
    if (stored) {
      deadline = new Date(parseInt(stored));
      if (deadline <= Date.now()) {
        deadline = new Date(Date.now() + 72 * 60 * 60 * 1000);
        localStorage.setItem(DEADLINE_KEY, deadline.getTime().toString());
      }
    } else {
      deadline = new Date(Date.now() + 72 * 60 * 60 * 1000);
      localStorage.setItem(DEADLINE_KEY, deadline.getTime().toString());
    }

    const updateTimer = () => {
      const diff = deadline - Date.now();
      if (diff <= 0) {
        deadline = new Date(Date.now() + 72 * 60 * 60 * 1000);
        localStorage.setItem(DEADLINE_KEY, deadline.getTime().toString());
        return;
      }
      setTimeLeft({
        h: Math.floor(diff / (1000 * 60 * 60)),
        m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    const handleScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(timerId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-[#09090e]/95 backdrop-blur-xl border-t border-white/[0.08] shadow-[0_-20px_60px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-row items-center justify-between gap-2 sm:gap-3">

          {/* Left: price */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="flex items-baseline gap-1.5">
              <span className="text-gray-600 line-through text-xs sm:text-sm font-medium">149€</span>
              <span className="text-white font-black text-xl sm:text-2xl">79<span className="text-orange-400">€</span></span>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[0.65rem] font-black text-orange-400 uppercase tracking-widest bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full whitespace-nowrap">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
              Precio lanzamiento
            </span>
          </div>

          {/* Center: countdown — hidden on mobile */}
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="flex items-center gap-1">
              {[
                { val: pad(timeLeft.h), label: 'h' },
                { val: pad(timeLeft.m), label: 'm' },
                { val: pad(timeLeft.s), label: 's' },
              ].map((unit, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="text-orange-500 font-black text-sm">:</span>}
                  <div className="flex flex-col items-center">
                    <span className="bg-white/[0.06] border border-white/[0.08] rounded-lg px-2 py-1 text-white font-black text-sm tabular-nums min-w-[2rem] text-center">{unit.val}</span>
                    <span className="text-[0.5rem] text-gray-600 font-medium mt-0.5 uppercase">{unit.label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right: CTA */}
          <a
            href="https://buy.stripe.com/aFa6oH99G8KObKRcNLaZi01"
            target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm px-6 sm:px-7 py-3 rounded-full hover:shadow-[0_8px_24px_rgba(255,153,0,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] relative overflow-hidden whitespace-nowrap shrink-0"
          >
            <span className="relative z-10 hidden sm:inline">Descargar Ahora</span>
            <span className="relative z-10 sm:hidden">Descargar — 79€</span>
            <svg className="relative z-10" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4L12 20M12 20L18 14M12 20L6 14"/>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StickyBuyBar;
