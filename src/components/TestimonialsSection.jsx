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
//  CONFIG — cambia esto cuando tengas el número definitivo.
//  Formato internacional SIN '+', sin espacios. Ej. España: 34XXXXXXXXX
const WHATSAPP_NUMBER = '34600000000';
const WHATSAPP_MESSAGE = 'Hola AdelinBTC, acabo de terminar el Master y quiero dejarte mi reseña:';
const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// ─────────────────────────────────────────────────────────────
//  RESEÑAS REALES — añade aquí las que te lleguen por WhatsApp.
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

const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.886 9.885M20.52 3.449C18.24 1.245 15.24.044 12.045.044 5.463.044.104 5.401.101 11.986c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.962 11.962 0 005.715 1.456h.005c6.585 0 11.946-5.357 11.948-11.945a11.9 11.9 0 00-3.503-8.464"/>
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
            <div className="inline-flex items-center gap-1 text-[0.65rem] font-bold text-emerald-500 uppercase tracking-wide">
              <WhatsAppIcon size={11} />
              Reseña por WhatsApp
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

const WhatsAppCTA = ({ compact = false }) => (
  <a
    href={whatsappLink}
    target="_blank"
    rel="noopener noreferrer"
    className={`group inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5a] text-white font-bold rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-[0_8px_24px_rgba(37,211,102,0.3)] ${compact ? 'text-sm px-6 py-3' : 'text-base px-8 py-4'}`}
  >
    <WhatsAppIcon size={compact ? 16 : 20} />
    Deja tu reseña por WhatsApp
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
              ? 'Reseñas reales de alumnos que ya tienen el Master, enviadas directamente por WhatsApp.'
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
              <WhatsAppCTA compact />
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
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-[#25D366]/40 to-transparent" />

              {/* Icon */}
              <div className="relative inline-flex mb-6">
                <div className="absolute inset-0 rounded-full bg-[#25D366]/20 blur-xl scale-150 animate-glow-pulse" />
                <div className="relative w-16 h-16 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] shadow-[0_0_30px_rgba(37,211,102,0.2)]">
                  <WhatsAppIcon size={28} />
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 tracking-tight">
                Sé de los primeros en opinar
              </h3>
              <p className="text-gray-400 text-base max-w-md mx-auto leading-relaxed mb-8">
                El Master es reciente y estamos recogiendo las primeras reseñas. Cuando termines el tuyo, mándame tu opinión por WhatsApp y la publicaremos aquí — <strong className="text-white">solo reseñas reales de alumnos verificados</strong>.
              </p>

              <WhatsAppCTA />

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
