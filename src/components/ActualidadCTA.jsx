import React from 'react';
import { Link } from 'react-router-dom';

const ActualidadCTA = () => {
  return (
    <section className="py-20 relative border-t border-b border-white/[0.04] overflow-hidden bg-[#060608]">
      <div className="max-w-5xl mx-auto px-5 relative z-10">
        
        {/* Premium Banner Container */}
        <div className="relative rounded-[2rem] overflow-hidden border border-orange-500/20 shadow-[0_0_80px_rgba(255,153,0,0.08)] bg-gradient-to-br from-white/[0.03] to-transparent p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 group">
          
          {/* Background Effects inside Banner */}
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute -top-[50%] -right-[10%] w-[80%] h-[150%] bg-orange-500/10 rotate-12 blur-[80px] group-hover:bg-orange-500/20 transition-colors duration-700"></div>
            {/* Decorative Play Icon Watermark */}
            <svg className="absolute -bottom-10 -right-10 w-64 h-64 text-orange-500/5 rotate-[-15deg] group-hover:scale-110 group-hover:text-orange-500/10 transition-all duration-700" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-[0_0_20px_rgba(255,153,0,0.2)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
              CONTENIDO GRATUITO
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-5 leading-[1.1]">
              Tu dosis semanal de <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">Alpha.</span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
              Vídeos de YouTube, análisis de mercado y guías paso a paso. Material educativo gratuito publicado cada semana — sin coste, sin excusas.
            </p>
          </div>

          {/* Glowing CTA Button */}
          <div className="shrink-0 relative z-10">
            <Link 
              to="/actualidad" 
              className="relative inline-flex group items-center justify-center cursor-pointer"
            >
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
              
              {/* Button core */}
              <div className="relative flex items-center justify-center gap-3 bg-[#0a0a0f] px-8 py-4 rounded-full border border-white/10 leading-none">
                <span className="flex items-center space-x-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500 group-hover:scale-110 transition-transform duration-300">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"></polygon>
                  </svg>
                  <span className="text-white font-extrabold text-lg tracking-wide group-hover:text-orange-100 transition-colors">Aprende Gratis</span>
                </span>
              </div>
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ActualidadCTA;
