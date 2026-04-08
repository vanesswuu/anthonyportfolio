'use client';

import { Globe, Plane, Handshake, Users2, Landmark, Trophy, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';

const highlights = [
  {
    title: "Dubai Broker License 2025",
    desc: "Officially licensed to operate in the UAE, bridging the gap between Philippine real estate and the Dubai market.",
    icon: Landmark
  },
  {
    title: "OFW Wealth Creation",
    desc: "Dedicated programs helping Overseas Filipino Workers invest securely in their home country while earning in Dubai.",
    icon: Plane
  },
  {
    title: "FHI Global Properties",
    desc: "Our international arm focused on luxury developments and high-yield asset management across borders.",
    icon: Globe
  },
  {
    title: "Strategic Partnerships",
    desc: "Aligning with top-tier developers in Dubai to provide exclusive inventory to our global network.",
    icon: Handshake
  }
];

export default function GlobalPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navigation />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <span className="text-accent text-xs font-black tracking-[0.5em] uppercase block mb-4">Global Expansion</span>
            <h1 className="font-heading text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-8">
              Cebu to <br/><span className="text-accent italic font-accent lowercase font-normal">Dubai & Beyond</span>
            </h1>
            <p className="text-neutral-400 text-lg leading-relaxed mb-10 max-w-md">
              Anthony Leuterio is taking Filipino real estate excellence to the global stage, starting with a powerful footprint in the Middle East.
            </p>
            <div className="flex gap-6">
               <div className="text-center">
                  <div className="text-3xl font-black text-white mb-1">2025</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-accent">Dubai Launch</div>
               </div>
               <div className="w-[1px] h-12 bg-white/10" />
               <div className="text-center">
                  <div className="text-3xl font-black text-white mb-1">FHI</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-accent">Global Presence</div>
               </div>
            </div>
          </div>
          
          <div className="relative rounded-[3rem] overflow-hidden aspect-video shadow-2xl border border-white/10">
             <img 
               src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1470&auto=format&fit=crop" 
               className="w-full h-full object-cover opacity-80" 
               alt="Dubai Skyline"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
             <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
                <span className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2">
                   <Trophy size={12} className="text-accent" /> International Expansion Leader
                </span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {highlights.map((item, i) => (
            <div key={i} className="flex gap-8 p-10 bg-white/5 rounded-[2.5rem] border border-white/10 hover:border-accent transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20 text-accent shrink-0">
                <item.icon size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 p-16 rounded-[4rem] bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] -mr-32 -mt-32" />
           <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-heading font-black uppercase mb-8 leading-none">Become a <span className="text-accent italic font-accent lowercase font-normal">Global Partner</span></h2>
              <p className="text-neutral-200 text-lg mb-12 max-w-2xl mx-auto">We are looking for strategic partners and agents to join our expansion into Dubai. Let's scale excellence together.</p>
              <a href="/#consultation" className="px-12 py-6 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs hover:bg-accent hover:text-white transition-all shadow-2xl">Partner with Us <ArrowRight className="inline ml-2" size={16} /></a>
           </div>
        </div>
      </main>

      <Contact />
    </div>
  );
}
