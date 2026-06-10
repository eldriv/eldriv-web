"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { ScrollReveal } from "@/components/scroll-reveal";
import { WebsiteCard, type Website } from "@/components/WebsiteCard";

import BehindQrImage from "@/assets/images/behind-qr-dashboard.png";
import FinanceTrackerImage from "@/assets/images/ads-finance-tracker.png";
import Cr8QrMenuImage from "@/assets/images/cr8-qr-menu.png";

const webApps: Website[] = [
  {
    title: "Behind QR",
    description:
      "Turn every visit into a 5-star review—Behind QR makes it effortless for customers to leave Google reviews. Place a QR stand, scan, review. Includes QR review stands, a review & feedback inbox, scan & conversion analytics, and smart alerts & digests.",
    image: BehindQrImage,
    liveUrl: "https://behind-qr-dashboard.netlify.app/",
    technologies: ["React", "JavaScript", "Netlify"],
    projectType: "app",
  },
  {
    title: "Finance Tracker",
    description:
      "A personal finance web app for logging earnings from Wise, PayPal, or GCash and tracking every expense going forward. Dashboard summaries cover total earned, spent, net balance, and pending payments—with data kept private in the browser.",
    image: FinanceTrackerImage,
    liveUrl: "https://ads-finance-tracker.netlify.app/#/",
    technologies: ["React", "JavaScript", "Local Storage", "Netlify"],
    projectType: "app",
  },
  {
    title: "QR Menu",
    description:
      "QR ordering for restaurants and cafés—guests scan and order from their phone while a staff dashboard covers the kitchen board, menu builder, cashier, tables, QR codes, branding, and analytics in one browser tab.",
    image: Cr8QrMenuImage,
    liveUrl: "https://quisina.netlify.app",
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
