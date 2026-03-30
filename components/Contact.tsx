'use client';

import { Mail, MapPin, Globe, Linkedin, Facebook, Twitter } from 'lucide-react';

export default function Contact() {
  return (
    <footer id="contact" className="bg-black text-white pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 border-t border-white/10 pt-16">
        
        {/* Brand & Location */}
        <div className="space-y-8">
          <h2 className="font-heading text-3xl font-black text-white uppercase tracking-tighter">Anthony <span className="text-accent italic font-accent lowercase font-normal">Leuterio</span></h2>
          <div className="flex flex-col gap-4 text-neutral-400">
             <div className="flex gap-4 items-center group cursor-pointer">
                <MapPin size={20} className="text-accent group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">Cebu City, Philippines / Global</span>
             </div>
             <div className="flex gap-4 items-center group cursor-pointer">
                <Mail size={20} className="text-accent group-hover:scale-110 transition-transform" />
                <a href="mailto:contact@anthonyleuterio.com" className="hover:text-white transition-colors font-bold">contact@anthonyleuterio.com</a>
             </div>
             <div className="flex gap-4 items-center group cursor-pointer">
                <Globe size={20} className="text-accent group-hover:scale-110 transition-transform" />
                <a href="https://filipinohomes.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-bold">filipinohomes.com</a>
             </div>
          </div>
        </div>

        {/* Social & Legal */}
        <div className="flex flex-col justify-between gap-8">
           <div className="flex gap-6">
              <a href="https://www.linkedin.com/in/tonleuterio/" target="_blank" rel="noopener noreferrer" className="p-4 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500 shadow-xl shadow-white/5">
                 <Linkedin size={20} />
              </a>
              <a href="https://www.facebook.com/TonLeuterioOfficial" target="_blank" rel="noopener noreferrer" className="p-4 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500 shadow-xl shadow-white/5">
                 <Facebook size={20} />
              </a>
              <a href="https://x.com/leuteriorealty" target="_blank" rel="noopener noreferrer" className="p-4 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500 shadow-xl shadow-white/5">
                 <Twitter size={20} />
              </a>
           </div>
           
           <div className="text-neutral-500 text-xs text-right flex flex-col items-end gap-2 font-bold uppercase tracking-widest">
              <a href="/login" className="text-neutral-600 hover:text-accent transition-colors">Admin Portal</a>
              <div>&copy; {new Date().getFullYear()} Anthony Leuterio. All rights reserved.</div>
              <span className="text-neutral-700">Designed for Active Dominance.</span>
           </div>
        </div>

      </div>
    </footer>
  );
}
