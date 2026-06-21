import React from 'react';

const ContactSection = () => {
  return (
    <section className="py-20 md:py-28 relative section-divider border-t border-white/[0.04]">
      <div className="absolute inset-0 bg-[#060608] -z-10"></div>
      
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/[0.03] rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/[0.03] rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-5">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Instagram Contact */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden group hover:border-pink-500/20 transition-all duration-500">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-pink-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.15)] relative z-10"
              style={{ background: 'radial-gradient(circle at 30% 107%, rgba(253,212,88,0.15) 0%, rgba(253,89,73,0.15) 45%, rgba(214,36,159,0.15) 60%, rgba(40,90,235,0.1) 90%)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#ig-grad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="animate-[pulse_2s_ease-in-out_infinite]">
                <defs>
                  <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fdf497"/>
                    <stop offset="45%" stopColor="#fd5949"/>
                    <stop offset="60%" stopColor="#d6249f"/>
                    <stop offset="90%" stopColor="#285AE5"/>
                  </linearGradient>
                </defs>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4 relative z-10">
              ¿Dudas? Hablemos <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">personalmente</span>
            </h2>

            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10 max-w-sm mx-auto relative z-10">
              Sin coste alguno, escríbeme por Instagram y te ayudaré personalmente con cualquier duda antes de comprar.
            </p>

            <div className="mt-auto w-full relative z-10 flex flex-col items-center">
              <a
                href="https://www.instagram.com/adelinbtc"
                target="_blank"
                rel="noopener noreferrer"
                className="group btn-instagram inline-flex items-center justify-center gap-2 sm:gap-3 text-white font-bold text-[0.85rem] sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 active:scale-[0.98] w-full max-w-[380px] relative overflow-hidden"
              >
                <span className="relative z-10 text-white drop-shadow-md leading-tight text-center">Escríbeme por Instagram</span>
                <svg className="relative z-10 transition-transform duration-300 group-hover:scale-110 shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
              </a>
              <p className="text-gray-500 text-xs mt-5 uppercase tracking-widest font-medium">Respondo personalmente</p>
            </div>
          </div>

          {/* Card 2: MEXC Exchange */}
          <div className="border border-white/[0.08] rounded-3xl p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
            {/* Cinematic Background Image */}
            <div className="absolute inset-0 -z-20">
              <div className="w-full h-full bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: 'url("/mexc_bg.png")' }}></div>
            </div>
            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/80 to-[#060608]/40 -z-10"></div>
            
            {/* MEXC Branding */}
            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/30 shadow-[0_0_30px_rgba(37,99,235,0.2)] relative z-10 backdrop-blur-sm">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">
                <path d="M9 5v4" />
                <rect width="4" height="6" x="7" y="9" rx="1" />
                <path d="M9 15v2" />
                <path d="M17 3v2" />
                <rect width="4" height="8" x="15" y="5" rx="1" />
                <path d="M17 13v3" />
                <path d="M3 3v18h18" />
              </svg>
            </div>
            
            <div className="relative z-10 mb-4">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
                Exchange Recomendado
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white drop-shadow-md">
                MEXC
              </h2>
            </div>
            
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10 max-w-sm mx-auto relative z-10 font-medium">
              La <strong className="text-white">mayor oferta de criptomonedas</strong> del mercado y el <strong className="text-blue-400">ÚNICO con comisiones 0</strong> para operar en Spot y Futuros.
            </p>
            
            <div className="mt-auto w-full relative z-10 flex flex-col items-center">
              <a 
                href="https://www.mexc.com/es-ES/register?inviteCode=mexc-1xydM" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center justify-center gap-1.5 sm:gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-[0.8rem] sm:text-base px-3 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(37,99,235,0.4)] active:scale-[0.98] relative overflow-hidden"
              >
                <span className="relative z-10 text-lg sm:text-xl mr-0.5 sm:mr-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">🎁</span>
                <span className="relative z-10 leading-tight text-center">Registrarse y Obtener 10$ Gratis</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
              </a>
              <p className="text-gray-400 text-xs mt-5 uppercase tracking-widest font-medium drop-shadow-md">Bono de bienvenida exclusivo</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
