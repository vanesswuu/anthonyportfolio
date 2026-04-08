'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Calendar, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  image_url: string;
  published_at: string;
  author: string;
  slug: string;
  category?: string;
}

export default function News({ articles }: { articles: NewsArticle[] }) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!articles || articles.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(".news-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, [articles]);

  if (!articles || articles.length === 0) return null;

  return (
    <section ref={containerRef} id="news" className="py-32 px-6 bg-black text-white overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <span className="text-accent text-xs tracking-[0.5em] uppercase font-black block mb-4">Latest Insights</span>
            <h2 className="font-heading text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">Industry <br/><span className="text-accent italic font-accent lowercase font-normal">News</span></h2>
          </div>
          <p className="text-neutral-400 font-body text-xl max-w-sm leading-relaxed md:text-right">
            Stay updated with the latest trends and reports from the Homes News PH network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <div 
              key={article.id || i} 
              className="news-card group relative bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-accent flex flex-col h-full opacity-100"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={article.image_url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1073&auto=format&fit=crop'} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                {article.category && (
                  <div className="absolute top-6 left-6 px-4 py-2 bg-accent text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    {article.category}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-10 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-neutral-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                  <Calendar size={14} className="text-accent" />
                  {new Date(article.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                
                <h3 className="text-2xl font-heading font-black uppercase tracking-tighter mb-4 text-white line-clamp-2 group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3 mb-8">
                  {article.summary}
                </p>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 italic">By {article.author}</span>
                  <a 
                    href={`https://homesnews.ph/article/${article.slug}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-accent font-black uppercase tracking-widest text-[10px] hover:translate-x-2 transition-transform"
                  >
                    Read More <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
