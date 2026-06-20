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
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden group hover:border-orange-500/20 transition-all duration-500">
            {/* Hover Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-orange-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            {/* Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500/15 to-pink-500/10 rounded-2xl flex items-center justify-center mb-8 border border-orange-500/20 shadow-[0_0_30px_rgba(255,153,0,0.1)] relative z-10">
              <span className="text-3xl">💬</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4 relative z-10">
              ¿Dudas? Hablemos <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-orange-500 animate-gradient">personalmente</span>
            </h2>
            
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10 max-w-sm mx-auto relative z-10">
              Sin coste alguno, escríbeme por mensaje privado en Instagram y te ayudaré con mucho gusto.
            </p>
            
            <div className="mt-auto w-full relative z-10 flex flex-col items-center">
              <a 
                href="https://www.instagram.com/adelinbtc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center justify-center gap-3 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(236,72,153,0.3)] active:scale-[0.98] relative overflow-hidden"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 group-hover/btn:scale-110 transition-transform duration-300">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="relative z-10">Escríbeme en Instagram</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
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
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-blue-500">
                <path d="M3 21h18v-2H3v2zm6-4h6V7H9v10zm-6 0h4V7H3v10zm14 0h4V7h-4v10z" fill="currentColor"/>
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
                className="group/btn inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(37,99,235,0.4)] active:scale-[0.98] relative overflow-hidden"
              >
                <span className="relative z-10 text-xl mr-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">🎁</span>
                <span className="relative z-10">Registrarse y Obtener 10$ Gratis</span>
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
