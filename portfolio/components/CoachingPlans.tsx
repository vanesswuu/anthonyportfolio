'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Standard",
    price: "₱15,000",
    period: "/ month",
    description: "Foundational training for emerging real estate professionals.",
    features: [
      "Access to 8 Core Success Pillars",
      "Monthly Group Coaching Session",
      "Digital Marketing Basics",
      "Private Community Access",
      "Sales Script Library"
    ],
    cta: "Start Scaling",
    featured: false
  },
  {
    name: "Elite",
    price: "₱45,000",
    period: "/ month",
    description: "Advanced systems for top-tier agents and team leaders.",
    features: [
      "All Standard Features",
      "Bi-Weekly Strategy Calls",
      "Team Building Mastery",
      "High-Ticket Closing Techniques",
      "PropTech Implementation Guide",
      "Direct Email Support"
    ],
    cta: "Join the Elite",
    featured: true
  },
  {
    name: "Visionary",
    price: "Custom",
    period: "",
    description: "Exclusive 1-on-1 mentorship for industry titans.",
    features: [
      "Personalized Business Blueprint",
      "Weekly 1-on-1 Deep Dives",
      "Global Network Integration",
      "Executive Brand Positioning",
      "Off-Market Deal Access",
      "24/7 VIP Priority Access"
    ],
    cta: "Apply for VIP",
    featured: false
  }
];

export default function CoachingPlans() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".plan-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="plans" className="py-32 px-6 bg-black text-white border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-accent text-xs font-black tracking-[0.5em] uppercase block mb-4">Investment</span>
          <h2 className="font-heading text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none text-white">Coaching <br/><span className="text-accent italic font-accent lowercase font-normal">Plans</span></h2>
          <p className="text-neutral-500 mt-8 max-w-xl mx-auto font-body text-lg leading-relaxed">
            Choose the level of commitment that matches your ambition. All plans are designed to deliver measurable ROI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`plan-card relative p-10 rounded-[3rem] border-2 transition-all duration-500 hover:-translate-y-4 ${plan.featured ? 'bg-white/5 border-accent shadow-2xl shadow-accent/10' : 'bg-black border-white/10 hover:border-white/30'}`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white text-[9px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full">
                  Highly Recommended
                </div>
              )}
              
              <div className="mb-10">
                <h3 className="text-xl font-black uppercase tracking-widest text-neutral-400 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white">{plan.price}</span>
                  <span className="text-sm font-bold text-neutral-500">{plan.period}</span>
                </div>
                <p className="text-neutral-400 text-sm mt-4 leading-relaxed">{plan.description}</p>
              </div>

              <div className="space-y-5 mb-12">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                      <Check size={12} className="text-accent" strokeWidth={3} />
                    </div>
                    <span className="text-sm font-bold text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full py-6 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all duration-300 ${plan.featured ? 'bg-accent text-white hover:bg-orange-600 shadow-xl shadow-accent/20' : 'bg-white text-black hover:bg-accent hover:text-white'}`}
              >
                {plan.cta} <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
