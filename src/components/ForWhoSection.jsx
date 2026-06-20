import React, { useRef, useState, useEffect } from 'react';

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.1, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

const isFor = [
  'Principiantes que quieren empezar con bases sólidas desde el día 1',
  'Traders que llevan tiempo perdiendo dinero sin entender el porqué',
  'Personas con trabajo que quieren invertir de forma inteligente sin vivir pegadas a la pantalla',
  'Inversores a largo plazo que quieren aprender a identificar el momento óptimo de entrada',
  'Cualquiera que quiera un sistema probado en lugar de señales aleatorias de internet',
  'Quienes buscan diversificar su patrimonio con activos digitales con criterio propio',
];

const isNotFor = [
  'Personas que buscan hacerse ricas de la noche a la mañana sin esfuerzo',
  'Quienes no están dispuestos a dedicar tiempo a aprender cómo funciona el mercado',
  'Traders que buscan señales automáticas sin entender la lógica detrás',
  'Personas que no pueden asumir ningún tipo de riesgo en sus inversiones',
];

const ForWhoSection = () => {
  const [ref, inView] = useInView();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden section-divider">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060608] via-[#08080d] to-[#060608] -z-10"></div>

      <div className="max-w-5xl mx-auto px-5">
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="inline-flex items-center gap-2 text-orange-400/80 text-xs font-bold uppercase tracking-[0.2em] mb-5">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-orange-500/40"></span>
            PARA QUIÉN ES
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-orange-500/40"></span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            ¿Este Master es{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              para ti?
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-lg mx-auto leading-relaxed">
            Sé honesto contigo mismo. Este Master está diseñado para un perfil concreto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* IS FOR */}
          <div className="bg-emerald-500/[0.04] border border-emerald-500/15 rounded-3xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="text-lg font-extrabold text-emerald-400 uppercase tracking-wide">SÍ es para ti si...</h3>
            </div>
            <ul className="space-y-3">
              {isFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                  <span className="w-5 h-5 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* IS NOT FOR */}
          <div className="bg-red-500/[0.04] border border-red-500/15 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-red-500/5 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center text-red-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </div>
              <h3 className="text-lg font-extrabold text-red-400 uppercase tracking-wide">NO es para ti si...</h3>
            </div>
            <ul className="space-y-3 mb-8">
              {isNotFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed">
                  <span className="w-5 h-5 rounded-lg bg-red-500/15 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-auto p-4 bg-orange-500/[0.06] border border-orange-500/15 rounded-2xl">
              <p className="text-gray-300 text-sm leading-relaxed">
                <strong className="text-orange-400">Si te identificas con el primer grupo</strong>, este Master tiene todo lo que necesitas para empezar a operar con un sistema real y probado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWhoSection;
