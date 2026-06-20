import React, { useState, useEffect } from 'react';

const generateNext7Days = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 1; i <= 7; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    dates.push(nextDate);
  }
  return dates;
};

const formatDayName = (date) => {
  return date.toLocaleDateString('es-ES', { weekday: 'short' }).toUpperCase();
};

const formatDayNumber = (date) => {
  return date.getDate();
};

const formatMonth = (date) => {
  return date.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase();
};

const ConsultingSection = () => {
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = ["10:00", "12:00", "16:00", "18:00", "20:00"];

  useEffect(() => {
    const dates = generateNext7Days();
    setAvailableDates(dates);
    setSelectedDate(dates[0]);
  }, []);

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) return;
    const dateStr = selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
    const subject = `Reserva Asesoría 1 a 1 - ${dateStr} a las ${selectedTime}`;
    const body = `Hola AdelinBTC,%0A%0AQuiero reservar una asesoría 1 a 1 para el próximo ${dateStr} a las ${selectedTime}.%0A%0APor favor indícame los pasos para realizar el pago y confirmar la plaza.%0A%0AUn saludo.`;
    const mailtoUrl = `mailto:adelinbtc@proton.me?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section className="py-20 md:py-28 relative z-10 section-divider">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060608] via-[#0a0a0f] to-[#060608] -z-10"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/[0.04] rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Marketing Copy */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 bg-orange-500/8 text-orange-400 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider border border-orange-500/20 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-glow-pulse"></span>
              NIVEL EXPERTO
            </span>
            
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight leading-[1.1]">
              ¿Necesitas <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 animate-gradient">Asesoría 1 a 1?</span>
            </h2>
            
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
              Sal de dudas al instante. Analizaremos tu portfolio de inversión, resolveremos bloqueos y trazaremos un plan de acción en una llamada privada de 1 hora. 
            </p>
            
            <ul className="text-left space-y-3 mb-10 text-gray-300 max-w-md mx-auto lg:mx-0">
              {[
                'Auditoría completa de tu cartera actual y gestión de riesgo.',
                'Resolución de dudas técnicas y configuración de wallets.',
                'Plan de acción personalizado para maximizar el Bull Run.'
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-white/[0.02] p-4 rounded-xl border border-white/[0.05] transition-all duration-300 hover:border-orange-500/15 hover:bg-white/[0.04] group">
                  <span className="w-6 h-6 bg-emerald-500/15 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20 text-emerald-400 text-xs group-hover:shadow-[0_0_10px_rgba(16,185,129,0.15)] transition-all duration-300">✓</span>
                  <span className="text-[0.95rem] leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
            
            {/* Pricing */}
            <div className="flex items-center justify-center lg:justify-start gap-5">
               <div className="flex items-baseline gap-4">
                 <span className="text-gray-600 line-through font-bold text-2xl">250€</span>
                 <span className="text-white text-5xl font-extrabold tracking-tight">
                   149<span className="text-orange-400">€</span>
                   <span className="text-lg text-gray-500 font-medium ml-1">/hora</span>
                 </span>
               </div>
            </div>
          </div>
          
          {/* Right Column: Calendar Widget */}
          <div className="flex-1 w-full max-w-[480px]">
             <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-7 shadow-[0_24px_64px_rgba(0,0,0,0.4)] backdrop-blur-xl relative overflow-hidden">
                {/* Subtle top accent line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"></div>
                
                <div className="mb-6 border-b border-white/[0.05] pb-5">
                   <h3 className="text-lg font-bold text-white mb-1.5 tracking-tight">Reserva tu sesión</h3>
                   <p className="text-sm text-gray-500 leading-relaxed">Las plazas son limitadas. Selecciona un día dentro de la próxima semana vista.</p>
                </div>
                
                {/* Date Selector */}
                <div className="flex gap-2.5 overflow-x-auto pb-4 mb-3 snap-x scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
                  {availableDates.map((date, idx) => {
                    const isSelected = selectedDate?.toDateString() === date.toDateString();
                    return (
                      <button 
                        key={idx}
                        onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                        className={`snap-center shrink-0 w-[68px] flex flex-col items-center justify-center py-3 rounded-xl border transition-all duration-300 
                          ${isSelected 
                            ? 'bg-orange-500/15 border-orange-500/40 text-white shadow-[0_0_20px_rgba(255,153,0,0.12)]' 
                            : 'bg-white/[0.02] border-white/[0.05] text-gray-500 hover:bg-white/[0.05] hover:border-white/[0.1] hover:text-gray-300'
                          }`}
                      >
                        <span className={`text-[0.65rem] font-medium mb-1 ${isSelected ? 'text-orange-400/80' : ''}`}>{formatMonth(date)}</span>
                        <span className={`text-xl font-bold mb-0.5 ${isSelected ? 'text-white' : ''}`}>{formatDayNumber(date)}</span>
                        <span className={`text-[0.65rem] uppercase font-medium ${isSelected ? 'text-orange-400/60' : ''}`}>{formatDayName(date)}</span>
                      </button>
                    );
                  })}
                </div>
                
                {/* Time Slots */}
                {selectedDate && (
                  <div className="animate-fade-in">
                    <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">Horas disponibles:</p>
                    <div className="grid grid-cols-3 gap-2.5 mb-7">
                      {timeSlots.map((time, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 rounded-xl text-sm font-bold border transition-all duration-300 
                            ${selectedTime === time 
                              ? 'bg-orange-500 border-orange-500 text-white shadow-[0_4px_16px_rgba(255,153,0,0.3)]' 
                              : 'bg-white/[0.02] border-white/[0.05] text-gray-400 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white'
                            }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* CTA */}
                <button 
                  onClick={handleBooking}
                  disabled={!selectedTime}
                  className={`group w-full py-4 rounded-xl font-bold text-base transition-all duration-300 flex justify-center items-center gap-2.5 relative overflow-hidden
                    ${selectedTime 
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_8px_24px_rgba(255,153,0,0.25)] hover:shadow-[0_12px_32px_rgba(255,153,0,0.4)] hover:-translate-y-0.5' 
                      : 'bg-white/[0.03] text-gray-600 cursor-not-allowed border border-white/[0.05]'
                    }`}
                >
                  <span className="relative z-10">Continuar por Correo</span>
                  <svg className="relative z-10" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  {selectedTime && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                  )}
                </button>
                <p className="text-center text-[0.7rem] text-gray-600 mt-4 leading-relaxed">No se realizarán cobros en este paso. Se abrirá tu aplicación de correo para confirmar los detalles.</p>
             </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ConsultingSection;
