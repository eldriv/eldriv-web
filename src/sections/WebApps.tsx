"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { ScrollReveal } from "@/components/scroll-reveal";
import { WebsiteCard, type Website } from "@/components/WebsiteCard";

import BehindCourtImage from "@/assets/images/behind-court.png";

const webApps: Website[] = [
  {
    title: "BehindCourt",
    description:
      "Venue ops for pickleball clubs—run sessions, queues, courts, and scoring from the admin desk while players check in from their phones. Includes calendar rentals, game formats, leaderboards, lobby board view, and Reclub roster import, all on venue Wi-Fi.",
    image: BehindCourtImage,
    liveUrl: "https://behindcourt.netlify.app/",
    technologies: ["React", "JavaScript", "Netlify"],
    projectType: "app",
  },
];

export const WebAppsSection = () => {
  return (
    <section id="web-apps">
      <div className="py-12 sm:py-16 lg:py-24 relative">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
          <SectionHeader
            eyebrow="Web Applications"
            title="Eldriv's Web Application Portfolio"
            description="Interactive web apps built from the ground up—focused on real workflows, responsive interfaces, and deployable products that go beyond static marketing sites."
          />

          <ScrollReveal className="mt-12 sm:mt-16 md:mt-20" delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {webApps.map((app, index) => (
                <WebsiteCard key={app.title} website={app} index={index} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
