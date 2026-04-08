'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle, Calendar, Users } from 'lucide-react';
import { submitInquiry } from '@/app/actions/inquiry';

gsap.registerPlugin(ScrollTrigger);

export default function CoachingConsultation() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      full_name: formData.get('full_name') as string,
      email: formData.get('email') as string,
      program: formData.get('program') as string || 'Consultation Request',
      message: formData.get('message') as string,
    };

    const result = await submitInquiry(data);
    setIsSubmitting(false);
    
    if (result.success) {
      setSubmitted(true);
      if (formRef.current) formRef.current.reset();
    } else {
      alert('Something went wrong. Please try again.');
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".consult-reveal", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="consultation" className="py-32 md:py-48 px-6 bg-black text-white border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        
        <div className="space-y-12">
          <div className="consult-reveal inline-block">
            <span className="text-accent text-xs tracking-[0.5em] uppercase font-black py-2 border-b border-accent/30">
              Limited Availability
            </span>
          </div>
          
          <h2 className="font-heading text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] consult-reveal uppercase">
            Book your <br/> 
            <span className="text-accent italic font-accent font-normal lowercase">strategic</span> <br/>
            consultation.
          </h2>
          
          <p className="font-body text-neutral-400 text-lg md:text-xl leading-relaxed max-w-md consult-reveal">
            Take the first step toward scaling your real estate business. Apply for a strategic deep-dive with Anthony Leuterio and his core team.
          </p>

          <div className="space-y-6 consult-reveal">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                   <Calendar size={18} className="text-accent" />
                </div>
                <span className="text-sm font-bold text-neutral-300 tracking-wide">Weekly Strategy Slots: 3 Remaining</span>
             </div>
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                   <Users size={18} className="text-accent" />
                </div>
                <span className="text-sm font-bold text-neutral-300 tracking-wide">Join 14,000+ Scaled Professionals</span>
             </div>
          </div>
        </div>

        <div className="consult-reveal relative">
           {/* Decorative background for form */}
           <div className="absolute -inset-4 bg-accent/5 blur-[60px] rounded-full pointer-events-none" />
           
           {submitted ? (
             <div className="relative bg-white/5 backdrop-blur-xl p-12 md:p-16 rounded-[3rem] border border-white/10 text-center shadow-2xl">
               <CheckCircle size={64} className="text-accent mx-auto mb-8 animate-in zoom-in duration-500" />
               <h3 className="text-3xl font-heading font-black mb-4 uppercase">Application Sent</h3>
               <p className="text-neutral-400 mb-8 leading-relaxed">Our team is reviewing your profile. You will receive a booking link via email within 24 hours.</p>
               <button onClick={() => setSubmitted(false)} className="text-accent font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors">Apply for another slot</button>
             </div>
           ) : (
             <form ref={formRef} onSubmit={handleSubmit} className="relative bg-white/5 backdrop-blur-xl p-12 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl space-y-10">
               <div className="space-y-2">
                 <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-black">Full Name</label>
                 <input 
                   name="full_name"
                   required
                   type="text" 
                   placeholder="Anthony Leuterio" 
                   className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-accent transition-colors font-heading text-xl placeholder:text-neutral-800 text-white"
                 />
               </div>

               <div className="space-y-2">
                 <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-black">Email Address</label>
                 <input 
                   name="email"
                   required
                   type="email" 
                   placeholder="ceo@yourbrand.com" 
                   className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-accent transition-colors font-heading text-xl placeholder:text-neutral-800 text-white"
                 />
               </div>

               <div className="space-y-2">
                 <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-black">Coaching Tier</label>
                 <select 
                   name="program"
                   className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-accent transition-colors font-heading text-xl text-white appearance-none cursor-pointer"
                 >
                   <option value="Standard Coaching" className="bg-neutral-900">Standard Tier</option>
                   <option value="Elite Coaching" className="bg-neutral-900">Elite Tier</option>
                   <option value="Visionary Mentorship" className="bg-neutral-900">Visionary (VIP) Tier</option>
                   <option value="General Inquiry" className="bg-neutral-900">General Inquiry</option>
                 </select>
               </div>

               <button 
                 disabled={isSubmitting}
                 className="w-full group flex items-center justify-center gap-4 bg-white text-black px-12 py-8 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-accent hover:text-white transition-all duration-500 disabled:opacity-50 shadow-xl"
               >
                 {isSubmitting ? 'Processing Application...' : 'Apply for Consultation'}
                 <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
               </button>
             </form>
           )}
        </div>

      </div>
    </section>
  );
}
