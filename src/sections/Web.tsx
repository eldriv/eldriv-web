"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

// Components
import { SectionHeader } from "@/components/SectionHeader";
import { ScrollReveal } from "@/components/scroll-reveal";
import { WebsiteCard, type Website } from "@/components/WebsiteCard";

// Image imports
import CrownImage from "@/assets/images/crown.png";
import MaeviImage from "@/assets/images/maevi.png";
import Cr8Image from "@/assets/images/cr8.png";
import CassandraImage from "@/assets/images/cassandra-hero.png";
import ProservImage from "@/assets/images/proserv.png";
import MaravillaTaosImage from "@/assets/images/maravilla-taos.png";
import CheerFunderImage from "@/assets/images/cheerfunder.png";
import LeadingLsImage from "@/assets/images/leading-ls.png";
import CasaNorthImage from "@/assets/images/casa-north.png";
import GenerationSmileImage from "@/assets/images/generation-smile-dental-clinic.png";
import CredibleImage from "@/assets/images/credible.jpg";
import PowerhouseImage from "@/assets/images/powerhouse.jpg";
import BehindDigitalsImage from "@/assets/images/behind-digitals.png";
import BehindCourtSiteImage from "@/assets/images/behindcourt-site.jpg";

const websites: Website[] = [
  {
    title: "Credible Skin Evidence",
    description:
      "Shopify storefront for Credible, a dermatologist-developed skincare brand founded by facial plastic surgeon Dr. Prem Tripathi. A custom theme brings clinical results, before-and-after comparisons, key ingredients, FAQs, and reviews to the product page, alongside Recharge subscribe-and-save, a skin quiz, and an Evidence Library blog with article search and categories.",
    image: CredibleImage,
    liveUrl: "https://csevidence.com",
    technologies: ["Shopify", "Liquid", "JavaScript", "CSS", "Recharge"],
    clientLocation: "US",
  },
  {
    title: "Crown Catering",
    description:
      "The Crown Catering website presents a luxurious and elegant visual identity highlighted by a strong crown motif. It delivers a full spectrum of high-quality catering in UAE.",
    image: CrownImage,
    liveUrl: "https://crownuaecatering.com",
    technologies: [
      "Wix Studio",
      "Velo",
      "JavaScript",
      "HTML",
      "CSS",
      "GSAP"
    ],
    clientLocation: "UAE",
  },
  {
    title: "Proserv Hospitality Services",
    description:
      "ProServ Hospitality Services takes pride in delivering a complete range of manpower and facility support solutions designed to meet the needs of hotels, events, resorts, corporate establishments, and industrial operations.",
    image: ProservImage,
    liveUrl: "https://www.proservhospitalityuae.com",
    technologies: [
      "Wix Studio",
      "Velo",
      "JavaScript",
      "HTML",
      "CSS"
    ],
    clientLocation: "UAE",
  },
  {
    title: "Maravilla Taos",
    description:
      "Destination hospitality and experience in Taos—rooms, amenities, and local brand storytelling for visitors and guests.",
    image: MaravillaTaosImage,
    liveUrl: "https://www.maravillataos.com",
    technologies: [
      "Wix Studio",
      "Velo",
      "n8n",
      "Brevo",
      "Quo",
      "Cloudbeds",
      "Supabase",
    ],
    clientLocation: "US",
  },
  {
    title: "CheerFunder",
    description:
      "A cheer team fundraising site by Fishbowl International—spirit merchandise with no upfront inventory cost, a simple two-week campaign, and organizations keeping 50% of proceeds. Built for squads, dance teams, and booster clubs ready to raise without financial risk.",
    image: CheerFunderImage,
    liveUrl: "https://www.cheerfunder.org",
    technologies: ["Wix Studio", "Velo", "HTML", "CSS"],
    clientLocation: "US",
  },
  {
    title: "Leading Ladies Society",
    description:
      "Nonprofit site empowering women and youth through scholarships, mentorship, leadership development, and community programs. Highlights impact stats, partner sponsors, events, gallery moments, and donation pathways for families and community partners.",
    image: LeadingLsImage,
    liveUrl: "https://www.leadingls.com",
    technologies: ["Wix Studio", "Velo", "HTML", "CSS"],
    clientLocation: "US",
  },
  {
    title: "Maevi Creative Studio",
    description:
      "The website was built to make it bold, playful, and creative, with a strong emphasis on Gen Z and millennial aesthetics.",
    image: MaeviImage,
    liveUrl: "https://maevistudio.com",
    technologies: [
      "Wordpress",
      "PHP",
      "WooCommerce",
      "HTML",
      "CSS",
      "React",
      "GSAP",
    ],
    clientLocation: "PH",
  },
  {
    title: "CR8 Agency",
    description:
      "The website showcases a portfolio of creative design and development projects. This project is still under development and the agency wish to rebrand and not deployed on the real domain yet, But has been for private-use.",
    image: Cr8Image,
    liveUrl: "https://cr8-agency.netlify.app/",
    technologies: ["GSAP", "Tailwind CSS", "ReactJS"],
    clientLocation: "PH",
  },
  {
    title: "CassandraDaher",
    description:
      "Cassandra Daher is a passionate practitioner and guide in the field of Emotional Release, specializing in helping others reconnect with their bodies, release stored emotions, and return to a state of inner safety and wholeness.",
    image: CassandraImage,
    liveUrl: "https://www.cassandradaher.com",
    technologies: ["Wix Studio", "Velo", "HTML", "CSS"],
    clientLocation: "US",
  },
  {
    title: "Casa North",
    description:
      "Cinematic real estate media for agents and brokerages—listing films, social reels, photo, and drone built to stop the scroll. Packages cover MLS photography, twilight shoots, branded reels, and custom listing micro-sites with strategy and scripts included.",
    image: CasaNorthImage,
    liveUrl: "https://casa-north.netlify.app",
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    projectType: "mock",
  },
  {
    title: "Generation Smile Dental Clinic",
    description:
      "A family-friendly dental clinic site in Candelaria, Quezon—services, opening promos, FAQs, and Google Maps—with built-in appointment booking that sends requests to the clinic email and syncs confirmed bookings to Google Calendar.",
    image: GenerationSmileImage,
    liveUrl: "https://generation-smile-dental-clinic.netlify.app",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Lucide",
      "Google Maps",
      "Google Calendar",
    ],
    clientLocation: "PH",
  },
  {
    title: "Powerhouse Ice Tube Machine",
    description:
      "Site for a Batangas-based supplier of premium tube-ice machines in the Philippines. A cinematic, scroll-driven story walks buyers through the machines, the production process, and a complete ice business package, with quote requests and consultation booking.",
    image: PowerhouseImage,
    liveUrl: "https://powerhouse-alpha.vercel.app/",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Three.js",
      "GSAP",
      "Framer Motion",
      "Tailwind CSS",
    ],
    clientLocation: "PH",
  },
  {
    title: "Behind Digitals",
    description:
      "The agency site for Behind Digitals—who we are, what we build, the team, case studies, and client testimonials—presenting the websites, automations, and custom systems the studio ships for businesses.",
    image: BehindDigitalsImage,
    liveUrl: "https://behinddigitals.com",
    technologies: ["Next.js", "React", "TypeScript", "GSAP", "Tailwind CSS"],
  },
  {
    title: "BehindCourt Website",
    description:
      "Marketing site for BehindCourt and OnCourt, the venue software for pickleball clubs. An interactive before-and-after slider compares desk ops with court recording, alongside product tours, a venue map, FAQs, and demo booking.",
    image: BehindCourtSiteImage,
    liveUrl: "https://court.behinddigitals.com",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Leaflet"],
  },
  {
    title: "Thryve Organics",
    description:
      "A custom Shopify theme for Thryve Organics, a single-origin Philippine cacao brand—mood-boosting blends, ingredient storytelling, and farmer-first sourcing—paired with a separate dashboard for managing product reviews.",
    technologies: ["Shopify", "Liquid", "JavaScript", "CSS", "Prisma"],
    comingSoon: true,
  },
];

