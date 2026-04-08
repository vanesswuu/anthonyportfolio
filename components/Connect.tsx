'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { submitInquiry } from '@/app/actions/inquiry';

gsap.registerPlugin(ScrollTrigger);

export default function Connect() {
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
      program: formData.get('program') as string || 'General Inquiry',
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
      gsap.from(".connect-reveal", {
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
    <section ref={containerRef} id="contact" className="py-48 px-6 bg-black text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        
        <div className="space-y-12">
          <div className="connect-reveal inline-block">
            <span className="text-accent text-[10px] tracking-[0.5em] uppercase font-bold py-2 border-b border-accent/30">
              Get in Touch
            </span>
          </div>
          
          <h2 className="font-heading text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] connect-reveal text-white uppercase">
            LET'S BUILD <br/> 
            <span className="text-accent italic font-accent font-normal lowercase">the future</span> <br/>
            TOGETHER.
          </h2>
          
          <p className="font-body text-neutral-400 text-lg md:text-xl leading-relaxed max-w-md connect-reveal font-normal">
            Whether you are looking to invest, partner, or transform the real estate landscape, let's start a conversation.
          </p>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white/5 rounded-3xl border border-white/10 text-center connect-reveal">
            <CheckCircle size={64} className="text-accent mb-6" />
            <h3 className="text-3xl font-heading font-black mb-4 uppercase">Inquiry Received</h3>
            <p className="text-neutral-400">Anthony's team will get back to you within 24-48 hours.</p>
            <button onClick={() => setSubmitted(false)} className="mt-8 text-accent font-black uppercase tracking-widest text-[10px]">Send another</button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-12 connect-reveal">
            <div className="group relative">
              <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-black group-focus-within:text-accent transition-colors">Full Name</label>
              <input 
                name="full_name"
                required
                type="text" 
                placeholder="Anthony Leuterio" 
                className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-accent transition-colors font-heading text-xl placeholder:text-neutral-800 text-white font-black"
              />
            </div>

            <div className="group relative">
              <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-black group-focus-within:text-accent transition-colors">Email Address</label>
              <input 
                name="email"
                required
                type="email" 
                placeholder="hello@visionary.com" 
                className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-accent transition-colors font-heading text-xl placeholder:text-neutral-800 text-white font-black"
              />
            </div>

            <div className="group relative">
              <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-black group-focus-within:text-accent transition-colors">Message</label>
              <textarea 
                name="message"
                required
                rows={4}
                placeholder="Tell us about your vision..." 
                className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-accent transition-colors font-heading text-xl placeholder:text-neutral-800 resize-none text-white font-black"
              ></textarea>
            </div>

            <button 
              disabled={isSubmitting}
              className="group flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-accent hover:text-white transition-all duration-500 disabled:opacity-50 shadow-xl shadow-white/5"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        )}

      </div>
    </section>
  );
}

