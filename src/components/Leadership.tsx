import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const education = [
  { 
    id: "01",
    school: "MIT", 
    focus: "Real Estate Innovation", 
    location: "Cambridge, Massachusetts",
    details: "Focusing on the intersection of digital technology and urban development to modernize property management systems."
  },
  { 
    id: "02",
    school: "Harvard", 
    focus: "Business Leadership", 
    location: "Boston, Massachusetts",
    details: "Advanced studies in executive leadership, scaling global organizations, and ethical business architecture."
  },
  { 
    id: "03",
    school: "Oxford", 
    focus: "Global Economics", 
    location: "Oxford, United Kingdom",
    details: "Analyzing global market trends and the role of real estate as a primary driver of national economic stability."
  },
];

export default function Leadership() {
  const containerRef = useRef<HTMLElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Philosophy text reveal (word by word)
      const words = philosophyRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.from(words, {
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
          opacity: 0.1,
          stagger: 0.1,
          ease: "none"
        });
      }

      // Academic items reveal
      gsap.from(".edu-card", {
        scrollTrigger: {
          trigger: ".edu-grid",
          start: "top 70%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power4.out"
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="leadership" className="bg-black text-white overflow-hidden">
      
      {/* Philosophy Section - High Impact Interlude */}
      <div className="py-64 px-6 flex flex-col items-center justify-center text-center border-b border-white/5">
        <span className="text-accent text-[10px] tracking-[0.6em] uppercase font-bold mb-16">
          The Philosophy
        </span>
        <div ref={philosophyRef} className="max-w-6xl">
          <h2 className="font-heading text-5xl md:text-7xl lg:text-[100px] leading-[0.9] tracking-tighter font-bold">
            {"Real estate is a multiplier for the economy. Every house sold supports up to 60 families.".split(' ').map((word, i) => (
              <span key={i} className="word inline-block mr-[0.2em] mb-[0.1em]">{word}</span>
            ))}
          </h2>
          <div className="mt-16 flex items-center justify-center gap-4">
             <div className="h-[1px] w-12 bg-accent/50" />
             <cite className="not-italic font-accent italic text-2xl text-neutral-500">— Anthony Leuterio</cite>
          </div>
        </div>
      </div>

      {/* Academic Excellence - Split Layout */}
      <div className="py-48 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          {/* Sticky Left Side */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
            <span className="text-accent text-[10px] tracking-[0.5em] uppercase font-bold block mb-8">
              Academic Foundation
            </span>
            <h2 className="font-heading text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-12">
              GLOBAL <br/> <span className="text-neutral-500 italic font-accent font-normal">ELITE</span> <br/> STUDIES
            </h2>
            <p className="text-neutral-500 font-body text-lg max-w-sm leading-relaxed font-light">
              Bridging the gap between local market expertise and world-class institutional innovation.
            </p>
          </div>

          {/* Scrolling Right Side */}
          <div className="lg:col-span-7 space-y-32 edu-grid">
            {education.map((item) => (
              <div key={item.id} className="edu-card group border-l border-white/10 pl-12 relative">
                <div className="absolute -left-[1px] top-0 w-[1px] h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />
                
                <span className="text-accent font-mono text-sm mb-6 block group-hover:translate-x-2 transition-transform">
                  {item.id} / 03
                </span>
                
                <h3 className="font-heading text-5xl md:text-7xl font-bold tracking-tighter mb-4 group-hover:text-accent transition-colors">
                  {item.school}
                </h3>
                
                <div className="mb-8">
                  <span className="text-xs tracking-[0.3em] uppercase font-bold text-neutral-400 block mb-1">
                    Certification
                  </span>
                  <span className="text-xl font-accent italic text-neutral-200">
                    {item.focus}
                  </span>
                </div>
                
                <p className="text-neutral-500 font-body leading-relaxed max-w-lg group-hover:text-neutral-300 transition-colors">
                  {item.details}
                </p>
                
                <div className="mt-8 text-[10px] tracking-widest uppercase text-neutral-600 font-bold border-t border-white/5 pt-4 inline-block">
                  {item.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background visual element */}
      <div className="h-screen w-full relative flex items-center justify-center opacity-30 pointer-events-none">
         <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
         <div className="absolute font-heading text-[30vw] font-black text-white/5 tracking-tighter leading-none">
            VISION
         </div>
      </div>

    </section>
  );
}
