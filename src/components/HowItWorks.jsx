import React, { useRef, useState, useEffect } from 'react';

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) { setInView(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0, rootMargin: '0px 0px -10% 0px', ...options }
    );
    observer.observe(ref.current);
    // Safety fallback: never leave content permanently hidden
    const fallback = setTimeout(() => setInView(true), 1500);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, []);
  return [ref, inView];
}

const steps = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
    title: "1. Pago Seguro",
    description: "Realiza tu compra a través de nuestra pasarela cifrada de forma rápida y 100% segura.",
    hasDiscordButton: false
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
    title: "2. Acceso a Discord",
    description: "Recibirás instantáneamente un enlace para unirte a nuestra comunidad privada. ¿No tienes Discord aún?",
    hasDiscordButton: true
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="12" y1="18" x2="12" y2="12"></line>
        <line x1="9" y1="15" x2="15" y2="15"></line>
      </svg>
    ),
    title: "3. Descarga y Actualizaciones",
    description: "Descarga la guía en la sección VIP y recibe todas las actualizaciones futuras gratis de por vida.",
    hasDiscordButton: false
  }
];

const HowItWorks = () => {
  const [gridRef, gridInView] = useInView();

  const handleDiscordDownload = (e) => {
    e.preventDefault();
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // Check if iOS
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.open("https://apps.apple.com/app/discord/id985746746", "_blank");
      return;
    }
    // Check if Android
    if (/android/i.test(userAgent)) {
      window.open("https://play.google.com/store/apps/details?id=com.discord", "_blank");
      return;
    }
    // Fallback Desktop
    window.open("https://discord.com/download", "_blank");
  };

  return (
    <section className="py-16 md:py-24 bg-[#060608] relative border-b border-white/[0.04] overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[200px] bg-indigo-500/[0.02] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-3">
            ¿Cómo accedo al <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Contenido?</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto">
            El proceso es inmediato. Una vez realizado el pago, pasarás a formar parte de nuestra comunidad privada.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0"></div>

          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`relative z-10 flex flex-col items-center text-center p-6 bg-white/[0.02] border border-white/[0.05] rounded-3xl backdrop-blur-sm hover:border-white/10 hover:-translate-y-1 transition-all duration-500 h-full ${gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-[#0a0a0f] border border-white/[0.08] flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(0,0,0,0.5)] shrink-0">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed flex-1">{step.description}</p>
              
              {/* Dynamic Discord App Download Button */}
              {step.hasDiscordButton && (
                <button 
                  onClick={handleDiscordDownload}
                  className="mt-4 flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold px-4 py-2.5 rounded-full transition-colors shadow-[0_4px_15px_rgba(88,101,242,0.3)]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                  </svg>
                  Descargar Discord Gratis
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
