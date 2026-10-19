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
    liveUrl: "https://court.behinddigitals.com/behindcourt",
    technologies: [],
    projectType: "app",
  },
  {
    title: "OnCourt",
    description:
      "OnCourt records pickleball matches from venue cameras through OnCourt Desktop on a Windows or Mac venue PC. Players start and stop recordings from a court tablet and receive a link to watch or download their clip by email—no player account or app required.",
    image: "/assets/images/oncourt-thumbnail.svg",
    liveUrl: "https://court.behinddigitals.com/oncourt",
    technologies: [],
    projectType: "app",
  },
  {
    title: "Vielo Dashiel & Khali",
    description:
      "Built a staycation booking app where guests can explore three branches, view stay details and reviews, choose dates, and reserve with a small downpayment before settling the balance on arrival.",
    image:
      "https://staycation-booking.perlaycaro.workers.dev/uploads/landing/landing-hero-mobile-1790412625701.png",
    liveUrl: "https://staycation-booking.perlaycaro.workers.dev/",
    technologies: [],
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
            title="Selected products"
            description="Purpose-built software for real operational workflows."
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
