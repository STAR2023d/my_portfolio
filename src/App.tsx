import { Analytics } from "@vercel/analytics/react";
import BackgroundGlow from "./components/ui/BackgroundGlow";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import AISection from "./components/sections/AISection";
import Contact from "./components/sections/Contact";
import Experience from "./components/sections/Experience";
import GithubSection from "./components/sections/GithubSection";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import TechStack from "./components/sections/TechStack";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import ScrollProgress from "./components/ui/ScrollProgress";
import ChatbotWidget from "./components/ChatbotWidget";
function App() {
  return (
    <main className="bg-dark text-white overflow-hidden relative">
      <BackgroundGlow />
      <Analytics />

      <div className="relative z-10">
        <Navbar />

        <Hero />

        <TechStack />

        <Projects />

        <AISection />

        <GithubSection />

        <Experience />

        <Contact />

        <Footer />
      </div>
      <ScrollProgress />
      <WhatsAppButton/>
      <ChatbotWidget />
    </main>
  );
}

export default App;