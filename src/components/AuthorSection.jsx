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

const stats = [
  { value: '+8', label: 'Años de experiencia' },
  { value: '17K+', label: 'Seguidores en redes' },
  { value: '26', label: 'Alumnos reales cualificados' },
  { value: '100%', label: 'De satisfacción' },
];

const AuthorSection = () => {
  const [ref, inView] = useInView();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden section-divider">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060608] via-[#08080d] to-[#060608] -z-10"></div>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/[0.04] rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-5">
        <div
          ref={ref}
          className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Photo */}
          <div className="shrink-0 relative">
            <div className="absolute -inset-3 bg-gradient-to-br from-orange-500/20 to-amber-500/10 rounded-[2rem] blur-xl"></div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2rem] overflow-hidden border border-orange-500/20 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
              <img
                src="/Me.png"
                alt="AdelinBTC"
                className="w-full h-full object-cover object-[center_80%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/60 via-transparent to-transparent"></div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-orange-500 to-amber-500 text-white px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider shadow-[0_8px_24px_rgba(255,153,0,0.4)]">
              AdelinBTC
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 text-orange-400/80 text-xs font-bold uppercase tracking-[0.2em] mb-5">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-orange-500/40"></span>
              QUIÉN SOY
              <span className="w-8 h-px bg-gradient-to-l from-transparent to-orange-500/40"></span>
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Hola, soy <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 animate-gradient">AdelinBTC</span>
            </h2>

            <div className="space-y-4 text-gray-400 text-[1rem] md:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              <p>
                Llevo <strong className="text-white">más de 8 años</strong> operando en el mercado de criptomonedas. He pasado por todo: las euforia del bull run, la sangre del bear market, y los errores que le cuestan dinero real a la gente.
              </p>
              <p>
                Toda esa experiencia —estrategias, sistemas, errores y aciertos— está condensada en <strong className="text-orange-400">AdelinBTC: Master Cripto Definitivo</strong>. No es teoría sacada de internet. Es el manual que yo hubiera querido tener cuando empecé.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-8">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 text-center hover:border-orange-500/20 transition-colors duration-300"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">{s.value}</div>
                  <div className="text-gray-500 text-xs font-medium mt-1 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
              <a
                href="https://www.youtube.com/@AdelinBTC?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-red-600/10 border border-red-500/35 text-red-400 font-bold text-sm px-6 py-3 rounded-full hover:bg-gradient-to-r hover:from-red-600 hover:to-rose-600 hover:border-transparent hover:text-white shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform duration-300">
                  <path d="M21.582 6.186a2.684 2.684 0 0 0-1.884-1.895C17.985 3.843 12 3.843 12 3.843s-5.985 0-7.698.448A2.684 2.684 0 0 0 2.418 6.186C2 7.904 2 12 2 12s0 4.096.418 5.814a2.684 2.684 0 0 0 1.884 1.895c1.713.448 7.698.448 7.698.448s5.985 0 7.698-.448a2.684 2.684 0 0 0 1.884-1.895C22 16.096 22 12 22 12s0-4.096-.418-5.814zM9.912 15.352V8.648L15.688 12l-5.776 3.352z"/>
                </svg>
                Ver canal de YouTube
              </a>
              <a
                href="https://www.instagram.com/adelinbtc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-pink-500/10 border border-pink-500/35 text-pink-400 font-bold text-sm px-6 py-3 rounded-full hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-600 hover:border-transparent hover:text-white shadow-[0_0_15px_rgba(236,72,153,0.1)] hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                Escríbeme por Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorSection;
