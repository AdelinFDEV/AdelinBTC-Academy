import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

/* ── Tiny hook: triggers once when element enters viewport ── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.15, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

/* ─── Step Card ─── */
function StepCard({ step, index }) {
  const [ref, inView] = useInView();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row ${isEven ? '' : 'md:flex-row-reverse'} items-center gap-10 md:gap-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Number + Icon */}
      <div className="shrink-0 flex flex-col items-center gap-4 md:w-[220px]">
        {/* Big glowing number */}
        <div className={`relative flex items-center justify-center w-28 h-28 rounded-3xl border ${step.borderColor} ${step.bgColor} shadow-[0_0_40px_${step.glowColor}] group-hover:scale-105 transition-transform duration-500`}>
          <span className={`text-5xl font-black ${step.textColor} drop-shadow-[0_0_12px_${step.glowColor}]`}>{String(index + 1).padStart(2,'0')}</span>
          <div className={`absolute -top-3 -right-3 w-9 h-9 rounded-xl flex items-center justify-center ${step.iconBg} border ${step.borderColor} shadow-[0_0_15px_${step.glowColor}]`}>
            {step.icon}
          </div>
        </div>
        {/* Label pill */}
        <span className={`text-[0.65rem] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border ${step.borderColor} ${step.bgColor} ${step.textColor}`}>
          {step.label}
        </span>
      </div>

      {/* Content Card */}
      <div className={`flex-1 relative rounded-3xl border ${step.borderColor} bg-white/[0.02] backdrop-blur-sm p-8 md:p-10 overflow-hidden group hover:bg-white/[0.04] transition-colors duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.3)]`}>
        {/* Glow sweep */}
        <div className={`absolute -top-1/2 ${isEven ? '-right-1/4' : '-left-1/4'} w-3/4 h-full rounded-full blur-[80px] opacity-30 ${step.glowBg} pointer-events-none`}></div>

        <h2 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight tracking-tight">{step.title}</h2>
        <p className="text-gray-400 leading-relaxed mb-6 text-[1rem]">{step.description}</p>

        {/* Feature pills */}
        {step.pills && (
          <div className="flex flex-wrap gap-2 mb-7">
            {step.pills.map((pill, i) => (
              <span key={i} className={`text-xs font-bold px-3 py-1.5 rounded-full ${step.bgColor} border ${step.borderColor} ${step.textColor}`}>
                {pill}
              </span>
            ))}
          </div>
        )}

        {/* CTA Button(s) */}
        <div className="flex flex-wrap gap-3">
          {step.ctas.map((cta, i) => (
            cta.external ? (
              <a
                key={i}
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cta.overrideClass || `inline-flex items-center gap-2.5 font-extrabold text-sm px-6 py-3.5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] active:scale-[0.97] ${cta.primary ? `${step.btnBg} text-white shadow-[0_6px_25px_${step.glowColor}] hover:shadow-[0_10px_35px_${step.glowColor}]` : 'bg-white/[0.05] text-white border border-white/10 hover:bg-white/10'}`}
              >
                {cta.icon && !cta.overrideClass && cta.icon}
                {cta.overrideClass ? (
                  <>
                    <span className="relative z-10 text-white drop-shadow-md leading-tight text-center">{cta.text}</span>
                    <svg className="relative z-10 transition-transform duration-300 group-hover:scale-110" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                  </>
                ) : (
                  cta.text
                )}
              </a>
            ) : (
              <Link
                key={i}
                to={cta.href}
                className={`inline-flex items-center gap-2.5 font-extrabold text-sm px-6 py-3.5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] active:scale-[0.97] ${cta.primary ? `${step.btnBg} text-white shadow-[0_6px_25px_${step.glowColor}] hover:shadow-[0_10px_35px_${step.glowColor}]` : 'bg-white/[0.05] text-white border border-white/10 hover:bg-white/10'}`}
              >
                {cta.icon && cta.icon}
                {cta.text}
              </Link>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Steps Data ── */
const YOUTUBE_CHANNEL = 'https://www.youtube.com/@AdelinBTC?sub_confirmation=1';
const WHATSAPP_URL    = 'https://wa.me/34600000000?text=Hola%20AdelinBTC%2C%20tengo%20una%20pregunta%3A';
const MEXC_URL        = 'https://www.mexc.com/es-ES/register?inviteCode=mexc-1xydM';
const TRADINGVIEW_URL = 'https://es.tradingview.com/?aff_id=133080';

const steps = [
  {
    label: 'Comunidad',
    title: 'Sígueme y únete a la comunidad',
    description:
      'No se trata solo de seguirme. Se trata de ser parte activa de una comunidad real donde resolvemos dudas, compartimos análisis en tiempo real y aprendemos juntos. WhatsApp y YouTube son el punto de partida para cualquier trader serio que quiera dar el salto.',
    pills: ['📲 Preguntas respondidas 1 a 1', '📊 Análisis semanales', '🔔 Alertas de mercado', '🤝 Comunidad privada'],
    ctas: [
      {
        text: 'Seguir en YouTube',
        href: YOUTUBE_CHANNEL,
        external: true,
        primary: true,
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.582 6.186a2.684 2.684 0 0 0-1.884-1.895C17.985 3.843 12 3.843 12 3.843s-5.985 0-7.698.448A2.684 2.684 0 0 0 2.418 6.186C2 7.904 2 12 2 12s0 4.096.418 5.814a2.684 2.684 0 0 0 1.884 1.895c1.713.448 7.698.448 7.698.448s5.985 0 7.698-.448a2.684 2.684 0 0 0 1.884-1.895C22 16.096 22 12 22 12s0-4.096-.418-5.814zM9.912 15.352V8.648L15.688 12l-5.776 3.352z"/>
          </svg>
        ),
      },
      {
        text: 'Seguir en Instagram',
        href: 'https://www.instagram.com/adelinbtc',
        external: true,
        primary: false,
        overrideClass: "group inline-flex items-center justify-center gap-2 sm:gap-3 text-white font-bold text-[0.85rem] sm:text-lg px-4 sm:px-10 py-3.5 sm:py-4 rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_40px_rgba(214,36,159,0.5)] active:scale-[0.98] w-full max-w-[320px] relative overflow-hidden"
      },
    ],
    borderColor: 'border-red-500/20',
    bgColor: 'bg-red-500/5',
    glowBg: 'bg-red-500',
    textColor: 'text-red-400',
    glowColor: 'rgba(239,68,68,0.25)',
    btnBg: 'bg-[#ff0000] hover:bg-[#cc0000]',
    iconBg: 'bg-red-500/20',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-red-400">
        <path d="M21.582 6.186a2.684 2.684 0 0 0-1.884-1.895C17.985 3.843 12 3.843 12 3.843s-5.985 0-7.698.448A2.684 2.684 0 0 0 2.418 6.186C2 7.904 2 12 2 12s0 4.096.418 5.814a2.684 2.684 0 0 0 1.884 1.895c1.713.448 7.698.448 7.698.448s5.985 0 7.698-.448a2.684 2.684 0 0 0 1.884-1.895C22 16.096 22 12 22 12s0-4.096-.418-5.814zM9.912 15.352V8.648L15.688 12l-5.776 3.352z"/>
      </svg>
    ),
  },
  {
    label: 'Exchange',
    title: 'Abre tu cuenta en MEXC',
    description:
      'MEXC no es un exchange cualquiera. Es el exchange con la mayor oferta de tokens del mercado, perfecto para descubrir gemas antes que nadie. Lo uso yo personalmente. Pero su ventaja más brutal es que permite operar Futuros y Spot con comisiones 0%, lo que puede ahorrarte literalmente cientos de euros al año frente a otros exchanges. Si te registras desde mi enlace, obtienes además un bono de 10 $ de bienvenida.',
    pills: ['🏆 Mayor catálogo de tokens del mundo', '💸 0% comisiones Spot y Futuros', '💎 Ideal para cazar Altcoins x100', '🎁 +10 $ de bono con mi enlace'],
    ctas: [
      {
        text: 'Registrarme en MEXC (+10 $)',
        href: MEXC_URL,
        external: true,
        primary: true,
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        ),
      },
    ],
    borderColor: 'border-blue-500/20',
    bgColor: 'bg-blue-500/5',
    glowBg: 'bg-blue-500',
    textColor: 'text-blue-400',
    glowColor: 'rgba(59,130,246,0.25)',
    btnBg: 'bg-blue-600 hover:bg-blue-500',
    iconBg: 'bg-blue-500/20',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    label: 'Análisis',
    title: 'Instala TradingView',
    description: (
      <>
        TradingView es la plataforma de análisis técnico más usada del mundo. Es la herramienta de referencia para traders de todos los niveles y donde realizo todo el análisis de mis vídeos. Sin esta herramienta, operas a ciegas.<br/><br/>
        <strong className="text-emerald-400 font-extrabold uppercase tracking-wide text-[0.85rem]">Ventaja Exclusiva:</strong> Registrándote <strong className="text-white">únicamente desde este enlace</strong>, aseguras automáticamente <strong className="text-emerald-400">15$ de descuento (un 50% de ahorro)</strong> en tu cuenta para el momento en el que decidas actualizar a una versión de pago.
      </>
    ),
    pills: ['🌍 Usada por millones de traders', '📉 Análisis técnico de élite', '🔗 Acceso gratuito disponible', '🎁 15$ Dto. (50%) en planes Pro'],
    ctas: [
      {
        text: 'Acceder a TradingView',
        href: TRADINGVIEW_URL,
        external: true,
        primary: true,
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
            <polyline points="16 7 22 7 22 13"></polyline>
          </svg>
        ),
      },
    ],
    borderColor: 'border-emerald-500/20',
    bgColor: 'bg-emerald-500/5',
    glowBg: 'bg-emerald-500',
    textColor: 'text-emerald-400',
    glowColor: 'rgba(16,185,129,0.25)',
    btnBg: 'bg-emerald-600 hover:bg-emerald-500',
    iconBg: 'bg-emerald-500/20',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
        <polyline points="16 7 22 7 22 13"></polyline>
      </svg>
    ),
  },
  {
    label: 'Masterclass',
    title: 'Descarga el PDF y domina el mercado',
    description:
      'Con el exchange listo y TradingView abierto, solo te falta el conocimiento para usarlos correctamente. AdelinBTC: Master Cripto Definitivo te da absolutamente todo: desde cómo leer un gráfico desde cero hasta una estrategia de trading rentable, un diario profesional para controlar tus emociones y actualizaciones de contenido de por vida. Es el último paso para operar con seriedad.',
    pills: ['📚 Guías paso a paso desde cero', '⚡ Estrategia de trading rentable', '🗒️ Diario de trading profesional', '♾️ Actualizaciones de por vida'],
    ctas: [
      {
        text: 'Conseguir el PDF Ahora',
        href: '/',
        external: false,
        primary: true,
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4L12 20M12 20L18 14M12 20L6 14"/>
          </svg>
        ),
      },
    ],
    borderColor: 'border-orange-500/20',
    bgColor: 'bg-orange-500/5',
    glowBg: 'bg-orange-500',
    textColor: 'text-orange-400',
    glowColor: 'rgba(249,115,22,0.3)',
    btnBg: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400',
    iconBg: 'bg-orange-500/20',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
      </svg>
    ),
  },
];

