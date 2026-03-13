import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          onComplete
        });
      }
    });

    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })
    .to(barRef.current, {
      scaleX: 1,
      duration: 2,
      ease: "power1.inOut"
    }, "-=0.5")
    .to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power3.in"
    })
    .to(progressRef.current, {
      opacity: 0,
      duration: 0.3
    }, "-=0.3");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white">
      <div ref={textRef} className="opacity-0 translate-y-4 mb-8 text-center">
        <span className="text-[10px] tracking-[0.6em] uppercase font-bold text-accent block mb-2">Establishing Vision</span>
        <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tighter uppercase">Anthony Leuterio</h2>
      </div>
      
      <div ref={progressRef} className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
        <div ref={barRef} className="absolute inset-0 bg-accent origin-left scale-x-0" />
      </div>
    </div>
  );
}
