import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    year: "2008",
    title: "Founding Leuterio Realty",
    desc: "Starting with a vision to professionalize the real estate brokerage landscape in Cebu."
  },
  {
    year: "2013",
    title: "Launching Filipino Homes",
    desc: "Scaling the network to become the largest real estate portal in the Philippines."
  },
  {
    year: "2020",
    title: "PropTech Revolution",
    desc: "Leading the industry's 100% digital pivot during the global pandemic with Rent.ph."
  },
  {
    year: "2024",
    title: "International Realtor of the Year",
    desc: "Highest global honor awarded by the National Association of Realtors (US)."
  }
];

export default function LegacyTimeline() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the vertical line drawing
      gsap.to(lineRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "bottom 50%",
          scrub: 1,
        },
        scaleY: 1,
        transformOrigin: "top center",
        ease: "none"
      });

      // Animate each timeline item
      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          },
          x: item.classList.contains('left') ? -100 : 100,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out"
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-64 px-6 bg-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-32">
        <span className="text-accent text-[10px] tracking-[0.6em] uppercase font-bold mb-6 block">The Journey</span>
        <h2 className="font-heading text-6xl md:text-9xl font-bold tracking-tighter">THE <span className="text-neutral-500 italic font-accent font-normal text-7xl md:text-[120px]">LEGACY</span></h2>
      </div>

      <div className="max-w-5xl mx-auto relative pb-32">
        {/* Central Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] h-full bg-white/10" />
        <div ref={lineRef} className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] h-full bg-accent scale-y-0 z-10" />

        <div className="space-y-48 relative">
          {timeline.map((item, i) => (
            <div key={i} className={`timeline-item flex items-center justify-between w-full ${i % 2 === 0 ? 'flex-row-reverse left' : 'right'}`}>
              <div className="w-[45%]">
                <div className={`p-8 border border-white/5 bg-neutral-900/30 backdrop-blur-sm relative group hover:border-accent/30 transition-colors duration-500 ${i % 2 === 0 ? 'text-left' : 'text-right'}`}>
                  <span className="font-heading text-4xl md:text-6xl font-bold text-accent mb-4 block">{item.year}</span>
                  <h3 className="font-heading text-xl md:text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
                  
                  {/* Indicator Dot */}
                  <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black border-2 border-accent z-20 ${i % 2 === 0 ? '-left-[42px]' : '-right-[42px]'}`} />
                </div>
              </div>
              <div className="w-[45%]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
