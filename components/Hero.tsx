'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Star, Users, Trophy, TrendingUp } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(".hero-content", {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out"
      })
      .from(".hero-image-container", {
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: "power2.out"
      }, "-=0.5")
      .from(".floating-card", {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=1");

      // Floating Animation for Cards
      gsap.to(".card-1", { y: -15, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".card-2", { y: 15, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
      gsap.to(".card-3", { y: -10, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
      gsap.to(".card-4", { y: 12, duration: 4.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 });

      // Parallax effect on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5);
        const yPos = (clientY / window.innerHeight - 0.5);

        gsap.to(".hero-image-container", {
          x: xPos * 20,
          y: yPos * 10,
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
    <section ref={containerRef} id="vision" className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 overflow-hidden bg-[var(--bg-color)] text-[var(--text-color)] pt-20 transition-colors duration-1000">
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 blur-[120px] rounded-full" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 w-full max-w-7xl mx-auto">
        
        {/* Left: Text Content */}
        <div className="hero-content space-y-8 text-left order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--hover-bg)] border border-[var(--border-color)] text-accent text-xs font-bold tracking-widest uppercase">
            <Star size={14} fill="currentColor" />
            International Realtor of the Year
          </div>
          
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] text-[var(--text-color)]">
            SCALING <br />
            <span className="text-accent italic">EXCELLENCE.</span>
          </h1>
          
          <p className="font-body text-[var(--n-500)] text-lg md:text-xl max-w-lg leading-relaxed">
            The Philippines' Premier Real Estate Mentor. Redefining property sales through <span className="text-[var(--text-color)] font-bold">master-level coaching</span> and global networking strategies.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-accent text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-orange-600 transition-all duration-300 shadow-xl shadow-accent/20 flex items-center gap-3 group"
            >
              Start Coaching <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border border-[var(--border-color)] text-[var(--text-color)] rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[var(--text-color)] hover:text-[var(--bg-color)] transition-all duration-300"
            >
              Explore Programs
            </button>
          </div>
        </div>

        {/* Right: Video & Floating Cards */}
        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="hero-image-container relative w-full max-w-md lg:max-w-xl aspect-[4/5] rounded-[3rem] overflow-hidden border border-[var(--border-color)] shadow-2xl bg-black">
            <video 
              src="/videos/hero_vid.mp4"
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover transition-opacity duration-1000"
              style={{ opacity: 'var(--hero-img-opacity)' }}
            />
          </div>

          {/* Floating Skill/Stat Cards */}
          <div className="floating-card card-1 absolute -top-4 -right-4 md:right-0 bg-[var(--bg-color)]/80 backdrop-blur-xl p-4 rounded-2xl border border-[var(--border-color)] shadow-2xl z-20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/20 text-accent">
                <Users size={20} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-[var(--n-500)]">Network</div>
                <div className="text-lg font-black text-[var(--text-color)] leading-tight">14K+ PROS</div>
              </div>
            </div>
          </div>

          <div className="floating-card card-2 absolute bottom-20 -left-6 md:-left-12 bg-[var(--bg-color)]/80 backdrop-blur-xl p-4 rounded-2xl border border-[var(--border-color)] shadow-2xl z-20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                <TrendingUp size={20} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-[var(--n-500)]">Impact</div>
                <div className="text-lg font-black text-[var(--text-color)] leading-tight">GLOBAL SCALE</div>
              </div>
            </div>
          </div>

          <div className="floating-card card-3 absolute top-1/2 -right-10 hidden md:block bg-[var(--bg-color)]/80 backdrop-blur-xl p-4 rounded-2xl border border-[var(--border-color)] shadow-2xl z-20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400">
                <Trophy size={20} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-[var(--n-500)]">Authority</div>
                <div className="text-lg font-black text-[var(--text-color)] leading-tight">PREMIER COACH</div>
              </div>
            </div>
          </div>

          <div className="floating-card card-4 absolute -bottom-4 right-1/4 bg-accent p-1 px-4 rounded-full shadow-2xl z-20">
             <span className="text-[10px] font-black uppercase tracking-tighter text-white">#1 Real Estate Mentor</span>
          </div>
        </div>


      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
        <span className="text-[8px] uppercase tracking-[0.4em]">Explore</span>
      </div>
    </section>
  );
}

