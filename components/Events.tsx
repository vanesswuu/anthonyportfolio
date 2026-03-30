'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

gsap.registerPlugin(ScrollTrigger);

export default function Events() {
  const containerRef = useRef<HTMLElement>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await supabase.from('events').select('*').order('date', { ascending: true }).limit(3);
      if (data && data.length > 0) {
        setEvents(data);
      }
      setLoading(false);
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    if (loading || events.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.from(".event-card", {
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
  }, [loading, events]);

  if (!loading && events.length === 0) return null;

  return (
    <section ref={containerRef} id="events" className="py-32 px-6 bg-black text-white overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <span className="text-accent text-xs tracking-[0.5em] uppercase font-black block mb-4">Upcoming</span>
            <h2 className="font-heading text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none text-white">Global <br/><span className="text-accent italic font-accent lowercase font-normal">Events</span></h2>
          </div>
          <p className="text-neutral-400 font-body text-xl max-w-sm leading-relaxed md:text-right">
            Join Anthony Leuterio at major industry summits and exclusive coaching seminars worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {events.map((event, i) => (
            <div key={i} className="event-card group bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/10 flex flex-col md:flex-row justify-between items-center transition-all duration-500 hover:shadow-2xl hover:border-accent">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="w-24 h-24 bg-neutral-900 rounded-3xl flex flex-col items-center justify-center text-white shrink-0 group-hover:bg-accent transition-colors duration-500">
                  <span className="text-3xl font-black leading-none">{new Date(event.date).getDate()}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-4xl font-heading font-black uppercase tracking-tighter mb-4 text-white">{event.title}</h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-6 text-neutral-400 font-bold uppercase tracking-widest text-[10px]">
                    <span className="flex items-center gap-2"><Calendar size={14} className="text-accent" /> {event.date}</span>
                    <span className="flex items-center gap-2"><MapPin size={14} className="text-accent" /> {event.location}</span>
                  </div>
                </div>
              </div>
              <button className="mt-8 md:mt-0 px-10 py-5 bg-white text-black rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-accent hover:text-white transition-all duration-300 flex items-center gap-3">
                Register Seat <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
