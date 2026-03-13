import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const news = [
  {
    source: "Philippine Inquirer",
    title: "Filipino Homes’ Leuterio is 2024 International Realtor of the Year",
    date: "Nov 2024",
    link: "https://cebudailynews.inquirer.net/607441/filipino-homes-leuterio-is-2024-international-realtor-of-the-year"
  },
  {
    source: "Manila Bulletin",
    title: "Filipino Homes expands to Dubai, unlocking new opportunities",
    date: "June 2025",
    link: "https://mb.com.ph/2025/6/6/filipino-homes-expands-to-dubai-unlocking-new-opportunities-for-investors-brokers"
  },
  {
    source: "SunStar Cebu",
    title: "Mismatched inventory 'drives' oversupply, not few buyers",
    date: "Jan 2025",
    link: "https://www.sunstar.com.ph/cebu/mismatched-inventory-drives-oversupply-not-few-buyers"
  },
  {
    source: "Manila Bulletin",
    title: "Filipino Homes founder earns UAE license",
    date: "May 2025",
    link: "https://mb.com.ph/2025/5/30/filipino-homes-founder-earns-uae-license"
  }
];

export default function GlobalPress() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".press-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="press" className="py-48 px-6 bg-black text-white relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
           <div>
             <span className="text-accent text-[10px] tracking-[0.5em] uppercase font-bold block mb-6">Media Presence</span>
             <h2 className="font-heading text-6xl md:text-8xl font-bold tracking-tighter">Global <span className="text-neutral-500">Press</span></h2>
           </div>
           <p className="text-neutral-500 max-w-xs mt-8 md:mt-0 md:text-right font-light italic font-accent text-xl">
             "A voice shaping the global real estate narrative."
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {news.map((item, i) => (
            <a 
              key={i} 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="press-item group bg-black p-12 hover:bg-neutral-900 transition-all duration-500 relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-12">
                <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-accent">
                  {item.source}
                </span>
                <span className="text-[10px] tracking-widest text-neutral-600 font-mono">
                  {item.date}
                </span>
              </div>
              
              <h3 
                className="font-heading text-2xl md:text-3xl font-bold leading-tight transition-colors duration-500"
                style={{ color: 'inherit' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--press-hover-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
              >
                {item.title}
              </h3>

              <div className="mt-12 flex items-center gap-2 text-neutral-600 group-hover:text-accent transition-colors text-[10px] tracking-widest uppercase font-bold">
                Read Article <ExternalLink size={12} />
              </div>
              
              {/* Subtle hover reveal line */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
