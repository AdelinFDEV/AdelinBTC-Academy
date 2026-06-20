import React, { useState, useRef } from 'react';

const ChevronIcon = ({ isOpen }) => (
  <svg 
    width="16" height="16" viewBox="0 0 16 16" fill="none" 
    className={`transition-transform duration-400 ${isOpen ? 'rotate-180' : ''}`}
  >
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Chapter = ({ icon, number, title, description, subChapters, isLocked, isOpen, onToggle }) => {
  const contentRef = useRef(null);

  if (isLocked) {
    return (
      <div className="flex items-center gap-5 bg-white/[0.015] border border-white/[0.04] p-5 md:p-6 rounded-2xl mb-4 opacity-25 blur-[3px] select-none pointer-events-none">
        <div className="text-2xl bg-white/[0.04] w-14 h-14 flex items-center justify-center rounded-xl border border-white/[0.06] shrink-0 grayscale">
          {icon}
        </div>
        <div>
          <h3 className="text-base text-white/60 font-bold mb-0.5">Capítulo {number}: {title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`group flex flex-col rounded-2xl mb-4 relative transition-all duration-500 cursor-pointer overflow-hidden
        ${isOpen 
          ? 'bg-gradient-to-br from-orange-500/[0.06] to-transparent border border-orange-500/20 shadow-[0_8px_32px_rgba(255,153,0,0.08)]' 
          : 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1]'
        }`}
      onClick={onToggle}
    >
      {/* Subtle glow line at top when open */}
      {isOpen && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
      )}

      <div className="flex items-center gap-4 md:gap-5 p-5 md:p-6">
        {/* Chapter number badge */}
        <div className={`relative text-2xl w-14 h-14 flex items-center justify-center rounded-xl border shrink-0 transition-all duration-500
          ${isOpen 
            ? 'bg-gradient-to-br from-orange-500/20 to-orange-600/5 border-orange-500/30 shadow-[0_0_24px_rgba(255,153,0,0.15)]' 
            : 'bg-white/[0.03] border-white/[0.08] group-hover:border-orange-500/20 group-hover:bg-orange-500/[0.04]'
          }`}>
          {icon}
          {/* Tiny chapter number */}
          <span className={`absolute -top-1.5 -right-1.5 w-5 h-5 text-[0.6rem] font-bold rounded-md flex items-center justify-center transition-all duration-300
            ${isOpen ? 'bg-orange-500 text-white shadow-[0_2px_8px_rgba(255,153,0,0.4)]' : 'bg-white/10 text-gray-500 border border-white/10'}`}>
            {number}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={`text-base md:text-lg font-bold mb-0.5 transition-all duration-300 leading-snug
            ${isOpen ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-200' : 'text-white group-hover:text-orange-100'}`}>
            {title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
        </div>
        
        {/* Chevron button */}
        <div className={`flex items-center justify-center w-9 h-9 rounded-lg border transition-all duration-300
          ${isOpen 
            ? 'bg-orange-500/15 border-orange-500/25 text-orange-400' 
            : 'bg-white/[0.04] border-white/[0.06] text-gray-600 group-hover:text-gray-400 group-hover:bg-white/[0.06]'
          }`}>
          <ChevronIcon isOpen={isOpen} />
        </div>
      </div>

      {/* Expandable subchapters */}
      <div 
        ref={contentRef}
        style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
        className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <div className="px-5 md:px-6 pb-5 md:pb-6 pt-1">
          {/* Connecting line */}
          <div className="ml-[27px] border-l border-dashed border-orange-500/15 pl-8 md:pl-10 flex flex-col gap-2.5">
            {subChapters.map((sub, idx) => (
              <div 
                key={idx} 
                className={`relative flex items-center gap-3 text-sm p-3 md:p-3.5 rounded-xl transition-all duration-300
                  ${sub.locked 
                    ? 'bg-white/[0.015] text-gray-600 border border-transparent' 
                    : 'bg-white/[0.03] text-gray-300 border border-white/[0.06] hover:border-orange-500/15 hover:bg-white/[0.05]'
                  }`}
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                {/* Connector dot */}
                <div className={`absolute -left-[calc(2rem+9px)] md:-left-[calc(2.5rem+9px)] w-[7px] h-[7px] rounded-full border-2
                  ${sub.locked ? 'border-gray-700 bg-transparent' : 'border-orange-500/60 bg-orange-500/30'}`}></div>
                
                <span className={`text-xs flex items-center justify-center w-6 h-6 rounded-lg shrink-0
                  ${sub.locked 
                    ? 'bg-white/[0.03] text-gray-600' 
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                  {sub.locked ? '🔒' : '✓'}
                </span>
                <span className={`${sub.locked ? 'blur-[2px] opacity-50 select-none' : 'font-medium'}`}>
                  {number}.{idx + 1} {sub.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ChapterMap = () => {
  const [openChapter, setOpenChapter] = useState(null);

  const chapters = [
    {
      icon: '🔥',
      title: 'Fase 1: Los Cimientos del Dinero',
      description: 'Entiende cómo se mueve el capital institucional y deja de perder dinero como el 90% de los novatos.',
      subChapters: [
        { title: 'La verdad que nadie te cuenta de Crypto', locked: false },
        { title: 'Identificando el Ciclo de Mercado', locked: false },
        { title: 'Manipulación de las ballenas (Bloqueado)', locked: true },
        { title: 'Blindaje total de tus fondos (Bloqueado)', locked: true },
      ]
    },
    {
      icon: '📈',
      title: 'Fase 2: Estrategia y Análisis de Tokens',
      description: 'Mi sistema paso a paso para analizar cualquier proyecto y descubrir su precio real antes de invertir.',
      subChapters: [
        { title: 'Tokenomics: La trampa de la inflación', locked: false },
        { title: 'Fuentes de información clasificada', locked: false },
        { title: 'Proyección matemática del precio (Bloqueado)', locked: true },
        { title: 'Cuándo comprar y cuándo vender (Bloqueado)', locked: true },
      ]
    },
    {
      icon: '🎯',
      title: 'Fase 3: El Diario del Francotirador',
      description: 'Si no mides tus trades, estás apostando. Implementa mi sistema exacto de gestión de riesgo institucional.',
      subChapters: [
        { title: 'Configurando tu Diario de Trading', locked: false },
        { title: 'Psicología de acero: Cero emociones', locked: false },
        { title: 'Cálculo de posición avanzado (Bloqueado)', locked: true },
        { title: 'Ratio Riesgo/Beneficio Asimétrico (Bloqueado)', locked: true },
      ]
    },
    {
      icon: '⚡',
      title: 'Fase 4: El Gráfico al Desnudo',
      description: 'Olvídate de indicadores mágicos. Aprende a leer la acción del precio pura y el volumen real.',
      subChapters: [
        { title: 'Zonas clave de Oferta y Demanda', locked: false },
        { title: 'El Volumen Oculto', locked: false },
        { title: 'Cazando manipulaciones de liquidez (Bloqueado)', locked: true },
        { title: 'Estructuras de Reversión Exactas (Bloqueado)', locked: true },
      ]
    }
  ];

  const lockedChapters = [
    { icon: '🧠', title: 'Psicología Avanzada del Inversor', description: 'Cómo hackear tu cerebro para comprar sangre (caídas) y vender euforia masiva.' },
    { icon: '💎', title: 'Cazando Gemas Ocultas (Altcoins)', description: 'El proceso On-Chain que utilizo para detectar proyectos x10 a x100 antes de que coticen en Binance.' },
    { icon: '👑', title: 'Estrategia de Salida: Retiro de Ganancias', description: 'El mayor error es no saber salir. Domina el arte de sacar liquidez justo en el pico de mercado.' }
  ];

  return (
    <section className="py-20 md:py-28 relative section-divider">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/[0.03] rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-3xl mx-auto px-5 relative">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-orange-400/80 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-orange-500/40"></span>
            CONTENIDO DE MASTER CRIPTO DEFINITIVO
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-orange-500/40"></span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Mapa de <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Contenidos</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-lg mx-auto leading-relaxed">
            Echa un vistazo a lo que descubrirás en el interior de AdelinBTC: Master Cripto Definitivo. Haz clic en cada capítulo para explorar.
          </p>
        </div>
        
        {/* Chapters List */}
        <div className="relative">
          {chapters.map((chap, idx) => (
            <Chapter 
              key={idx}
              number={idx + 1}
              icon={chap.icon}
              title={chap.title}
              description={chap.description}
              subChapters={chap.subChapters}
              isOpen={openChapter === idx}
              onToggle={() => setOpenChapter(openChapter === idx ? null : idx)}
            />
          ))}

          {/* Locked Premium Section */}
          <div className="relative mt-10">
            {/* Glass overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#060608]/80 backdrop-blur-sm rounded-2xl text-center p-8 border border-white/[0.06]">
              {/* Orange glow behind lock */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="relative text-4xl mb-5 w-16 h-16 bg-gradient-to-br from-orange-500/15 to-orange-600/5 flex items-center justify-center rounded-2xl border border-orange-500/25 shadow-[0_0_30px_rgba(255,153,0,0.15)]">
                🔒
              </div>
              <h4 className="text-2xl md:text-3xl font-extrabold text-white mb-3 tracking-tight">Contenido Premium</h4>
              <p className="text-gray-400 text-base md:text-lg mb-8 max-w-sm leading-relaxed">
                Adquiere AdelinBTC: Master Cripto Definitivo para acceder al conocimiento avanzado y estrategias rentables.
              </p>
              <a href="#buy" className="group relative bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-base py-3.5 px-10 rounded-full shadow-[0_8px_24px_rgba(255,153,0,0.3)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_36px_rgba(255,153,0,0.45)] inline-block overflow-hidden">
                <span className="relative z-10">Desbloquear Todo Ahora</span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
              </a>
            </div>

            {lockedChapters.map((chap, idx) => (
              <Chapter 
                key={`locked-${idx}`}
                number={chapters.length + idx + 1}
                icon={chap.icon}
                title={chap.title}
                description={chap.description}
                isLocked={true}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChapterMap;
