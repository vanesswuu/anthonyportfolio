import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavigationProps {
  isLightMode: boolean;
  onToggleTheme: () => void;
}

export default function Navigation({ isLightMode, onToggleTheme }: NavigationProps) {
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

      const handleMouseMove = (e: MouseEvent) => {
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

      link.addEventListener('mousemove', handleMouseMove);
      link.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        link.removeEventListener('mousemove', handleMouseMove);
        link.removeEventListener('mouseleave', handleMouseLeave);
      };
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

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
          className="text-xl font-bold tracking-tighter uppercase font-heading cursor-pointer z-50 mix-blend-difference"
        >
          Anthony Leuterio
        </div>

        <div className="hidden md:flex gap-10 items-center text-[10px] font-bold tracking-[0.2em] uppercase z-50 mix-blend-difference">
          {['Vision', 'Ventures', 'Leadership'].map((item, i) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              ref={el => linkRefs.current[i+1] = el as any}
              className="hover:opacity-60 transition-opacity"
            >
              {item}
            </a>
          ))}
          
          {/* Classy Theme Toggle Button */}
          <button 
            ref={el => linkRefs.current[4] = el as any}
            onClick={onToggleTheme}
            className="p-2 transition-transform hover:scale-110 active:scale-90 cursor-pointer"
            aria-label="Toggle Theme"
          >
            <div className="relative w-5 h-5 overflow-hidden">
               <div className={`absolute inset-0 transition-all duration-500 ${isLightMode ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  <Moon size={20} />
               </div>
               <div className={`absolute inset-0 transition-all duration-500 ${isLightMode ? '-translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
                  <Sun size={20} className="text-accent" />
               </div>
            </div>
          </button>

          <a 
            href="#contact" 
            ref={el => linkRefs.current[5] = el as any}
            className="px-8 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-500 text-[10px] tracking-[0.2em]"
          >
            Get in Touch
          </a>
        </div>

        <div className="flex items-center gap-6 md:hidden z-50 mix-blend-difference">
          <button onClick={onToggleTheme} className="p-2">
            {isLightMode ? <Moon size={20} /> : <Sun size={20} className="text-accent" />}
          </button>
          <button onClick={toggleMenu}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-40 transition-transform duration-700 cubic-bezier(0.7, 0, 0.3, 1) flex items-center justify-center ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col gap-12 text-center text-4xl font-heading font-bold uppercase tracking-tighter text-white">
           {['Vision', 'Ventures', 'Leadership', 'Contact'].map((item) => (
             <a key={item} href={`#${item.toLowerCase()}`} onClick={toggleMenu} className="hover:text-accent transition-colors">
               {item}
             </a>
           ))}
        </div>
      </div>
    </>
  );
}
