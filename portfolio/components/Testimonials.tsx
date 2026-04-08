'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "Anthony's coaching didn't just increase my sales; it completely restructured how I view the real estate business. We went from local agents to a regional powerhouse in under 12 months.",
    author: "Maria Santos",
    role: "Top Producer, Cebu Elite Realty",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop"
  },
  {
    text: "Being the International Realtor of the Year is no small feat. Learning the '8 Pillars' directly from Anthony gave our team the global perspective we were missing.",
    author: "James Wilson",
    role: "CEO, Global Prime Properties",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop"
  },
  {
    text: "Scaling excellence is a mindset. Anthony instills that from day one. His systems are the gold standard for anyone serious about real estate legacy.",
    author: "Elena Rodriguez",
    role: "Founder, Visionary Estates",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop"
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        x: -50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="testimonials" className="py-32 px-6 bg-black text-white border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <span className="text-accent text-xs font-black tracking-[0.5em] uppercase block mb-4">Social Proof</span>
            <h2 className="font-heading text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none text-white">Impact <br/><span className="text-accent italic font-accent lowercase font-normal">Stories</span></h2>
          </div>
          <p className="text-neutral-400 font-body text-xl max-w-sm leading-relaxed md:text-right">
            Hear from the professionals who have transformed their careers through Anthony's mentorship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card group p-10 bg-white/5 rounded-[2.5rem] border border-white/10 hover:border-accent transition-all duration-500 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-8 group-hover:bg-accent transition-colors">
                  <Quote size={20} className="text-accent group-hover:text-white transition-colors" fill="currentColor" />
                </div>
                <p className="text-xl font-accent italic text-neutral-200 leading-relaxed mb-12">
                  "{t.text}"
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/10">
                  <img src={t.image} alt={t.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-black uppercase tracking-widest text-xs text-white">{t.author}</h4>
                  <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
