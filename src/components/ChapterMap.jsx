import React, { useState, useRef, useEffect } from 'react';

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.08, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

const PhaseIcon = ({ id, className = '' }) => {
  const icons = {
    foundation: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
    strategy: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
        <polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
    journal: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <line x1="10" y1="9" x2="8" y2="9"/>
      </svg>
    ),
    chart: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
        <line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
    psychology: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    gem: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 22 22 7 12 2"/>
        <line x1="2" y1="7" x2="22" y2="7"/>
        <polyline points="7 2 12 7 17 2"/>
      </svg>
    ),
    exit: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="8 12 12 8 16 12"/>
        <line x1="12" y1="16" x2="12" y2="8"/>
      </svg>
    ),
  };
  return icons[id] || null;
};

const phases = [
  {
    number: '01',
    iconId: 'foundation',
    label: 'Fase 1',
    title: 'Domina CoinMarketCap',
    description: 'Entiende cómo leer correctamente los datos fundamentales de un token en CoinMarketCap y supera al 95% de personas que no prestan atención a esto.',
    color: 'orange',
    border: 'border-orange-500/35',
    bg: 'bg-orange-500/10',
    glow: 'shadow-[0_0_45px_rgba(249,115,22,0.2)]',
    glowHover: 'hover:shadow-[0_0_55px_rgba(249,115,22,0.35)] hover:border-orange-500/40',
    activeBorder: 'border-orange-400',
    activeBg: 'from-orange-500/15 via-orange-950/20 to-orange-950/5',
    numberColor: 'text-orange-400',
    dotColor: 'bg-orange-500',
    lineColor: 'from-orange-500/60',
    premiumCount: 9,
    subChapters: [
      { title: 'Cómo usar CoinMarketCap (sin que te la cuelen)', locked: false, url: 'https://drive.google.com/file/d/1wB7dAgHv0ocRW3BME1MlJV4rab8gYCMm/view?usp=drive_link' },
      { title: 'Cómo leer la página de un token', locked: false, url: 'https://drive.google.com/file/d/1R7N1eMLoZLFMZ82T7q9QNJguUb4WacQe/view?usp=drive_link' },
      { title: 'Manipulación de las ballenas', locked: true },
      { title: 'Blindaje total de tus fondos', locked: true },
    ]
  },
  {
    number: '02',
    iconId: 'strategy',
    label: 'Fase 2',
    title: 'Estrategia y Análisis de Tokens',
    description: 'Mi sistema paso a paso para analizar cualquier proyecto y descubrir su precio real antes de invertir.',
    color: 'blue',
    border: 'border-blue-500/35',
    bg: 'bg-blue-500/10',
    glow: 'shadow-[0_0_45px_rgba(59,130,246,0.18)]',
    glowHover: 'hover:shadow-[0_0_55px_rgba(59,130,246,0.28)] hover:border-blue-500/40',
    activeBorder: 'border-blue-400',
    activeBg: 'from-blue-500/15 via-blue-950/20 to-blue-950/5',
    numberColor: 'text-blue-400',
    dotColor: 'bg-blue-500',
    lineColor: 'from-blue-500/60',
    premiumCount: 7,
    subChapters: [
      { title: '¿Es posible que el token alcance ese precio?', locked: false, url: 'https://drive.google.com/file/d/1asOILPA5mNUIt4Kq79jRdoFa8TqLzyiq/view?usp=drive_link' },
      { title: 'Red Flags al analizar un token', locked: false, url: 'https://drive.google.com/file/d/1-HSTr5Z7W9WmjsuxHPdhYhsZLkf1Vblo/view?usp=drive_link' },
      { title: 'Proyección matemática del precio', locked: true },
      { title: 'Cuándo comprar y cuándo vender', locked: true },
    ]
  },
  {
    number: '03',
    iconId: 'journal',
    label: 'Fase 3',
    title: 'El Diario del Francotirador',
    description: 'Si no mides tus trades, estás apostando. Implementa mi sistema exacto de gestión de riesgo institucional.',
    color: 'emerald',
    border: 'border-emerald-500/35',
    bg: 'bg-emerald-500/10',
    glow: 'shadow-[0_0_45px_rgba(16,185,129,0.18)]',
    glowHover: 'hover:shadow-[0_0_55px_rgba(16,185,129,0.33)] hover:border-emerald-500/40',
    activeBorder: 'border-emerald-400',
    activeBg: 'from-emerald-500/15 via-emerald-950/20 to-emerald-950/5',
    numberColor: 'text-emerald-400',
    dotColor: 'bg-emerald-500',
    lineColor: 'from-emerald-500/60',
    premiumCount: 12,
    subChapters: [
      { title: 'La regla del 1%', locked: false, url: 'https://drive.google.com/file/d/18ON-sg9f1DIPH4YLgKp-yyxQ5TjzMfej/view?usp=drive_link' },
      { title: 'Estrategia y Diario de Trading Profesional', locked: true, noBlur: true },
      { title: 'Cálculo de posición avanzado', locked: true },
      { title: 'Ratio Riesgo/Beneficio Asimétrico', locked: true },
    ]
  },
];

