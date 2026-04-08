'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

gsap.registerPlugin(ScrollTrigger);

export default function CoachingPrograms() {
  const containerRef = useRef<HTMLElement>(null);
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrograms() {
      const { data } = await supabase.from('coaching').select('*').order('created_at', { ascending: true });
      if (data && data.length > 0) {
        setPrograms(data);
      } else {
        // Fallback if no data in DB yet
        setPrograms([
          {
            title: "Fast Start",
            price: "₱15,000",
            description: "Perfect for new agents looking to build a rock-solid foundation.",
            features: ["8 Core Success Pillars", "Lead Generation Basics", "Digital Tools Setup", "Community Access"],
            is_popular: false
          },
          {
            title: "Elite Momentum",
            price: "₱45,000",
            description: "Scale your business to the next level with advanced systems.",
            features: ["High-Ticket Closing", "Team Building Mastery", "PropTech Integration", "Weekly Group Coaching"],
            is_popular: true
          }
        ]);
      }
      setLoading(false);
    }

    fetchPrograms();
  }, []);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.from(".program-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, [loading]);

  return (
    <section ref={containerRef} id="programs" className="py-32 px-6 bg-black text-white overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-accent text-xs tracking-[0.5em] uppercase font-black block mb-4">The Curriculum</span>
          <h2 className="font-heading text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none text-white">Coaching <br/><span className="text-accent italic font-accent lowercase font-normal">Programs</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, i) => (
            <div 
              key={i} 
              className={`program-card group relative p-10 rounded-[3rem] border-2 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl ${program.is_popular ? 'border-accent bg-white/5 shadow-xl' : 'border-white/5 bg-black hover:border-accent'}`}
            >
              {program.is_popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-10">
                <h3 className="text-3xl font-heading font-black uppercase tracking-tighter mb-4 text-white">{program.title}</h3>
                <div className="text-4xl font-black text-accent mb-4">{program.price}</div>
                <p className="text-neutral-400 text-sm leading-relaxed">{program.description}</p>
              </div>

              <div className="space-y-4 mb-12">
                {program.features?.map((feature: string, j: number) => (
                  <div key={j} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-accent" />
                    <span className="text-sm font-bold text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <a 
                  href="#connect"
                  className={`w-full py-5 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all duration-300 ${program.is_popular ? 'bg-accent text-white hover:bg-orange-600 shadow-xl shadow-accent/20' : 'bg-white text-black hover:bg-accent hover:text-white'}`}
                >
                  Inquire Now <ArrowRight size={16} />
                </a>
                <a 
                  href="#connect"
                  className="w-full py-4 rounded-full font-black uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 border border-white/10 hover:border-accent transition-colors text-white"
                >
                  Request Quotation
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

