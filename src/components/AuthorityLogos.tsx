import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const institutions = [
  "National Association of Realtors",
  "MIT",
  "Harvard University",
  "Oxford University",
  "PRC Philippines",
  "Filipino Homes",
  "Leuterio Realty",
];

export default function AuthorityLogos() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    // Duplicate the content for seamless loop
    const content = el.innerHTML;
    el.innerHTML = content + content;

    const totalWidth = el.scrollWidth / 2;

    gsap.to(el, {
      x: -totalWidth,
      duration: 40,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <section className="py-12 bg-black border-y border-white/5 overflow-hidden">
      <div className="flex w-max items-center whitespace-nowrap" ref={marqueeRef}>
        {institutions.map((name, i) => (
          <div key={i} className="flex items-center gap-12 px-12">
            <span className="font-heading text-xs md:text-sm tracking-[0.4em] uppercase font-bold text-neutral-600 hover:text-accent transition-colors duration-500 cursor-default">
              {name}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-accent/20" />
          </div>
        ))}
      </div>
    </section>
  );
}
