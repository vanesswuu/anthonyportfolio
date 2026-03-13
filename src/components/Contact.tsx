import { Mail, MapPin, Globe, Linkedin, Facebook, Twitter } from 'lucide-react';

export default function Contact() {
  return (
    <footer id="contact" className="bg-black text-white pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 border-t border-neutral-800 pt-16">
        
        {/* Brand & Location */}
        <div className="space-y-8">
          <h2 className="font-heading text-3xl font-bold">Anthony Leuterio</h2>
          <div className="flex flex-col gap-4 text-neutral-400">
             <div className="flex gap-4 items-center">
                <MapPin size={20} className="text-accent" />
                <span>Cebu City, Philippines / Global</span>
             </div>
             <div className="flex gap-4 items-center">
                <Mail size={20} className="text-accent" />
                <a href="mailto:contact@anthonyleuterio.com" className="hover:text-white transition-colors">contact@anthonyleuterio.com</a>
             </div>
             <div className="flex gap-4 items-center">
                <Globe size={20} className="text-accent" />
                <a href="https://filipinohomes.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">filipinohomes.com</a>
             </div>
          </div>
        </div>

        {/* Social & Legal */}
        <div className="flex flex-col justify-between gap-8">
           <div className="flex gap-6">
              <a href="https://www.linkedin.com/in/tonleuterio/" target="_blank" rel="noopener noreferrer" className="p-3 border border-neutral-800 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                 <Linkedin size={20} />
              </a>
              <a href="https://www.facebook.com/TonLeuterioOfficial" target="_blank" rel="noopener noreferrer" className="p-3 border border-neutral-800 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                 <Facebook size={20} />
              </a>
              <a href="https://x.com/leuteriorealty" target="_blank" rel="noopener noreferrer" className="p-3 border border-neutral-800 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                 <Twitter size={20} />
              </a>
           </div>
           
           <div className="text-neutral-600 text-sm text-right">
              &copy; {new Date().getFullYear()} Anthony Leuterio. All rights reserved. <br/>
              <span className="text-neutral-700">Designed with Fluid Aesthetics.</span>
           </div>
        </div>

      </div>
    </footer>
  );
}
