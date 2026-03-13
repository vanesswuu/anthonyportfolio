import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Connect() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
          
          <h2 className="font-heading text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] connect-reveal">
            LET'S BUILD <br/> 
            <span className="text-neutral-500 italic font-accent font-normal">THE FUTURE</span> <br/>
            TOGETHER.
          </h2>
          
          <p className="font-body text-neutral-500 text-lg md:text-xl leading-relaxed max-w-md connect-reveal font-light">
            Whether you are looking to invest, partner, or transform the real estate landscape, let's start a conversation.
          </p>
        </div>

        <form ref={formRef} className="space-y-12 connect-reveal">
          <div className="group relative">
            <label className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold group-focus-within:text-accent transition-colors">Full Name</label>
            <input 
              type="text" 
              placeholder="Anthony Leuterio" 
              className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-accent transition-colors font-heading text-xl placeholder:text-neutral-800"
            />
          </div>

          <div className="group relative">
            <label className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold group-focus-within:text-accent transition-colors">Email Address</label>
            <input 
              type="email" 
              placeholder="hello@visionary.com" 
              className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-accent transition-colors font-heading text-xl placeholder:text-neutral-800"
            />
          </div>

          <div className="group relative">
            <label className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold group-focus-within:text-accent transition-colors">Message</label>
            <textarea 
              rows={4}
              placeholder="Tell us about your vision..." 
              className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-accent transition-colors font-heading text-xl placeholder:text-neutral-800 resize-none"
            ></textarea>
          </div>

          <button className="group flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-accent hover:text-white transition-all duration-500">
            Send Message
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </form>

      </div>
    </section>
  );
}