export const WebsitesSection = () => {
  // Embla Carousel setup with continuous auto-scroll
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: true,
    },
    [AutoScroll({ 
      speed: 1,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })]
  );

  // Arrow clicks pause auto-scroll and let it resume after its start delay.
  const scrollBy = useCallback(
    (direction: "prev" | "next") => {
      if (!emblaApi) return;
      emblaApi.plugins().autoScroll?.reset();
      if (direction === "prev") emblaApi.scrollPrev();
      else emblaApi.scrollNext();
    },
    [emblaApi]
  );

  return (
    <section id="web">
      <div className="py-10 md:py-16 lg:py-24 relative">
        <div className="w-full max-w-[1280px] mx-auto px-5 md:px-8">
          <SectionHeader
            index={4}
            eyebrow="Web Design & Development"
            title="Eldriv's Website Portfolio"
            description="Here are some of the websites I've built from the ground up, showcasing modern technologies, responsive design, and SEO-optimized. Each project reflects my commitment to clean architecture, accessibility, and user-centric interfaces."
          />

          <ScrollReveal className="mt-8 md:mt-16 lg:mt-20 relative" delay={0.1}>
            {/* Mobile: Vertical Stack */}
            <div className="block md:hidden space-y-3">
              {websites
                .filter((website) => !website.featured)
                .map((website, index) => (
                  <WebsiteCard 
                    key={website.title}
                    website={website} 
                    index={index}
                  />
                ))}
            </div>

            {/* Desktop: Embla Carousel - Continuous Scroll */}
            <div className="hidden md:block relative">
              <div className="overflow-hidden edge-fade-x" ref={emblaRef}>
                <div className="flex py-3">
                  {/* Duplicate websites array for seamless loop */}
                  {[...websites, ...websites]
                    .filter((website) => !website.featured)
                    .map((website, index) => (
                      <div
                        key={`${website.title}-${index}`}
                        className="flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-4 lg:px-5"
                      >
                        <WebsiteCard 
                          website={website} 
                          index={index % websites.length}
                        />
                      </div>
                    ))}
                </div>
              </div>

              {(["prev", "next"] as const).map((direction) => (
                <button
                  key={direction}
                  type="button"
                  onClick={() => scrollBy(direction)}
                  aria-label={direction === "prev" ? "Previous websites" : "Next websites"}
                  className={`group/arrow absolute top-1/2 z-20 -translate-y-1/2 ${
                    direction === "prev" ? "left-0 lg:-left-3" : "right-0 lg:-right-3"
                  } flex size-12 items-center justify-center rounded-full border border-white/15 bg-[#0c0c0f]/70 text-zinc-200 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_12px_30px_-12px_rgba(0,0,0,0.8)] transition-all duration-300 ease-out hover:scale-105 hover:border-accent/60 hover:bg-accent hover:text-black hover:shadow-[0_0_0_6px_rgba(253,129,40,0.15),0_16px_40px_-12px_rgba(253,129,40,0.55)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70`}
                >
                  <svg
                    className={`size-5 transition-transform duration-300 ease-out ${
                      direction === "prev"
                        ? "group-hover/arrow:-translate-x-0.5"
                        : "rotate-180 group-hover/arrow:translate-x-0.5"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Hover hint with icons - Only show on desktop */}
            <div className="hidden md:flex flex-row items-center justify-center gap-3 mt-8 text-white/55 text-sm px-4 py-2 w-fit mx-auto rounded-full glass-pill">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Hover to pause
              </span>
              <span className="text-white/30">•</span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Drag to explore
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};