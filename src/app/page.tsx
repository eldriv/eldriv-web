import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ExperienceSection } from "@/sections/Experience";
import { TapeSection } from "@/sections/Tape";
import { ArticlesSection } from "@/sections/Articles";
import { TapeSection1 } from "@/sections/Tape2";
import { AboutSection } from "@/sections/About";
import { ContactSection } from "@/sections/Contact";
import { WebsitesSection } from "@/sections/Web"; 
import { Footer } from "@/sections/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <TapeSection />
      <ExperienceSection />
      <TapeSection1 />
      <ArticlesSection />
      <TapeSection /> 
      <AboutSection />
      <WebsitesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}