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

// ─────────────────────────────────────────────────────────────
//  CONFIG
const INSTAGRAM_URL = 'https://www.instagram.com/adelinbtc';

// ─────────────────────────────────────────────────────────────
//  RESEÑAS REALES — añade aquí las que te lleguen por Instagram.
//  Mientras esté vacío, se muestra el estado "aún no hay reseñas".
//  Plantilla de cada reseña:
//  {
//    name: 'Nombre A.',
//    avatar: 'N',                       // inicial
//    avatarColor: 'from-blue-500 to-indigo-600',
//    rating: 5,                          // 1 a 5
//    text: 'Texto literal de la reseña...',
//    tag: 'Etiqueta opcional',          // ej. 'Principiante' (o null)
//  }
const testimonials = [];

const Stars = ({ rating = 5 }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < rating ? '#f97316' : 'none'} stroke={i < rating ? 'none' : 'rgba(255,255,255,0.15)'} strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const TestimonialCard = ({ t, delay }) => {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`flex flex-col bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-orange-500/15 hover:bg-white/[0.03] transition-all duration-500 group ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, border-color 0.3s, background 0.3s` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white font-black text-sm shadow-lg shrink-0`}>
            {t.avatar}
          </div>
          <div>
            <div className="text-white font-bold text-sm">{t.name}</div>
            <div className="inline-flex items-center gap-1 text-[0.65rem] font-bold text-pink-400 uppercase tracking-wide">
              <InstagramIcon size={11} />
              Reseña por Instagram
            </div>
          </div>
        </div>
        <Stars rating={t.rating} />
      </div>

      {/* Text */}
      <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-4">
        "{t.text}"
      </p>

      {/* Footer */}
      {t.tag && (
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
          <span className="text-xs font-bold text-gray-600 bg-white/[0.03] px-2.5 py-1 rounded-full border border-white/[0.04]">
            {t.tag}
          </span>
        </div>
      )}
    </div>
  );
};

const InstagramCTA = ({ compact = false }) => (
  <a
    href={INSTAGRAM_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`group btn-instagram btn-special-glow inline-flex items-center justify-center gap-2.5 text-white font-bold rounded-full transition-all duration-300 active:scale-[0.97] relative overflow-hidden ${compact ? 'text-sm px-6 py-3' : 'text-base px-8 py-4'}`}
  >
    <InstagramIcon size={compact ? 16 : 20} className="relative z-10" />
    <span className="relative z-10">Deja tu reseña por Instagram</span>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite]"></div>
  </a>
);

const TestimonialsSection = () => {
  const [headerRef, headerInView] = useInView();
  const hasReviews = testimonials.length > 0;

  return (
    <section className="py-20 md:py-28 relative overflow-hidden section-divider">
      <div className="absolute inset-0 bg-[#060608] -z-10"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/[0.03] rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-14 transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="inline-flex items-center gap-2 text-orange-400/80 text-xs font-bold uppercase tracking-[0.2em] mb-5">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-orange-500/40"></span>
            RESEÑAS
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-orange-500/40"></span>
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Lo que dicen{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              los alumnos
            </span>
          </h2>

          <p className="text-gray-500 text-lg max-w-lg mx-auto leading-relaxed">
            {hasReviews
              ? 'Reseñas reales de alumnos que ya tienen el Master, enviadas directamente por Instagram.'
              : 'Opiniones 100% reales de alumnos verificados. Si ya tienes el Master, comparte la tuya.'}
          </p>
        </div>

        {hasReviews ? (
          <>
            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <TestimonialCard key={i} t={t} delay={i * 80} />
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 text-center">
              <p className="text-gray-500 text-sm mb-4">¿Ya tienes el Master? Tu opinión ayuda a otros traders.</p>
              <InstagramCTA compact />
            </div>
          </>
        ) : (
          /* Empty state — honest, no fake reviews */
          <div className="max-w-2xl mx-auto">
            <div
              className="relative rounded-3xl overflow-hidden p-10 md:p-14 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(15,12,8,0.6) 0%, rgba(10,8,12,0.6) 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.4)',
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />

              {/* Icon */}
              <div className="relative inline-flex mb-6">
                <div className="absolute inset-0 rounded-full bg-pink-500/20 blur-xl scale-150 animate-glow-pulse" />
                <div className="relative w-16 h-16 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.2)]">
                  <InstagramIcon size={28} />
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 tracking-tight">
                Sé de los primeros en opinar
              </h3>
              <p className="text-gray-400 text-base max-w-md mx-auto leading-relaxed mb-8">
                El Master es reciente y estamos recogiendo las primeras reseñas. Cuando termines el tuyo, mándame tu opinión por Instagram y la publicaremos aquí — <strong className="text-white">solo reseñas reales de alumnos verificados</strong>.
              </p>

              <InstagramCTA />

              <p className="text-gray-600 text-xs mt-5">
                Respuesta directa de AdelinBTC · Sin bots
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
