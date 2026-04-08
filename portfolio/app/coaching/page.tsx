'use client';

import { Check, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';

const coachingPlans = [
  {
    name: "Core Coaching",
    frequency: "Bi-Weekly Sessions",
    price: "₱15,000 / month",
    benefits: [
      "Mastering the 8 Core Success Pillars",
      "Lead Generation Fundamentals",
      "Sales Script Mastery",
      "Access to standard digital tools"
    ]
  },
  {
    name: "Elite Coaching",
    frequency: "Weekly Deep Dives",
    price: "₱45,000 / month",
    benefits: [
      "Advanced Team Building Systems",
      "PropTech Integration Strategies",
      "High-Ticket Closing Techniques",
      "Direct Strategy Review with Anthony"
    ],
    featured: true
  },
  {
    name: "Team Leader Coaching",
    frequency: "Custom Schedule",
    price: "Request Quote",
    benefits: [
      "Scaling Sales Organizations",
      "Leadership Architecture",
      "Recruitment & Retention Systems",
      "Brand Positioning for Teams"
    ]
  },
  {
    name: "Legacy Team Coaching",
    frequency: "Executive Program",
    price: "Request Quote",
    benefits: [
      "Institutional Expansion Support",
      "International Market Penetration",
      "Strategic Partnership Alignment",
      "Wealth & Asset Management Foundations"
    ]
  }
];

export default function CoachingPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navigation />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-accent text-xs font-black tracking-[0.5em] uppercase block mb-4">The Next Level</span>
          <h1 className="font-heading text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-8">
            Coaching <br/><span className="text-accent italic font-accent lowercase font-normal">Solutions</span>
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Professional mentorship designed to transform your real estate career into a high-performing legacy business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coachingPlans.map((plan, i) => (
            <div 
              key={i} 
              className={`p-8 rounded-[2rem] border transition-all duration-500 hover:-translate-y-2 flex flex-col h-full ${plan.featured ? 'bg-white/5 border-accent shadow-2xl shadow-accent/10' : 'bg-black border-white/10 hover:border-white/30'}`}
            >
              <div className="mb-8">
                <h3 className="text-xl font-black uppercase tracking-widest text-neutral-400 mb-2">{plan.name}</h3>
                <div className="text-xs font-bold text-accent uppercase tracking-widest mb-4">{plan.frequency}</div>
                <div className="text-3xl font-black text-white">{plan.price}</div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.benefits.map((benefit, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className="mt-1 w-4 h-4 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20 shrink-0">
                      <Check size={10} className="text-accent" strokeWidth={3} />
                    </div>
                    <span className="text-sm font-bold text-neutral-300">{benefit}</span>
                  </li>
                ))}
              </ul>

              <a 
                href="/#consultation"
                className={`w-full py-4 rounded-full font-black uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 transition-all duration-300 ${plan.featured ? 'bg-accent text-white hover:bg-orange-600' : 'bg-white text-black hover:bg-accent hover:text-white'}`}
              >
                Choose Plan <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </main>

      <Contact />
    </div>
  );
}
