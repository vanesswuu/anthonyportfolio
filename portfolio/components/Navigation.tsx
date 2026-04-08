'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [coachingOpen, setCoachingOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const coachingSublinks = [
    { name: 'My Coaching Programs', href: '/coaching' },
    { name: 'Coaching Plans', href: '/coaching#plans' },
    { name: 'About Anthony Leuterio', href: '/#leadership' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Coaching Consultation', href: '/#consultation' },
  ];

  return (
    <>
      <nav 
        ref={navRef} 
        className={`fixed top-0 left-0 w-full px-6 md:px-12 py-4 flex justify-between items-center z-50 transition-all duration-500 ${
          scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-xl' : 'bg-transparent py-8'
        }`}
      >
        <div 
          onClick={() => router.push('/')}
          className="text-xl md:text-2xl font-black tracking-tighter uppercase font-heading cursor-pointer z-50 text-white"
        >
          Anthony <span className="text-accent italic font-accent lowercase font-normal">Leuterio</span>
        </div>

        <div className="hidden xl:flex gap-10 items-center text-[10px] font-black tracking-[0.2em] uppercase z-50 text-white">
          <a href="/" className="hover:text-accent transition-colors">Home</a>
          
          <div 
            className="relative group"
            onMouseEnter={() => setCoachingOpen(true)}
            onMouseLeave={() => setCoachingOpen(false)}
          >
            <button className="flex items-center gap-2 hover:text-accent transition-colors uppercase tracking-[0.2em]">
              Coaching <ChevronDown size={14} className={`transition-transform duration-300 ${coachingOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`absolute top-full left-0 pt-4 w-64 transition-all duration-300 ${coachingOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <div className="bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-4 space-y-2">
                {coachingSublinks.map((sub) => (
                  <a 
                    key={sub.name} 
                    href={sub.href}
                    className="block px-4 py-3 text-[9px] hover:bg-white/5 hover:text-accent rounded-xl transition-all"
                  >
                    {sub.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a href="/tools" className="hover:text-accent transition-colors">Agent Tools</a>
          <a href="/education" className="hover:text-accent transition-colors">Education</a>
          <a href="/global" className="hover:text-accent transition-colors">Global</a>
          <a href="/#events" className="hover:text-accent transition-colors">Events</a>
          <a href="/admin" className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white hover:text-black transition-all">Portal</a>
          
          <a 
            href="#consultation" 
            className="px-8 py-4 bg-accent text-white rounded-full hover:bg-orange-600 shadow-xl shadow-accent/20 transition-all duration-300 text-[10px] tracking-[0.2em] active:scale-95"
          >
            Book Consultation
          </a>
        </div>

        <div className="flex items-center gap-6 xl:hidden z-50">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-40 transition-transform duration-700 cubic-bezier(0.7, 0, 0.3, 1) flex flex-col p-12 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="mt-20 space-y-12">
          <div className="space-y-6">
            <span className="text-accent text-xs font-black tracking-widest uppercase opacity-50">Coaching</span>
            <div className="flex flex-col gap-4">
              {coachingSublinks.map((item) => (
                <a key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="text-2xl md:text-4xl font-heading font-black uppercase tracking-tighter text-white hover:text-accent">
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          
          <div className="space-y-6 border-t border-white/10 pt-12">
            <a href="#events" onClick={() => setIsOpen(false)} className="block text-2xl md:text-4xl font-heading font-black uppercase tracking-tighter text-white hover:text-accent">Events</a>
            <a href="#consultation" onClick={() => setIsOpen(false)} className="block text-accent text-2xl md:text-4xl font-heading font-black uppercase tracking-tighter">Book Now</a>
          </div>
        </div>
      </div>
    </>
  );
}

