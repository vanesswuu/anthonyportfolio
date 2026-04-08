import ClientWrapper from "@/components/ClientWrapper";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CoachingPrograms from "@/components/CoachingPrograms";
import CoachingPlans from "@/components/CoachingPlans";
import Testimonials from "@/components/Testimonials";
import CoachingConsultation from "@/components/CoachingConsultation";
import Events from "@/components/Events";
import AuthorityLogos from "@/components/AuthorityLogos";
import Accolade from "@/components/Accolade";
import Milestones from "@/components/Milestones";
import Ventures from "@/components/Ventures";
import Leadership from "@/components/Leadership";
import LegacyTimeline from "@/components/LegacyTimeline";
import GlobalPress from "@/components/GlobalPress";
import News from "@/components/News";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import { fetchLatestNews } from "@/lib/news";

export default async function Home() {
  let newsArticles = [];
  try {
    newsArticles = await fetchLatestNews();
  } catch (error) {
    console.error("Failed to load news articles:", error);
  }

  return (
    <main className="app-container min-h-screen bg-black">
      <ClientWrapper>
        <CustomCursor />
        <Navigation />
        
        <Hero />
        <AuthorityLogos />
        
        {/* Coaching Focus Area */}
        <CoachingPrograms />
        <CoachingPlans />
        <Testimonials />
        
        {/* Background & Authority Area */}
        <Accolade />
        <Milestones />
        <Leadership />
        
        {/* Active Market Presence */}
        <Events />
        <Ventures />
        <LegacyTimeline />
        <GlobalPress />
        <News articles={newsArticles} />
        
        <CoachingConsultation />
        <Contact />
      </ClientWrapper>
    </main>
  );
}
