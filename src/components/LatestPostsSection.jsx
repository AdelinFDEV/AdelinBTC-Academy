import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

export { posts } from '../data/posts';
import { posts } from '../data/posts';

const colorMap = {
  orange:  { border: 'border-orange-500/20', bg: 'bg-orange-500/8',  text: 'text-orange-400',  dot: 'bg-orange-500' },
  blue:    { border: 'border-blue-500/20',   bg: 'bg-blue-500/8',    text: 'text-blue-400',    dot: 'bg-blue-500'   },
  emerald: { border: 'border-emerald-500/20',bg: 'bg-emerald-500/8', text: 'text-emerald-400', dot: 'bg-emerald-500'},
  violet:  { border: 'border-violet-500/20', bg: 'bg-violet-500/8',  text: 'text-violet-400',  dot: 'bg-violet-500' },
};

const PostCard = ({ post, delay }) => {
  const [ref, inView] = useInView();
  const c = colorMap[post.color] || colorMap.orange;

  return (
    <div
      ref={ref}
      className={`group flex flex-col bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] hover:-translate-y-1 transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Thumbnail / YouTube preview */}
      {post.youtubeId ? (
        <a
          href={`https://www.youtube.com/watch?v=${post.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block aspect-video overflow-hidden bg-black"
        >
          <img
            src={`https://img.youtube.com/vi/${post.youtubeId}/maxresdefault.jpg`}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center shadow-[0_4px_20px_rgba(239,68,68,0.5)] group-hover:scale-110 transition-transform duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </a>
      ) : post.image ? (
        <div className="relative aspect-video overflow-hidden bg-black">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
          />
        </div>
      ) : (
        <div className={`aspect-video relative overflow-hidden border-b border-white/[0.04] flex flex-col items-start justify-end p-5`}
          style={{ background: 'linear-gradient(135deg, #0a0a12 0%, #0d0d1a 60%, #0a0a12 100%)' }}
        >
          <div className={`absolute top-4 right-4 w-14 h-14 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center opacity-60`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={c.text}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <div className={`absolute inset-0 opacity-[0.04]`} style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <span className={`relative z-10 text-[0.6rem] font-black uppercase tracking-[0.2em] ${c.text} ${c.bg} border ${c.border} px-2 py-1 rounded-full mb-2`}>{post.category}</span>
          <p className="relative z-10 text-white font-bold text-sm leading-snug line-clamp-2 max-w-[85%]">{post.title}</p>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[0.65rem] font-black uppercase tracking-widest ${c.text} ${c.bg} border ${c.border} px-2.5 py-1 rounded-full`}>
            {post.category}
          </span>
          <span className="text-gray-700 text-[0.65rem]">·</span>
          <span className="text-gray-600 text-[0.65rem] font-medium">{post.readTime}</span>
        </div>

        <h3 className="text-white font-bold text-base leading-snug mb-2 group-hover:text-orange-100 transition-colors duration-300 flex-1">
          {post.title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
          <span className="text-gray-600 text-xs font-medium">{post.date}</span>
          <Link
            to="/actualidad"
            className={`text-xs font-bold ${c.text} flex items-center gap-1 hover:gap-2 transition-all duration-200`}
          >
            Leer más
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

const LatestPostsSection = () => {
  const [headerRef, headerInView] = useInView();
  const latest = posts.slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="py-20 md:py-28 relative overflow-hidden section-divider">
      <div className="absolute inset-0 bg-[#060608] -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/[0.03] rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <div
          ref={headerRef}
          className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12 transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div>
            <span className="inline-flex items-center gap-2 text-orange-400/80 text-xs font-bold uppercase tracking-[0.2em] mb-3">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-orange-500/40" />
              APRENDE GRATIS
              <span className="w-8 h-px bg-gradient-to-l from-transparent to-orange-500/40" />
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Últimas <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">publicaciones</span>
            </h2>
          </div>
          <Link
            to="/actualidad"
            className="group inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-orange-400 transition-colors duration-300 shrink-0"
          >
            Ver todo el contenido
            <svg className="group-hover:translate-x-1 transition-transform duration-200" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {latest.map((post, i) => (
            <PostCard key={i} post={post} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestPostsSection;
