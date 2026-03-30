import ClientWrapper from "@/components/ClientWrapper";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CoachingPrograms from "@/components/CoachingPrograms";
import Events from "@/components/Events";
import AuthorityLogos from "@/components/AuthorityLogos";
import Accolade from "@/components/Accolade";
import Milestones from "@/components/Milestones";
import Ventures from "@/components/Ventures";
import Leadership from "@/components/Leadership";
import LegacyTimeline from "@/components/LegacyTimeline";
import GlobalPress from "@/components/GlobalPress";
import Connect from "@/components/Connect";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <main className="app-container min-h-screen bg-white">
      <ClientWrapper>
        <CustomCursor />
        <Navigation />
        
        <Hero />
        <AuthorityLogos />
        <CoachingPrograms />
        <Events />
        <Accolade />
        <Milestones />
        <Ventures />
        <Leadership />
        <LegacyTimeline />
        <GlobalPress />
        
        <Connect />
        <Contact />
      </ClientWrapper>
    </main>
  );
}
