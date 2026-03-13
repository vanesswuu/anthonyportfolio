import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Accolade from './components/Accolade';
import AuthorityLogos from './components/AuthorityLogos';
import Ventures from './components/Ventures';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Milestones from './components/Milestones';
import FooterMarquee from './components/FooterMarquee';
import Connect from './components/Connect';
import GlobalPress from './components/GlobalPress';
import LegacyTimeline from './components/LegacyTimeline';

function App() {
  const [loading, setLoading] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isLightMode]);

  useEffect(() => {
    if (loading) return;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1,
    });

    // Register GSAP plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Connect ScrollTrigger to Lenis
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP ticker with Lenis
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(updateTicker);

    // Set ScrollTrigger defaults
    ScrollTrigger.defaults({
      markers: false,
    });

    // Refresh ScrollTrigger after a slight delay to ensure DOM is ready
    const refreshId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      clearTimeout(refreshId);
    };
  }, [loading]);

  return (
    <div className="app-container min-h-screen">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <Navigation isLightMode={isLightMode} onToggleTheme={() => setIsLightMode(!isLightMode)} />
      
      <main>
        <Hero />
        <AuthorityLogos />
        <Accolade />
        <Milestones />
        <Ventures />
        <Leadership />
        <LegacyTimeline />
        <GlobalPress />
      </main>

      <Connect />
      <FooterMarquee />
      <Contact />
    </div>
  );
}

export default App;