/* ── Page ── */
const EmpiezaAqui = () => {
  const [heroRef, heroInView] = useInView();

  return (
    <div className="min-h-screen bg-[#060608] text-gray-200">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#060608]/90 backdrop-blur-md">
        <Navbar />
      </div>

      {/* Hero Header */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* BG Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-20 right-[5%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div
          ref={heroRef}
          className={`max-w-4xl mx-auto px-5 text-center transition-all duration-700 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-[0_0_20px_rgba(255,153,0,0.15)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
            </span>
            Tu hoja de ruta
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.05]">
            Empieza a invertir en cripto{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
              sin sustos.
            </span>
          </h1>

          <p className="text-gray-400 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto font-light">
            Sigue estos 4 pasos en orden y tendrás todo lo necesario para operar en el mercado con seguridad, estrategia y ventaja real.
          </p>

          {/* Progress Bar decoration */}
          <div className="flex items-center justify-center gap-2 mt-12">
            {steps.map((s, i) => (
              <React.Fragment key={i}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${s.borderColor} ${s.bgColor} text-xs font-black ${s.textColor}`}>
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-8 md:w-16 h-px bg-gradient-to-r from-white/10 to-white/5"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-5xl mx-auto px-5 pb-32 flex flex-col gap-20">
        {/* Vertical line connector */}
        <div className="relative">
          <div className="absolute left-[54px] md:left-[110px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent hidden md:block pointer-events-none"></div>
          <div className="flex flex-col gap-20">
            {steps.map((step, index) => (
              <StepCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="pb-32 px-5 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Action Box */}
          <div className="text-center bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20 rounded-3xl p-8 md:p-10 shadow-[0_0_80px_rgba(255,153,0,0.06)] flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
              ¿Listo para empezar?
            </h2>
            <p className="text-gray-400 mb-8 text-[0.95rem] leading-relaxed">
              Cada paso de esta guía te acerca a operar con criterio propio. Toma acción ahora y evita los errores que arruinan al 90% de los principiantes.
            </p>
            <a
              href={MEXC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-extrabold text-[0.95rem] px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(255,153,0,0.4)] active:scale-[0.98]"
            >
              Crear cuenta en MEXC
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          {/* Contact Box */}
          <div className="text-center bg-white/[0.02] border border-white/[0.08] rounded-3xl p-8 md:p-10 shadow-[0_0_80px_rgba(0,0,0,0.2)] backdrop-blur-md flex flex-col justify-center group hover:border-pink-500/20 transition-colors duration-500">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
              ¿Te quedan dudas?
            </h2>
            <p className="text-gray-400 mb-8 text-[0.95rem] leading-relaxed">
              Escríbeme por mensaje directo. Te responderé personalmente para ayudarte a dar el primer paso.
            </p>
            <div className="flex justify-center">
              <a
                href="https://www.instagram.com/adelinbtc"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 text-white font-bold text-[0.85rem] sm:text-lg px-4 sm:px-10 py-3.5 sm:py-4 rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_40px_rgba(214,36,159,0.5)] active:scale-[0.98] w-full max-w-[320px] relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
              >
                <span className="relative z-10 text-white drop-shadow-md leading-tight text-center">Escríbeme por Instagram</span>
                <svg className="relative z-10 transition-transform duration-300 group-hover:scale-110" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Disclaimer */}
      <footer className="py-10 border-t border-white/[0.04] text-center bg-[#060608]">
        <div className="max-w-4xl mx-auto px-5">
          <p className="text-gray-600 text-xs leading-relaxed">
            <strong className="text-gray-500">DESCARGO DE RESPONSABILIDAD:</strong> Toda la información proporcionada tiene un propósito única y estrictamente <strong className="text-gray-500">educativo e informativo</strong>. Nada del contenido constituye asesoramiento financiero ni una recomendación de inversión. El comercio de criptoactivos conlleva un riesgo de pérdida total de capital. Opere siempre bajo su propio criterio y asuma la responsabilidad total de sus decisiones.
          </p>
          <p className="text-gray-700 text-xs mt-4">© {new Date().getFullYear()} AdelinBTC Academy. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default EmpiezaAqui;
