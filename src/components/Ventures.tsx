import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ventures = [
  {
    id: "01",
    title: "Filipino Homes",
    category: "Real Estate Network",
    description: "The largest comprehensive real estate portal and network in the Philippines, empowering over 14,000 licensed professionals.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Rent.ph",
    category: "PropTech Innovation",
    description: "A specialized platform revolutionizing rental property management through digital 'Rent Manager' systems.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "FIRE Institute",
    category: "Education",
    description: "Filipino Homes Institute of Real Estate. Training the next generation of ethical, high-performing real estate leaders.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function Ventures() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".venture-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power4.out"
      });
    }, containerRef);

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={containerRef} id="ventures" className="py-48 px-6 bg-black text-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-32">
          <span className="text-accent text-[10px] tracking-[0.5em] uppercase font-bold block mb-6">
            Ecosystem
          </span>
          <h2 className="font-heading text-6xl md:text-8xl font-bold tracking-tighter">
            Strategic <br/> <span className="text-neutral-500">Ventures</span>
          </h2>
        </div>

        <div className="flex flex-col border-t border-white/10">
          {ventures.map((venture) => (
            <div 
              key={venture.id}
              className="venture-item group relative py-12 md:py-20 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between cursor-pointer transition-colors hover:bg-white/5 px-4"
              onMouseEnter={() => setActiveImage(venture.image)}
              onMouseLeave={() => setActiveImage(null)}
            >
              <div className="flex items-center gap-8 md:gap-16 z-10">
                <span className="font-mono text-sm text-neutral-600 group-hover:text-accent transition-colors">
                  {venture.id}
                </span>
                <h3 className="font-heading text-4xl md:text-7xl font-bold tracking-tighter group-hover:translate-x-4 transition-transform duration-500">
                  {venture.title}
                </h3>
              </div>
              
              <div className="flex flex-col md:items-end mt-6 md:mt-0 z-10">
                <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-accent mb-4">
                  {venture.category}
                </span>
                <p className="text-neutral-500 max-w-xs text-sm md:text-right leading-relaxed group-hover:text-neutral-300 transition-colors">
                  {venture.description}
                </p>
              </div>

              <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-500 hidden md:block">
                <ArrowUpRight size={48} strokeWidth={1} className="text-accent" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Image Preview */}
      {activeImage && (
        <div 
          className="fixed pointer-events-none z-20 w-[400px] h-[500px] overflow-hidden rounded-sm transition-transform duration-200 ease-out"
          style={{ 
            left: cursorPos.x + 20, 
            top: cursorPos.y - 250,
            transform: 'scale(1)',
          }}
        >
          <img 
            src={activeImage} 
            alt="Venture Preview" 
            className="w-full h-full object-cover animate-in fade-in zoom-in duration-500 grayscale group-hover:grayscale-0" 
          />
          <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
        </div>
      )}
    </section>
  );
}
