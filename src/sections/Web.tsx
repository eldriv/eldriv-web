"use client";

import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

// Components
import { SectionHeader } from "@/components/SectionHeader";
import { WebsiteCard, type Website } from "@/components/WebsiteCard";

// Image imports
import CrownImage from "@/assets/images/crown.png";
import MaeviImage from "@/assets/images/maevi.png";
import Cr8Image from "@/assets/images/cr8.png";
import EvaImage from "@/assets/images/eva-hooft.png";
import CassandraImage from "@/assets/images/cassandra-hero.png";
import ProservImage from "@/assets/images/proserv.png";

// motion
import { motion } from "framer-motion";

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


  return (
    <section id="web">
      <div className="py-12 sm:py-16 lg:py-24 relative" ref={sectionRef}>
        <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 md:px-10">
          <HeaderComponent
            eyebrow="Web Design & Development"
            title="Eldriv's Website Portfolio"
            description="Here are some of the websites I've built from the ground up, showcasing modern technologies, responsive design, and SEO-optimized. Each project reflects my commitment to clean architecture, accessibility, and user-centric interfaces."
          />

          <div className="mt-12 sm:mt-16 md:mt-20 relative">
            {/* Mobile: Vertical Stack */}
            <div className="block sm:hidden space-y-4">
              {websites
                .filter((website) => !website.featured)
                .map((website, index) => (
                  <WebsiteCard 
                    key={website.title}
                    website={website} 
                    index={index} 
                    isVisible={isVisible}
                  />
                ))}
            </div>

            {/* Desktop: Embla Carousel - Continuous Scroll */}
            <div className="hidden sm:block relative">
              {/* Left Gradient Overlay - Desktop only */}
              <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 lg:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
              
              {/* Right Gradient Overlay - Desktop only */}
              <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 lg:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
              
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {/* Duplicate websites array for seamless loop */}
                  {[...websites, ...websites]
                    .filter((website) => !website.featured)
                    .map((website, index) => (
                      <div
                        key={`${website.title}-${index}`}
                        className="flex-[0_0_85%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-3 md:px-4 lg:px-5"
                      >
                        <WebsiteCard 
                          website={website} 
                          index={index % websites.length} 
                          isVisible={isVisible}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Hover hint with icons - Only show on desktop */}
            <div className="hidden sm:flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 text-white/50 text-xs sm:text-sm px-4">
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
      </div>
    </section>
  );
};