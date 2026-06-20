import React, { useState, useRef, useEffect } from 'react';

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

const faqs = [
  {
    q: '¿Necesito experiencia previa en criptomonedas?',
    a: 'No. El Master está diseñado para que cualquier persona, sin importar su nivel de partida, pueda seguirlo desde cero. Empezamos desde los conceptos más básicos y avanzamos progresivamente hasta estrategias institucionales. Si ya tienes experiencia, simplemente saltarás las partes que ya dominas.',
  },
  {
    q: '¿Cómo recibo el PDF después de comprarlo?',
    a: 'Inmediatamente después de completar el pago recibirás un enlace de descarga directa en tu correo. El PDF es tuyo para siempre — descárgalo en todos los dispositivos que necesites.',
  },
  {
    q: '¿En qué formato está el Master? ¿Funciona en móvil?',
    a: 'El Master está en formato PDF optimizado para lectura tanto en ordenador como en móvil o tablet. No necesitas ningún software especial — cualquier lector de PDF gratuito (Adobe, navegador, etc.) funciona perfectamente.',
  },
  {
    q: '¿Las actualizaciones son realmente gratuitas de por vida?',
    a: 'Sí, absolutamente. El mercado cripto evoluciona constantemente y el Master también. Cada vez que se publique una nueva versión con estrategias actualizadas, recibirás acceso gratuito sin pagar nada adicional. Una compra, actualizaciones infinitas.',
  },
  {
    q: '¿Cuánto tiempo necesito para completar el Master?',
    a: 'Depende de tu ritmo. El contenido está estructurado en 3 fases principales. Puedes consumirlo intensamente en una semana, o ir poco a poco aplicando cada sección. No hay fechas límite ni acceso que caduque.',
  },
  {
    q: '¿Qué pasa si el Master no cumple mis expectativas?',
    a: 'Tienes una garantía de devolución de 7 días sin preguntas. Si por cualquier razón consideras que el Master no vale lo que pagaste, contacta con nosotros y te devolvemos el dinero íntegramente. El riesgo es cero de tu parte.',
  },
  {
    q: '¿Este Master me enseña a hacer trading o a invertir a largo plazo?',
    a: 'Ambas cosas. El Master cubre desde estrategias de inversión a largo plazo (cómo identificar ciclos, cuándo comprar y cuándo vender) hasta técnicas de trading activo con gestión de riesgo institucional. Tú eliges qué parte aplicar según tu perfil.',
  },
  {
    q: '¿Puedo contactar con AdelinBTC si tengo dudas después de comprarlo?',
    a: 'Sí. Puedes escribirme directamente por WhatsApp y respondo personalmente a los alumnos con dudas sobre el contenido del Master.',
  },
];

const FAQItem = ({ q, a, isOpen, onToggle, delay }) => {
  const contentRef = useRef(null);
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`border rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer ${
        isOpen
          ? 'border-orange-500/25 bg-gradient-to-br from-orange-500/[0.05] to-transparent'
          : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]'
      } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, border-color 0.3s, background 0.3s` }}
      onClick={onToggle}
    >
      {isOpen && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"></div>
      )}

      <div className="flex items-center gap-4 p-5 md:p-6 relative">
        <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 ${
          isOpen
            ? 'bg-orange-500/15 border-orange-500/30 text-orange-400'
            : 'bg-white/[0.04] border-white/[0.08] text-gray-500'
        }`}>
          <svg
            width="14" height="14" viewBox="0 0 16 16" fill="none"
            className={`transition-transform duration-400 ${isOpen ? 'rotate-180' : ''}`}
          >
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className={`font-bold text-[0.95rem] md:text-base leading-snug flex-1 transition-colors duration-300 ${
          isOpen ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-200' : 'text-white'
        }`}>
          {q}
        </h3>
      </div>

      <div
        ref={contentRef}
        style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
        className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0 ml-12 text-gray-400 text-sm md:text-[0.95rem] leading-relaxed">
          {a}
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [headerRef, headerInView] = useInView();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden section-divider">
      <div className="absolute inset-0 bg-[#060608] -z-10"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/[0.03] rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-3xl mx-auto px-5">
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="inline-flex items-center gap-2 text-orange-400/80 text-xs font-bold uppercase tracking-[0.2em] mb-5">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-orange-500/40"></span>
            PREGUNTAS FRECUENTES
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-orange-500/40"></span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Resolvemos tus{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              dudas
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-lg mx-auto leading-relaxed">
            Si tienes alguna pregunta que no esté aquí, escríbeme directamente por Instagram.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              delay={i * 50}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center p-8 bg-white/[0.02] border border-white/[0.06] rounded-3xl">
          <p className="text-gray-400 text-sm mb-4">¿Tienes alguna pregunta que no está aquí?</p>
          <a
            href="https://www.instagram.com/adelinbtc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-bold text-sm px-6 py-3 rounded-full hover:shadow-[0_10px_30px_rgba(214,36,159,0.4)] transition-all duration-300 hover:scale-[1.03]"
            style={{ background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
          >
            Pregúntame por Instagram
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
