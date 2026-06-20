import React, { useState, useEffect } from 'react';

const VideoSection = () => {
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Tu Channel ID real encontrado
  const CHANNEL_ID = 'UCdaEzt5YZUfBcOedOonfniw';

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        const rssUrl = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`);
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
        
        if (!response.ok) {
          throw new Error('Error de red al conectar con YouTube.');
        }

        const data = await response.json();
        
        if (data.status !== 'ok') {
          throw new Error('No se pudo leer el feed del canal.');
        }

        const longVideo = data.items.find(item => item.link.includes('/watch?v='));

        if (longVideo) {
          const id = longVideo.guid.replace('yt:video:', '');
          setVideoId(id);
        } else {
          const fallbackId = data.items[0].guid.replace('yt:video:', '');
          setVideoId(fallbackId);
        }
      } catch (err) {
        console.error("Error fetching YouTube data:", err);
        setError('Error al cargar el video dinámicamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestVideo();
  }, []);

  return (
    <section className="py-20 md:py-28 relative z-10 section-divider">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060608] via-[#08080c] to-[#060608] -z-10"></div>
      
      <div className="max-w-4xl mx-auto px-5 text-center">
        {/* Section header */}
        <span className="inline-flex items-center gap-2 text-red-400/80 text-xs font-bold uppercase tracking-[0.2em] mb-4">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-red-500/40"></span>
          YOUTUBE
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-red-500/40"></span>
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          Mi Último <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Contenido</span>
        </h2>
        <p className="text-gray-500 text-lg mb-12 max-w-lg mx-auto leading-relaxed">Echa un vistazo a mi último análisis en YouTube antes de adquirir AdelinBTC: Master Cripto Definitivo.</p>
        
        {/* Video Container */}
        <div className="relative w-full pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/[0.06] mb-10 bg-[#0c0c0c]">
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
               <div className="w-10 h-10 border-[3px] border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
               <span className="text-gray-600 text-sm font-medium">Buscando el último video...</span>
            </div>
          ) : error ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-gray-400">
               <span className="text-3xl mb-3">⚠️</span>
               <p className="mb-1 font-bold text-white text-sm">No se pudo cargar el video.</p>
               <p className="text-xs opacity-60">{error}</p>
            </div>
          ) : !isPlaying ? (
            <div 
              className="absolute inset-0 cursor-pointer group"
              onClick={() => setIsPlaying(true)}
            >
              <img 
                src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`} 
                alt="Miniatura del Video"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03] group-hover:brightness-75"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
                }}
              />
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-black/60 backdrop-blur-sm group-hover:bg-[#ff0000] rounded-2xl flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:scale-110">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-1">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <iframe 
              className="absolute top-0 left-0 w-full h-full animate-fade-in"
              src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`} 
              title="Último video de YouTube" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          )}
        </div>
        
        {/* YouTube CTA */}
        <a 
          href="https://www.youtube.com/@AdelinBTC?sub_confirmation=1"
          target="_blank" 
          rel="noopener noreferrer"
          className={`group inline-flex items-center gap-3 bg-[#ff0000] hover:bg-[#cc0000] text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,0,0,0.3)] active:scale-[0.97]`}
        >
          <span>Ir a YouTube</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white transition-transform duration-300 group-hover:scale-110">
            <path d="M21.582 6.186a2.684 2.684 0 0 0-1.884-1.895C17.985 3.843 12 3.843 12 3.843s-5.985 0-7.698.448A2.684 2.684 0 0 0 2.418 6.186C2 7.904 2 12 2 12s0 4.096.418 5.814a2.684 2.684 0 0 0 1.884 1.895c1.713.448 7.698.448 7.698.448s5.985 0 7.698-.448a2.684 2.684 0 0 0 1.884-1.895C22 16.096 22 12 22 12s0-4.096-.418-5.814zM9.912 15.352V8.648L15.688 12l-5.776 3.352z"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default VideoSection;
