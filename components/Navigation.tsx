'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavigationProps {
  isLightMode?: boolean;
  onToggleTheme?: () => void;
}

export default function Navigation({ }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const linkRefs = useRef<(HTMLAnchorElement | HTMLDivElement | HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Magnetic effect for links
    linkRefs.current.forEach(link => {
      if (!link) return;

      const handleMouseMove = (e: any) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        
        gsap.to(link, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(link, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      };

      link.addEventListener('mousemove', handleMouseMove as any);
      link.addEventListener('mouseleave', handleMouseLeave as any);
      
      return () => {
        link.removeEventListener('mousemove', handleMouseMove as any);
        link.removeEventListener('mouseleave', handleMouseLeave as any);
      };
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: 'Vision', href: '#vision' },
    { name: 'Impact', href: '#milestones' },
    { name: 'Programs', href: '#programs' },
    { name: 'Ventures', href: '#ventures' },
    { name: 'Legacy', href: '#legacy' },
    { name: 'Admin', href: '/admin' },
  ];

  return (
    <>
      <nav 
        ref={navRef} 
        className={`fixed top-0 left-0 w-full px-6 py-4 flex justify-between items-center z-50 transition-all duration-500 ${
          scrolled ? 'glass-nav shadow-sm' : 'bg-transparent py-8'
        }`}
      >
        <div 
          ref={el => linkRefs.current[0] = el as any}
          className={`text-xl font-bold tracking-tighter uppercase font-heading cursor-pointer z-50 ${scrolled ? 'text-primary' : 'text-current'}`}
        >
          Anthony <span className="text-accent">Leuterio</span>
        </div>

        <div className="hidden xl:flex gap-8 items-center text-[10px] font-bold tracking-[0.2em] uppercase z-50">
          {navItems.map((item, i) => (
            <a 
              key={item.name}
              href={item.href} 
              ref={el => linkRefs.current[i+1] = el as any}
              className="hover:text-accent transition-colors"
            >
              {item.name}
            </a>
          ))}
          
          <a 
            href="#contact" 
            ref={el => linkRefs.current[navItems.length + 2] = el as any}
            className="px-6 py-3 bg-accent text-white rounded-full hover:bg-orange-600 shadow-lg shadow-accent/20 transition-all duration-300 text-[10px] tracking-[0.2em] active:scale-95"
          >
            Join Community
          </a>
        </div>

        <div className="flex items-center gap-6 xl:hidden z-50">
          <button onClick={toggleMenu}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-40 transition-transform duration-700 cubic-bezier(0.7, 0, 0.3, 1) flex items-center justify-center ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col gap-8 text-center text-3xl font-heading font-bold uppercase tracking-tighter text-white">
           {navItems.map((item) => (
             <a key={item.name} href={item.href} onClick={toggleMenu} className="hover:text-accent transition-colors">
               {item.name}
             </a>
           ))}
           <a href="#contact" onClick={toggleMenu} className="hover:text-accent transition-colors">Contact</a>
        </div>
      </div>
    </>
  );
}
