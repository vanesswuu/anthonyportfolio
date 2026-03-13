import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Accolade() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal text
      gsap.from(".accolade-text", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out"
      });
      
      // Image reveal (mask effect)
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
      });

      // Parallax image
      gsap.to(".inner-image", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: -50,
        scale: 1.1,
        ease: "none"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-48 px-6 bg-neutral-900 text-white overflow-hidden relative border-y border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        
        <div className="space-y-12">
          <div className="accolade-text inline-block">
            <span className="text-accent text-[10px] tracking-[0.4em] uppercase font-bold py-2 border-b border-accent/30">
              The Achievement
            </span>
          </div>
          
          <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter accolade-text">
            International <br/> 
            <span className="text-neutral-500 italic font-accent font-normal">Realtor</span> <br/>
            of the Year
          </h2>
          
          <p className="font-body text-neutral-400 text-lg md:text-xl leading-relaxed max-w-lg accolade-text font-light">
            Awarded by the National Association of Realtors (NAR) in the US, Anthony Leuterio stands as a beacon of excellence, being the first Filipino to ever receive this global recognition.
          </p>
          
          <div className="pt-8 accolade-text">
             <div className="flex gap-16">
                <div>
                   <span className="block text-white text-4xl font-heading font-bold mb-2">2024</span>
                   <span className="text-[10px] text-neutral-500 uppercase tracking-widest">Global Honor</span>
                </div>
                <div>
                   <span className="block text-white text-4xl font-heading font-bold mb-2">NAR</span>
                   <span className="text-[10px] text-neutral-500 uppercase tracking-widest">Accreditation</span>
                </div>
             </div>
          </div>
        </div>

        {/* Parallax Image Holder */}
        <div ref={imageRef} className="relative w-full aspect-[4/5] bg-neutral-800 overflow-hidden group">
           <div className="inner-image absolute inset-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-1000 opacity-60 group-hover:opacity-100" />
           <div className="absolute inset-0 transition-all duration-1000 opacity-60" style={{ background: 'var(--overlay-gradient)' }} />
           
           <div className="absolute bottom-12 left-12 right-12 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
              <span className="text-[10px] text-accent uppercase tracking-[0.4em] font-bold block mb-2">Visual Insight</span>
              <p className="text-white font-accent italic text-2xl">Visionary leadership in global property markets.</p>
           </div>
        </div>
      </div>
      
      {/* Background large text */}
      <div className="absolute -bottom-24 -left-24 font-heading text-[20vw] font-black text-white/5 pointer-events-none select-none">
        GLOBAL
      </div>
    </section>
  );
}
