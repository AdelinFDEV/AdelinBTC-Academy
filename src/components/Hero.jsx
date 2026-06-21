import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

function useCountdown() {
  const DEADLINE_KEY = 'adelinbtc_deadline';
  const getDeadline = () => {
    const stored = localStorage.getItem(DEADLINE_KEY);
    if (stored) {
      const d = new Date(parseInt(stored));
      if (d > Date.now()) return d;
    }
    const d = new Date(Date.now() + 72 * 60 * 60 * 1000);
    localStorage.setItem(DEADLINE_KEY, d.getTime().toString());
    return d;
  };
  const [deadline, setDeadline] = useState(getDeadline);
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const update = () => {
      const diff = deadline - Date.now();
      if (diff <= 0) {
        const nd = new Date(Date.now() + 72 * 60 * 60 * 1000);
        localStorage.setItem(DEADLINE_KEY, nd.getTime().toString());
        setDeadline(nd);
        return;
      }
      setTimeLeft({
        h: Math.floor(diff / (1000 * 60 * 60)),
        m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [deadline]);
  return timeLeft;
}


const benefits = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
    color: 'text-fuchsia-400',
    bg: 'bg-fuchsia-500/10 border-fuchsia-500/20',
    title: 'Master Definitivo en PDF',
    desc: 'El manual de referencia que evoluciona junto al mercado cripto real. Acceso ilimitado y actualizaciones de por vida para que nunca te quedes desactualizado.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    title: 'Sistema Probado',
    desc: 'Metodología institucional con reglas precisas de entrada y salida. Diseñada para operar con total certeza matemática eliminando el azar.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
    title: 'Caza de Gemas x100',
    desc: 'Filtros avanzados y checklist de análisis técnico/fundamental en Altcoins para detectar proyectos de alta capitalización explosiva antes que el público general.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
    title: 'Diario del Francotirador',
    desc: 'Bitácora y plantillas avanzadas de gestión de riesgo. Ejecución impecable sin emociones para blindar tu cartera en cada operación.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
      </svg>
    ),
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
    title: '+100 Páginas de Contenido',
    desc: (
      <span>
        Guía ilustrada con más de 15 capítulos prácticos, gráficos dinámicos y psicología de trading. <strong className="text-cyan-400 font-extrabold">¡Con actualizaciones gratuitas para siempre!</strong>
      </span>
    ),
  },
];

