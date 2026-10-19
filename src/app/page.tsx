import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ExperienceSection } from "@/sections/Experience";
import { ArticlesSection } from "@/sections/Articles";
import { AboutSection } from "@/sections/About";
import { ContactSection } from "@/sections/Contact";
import { WebsitesSection } from "@/sections/Web";
import { WebAppsSection } from "@/sections/WebApps";
import { TestimonialsSection } from "@/sections/Testimonials";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ExperienceSection />
      <WebAppsSection />
      <WebsitesSection />
      <ArticlesSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}