import React, { useState } from 'react';
import Navbar from '../components/Navbar';

// --- MOCK DATA ---
const categories = ["Todas", "Análisis de Mercado", "Guías PDF", "Tutoriales", "Noticias"];

const mockEntries = [];

const ActualidadCripto = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todas");

  // Lógica de filtrado
  const filteredEntries = mockEntries.filter(entry => {
    // 1. Filtrar por categoría
    const matchesCategory = activeCategory === "Todas" || entry.category === activeCategory;
    // 2. Filtrar SOLO por título
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#060608] text-gray-200 relative flex flex-col">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/[0.04] rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-600/[0.03] rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      {/* Navbar */}
      <div className="border-b border-white/[0.06] sticky top-0 bg-[#060608]/80 backdrop-blur-md z-50">
        <Navbar />
      </div>

      {/* Page Header */}
      <div className="max-w-6xl mx-auto px-5 pt-16 pb-10 text-center w-full">
        <span className="inline-flex items-center gap-2 text-orange-400/80 text-xs font-bold uppercase tracking-[0.2em] mb-4">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-orange-500/40"></span>
          VLOG EDUCATIVO
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-orange-500/40"></span>
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5">
          Actualidad <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 animate-gradient">Cripto</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
          Explora nuestros últimos vídeos, análisis de mercado y guías en PDF. Contenido de alto valor actualizado constantemente.
        </p>
      </div>

      {/* Filters & Search Section */}
      <div className="max-w-6xl mx-auto px-5 pb-12 w-full">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white/[0.02] border border-white/[0.05] p-2 md:p-3 rounded-2xl md:rounded-full backdrop-blur-sm">
          
          {/* Categories Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-hide px-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_4px_15px_rgba(255,153,0,0.3)]' 
                    : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-[350px] shrink-0">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar por título..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 text-white text-sm rounded-full pl-11 pr-5 py-3 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all placeholder:text-gray-600"
            />
          </div>

        </div>
      </div>

      {/* Content Grid (Vlog Entries) */}
      <div className="max-w-6xl mx-auto px-5 pb-24 w-full flex-1">
        {filteredEntries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEntries.map(entry => (
              <div key={entry.id} className="group bg-white/[0.02] border border-white/[0.05] rounded-3xl overflow-hidden hover:border-orange-500/30 hover:bg-white/[0.03] transition-all duration-500 flex flex-col">
                {/* Thumbnail */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={entry.thumbnail} alt={entry.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
                    <span className="text-[0.65rem] font-bold tracking-widest uppercase text-white">{entry.type}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">{entry.category}</span>
                    <span className="text-gray-500 text-xs font-medium">{entry.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white leading-snug mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                    {entry.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {entry.description}
                  </p>
                  
                  <div className="mt-auto">
                    <button className="flex items-center gap-2 text-sm font-bold text-white hover:text-orange-400 transition-colors">
                      {entry.type === 'PDF' ? 'Descargar Guía' : 'Ver Contenido'}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State / No Results */
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/[0.08] rounded-3xl bg-white/[0.01]">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No se encontraron resultados</h3>
            <p className="text-gray-500 text-center max-w-md leading-relaxed">
              No hay entradas que coincidan con tu búsqueda en esta categoría. Intenta con otros términos u otra categoría.
            </p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveCategory("Todas"); }}
              className="mt-6 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="py-12 md:py-16 border-t border-white/[0.04] text-center bg-[#060608] relative mt-auto">
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
    </div>
  );
};

export default ActualidadCripto;