const trustBadges = [
  {
    text: 'Pago seguro',
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  },
  {
    text: 'Descarga inmediata',
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
  {
    text: 'Garantía 7 días',
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  },
];

const Hero = () => {
  const timeLeft = useCountdown();
  const pad = (n) => String(n).padStart(2, '0');
  const totalHours = timeLeft.h;
  const plazasLeft = Math.max(2, 2 + Math.floor(totalHours / 24));

  return (
    <header className="relative border-b border-white/[0.06] isolate overflow-hidden min-h-[92vh] flex flex-col">

      {/* ── Background layers ── */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center animate-ken-burns scale-110"
          style={{ backgroundImage: 'url("/cinematic_bg.png")' }}
        />
      </div>
      {/* Lighter overlay so the bg breathes */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060608]/80 via-[#060608]/85 to-[#060608] -z-10" />
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 right-[10%] w-[450px] h-[450px] bg-orange-500/[0.07] rounded-full blur-[140px] -z-10 animate-float" />
      <div className="absolute bottom-0 left-[5%] w-[300px] h-[300px] bg-amber-600/[0.05] rounded-full blur-[120px] -z-10 animate-float" style={{ animationDelay: '3s' }} />

      {/* ── Content ── */}
      <div className="flex-1 max-w-6xl mx-auto px-4 pt-10 pb-14 lg:pt-14 lg:pb-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-20 relative z-10 w-full">

        {/* ══ LEFT COLUMN ══ */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-[580px]">

          {/* Live status pill */}
          <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.1] backdrop-blur-md px-3 sm:px-4 py-2 rounded-full mb-5 sm:mb-7">
            <span className="flex items-center gap-1.5 text-[0.65rem] sm:text-[0.7rem] font-black text-red-400 uppercase tracking-widest whitespace-nowrap">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              LANZAMIENTO
            </span>
            <span className="w-px h-3 bg-white/15" />
            <span className="text-[0.65rem] sm:text-[0.7rem] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap"><span className="text-white font-black">{plazasLeft} plazas</span> a <span className="text-orange-400 font-black">79€</span></span>
          </div>

          {/* Pain hook */}
          <p className="text-orange-400 text-xs sm:text-sm font-bold tracking-wide mb-3 drop-shadow-[0_0_10px_rgba(251,146,60,0.55)]">
            Para traders cansados de perder dinero sin saber por qué →
          </p>

          {/* H1 */}
          <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.2rem] font-black leading-[1.08] tracking-tight mb-4">
            Deja de operar a ciegas.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 animate-gradient">
              Opera con un sistema real.
            </span>
          </h1>

          {/* Social proof bar */}
          <div className="flex items-center gap-3 mb-5 justify-center lg:justify-start flex-wrap">
            {/* Avatar stack */}
            <div className="flex -space-x-2.5">
              {['C','L','D','M','S'].map((l, i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-[#060608] flex items-center justify-center text-white text-[0.6rem] font-black bg-gradient-to-br ${
                  ['from-blue-500 to-indigo-600','from-pink-500 to-rose-600','from-emerald-500 to-teal-600','from-orange-500 to-amber-600','from-purple-500 to-violet-600'][i]
                }`}>{l}</div>
              ))}
            </div>
            <div className="flex flex-col items-start gap-0.5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_,i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#f97316" stroke="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
                <span className="text-white font-bold text-xs ml-1">4.9</span>
              </div>
              <span className="text-gray-500 text-[0.7rem] font-medium">+17.000 personas siguen este sistema</span>
            </div>
          </div>

          {/* Benefits — compact 2×2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full mb-6">
            {benefits.map((b, i) => (
              <div key={i} className={`group/benefit flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.07] backdrop-blur-md border border-white/10 hover:bg-white/[0.12] hover:border-white/20 hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 text-left ${i === 4 ? 'sm:col-span-2' : ''}`}>
                <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border ${b.bg} ${b.color} transition-all duration-300 group-hover/benefit:scale-110 group-hover/benefit:drop-shadow-[0_0_8px_currentColor]`}>
                  {b.icon}
                </div>
                <div>
                  <div className="text-white font-bold text-[0.82rem] leading-tight mb-0.5">{b.title}</div>
                  <div className="text-zinc-300 text-[0.72rem] leading-snug">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Conversion block ── */}
          <div className="w-full bg-gradient-to-br from-orange-500/[0.15] via-white/[0.06] to-transparent backdrop-blur-lg border border-orange-500/35 rounded-2xl p-5 mb-5 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

            {/* Price row */}
            <div className="flex items-center justify-between mb-3 gap-3">
              <div className="flex items-baseline gap-2">
                <span className="text-gray-600 text-base sm:text-xl line-through font-bold">149€</span>
                <span className="text-white text-4xl sm:text-5xl font-black tracking-tight">79<span className="text-orange-400 text-2xl sm:text-3xl">€</span></span>
                <span className="bg-red-500/15 border border-red-500/25 text-red-400 text-[0.6rem] font-black uppercase tracking-widest px-2 py-1 rounded-full">
                  −47%
                </span>
              </div>
              {/* Countdown */}
              <div className="flex items-center gap-1">
                {[
                  { val: pad(timeLeft.h), label: 'h' },
                  { val: pad(timeLeft.m), label: 'm' },
                  { val: pad(timeLeft.s), label: 's' },
                ].map((u, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <span className="text-orange-500/60 font-black text-xs">:</span>}
                    <div className="flex flex-col items-center">
                      <span className="bg-black/40 border border-white/[0.08] rounded-md px-1.5 py-1 text-white font-black text-xs sm:text-sm tabular-nums min-w-[1.8rem] sm:min-w-[2.2rem] text-center">
                        {u.val}
                      </span>
                      <span className="text-[0.45rem] text-gray-600 font-bold uppercase mt-0.5">{u.label}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href="#buy"
              className="btn-main-cta group w-full flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 text-white font-black text-base sm:text-xl py-4 sm:py-5 px-6 sm:px-10 rounded-xl transition-all duration-300 active:scale-[0.98] relative overflow-hidden mt-4 mb-3 tracking-wide sm:tracking-wider"
            >
              <svg className="relative z-10 animate-bounce" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4L12 20M12 20L18 14M12 20L6 14"/>
              </svg>
              <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">DESCARGAR AHORA</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            </a>

            {/* Trust micro-badges */}
            <div className="flex items-center justify-center gap-5 flex-wrap">
              {trustBadges.map((b, i) => (
                <span key={i} className="flex items-center gap-1.5 text-gray-500 text-[0.7rem] font-medium">
                  <span className="text-orange-400/70">{b.icon}</span>{b.text}
                </span>
              ))}
            </div>
          </div>

          {/* Secondary action */}
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <span className="text-gray-600 text-xs">¿Tienes dudas?</span>
            <a
              href="https://www.instagram.com/adelinbtc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 hover:text-pink-300 transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              Escríbeme por Instagram →
            </a>
          </div>

        </div>

        {/* ══ RIGHT COLUMN ══ */}
        <div className="flex-1 relative flex items-center justify-center w-full max-w-[300px] sm:max-w-[360px] lg:max-w-none pb-16 lg:pb-0">

          {/* Outer glow ring */}
          <div className="absolute inset-0 bg-orange-500/[0.08] rounded-full blur-[100px] pointer-events-none" />

          {/* Book cover */}
          <div
            className="relative w-full animate-float"
            style={{ transform: 'perspective(1200px) rotateY(-8deg) rotateX(3deg)', animationDuration: '7s' }}
          >
            <div className="absolute -inset-6 bg-gradient-to-br from-orange-500/20 to-amber-600/8 rounded-[3rem] blur-2xl -z-10" />
            <img
              src="/Book.png"
              alt="AdelinBTC: Master Cripto Definitivo"
              className="w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.75)] rounded-2xl relative z-10"
            />

            {/* Lifetime updates — hero card */}
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-[380px]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/30 via-orange-500/20 to-amber-500/30 blur-xl -z-10 animate-glow-pulse" />
              <div className="relative flex items-center gap-3 bg-gradient-to-r from-[#1a1000] via-[#140d00] to-[#1a1000] border border-amber-500/40 rounded-2xl px-4 py-3.5 shadow-[0_0_40px_rgba(245,158,11,0.2),inset_0_1px_0_rgba(255,255,255,0.06)]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent rounded-full" />
                <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/25 to-orange-600/15 border border-amber-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)] animate-spin-slow" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M4.06189 13C4.55399 16.9463 7.92038 20 12 20C15.3574 20 18.2317 17.9318 19.4185 15M19.4185 15H15"/>
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 font-black text-[0.8rem] uppercase tracking-wide leading-tight">
                    Actualizaciones Gratuitas de Por Vida
                  </span>
                  <span className="text-amber-700 text-[0.65rem] font-medium leading-tight">
                    El mercado cambia. Tu Master también. Sin coste adicional.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
