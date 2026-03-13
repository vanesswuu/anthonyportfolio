import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Accolade from './components/Accolade';
import Ventures from './components/Ventures';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Milestones from './components/Milestones';
import FooterMarquee from './components/FooterMarquee';
import Connect from './components/Connect';
import { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      lerp: 0.1, // Faster responsiveness
      duration: 1, // Snappier scroll
      smoothWheel: true,
      wheelMultiplier: 1.2, // More distance per wheel step
      infinite: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Register GSAP plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Connect ScrollTrigger to Lenis
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      gsap.ticker.remove(lenis.raf);
    };
  }, [loading]);

  return (
    <div className="app-container bg-black min-h-screen text-white">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <Navigation />
      
      <main>
        <Hero />
        <Accolade />
        <Milestones />
        <Ventures />
        <Leadership />
      </main>

      <Connect />
      <FooterMarquee />
      <Contact />
    </div>
  );
}

export default App;
