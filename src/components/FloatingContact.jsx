import React, { useState } from 'react';

// ── Canal de WhatsApp — pon el enlace cuando lo tengas ───────
const WHATSAPP_CHANNEL = 'https://whatsapp.com/channel/XXXXXXXX'; // reemplaza con tu enlace real

const FloatingContact = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-5 z-50 flex flex-col items-end gap-3">

      {/* Options — appear when open */}
      <div className={`flex flex-col items-end gap-2 transition-all duration-300 ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}>

        {/* Instagram — contacto directo */}
        <a
          href="https://www.instagram.com/adelinbtc"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3"
        >
          <span className="bg-[#111] border border-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Instagram
          </span>
          <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(214,36,159,0.45)] hover:scale-110 transition-transform duration-200"
            style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285ae5 90%)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </div>
        </a>

        {/* WhatsApp — canal de la comunidad */}
        <a
          href={WHATSAPP_CHANNEL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3"
        >
          <span className="bg-[#111] border border-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Canal WA
          </span>
          <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:scale-110 transition-transform duration-200">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.886 9.885M20.52 3.449C18.24 1.245 15.24.044 12.045.044 5.463.044.104 5.401.101 11.986c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.962 11.962 0 005.715 1.456h.005c6.585 0 11.946-5.357 11.948-11.945a11.9 11.9 0 00-3.503-8.464"/>
            </svg>
          </div>
        </a>

      </div>

      {/* Main toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(249,115,22,0.5)] transition-all duration-300 hover:scale-110 active:scale-95 ${open ? 'bg-white/10 border border-white/20 rotate-45' : 'bg-gradient-to-br from-orange-500 to-amber-400'}`}
        aria-label="Contacto"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>

    </div>
  );
};

export default FloatingContact;
