'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { number: "14,000+", label: "Licensed Professionals", sub: "The largest network in the Philippines" },
  { number: "100+", label: "Regional Offices", sub: "Strategic locations across the islands" },
  { number: "20+", label: "Years of Leadership", sub: "Shaping the industry with vision" },
  { number: "1", label: "Global Honor", sub: "2024 International Realtor of the Year" },
];

export default function Milestones() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current!.offsetWidth;
      const amountToScroll = scrollWidth - window.innerWidth;

      gsap.to(scrollRef.current, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${amountToScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="milestones" className="h-screen bg-black overflow-hidden flex items-center border-y border-white/5">
      <div ref={scrollRef} className="flex gap-32 px-[10vw] whitespace-nowrap items-center">
        
        <div className="flex flex-col gap-4 max-w-lg min-w-[30vw]">
          <span className="text-accent text-[10px] tracking-[0.5em] uppercase font-bold">The Impact</span>
          <h2 className="font-heading text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-tight">
            SCALING <br/> <span className="text-accent italic font-accent font-normal">EXCELLENCE</span>
          </h2>
        </div>

        {milestones.map((item, i) => (
          <div key={i} className="flex flex-col gap-6 min-w-[40vw]">
            <div className="flex items-baseline gap-4">
               <span className="font-heading text-[12vw] font-bold tracking-tighter leading-none text-white">
                 {item.number}
               </span>
               <div className="h-[2px] w-12 bg-accent/40" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-neutral-300 uppercase tracking-tight">
                {item.label}
              </h3>
              <p className="text-neutral-500 font-accent italic text-xl">
                {item.sub}
              </p>
            </div>
          </div>
        ))}
        
        <div className="min-w-[20vw]" /> {/* Final spacing buffer */}
      </div>
    </section>
  );
}
