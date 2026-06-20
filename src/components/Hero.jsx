import React from 'react';
import Navbar from './Navbar';

const Hero = () => {
  return (
    <header className="relative border-b border-white/[0.06] isolate overflow-hidden">
      {/* Background Image & Multi-layer Overlay */}
      <div className="absolute inset-0 overflow-hidden -z-20">
        <div 
          className="w-full h-full bg-cover bg-center animate-ken-burns scale-110"
          style={{ backgroundImage: 'url("/cinematic_bg.png")' }}
        ></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#060608]/95 via-[#060608]/90 to-[#060608] -z-10"></div>
      
      {/* Decorative floating orbs */}
      <div className="absolute top-20 right-[15%] w-[300px] h-[300px] bg-orange-500/8 rounded-full blur-[120px] -z-10 animate-float"></div>
      <div className="absolute bottom-10 left-[10%] w-[200px] h-[200px] bg-orange-600/6 rounded-full blur-[100px] -z-10 animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Hero Content */}
      <div className="max-w-6xl mx-auto px-5 pt-[60px] pb-[100px] flex flex-col md:flex-row items-center gap-10 md:gap-16 text-center md:text-left relative z-10">
        <div className="flex-1 max-w-[600px] flex flex-col items-center md:items-start gap-6">
          
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-orange-500/8 text-orange-400 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider border border-orange-500/20 backdrop-blur-sm">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-glow-pulse"></span>
            NUEVO LANZAMIENTO
          </span>
          
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] mb-2 tracking-tight">
            Domina el <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 animate-gradient">Mercado Crypto</span> Hoy
          </h1>
          
          {/* Subtitle */}
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-4 max-w-[540px]">
            Obtén <strong className="text-white">AdelinBTC: Master Cripto Definitivo</strong>. La guía paso a paso para entender blockchain, trading, y maximizar tus ganancias sin riesgos innecesarios.
          </p>

          {/* High-Hype Features List */}
          <div className="w-full max-w-[500px] mb-6 flex flex-col gap-3">
            <h3 className="text-orange-500 font-extrabold uppercase tracking-widest text-xs mb-1 flex items-center gap-2">
              <span className="w-6 h-px bg-orange-500"></span>
              QUÉ INCLUYE TU ACCESO
            </h3>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-4 bg-white/[0.04] backdrop-blur-md border border-white/10 p-4 rounded-xl hover:border-white/20 hover:bg-white/[0.02] hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)] transition-all duration-300">
                <div className="shrink-0 mt-0.5 bg-gradient-to-br from-fuchsia-500/20 to-fuchsia-600/10 w-10 h-10 flex items-center justify-center rounded-lg border border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.25)] text-fuchsia-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <p className="text-[0.95rem] text-gray-300 leading-relaxed"><strong className="text-white font-extrabold tracking-wide text-base">Masterclass VIP en PDF:</strong> No es un simple libro. Es el <span className="text-orange-400 font-semibold">manual definitivo</span> que evoluciona constantemente con el mercado real.</p>
              </li>
              <li className="flex items-start gap-4 bg-white/[0.04] backdrop-blur-md border border-white/10 p-4 rounded-xl hover:border-white/20 hover:bg-white/[0.02] hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)] transition-all duration-300">
                <div className="shrink-0 mt-0.5 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 w-10 h-10 flex items-center justify-center rounded-lg border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.25)] text-emerald-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                  </svg>
                </div>
                <p className="text-[0.95rem] text-gray-300 leading-relaxed"><strong className="text-white font-extrabold tracking-wide text-base">Setup de Estrategia Institucional:</strong> El sistema de <span className="text-orange-400 font-semibold">alta precisión</span> para entrar al mercado sin depender del azar.</p>
              </li>
              <li className="flex items-start gap-4 bg-white/[0.04] backdrop-blur-md border border-white/10 p-4 rounded-xl hover:border-white/20 hover:bg-white/[0.02] hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)] transition-all duration-300">
                <div className="shrink-0 mt-0.5 bg-gradient-to-br from-orange-500/20 to-orange-600/10 w-10 h-10 flex items-center justify-center rounded-lg border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.25)] text-orange-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                </div>
                <p className="text-[0.95rem] text-gray-300 leading-relaxed"><strong className="text-white font-extrabold tracking-wide text-base">Gestión de Francotirador:</strong> Plantillas avanzadas para aniquilar tus emociones y lograr un <span className="text-orange-400 font-semibold">Riesgo/Beneficio asimétrico</span>.</p>
              </li>
              <li className="flex items-start gap-4 bg-white/[0.04] backdrop-blur-md border border-white/10 p-4 rounded-xl hover:border-white/20 hover:bg-white/[0.02] hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)] transition-all duration-300">
                <div className="shrink-0 mt-0.5 bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 w-10 h-10 flex items-center justify-center rounded-lg border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.25)] text-yellow-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                </div>
                <p className="text-[0.95rem] text-gray-300 leading-relaxed"><strong className="text-white font-extrabold tracking-wide text-base">Caza de Gemas x100:</strong> Filtros On-Chain secretos para encontrar <span className="text-orange-400 font-semibold">Altcoins explosivas</span> antes que Binance.</p>
              </li>
            </ul>
          </div>
          
          {/* Lifetime Access & Updates Guarantee */}
          <div className="flex items-center gap-5 bg-gradient-to-r from-amber-500/10 via-orange-600/5 to-transparent border border-amber-500/20 p-5 rounded-2xl mb-6 text-left w-full max-w-[500px] relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/[0.03] to-transparent pointer-events-none"></div>
            
            {/* Premium Icon Container */}
            <div className="shrink-0 relative w-14 h-14 flex items-center justify-center bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl shadow-[0_0_20px_rgba(255,153,0,0.4)] transition-transform duration-300">
              <div className="absolute inset-[2px] bg-[#0a0a0a] rounded-[10px] flex items-center justify-center">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-amber-400 drop-shadow-[0_0_8px_rgba(255,180,0,0.8)] animate-spin-slow">
                  <path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M4.06189 13C4.55399 16.9463 7.92038 20 12 20C15.3574 20 18.2317 17.9318 19.4185 15M19.4185 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 relative z-10">
              <strong className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 text-[0.95rem] font-extrabold uppercase tracking-wide">
                ACCESO VITALICIO + ACTUALIZACIONES GRATIS
              </strong>
              <span className="text-gray-300 text-[0.85rem] leading-snug">
                El mercado muta a diario, y este Master también. Recibirás <strong className="text-white">TODAS LAS FUTURAS ACTUALIZACIONES</strong> sin pagar ni un céntimo más.
              </span>
            </div>
          </div>
          
          {/* Pricing Card */}
          <div className="mb-6 w-full max-w-[400px] bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent backdrop-blur-xl p-6 rounded-2xl border border-orange-500/25 shadow-[0_20px_60px_rgba(255,153,0,0.08)] animate-border-glow">
            <div className="bg-[#ff3333] text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-5 animate-pulse-ring inline-block">
              PRECIO ESPECIAL DE LANZAMIENTO
            </div>
            <div className="flex items-baseline justify-center md:justify-start gap-4 mb-3">
              <span className="text-gray-600 text-2xl line-through font-bold">149 €</span>
              <span className="text-white text-5xl font-extrabold tracking-tight">
                79 <span className="text-orange-400">€</span>
              </span>
            </div>
            <p className="text-[#ff4444] font-semibold text-[0.9rem] tracking-wide flex items-center gap-2 justify-center md:justify-start">
              <span className="inline-block w-2 h-2 bg-[#ff3333] rounded-full animate-pulse"></span>
              Solo quedan <strong className="font-extrabold">3 plazas</strong> a este precio
            </p>
          </div>
          
          {/* CTA Button */}
          <div className="w-full flex justify-center md:justify-start">
            <a href="#buy" className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_40px_rgba(255,153,0,0.4)] active:scale-[0.98] w-full max-w-[320px] relative overflow-hidden">
              <span className="relative z-10">Descargar Ahora</span>
              <svg className="relative z-10 transition-transform duration-300 group-hover:translate-y-1" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 4L12 20M12 20L18 14M12 20L6 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
            </a>
          </div>

          {/* Trust Badges */}

          
        </div>
        
        {/* Right side - 3D Mockup & Guarantee */}
        <div className="flex-1 flex flex-col items-center w-full max-w-[500px] md:max-w-none perspective-1000 mt-10 md:mt-0 relative">
          
          {/* Mockup */}
          <div className="relative transition-all duration-700 hover:rotate-0 hover:scale-105 animate-float w-full max-w-[500px]" style={{ transform: 'rotateY(-8deg) rotateX(3deg)', animationDuration: '6s' }}>
            {/* Glow behind mockup */}
            <div className="absolute -inset-10 bg-orange-500/10 rounded-full blur-[80px] -z-10 animate-glow-pulse"></div>
            <img src="/mockup.png" alt="Mockup AdelinBTC: Master Cripto Definitivo" className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] rounded-lg object-cover relative z-10" />
          </div>

          {/* Guarantee & Contact Mini-section */}
          <div className="mt-10 md:mt-12 flex flex-col items-center text-center w-full max-w-[450px] bg-white/[0.03] border border-white/[0.08] p-6 rounded-2xl backdrop-blur-md hover:border-orange-500/20 transition-colors duration-300">
            <div className="flex items-center justify-center gap-2 mb-3 text-orange-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="drop-shadow-[0_0_8px_rgba(255,153,0,0.6)]">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span className="font-extrabold uppercase tracking-widest text-[0.8rem]">Garantía 100% Sin Riesgo</span>
            </div>
            
            <p className="text-gray-300 text-[0.9rem] leading-relaxed mb-6 font-medium">
              Te garantizo que tu comprensión de las criptomonedas, rentabilidad y ganancias mejorarán. Si no es así, puedes pedir la devolución de tu dinero.
            </p>
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>
            
            <p className="text-gray-400 text-xs mb-3 font-medium uppercase tracking-wider">¿Tienes alguna duda antes de entrar?</p>
            <a 
              href="https://www.instagram.com/adelinbtc" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 hover:from-pink-500/20 hover:via-purple-500/20 hover:to-orange-500/20 border border-white/10 hover:border-pink-500/30 w-full py-3 rounded-xl text-white text-sm font-bold transition-all duration-300 group"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400 group-hover:scale-110 transition-transform duration-300">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Pregúntame por Instagram
            </a>
          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Hero;
