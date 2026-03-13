import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero reveal timeline
      const tl = gsap.timeline();
      
      tl.from(".hero-line", {
        y: 120,
        opacity: 0,
        duration: 2,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2
      })
      .from(".hero-sub", {
        opacity: 0,
        y: 30,
        duration: 1.5,
        ease: "power3.out"
      }, "-=1.2")
      .from(".scroll-indicator", {
        opacity: 0,
        duration: 1
      }, "-=0.5");

      // Parallax effect on background
      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: 100,
        scale: 1.1,
        ease: "none"
      });

      // Subtle mouse follow for headline
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;

        gsap.to(headlineRef.current, {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: "power2.out"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="vision" className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden bg-black text-white">
      {/* Dynamic Background */}
      <div ref={bgRef} className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 z-10 hero-overlay transition-colors duration-700" />
        
        {/* Anthony Leuterio Portrait Layer */}
        <div className="absolute inset-0 w-full h-full">
           <img 
             src="https://scontent.fceb6-1.fna.fbcdn.net/v/t39.30808-6/441209467_985564119828185_6818980372920800446_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=PKPI2du-xTUQ7kNvwFfhu48&_nc_oc=AdkqQxh7XmYPGNhNgutHRMCxVQ9phE1Vp_Q0uCRnhd50NyLyf0A_NiS_WNgGgh6_Ei8&_nc_zt=23&_nc_ht=scontent.fceb6-1.fna&_nc_gid=JFIYgupNgsVpFcJdlI1AGA&_nc_ss=8&oh=00_AfymGznTMpuiPF4JxZDCe91FJWxe6T2aqu1K_Arf_goBRQ&oe=69B8B65C" 
             alt="Anthony Leuterio"
             className="w-full h-full object-cover object-[center_20%] grayscale transition-all duration-1000"
             style={{ opacity: 'var(--hero-img-opacity)' }}
           />
        </div>

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neutral-500/5 blur-[120px] animate-pulse-slow delay-1000" />
      </div>

      <div className="z-20 text-center flex flex-col gap-8 max-w-[90vw]">
        <h1 ref={headlineRef} className="font-heading text-[12vw] md:text-[8vw] lg:text-[10vw] font-bold tracking-tighter leading-[0.85] mix-blend-difference select-none">
          <span className="block hero-line overflow-hidden">ANTONY</span>
          <span className="block hero-line overflow-hidden text-neutral-500">LEUTERIO</span>
        </h1>
        
        <div className="hero-sub flex flex-col items-center gap-6">
          <p className="font-body text-xs md:text-sm text-neutral-500 tracking-[0.4em] uppercase font-bold">
            2024 International Realtor of the Year
          </p>
          <div className="h-[1px] w-24 bg-accent/30" />
          <p className="text-neutral-400 font-accent italic text-xl md:text-2xl max-w-xl text-center font-normal">
            Redefining the architecture of real estate globally.
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 scroll-indicator">
        <div className="flex flex-col items-center gap-4 group cursor-pointer">
          <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent origin-top transform group-hover:scale-y-150 transition-transform duration-500" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 group-hover:text-accent transition-colors">Scroll</span>
        </div>
      </div>
    </section>
  );
}
