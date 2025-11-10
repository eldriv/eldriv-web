"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

// Components
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/card";

// SVG Icons
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import GithubIcon from "@/assets/icons/github.svg";

// Image imports
import CrownImage from "@/assets/images/crown.png";
import MaeviImage from "@/assets/images/maevi.png";
import Cr8Image from "@/assets/images/cr8.png";
import EvaImage from "@/assets/images/eva-hooft.png";
import CassandraImage from "@/assets/images/cassandra.png";
import ProservImage from "@/assets/images/proserv.png";

// motion
import { motion } from "framer-motion";

type ClientLocation = "US" | "UAE" | "PH";

interface Website {
  title: string;
  description: string;
  image: StaticImageData | string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured?: boolean;
  clientLocation: ClientLocation;
}

const websites: Website[] = [
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
    title: "Eva Hooft",
    description:
      "A holistic health and detox coaching website that combines functional detox with emotional release and spiritual guidance. Features programs for physical detoxification, quantum healing, and nervous system support.",
    image: EvaImage,
    liveUrl: "https://evahooft.com",
    technologies: ["Wix Studio", "Velo", "HTML", "CSS"],
    clientLocation: "US",
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
];

const getLocationBadgeColors = (location: ClientLocation) => {
  switch (location) {
    case "US":
      return "bg-blue-500/20 text-blue-300 border-blue-400/30";
    case "UAE":
      return "bg-amber-500/20 text-amber-300 border-amber-400/30";
    case "PH":
      return "bg-red-500/20 text-red-300 border-red-400/30";
    default:
      return "bg-gray-500/20 text-gray-300 border-gray-400/30";
  }
};

const getLocationFlag = (location: ClientLocation) => {
  switch (location) {
    case "US":
      return "🇺🇸";
    case "UAE":
      return "🇦🇪";
    case "PH":
      return "🇵🇭";
    default:
      return "🌐";
  }
};

export const WebsitesSection = () => {
  const HeaderComponent = SectionHeader();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const WebsiteCard = ({
    website,
    index,
  }: {
    website: Website;
    index: number;
  }) => {
    const cardContent = (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="h-full"
      >
        <Card
          className={`h-[400px] p-0 flex flex-col group hover:scale-[1.02] transition-all duration-300 cursor-pointer ${
            website.featured ? "md:col-span-2 lg:col-span-2" : ""
          }`}
        >
          {/* Project Image */}
          <div className="relative h-48 overflow-hidden rounded-t-3xl bg-gradient-to-br from-emerald-300/20 to-[#FD8128]/20">
            {website.image ? (
              <Image
                src={website.image}
                alt={website.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-300/10 to-[#FD8128]/10">
                <span className="text-6xl opacity-20">🌐</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            
            {/* Client Location Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-sm ${getLocationBadgeColors(website.clientLocation)}`}>
                <span className="text-base">{getLocationFlag(website.clientLocation)}</span>
                {website.clientLocation} CLIENT
              </span>
            </div>
          </div>

          {/* Project Content */}
          <div className="flex-1 flex flex-col p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-lg text-white group-hover:text-emerald-300 transition-colors">
                {website.title}
              </h3>
              <div className="flex gap-2">
                {website.liveUrl && (
                  <a
                    href={website.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-800 hover:bg-emerald-300/20 transition-colors group/link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ArrowUpRightIcon className="w-4 h-4 text-emerald-300 group-hover/link:text-white" />
                  </a>
                )}
                {website.githubUrl && (
                  <a
                    href={website.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-800 hover:bg-emerald-300/20 transition-colors group/github"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <GithubIcon className="w-4 h-4 text-emerald-300 group-hover/github:text-white" />
                  </a>
                )}
              </div>
            </div>

            <p className="text-white/70 text-sm mb-4 flex-1">
              {website.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {website.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-emerald-300/20 to-[#FD8128]/20 text-emerald-300 border border-emerald-300/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    );

    return website.liveUrl ? (
      <a
        href={website.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {cardContent}
      </a>
    ) : (
      cardContent
    );
  };

  return (
    <section>
      <div className="py-16 lg:py-28 relative" ref={sectionRef}>
        <div className="container" style={{ maxWidth: "1500px" }}>
          <HeaderComponent
            eyebrow="Web Design & Development"
            title="Eldriv's Website Portfolio"
            description="Here are some of the websites I've built from the ground up, showcasing modern technologies, responsive design, and SEO-optimized. Each project reflects my commitment to clean architecture, accessibility, and user-centric interfaces."
          />

          <div className="mt-20 relative">
            {/* Embla Carousel - Continuous Scroll */}
            <div className="relative">
              {/* Left Gradient Overlay */}
              <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
              
              {/* Right Gradient Overlay */}
              <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
              
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {/* Duplicate websites array for seamless loop */}
                  {[...websites, ...websites]
                    .filter((website) => !website.featured)
                    .map((website, index) => (
                      <div
                        key={`${website.title}-${index}`}
                        className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4 md:px-5"
                      >
                        <WebsiteCard website={website} index={index % websites.length} />
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Hover hint with icons */}
            <div className="flex items-center justify-center gap-3 mt-8 text-white/50 text-sm">
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
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          ></motion.div>
        </div>

        <style jsx>{`
          .container {
            margin: 0 auto;
            padding: 0 1.5rem;
          }

          @media (min-width: 640px) {
            .container {
              padding: 0 2rem;
            }
          }

          @media (min-width: 768px) {
            .container {
              padding: 0 2.5rem;
            }
          }

          @media (min-width: 1024px) {
            .container {
              padding: 0 3rem;
            }
          }

          @media (min-width: 1280px) {
            .container {
              padding: 0 4rem;
            }
          }
        `}</style>
      </div>
    </section>
  );
};