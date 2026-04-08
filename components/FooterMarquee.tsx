import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FooterMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    // Clone content for infinite loop
    const content = el.innerHTML;
    el.innerHTML = content + content;

    const width = el.scrollWidth / 2;

    gsap.to(el, {
      x: -width,
      duration: 30,
      ease: "none",
      repeat: -1
    });
  }, []);

  return (
    <div className="py-24 bg-black border-t border-white/5 overflow-hidden">
      <div className="flex w-max whitespace-nowrap" ref={marqueeRef}>
        <span className="font-heading text-[10vw] font-bold text-transparent px-8" style={{ WebkitTextStroke: '1px #333' }}>
          FILIPINO HOMES • 
        </span>
        <span className="font-heading text-[10vw] font-bold text-accent px-8">
          INTERNATIONAL REALTOR OF THE YEAR • 
        </span>
        <span className="font-heading text-[10vw] font-bold text-transparent px-8" style={{ WebkitTextStroke: '1px #333' }}>
          GLOBAL VISION • 
        </span>
        <span className="font-heading text-[10vw] font-bold text-white px-8">
          LEGACY • 
        </span>
      </div>
    </div>
  );
}