const lockedPhases = [
  { iconId: 'psychology', title: 'Psicología Avanzada del Inversor', description: 'Hackea tu cerebro para comprar en pánico y vender en euforia masiva.' },
  { iconId: 'gem', title: 'Cazando Gemas Ocultas', description: 'El proceso On-Chain para detectar proyectos x10 antes de que coticen en Binance.' },
  { iconId: 'exit', title: 'Estrategia de Salida: Retiro de Ganancias', description: 'Domina el arte de sacar liquidez justo en el pico de mercado.' },
];

function PhaseCard({ phase, index, isOpen, onToggle }) {
  const [ref, inView] = useInView();
  const contentRef = useRef(null);
  const freeCount = phase.subChapters.filter(s => !s.locked).length;
  const lockedCount = phase.subChapters.filter(s => s.locked).length;

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Card */}
      <div
        onClick={onToggle}
        className={`relative rounded-2xl border cursor-pointer transition-all duration-400 overflow-hidden group
          ${isOpen
            ? `border-opacity-100 ${phase.activeBorder} bg-gradient-to-br ${phase.activeBg} ${phase.glow}`
            : `border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.03] ${phase.glowHover}`
          }`}
      >
        {/* Top accent line when open */}
        {isOpen && (
          <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${phase.lineColor} to-transparent`}></div>
        )}

        {/* Card header */}
        <div className="flex items-center gap-4 p-5 md:p-6">

          {/* Phase number + emoji block */}
          <div className={`relative shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center border transition-all duration-400
            ${isOpen ? `${phase.bg} ${phase.border} ${phase.glow}` : 'bg-white/[0.03] border-white/[0.08] group-hover:border-white/[0.15]'}`}
          >
            {/* Neon glow behind icon when open */}
            {isOpen && (
              <div className={`absolute inset-0 rounded-2xl opacity-30 blur-md ${phase.bg} animate-glow-pulse pointer-events-none`} />
            )}
            <PhaseIcon
              id={phase.iconId}
              className={`w-6 h-6 relative z-10 transition-all duration-300 ${
                isOpen
                  ? `${phase.numberColor} drop-shadow-[0_0_8px_currentColor]`
                  : 'text-gray-500 group-hover:text-gray-300'
              }`}
            />
            <span className={`text-[0.6rem] font-black uppercase tracking-wider mt-1 relative z-10 transition-colors duration-300 ${isOpen ? phase.numberColor : 'text-gray-600'}`}>
              {phase.label}
            </span>
            {/* Glow dot */}
            {isOpen && (
              <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${phase.dotColor} shadow-[0_0_8px_currentColor] animate-pulse`}></span>
            )}
          </div>

          {/* Title + meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className={`font-black text-base md:text-lg leading-tight transition-all duration-300
                ${isOpen ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
                {phase.title}
              </h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-1">{phase.description}</p>
            {/* Pills */}
            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold text-emerald-400">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {freeCount} lecciones gratis
              </span>
              <span className="text-gray-700">·</span>
              <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold text-gray-600">
                🔒 {phase.premiumCount} premium
              </span>
            </div>
          </div>

          {/* Chevron */}
          <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300
            ${isOpen ? `${phase.bg} ${phase.border} ${phase.numberColor}` : 'bg-white/[0.03] border-white/[0.08] text-gray-600 group-hover:text-gray-400'}`}
          >
            <svg
              width="14" height="14" viewBox="0 0 16 16" fill="none"
              className={`transition-transform duration-400 ${isOpen ? 'rotate-180' : ''}`}
            >
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Expandable content */}
        <div
          ref={contentRef}
          style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
          className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          <div className="px-5 md:px-6 pb-6 pt-1">
            {/* Description full */}
            <p className="text-gray-400 text-sm leading-relaxed mb-5 pl-0 md:pl-20">{phase.description}</p>

            {/* Sub-chapters grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-0 md:pl-4">
              {phase.subChapters.map((sub, i) => (
                sub.locked ? (
                  <div
                    key={i}
                    className="relative flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:border-amber-500/20 hover:bg-white/[0.04] transition-all duration-300 group/locked"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center bg-amber-500/10 border border-amber-500/20 text-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.2)]">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                      </div>
                      <span className={`text-sm font-semibold leading-snug text-zinc-400 select-none break-words whitespace-normal ${sub.noBlur ? '' : 'blur-[3px]'}`}>
                        {phase.number}.{i + 1} {sub.title}
                      </span>
                    </div>
                    <span className="shrink-0 text-[0.6rem] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 shadow-[0_0_6px_rgba(245,158,11,0.15)] animate-pulse">
                      Premium
                    </span>
                  </div>
                ) : (
                  <a
                    key={i}
                    href={sub.url || undefined}
                    target={sub.url ? '_blank' : undefined}
                    rel={sub.url ? 'noopener noreferrer' : undefined}
                    onClick={sub.url ? undefined : (e) => e.preventDefault()}
                    className={`group/item relative flex items-center gap-3 px-4 py-3 rounded-xl border text-left w-full transition-all duration-200 ${sub.url ? 'cursor-pointer' : 'cursor-default'}
                      ${phase.bg} ${phase.border}
                      hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] active:scale-[0.99]`}
                  >
                    {/* Shimmer on hover */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                      <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/item:translate-x-[400%] transition-transform duration-700 ease-out" />
                    </div>
                    <div className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center bg-white/[0.08] border ${phase.border} ${phase.numberColor}`}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-icon-breathe"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="text-sm font-medium leading-snug text-gray-200 flex-1">
                      {phase.number}.{i + 1} {sub.title}
                    </span>
                    {/* Download icon — only if has url */}
                    {sub.url && (
                      <svg
                        className={`shrink-0 w-3.5 h-3.5 ${phase.numberColor} opacity-0 group-hover/item:opacity-100 transition-opacity duration-200`}
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <path d="M12 4v12M12 16l-4-4M12 16l4-4"/><path d="M4 20h16"/>
                      </svg>
                    )}
                  </a>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ChapterMap = () => {
  const [openPhase, setOpenPhase] = useState(null);
  const [headerRef, headerInView] = useInView();
  const [lockedRef, lockedInView] = useInView();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden section-divider">
      <div className="absolute inset-0 bg-[#060608] -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-orange-500/[0.025] rounded-full blur-[160px] pointer-events-none -z-10"></div>

      <div className="max-w-3xl mx-auto px-5">

        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-14 transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="inline-flex items-center gap-2 text-orange-400/80 text-xs font-bold uppercase tracking-[0.2em] mb-5">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-orange-500/40"></span>
            CONTENIDO DEL MASTER
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-orange-500/40"></span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Mapa de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              Contenidos
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-lg mx-auto leading-relaxed">
            13 módulos progresivos. Haz clic en cada fase para explorar las lecciones gratuitas.
          </p>

          {/* Phase tracker */}
          <div className="relative flex items-center justify-between mt-10 max-w-md mx-auto px-2 pb-8">
            {phases.map((p, i) => (
              <React.Fragment key={i}>
                <button
                  onClick={() => setOpenPhase(openPhase === i ? null : i)}
                  className={`relative flex flex-col items-center transition-all duration-300 group/tracker z-10`}
                >
                  <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 overflow-hidden
                    ${openPhase === i
                      ? `${p.bg.replace('/10', '/20')} ${p.border.replace('/35', '/70')} scale-110 shadow-[0_0_15px_rgba(249,115,22,0.25)]`
                      : 'bg-white/[0.04] border-white/[0.12] group-hover/tracker:border-white/30 group-hover/tracker:bg-white/[0.08]'
                    }`}>
                    {/* Perimeter sweep light */}
                    <div
                      className="animate-icon-sweep absolute inset-y-0 w-6 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-20"
                      style={{ animationDelay: `${i * 1}s` }}
                    />
                    {openPhase === i && (
                      <div className={`absolute inset-0 opacity-50 blur-sm ${p.bg} animate-glow-pulse pointer-events-none`} />
                    )}
                    <PhaseIcon id={p.iconId} className={`w-4 h-4 relative z-10 transition-all duration-300 ${
                      openPhase === i
                        ? `${p.numberColor} drop-shadow-[0_0_8px_currentColor]`
                        : 'text-gray-400 group-hover/tracker:text-white'
                    }`} />
                  </div>
                  {/* Absolute label to keep button height exactly 40px for perfect line alignment */}
                  <span className={`absolute top-12 left-1/2 -translate-x-1/2 text-[0.62rem] font-bold uppercase tracking-wider transition-colors duration-300 whitespace-nowrap ${openPhase === i ? p.numberColor : 'text-gray-500 group-hover/tracker:text-white'}`}>
                    {p.label}
                  </span>
                </button>
                
                {/* Connector line between phase squares with a left-to-right loading animation */}
                <div className="relative flex-1 h-[2px] min-w-[20px] mx-1">
                  {/* Background line */}
                  <div className="absolute inset-0 bg-white/[0.08]" />
                  {/* Active line with left-to-right slide transition */}
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 to-indigo-500 shadow-[0_0_8px_rgba(249,115,22,0.4)] transition-all duration-[800ms] ease-in-out"
                    style={{ width: openPhase !== null && openPhase >= i + 1 ? '100%' : '0%' }}
                  />
                </div>
              </React.Fragment>
            ))}

            {/* Connector line leading to Locked Premium Phase */}
            <div className="flex-1 h-[2px] bg-gradient-to-r from-emerald-500/20 to-red-500/20 border-t border-dashed border-red-500/30"></div>

            {/* Locked 4th Phase Button */}
            <button
              onClick={() => {
                const element = document.getElementById('premium-locked');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className="relative flex flex-col items-center transition-all duration-300 group/tracker opacity-85 hover:opacity-100 scale-100 hover:scale-105 z-10"
            >
              <div className="relative w-10 h-10 rounded-xl flex items-center justify-center border border-red-500/50 bg-[#060608] shadow-[0_0_12px_rgba(239,68,68,0.3)] hover:shadow-[0_0_20px_rgba(239,68,68,0.65)] hover:border-red-400 transition-all duration-300 overflow-hidden backdrop-blur-sm">
                {/* Locked SVG Icon */}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 animate-pulse drop-shadow-[0_0_6px_#ef4444]">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <div className="absolute inset-0 bg-red-500/10 pointer-events-none" />
              </div>
              <span className="absolute top-12 left-1/2 -translate-x-1/2 text-[0.62rem] font-bold uppercase tracking-wider text-red-400 drop-shadow-[0_0_5px_rgba(239,68,68,0.4)] whitespace-nowrap">
                Premium
              </span>
            </button>
          </div>
        </div>

        {/* Phase cards */}
        <div className="flex flex-col gap-4 mb-10">
          {phases.map((phase, i) => (
            <PhaseCard
              key={i}
              phase={phase}
              index={i}
              isOpen={openPhase === i}
              onToggle={() => setOpenPhase(openPhase === i ? null : i)}
            />
          ))}
        </div>

        {/* Premium locked section */}
        <div
          ref={lockedRef}
          id="premium-locked"
          className={`relative transition-all duration-700 delay-300 ${lockedInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Ghost cards behind overlay */}
          <div className="absolute inset-0 flex flex-col gap-4 pointer-events-none select-none">
            {lockedPhases.map((lp, i) => (
              <div key={i} className="flex-1 flex items-center gap-4 p-6 bg-white/[0.015] border border-white/[0.04] rounded-2xl opacity-30 blur-[2px] overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
                  <PhaseIcon id={lp.iconId} className="w-7 h-7 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="h-4 w-48 bg-white/10 rounded-full mb-3"></div>
                  <div className="h-3 w-64 bg-white/[0.06] rounded-full mb-2"></div>
                  <div className="h-3 w-40 bg-white/[0.04] rounded-full"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Glass overlay */}
          <div className="relative z-10 rounded-3xl overflow-hidden flex flex-col items-center justify-center text-center px-6 py-10 md:px-8 md:py-12 animate-box-breath"
            style={{
              background: 'linear-gradient(135deg, rgba(10,8,16,0.92) 0%, rgba(15,10,5,0.88) 50%, rgba(10,8,16,0.92) 100%)',
              backdropFilter: 'blur(18px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(18px) saturate(1.4)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {/* Diagonal scan light */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="animate-card-scan absolute -inset-y-10 left-0 w-24 bg-gradient-to-r from-transparent via-orange-300/10 to-transparent blur-md" />
            </div>

            {/* Top ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[80px] bg-orange-500/[0.06] blur-2xl pointer-events-none rounded-full" />

            {/* Lock icon */}
            <div className="relative mb-4 animate-lock-bob">
              <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl scale-150 animate-glow-pulse" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-orange-500/25 via-amber-500/15 to-orange-600/10 flex items-center justify-center rounded-full border border-orange-500/30 shadow-[0_0_30px_rgba(255,153,0,0.25),inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-amber-600/10 flex items-center justify-center rounded-full border border-orange-400/20">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400 drop-shadow-[0_0_8px_rgba(255,153,0,0.6)]">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
              </div>
            </div>

            <h4 className="text-lg font-bold text-white mb-1 tracking-tight">Contenido Premium</h4>
            <p className="text-gray-500 text-xs mb-5 max-w-xs leading-relaxed">
              +12 capítulos avanzados · 120 páginas · actualizaciones gratis de por vida
            </p>

            {/* Module pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-5 max-w-sm">
              {[
                { icon: 'gem',        color: 'text-amber-400/70',   label: 'Cazar Gemas x10' },
                { icon: 'psychology', color: 'text-purple-400/70',  label: 'Psicología Avanzada' },
                { icon: 'strategy',   color: 'text-blue-400/70',    label: 'Estrategia de Trading' },
                { icon: 'exit',       color: 'text-rose-400/70',    label: 'Ganancias Pasivas' },
              ].map((p) => (
                <span key={p.icon} className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.07] text-gray-400">
                  <PhaseIcon id={p.icon} className={`w-3 h-3 ${p.color}`} />
                  {p.label}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-2.5">
              <a
                href="https://buy.stripe.com/aFa6oH99G8KObKRcNLaZi01"
                target="_blank" rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 text-white font-bold text-sm py-3 px-7 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] shadow-[0_4px_20px_rgba(249,115,22,0.35)]"
                style={{ background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite]" />
                <span className="relative z-10">Descargar Master — 79€</span>
                <svg className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </a>
              <div className="flex items-center gap-3 text-[0.65rem] text-gray-600 font-medium">
                <span className="flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><polyline points="20 6 9 17 4 12"/></svg>
                  Pago seguro
                </span>
                <span className="w-px h-2.5 bg-white/10" />
                <span className="flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><polyline points="20 6 9 17 4 12"/></svg>
                  Garantía 7 días
                </span>
                <span className="w-px h-2.5 bg-white/10" />
                <span className="flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><polyline points="20 6 9 17 4 12"/></svg>
                  Actualizaciones gratis
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ChapterMap;
