'use client';

import { LayoutGrid, Users, Building2, Smartphone, Key, Globe2, ArrowUpRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';

const tools = [
  {
    title: "CRM Platform",
    description: "Cloud-based customer relationship management built specifically for real estate high-volume sales.",
    icon: LayoutGrid
  },
  {
    title: "Nationwide Multi-Listing",
    description: "Instant access to thousands of property listings across the Philippines in one unified system.",
    icon: Globe2
  },
  {
    title: "200+ Secretaries Support",
    description: "Dedicated administrative backbone to handle your documentation, follow-ups, and listing uploads.",
    icon: Users
  },
  {
    title: "Free Franchise Offer",
    description: "Zero-cost licensing to operate under the prestigious Filipino Homes brand in your territory.",
    icon: Key
  },
  {
    title: "Rent.ph Access",
    description: "Exclusive partnership with the country's top rental platform for consistent recurring income.",
    icon: Building2
  },
  {
    title: "Mobile Ecosystem",
    description: "A comprehensive app to manage leads, view commissions, and track property inventory on the go.",
    icon: Smartphone
  }
];

export default function ToolsPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navigation />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-accent text-xs font-black tracking-[0.5em] uppercase block mb-4">PropTech Advantage</span>
          <h1 className="font-heading text-5xl md:text-7xl font-black tracking-tighter uppercase leading-tight mb-8">
            Agent Tools & <br/><span className="text-accent italic font-accent lowercase font-normal">Technology</span>
          </h1>
          <p className="text-neutral-400 max-w-xl text-lg leading-relaxed">
            The same world-class infrastructure that powers 14,000+ professionals, available at your fingertips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden">
          {tools.map((tool, i) => (
            <div key={i} className="p-12 bg-black hover:bg-white/[0.02] transition-colors group border border-white/5">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 border border-accent/20 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                <tool.icon size={24} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4">{tool.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-10">{tool.description}</p>
              
              <a href="/#consultation" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent hover:text-white transition-colors">
                Request Access <ArrowUpRight size={14} />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 rounded-[3rem] bg-white/5 border border-white/10 text-center">
           <h2 className="text-3xl font-heading font-black uppercase mb-6 text-white">Dominate with the <span className="text-accent">Right Stack.</span></h2>
           <p className="text-neutral-400 mb-10 max-w-lg mx-auto">Our agents spend less time on paperwork and more time closing deals because of this integrated ecosystem.</p>
           <a href="/#consultation" className="px-10 py-5 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs hover:bg-accent hover:text-white transition-all duration-300">Get Started Free</a>
        </div>
      </main>

      <Contact />
    </div>
  );
}
