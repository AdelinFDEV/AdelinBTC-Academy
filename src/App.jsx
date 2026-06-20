import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import ConsultingSection from './components/ConsultingSection';
import ChapterMap from './components/ChapterMap';
import VideoSection from './components/VideoSection';
import ContactSection from './components/ContactSection';
import ActualidadCripto from './pages/ActualidadCripto';
import EmpiezaAqui from './pages/EmpiezaAqui';
import ActualidadCTA from './components/ActualidadCTA';
import HowItWorks from './components/HowItWorks';
import Navbar from './components/Navbar';

function HomePage() {
  return (
    <>
      <div className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#060608]/90 backdrop-blur-md transition-all duration-300">
        <Navbar />
      </div>
      
      {/* Content Sections */}
      <Hero />
      <HowItWorks />
      <ActualidadCTA />
      <ConsultingSection />
      <ChapterMap />
      <VideoSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="py-12 md:py-16 border-t border-white/[0.04] text-center bg-[#060608] relative mt-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
        <div className="max-w-5xl mx-auto px-5 flex flex-col items-center">
          
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-white font-bold tracking-tight text-xl">Adelin</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 font-extrabold text-xl">BTC</span>
            <span className="text-gray-600 text-sm font-medium tracking-widest uppercase ml-1">Academy</span>
          </div>

          {/* Professional Disclaimer Box */}
          <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-6 md:p-8 mb-10 text-left md:text-center w-full max-w-4xl backdrop-blur-sm">
            <p className="text-gray-500 text-xs md:text-[0.8rem] leading-relaxed">
              <strong className="text-gray-400">DESCARGO DE RESPONSABILIDAD:</strong> Toda la información, estrategias y materiales proporcionados en este sitio web y en <em className="text-gray-400">AdelinBTC: Master Cripto Definitivo</em> tienen un propósito única y estrictamente <strong className="text-gray-400">educativo e informativo</strong>. Nada del contenido mostrado constituye asesoramiento financiero, legal, fiscal, ni una recomendación para comprar, vender o mantener ningún activo o criptomoneda. El comercio de criptoactivos es altamente volátil, conlleva un riesgo de pérdida total de capital y no es adecuado para todos los inversores. Los resultados o rentabilidades pasadas compartidas no garantizan resultados futuros. Opere siempre bajo su propio criterio, realice su propia investigación (DYOR) y asuma la responsabilidad total de sus decisiones de inversión.
            </p>
          </div>

          {/* Bottom Footer Row */}
          <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-5 pt-6 border-t border-white/[0.04]">
            <p className="text-gray-600 text-xs font-medium">&copy; {new Date().getFullYear()} AdelinBTC Academy. Todos los derechos reservados.</p>
            <div className="flex items-center gap-2 bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20">
              <span className="text-orange-500/80 text-[0.65rem] font-bold uppercase tracking-widest">Política de devolución de 7 días garantizada</span>
            </div>
          </div>
          
        </div>
      </footer>
    </>
  );
}

function App() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-[#060608] text-gray-200">
      <div className="blob-bg"></div>
      <div className="blob-bg blob-2"></div>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/empieza" element={<EmpiezaAqui />} />
        <Route path="/actualidad" element={<ActualidadCripto />} />
      </Routes>
    </div>
  );
}

export default App;
