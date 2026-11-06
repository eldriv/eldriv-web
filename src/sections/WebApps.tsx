"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { ScrollReveal } from "@/components/scroll-reveal";
import { WebsiteCard, type Website } from "@/components/WebsiteCard";

import BehindCourtImage from "@/assets/images/behind-court.png";
import MarketingAgentsImage from "@/assets/images/marketing-agents.jpg";
import MarketingAgentsTrackerImage from "@/assets/images/marketing-agents-tracker.jpg";
import MarketingAgentsCompletedImage from "@/assets/images/marketing-agents-completed.jpg";
import MarketingAgentsInfographicsImage from "@/assets/images/marketing-agents-infographics.jpg";
import VieloStaycationImage from "@/assets/images/vielo-staycation.jpg";
import QuisinaKitchenImage from "@/assets/images/quisina-kitchen.png";
import QuisinaMenuImage from "@/assets/images/quisina-menu.png";
import QuisinaCashierImage from "@/assets/images/quisina-cashier.png";
import QuisinaTablesImage from "@/assets/images/quisina-tables.png";
import QuisinaBrandingImage from "@/assets/images/quisina-branding.png";
import QuisinaAnalyticsImage from "@/assets/images/quisina-analytics.png";
import ThomasImage from "@/assets/images/thomas-v1.jpg";
import ThomasSetupImage from "@/assets/images/thomas-v1-setup.jpg";
import VideoAnalyzerImage from "@/assets/images/video-analyzer.jpg";
import VideoAnalyzerProgressImage from "@/assets/images/video-analyzer-progress.jpg";
import VideoAnalyzerInsightsImage from "@/assets/images/video-analyzer-insights.jpg";

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
    title: "Marketing Agents",
    description:
      "An AI marketing agency for BehindCourt that runs in a living 3D office. A Marketing Director takes your brief and delegates tasks to specialist agents, who claim desks, work through a queued pipeline with client approvals and retries, and deliver marketing plans, daily social post drafts, and downloadable documents tracked on a Kanban work tracker.",
    image: MarketingAgentsImage,
    screenshots: [
      {
        src: MarketingAgentsImage,
        caption: "3D office — the Marketing Director is ready for a briefing while specialist agents work at their desks.",
      },
      {
        src: MarketingAgentsTrackerImage,
        caption: "Work tracker — project tasks move across Blocked, Scheduled, On hold, In progress, Done, and Failed.",
      },
      {
        src: MarketingAgentsCompletedImage,
        caption: "Completed — finished marketing plans and social posts with their downloadable deliverables.",
      },
      {
        src: MarketingAgentsInfographicsImage,
        caption: "Completed deliverable — a Facebook infographics batch, viewable full size and downloadable with a ready-to-copy caption.",
      },
    ],
    technologies: [],
    projectType: "app",
  },
  {
    title: "Vielo Dashiel & Khali",
    description:
      "Built a staycation booking app where guests can explore three branches, view stay details and reviews, choose dates, and reserve with a small downpayment before settling the balance on arrival.",
    image: VieloStaycationImage,
    liveUrl: "https://staycation-booking.perlaycaro.workers.dev/",
    technologies: [],
    projectType: "app",
  },
  {
    title: "Quisina",
    description:
      "A QR ordering platform that runs many restaurants from one app. Guests scan a table's QR code to order from a branded menu, while staff work a live kitchen board, a cashier queue, a menu builder, and sales analytics with Excel and CSV exports. Also ships as a native Android app.",
    image: QuisinaKitchenImage,
    screenshots: [
      {
        src: QuisinaKitchenImage,
        caption: "Kitchen — orders move from New to Accepted, Preparing, Ready, and Served on one screen.",
      },
      {
        src: QuisinaMenuImage,
        caption: "Menu builder — categories, items, prices, and sold-out toggles guests see instantly.",
      },
      {
        src: QuisinaCashierImage,
        caption: "Cashier — unpaid orders queue up for counter or e-wallet payment and move to recents once paid.",
      },
      {
        src: QuisinaTablesImage,
        caption: "Tables & QR — every table gets its own QR code and shareable menu link.",
      },
      {
        src: QuisinaBrandingImage,
        caption: "Branding — restaurant name, colors, font, and logo with a live menu preview.",
      },
      {
        src: QuisinaAnalyticsImage,
        caption: "Analytics — revenue, orders, dine-in vs takeaway, and busiest hours, with accounting exports.",
      },
    ],
    technologies: [],
    projectType: "app",
  },
  {
    title: "Thomas V1",
    description:
      "A desktop voice AI assistant for Windows, macOS, and Linux with a calm, JARVIS-style voice. Thomas talks in real time, reads dropped files and the screen, controls apps and the browser, sets spoken reminders, and works with Google Calendar, Gmail, Sheets, and Notion—keeping secrets in the system keychain.",
    image: ThomasImage,
    screenshots: [
      {
        src: ThomasImage,
        caption: "Voice console — Thomas speaks from the live sphere while the conversation, system stats, and file drop sit alongside.",
      },
      {
        src: ThomasSetupImage,
        caption: "First-run setup — connect Gemini, OpenRouter, Notion, Sheets, Calendar, and Gmail, with keys stored in the system keychain.",
      },
    ],
    technologies: [],
    projectType: "app",
  },
  {
    title: "Video Analyzer",
    description:
      "An AI Chrome extension that analyzes TikTok, Instagram Reels, YouTube Shorts, and Facebook videos right on the page, returning marketing insights, hook analysis, engagement triggers, and trend estimates from a Next.js and PostgreSQL backend.",
    image: VideoAnalyzerImage,
    screenshots: [
      {
        src: VideoAnalyzerImage,
        caption: "Insights — the video in view is detected automatically and scored with an AI summary and engagement stats.",
      },
      {
        src: VideoAnalyzerProgressImage,
        caption: "Analysis in progress — keyframes and audio are captured from the player, then transcribed and scanned by AI.",
      },
      {
        src: VideoAnalyzerInsightsImage,
        caption: "Breakdown — hook type for the first seconds, marketing framework, target audience, and the creator's goal.",
      },
    ],
    technologies: [],
    projectType: "app",
  },
];

export const WebAppsSection = () => {
  return (
    <section id="web-apps">
      <div className="py-10 md:py-16 lg:py-24 relative">
        <div className="w-full max-w-[1280px] mx-auto px-5 md:px-8">
          <SectionHeader
            index={3}
            eyebrow="Web Applications"
            title="Selected products"
            description="Purpose-built software for real operational workflows."
          />

          <ScrollReveal className="mt-8 md:mt-16 lg:mt-20" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-6">
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
