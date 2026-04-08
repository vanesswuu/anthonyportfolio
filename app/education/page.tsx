'use client';

import { BookOpen, ShieldCheck, FileText, Landmark, LineChart, GraduationCap, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';

const courses = [
  {
    title: "RESA Law Mastery",
    desc: "Understanding the Real Estate Service Act (RA 9646) to ensure legal and professional compliance.",
    icon: Landmark
  },
  {
    title: "Documentation & Process",
    desc: "Mastering titles, deeds, tax declarations, and the end-to-end transfer of property ownership.",
    icon: FileText
  },
  {
    title: "Ethics & Standard Practice",
    desc: "Building a reputation based on integrity, global standards, and professional conduct.",
    icon: ShieldCheck
  },
  {
    title: "Real Estate Taxation",
    desc: "Deep dive into CGT, DST, VAT, and Estate Tax to provide expert advice to your clients.",
    icon: LineChart
  },
  {
    title: "Digital Marketing & Social Media",
    desc: "Strategies to dominate the digital landscape and generate high-quality leads consistently.",
    icon: BookOpen
  },
  {
    title: "Leadership & Team Architecture",
    desc: "Transitioning from agent to leader by building and managing high-performance sales teams.",
    icon: GraduationCap
  }
];

export default function EducationPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navigation />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-accent text-xs font-black tracking-[0.5em] uppercase block mb-4">FIRE Academy</span>
          <h1 className="font-heading text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-8">
            The Future of <br/><span className="text-accent italic font-accent lowercase font-normal">Real Estate Education</span>
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Free online certification courses designed to professionalize the industry and empower every Filipino agent with global knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-accent transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 border border-accent/20 text-accent group-hover:scale-110 transition-transform">
                <course.icon size={28} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4">{course.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-10">{course.desc}</p>
              
              <button onClick={() => window.location.href='/#consultation'} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white group-hover:text-accent transition-colors">
                Enroll Free <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-32 relative rounded-[4rem] overflow-hidden">
           <img 
             src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1470&auto=format&fit=crop" 
             className="w-full h-[500px] object-cover opacity-40" 
             alt="Learning"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex items-center justify-center p-12 text-center">
              <div className="max-w-2xl">
                 <h2 className="text-4xl md:text-6xl font-heading font-black uppercase mb-8 leading-none">Knowledge is the <br/><span className="text-accent">Ultimate Leverage.</span></h2>
                 <p className="text-neutral-200 text-lg mb-10">Join thousands of certified graduates who are currently leading the real estate market.</p>
                 <a href="/#consultation" className="px-12 py-6 bg-accent text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all shadow-2xl shadow-accent/20">Start Learning Free</a>
              </div>
           </div>
        </div>
      </main>

      <Contact />
    </div>
  );
}
