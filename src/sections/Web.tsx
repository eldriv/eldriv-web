"use client";

import Image, { StaticImageData } from "next/image"; 

// Components
import { SectionHeader } from "@/components/SectionHeader"
import { Card } from "@/components/card"
import { CardHeader } from "@/components/cardHeader"
import { useEffect, useRef, useState } from "react"

// SVG Icons
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg"
import GithubIcon from "@/assets/icons/github.svg"

// Image imports
import KreiImage from "@/assets/images/krei.png"
import MaeviImage from "@/assets/images/maevi.png"
import Cr8Image from "@/assets/images/cr8.png"

// motion
import { motion } from 'framer-motion'

interface Website {
  title: string;
  description: string;
  image: StaticImageData | string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured?: boolean;
}

// Sample website data - replace with your actual projects
const websites: Website[] = [
  {
    title: "Krei.Systems",
    description: "Emphasize clean, readable pages with consistent sections, prioritizing content clarity over decorative styling.",
    image: KreiImage,
    liveUrl: "https://krei.systems.com",
    githubUrl: "https://github.com/krei-systems",
    technologies: ["Wordpress"]
  },
  {
    title: "Maevi Creative Studio",
    description: "The website was built to make it bold, playful, and creative, with a strong emphasis on Gen Z and millennial aesthetics.",
    image: MaeviImage,
    liveUrl: "https://maevistudio.com",
    technologies: ["Wordpress"]
  },
  {
    title: "CR8 Agency",
    description: "The website showcases a portfolio of creative design and development projects. This project is still under development and not deployed yet on the real domain.",
    image: Cr8Image,
    liveUrl: "https://cr8-eldrivs-projects.vercel.app/",
    technologies: ["GSAP", "Tailwind CSS", "ReactJS",]
  },

];

export const WebsitesSection = () => {
  const HeaderComponent = SectionHeader();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Animation visibility effect
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

  const WebsiteCard = ({ website, index }: { website: Website; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}>
      <Card className={`h-[400px] p-0 flex flex-col group hover:scale-[1.02] transition-all duration-300 ${
        website.featured ? 'md:col-span-2 lg:col-span-2' : ''
      }`}>
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

  return (
    <section id="about">
      <div className="py-16 lg:py-28 relative" ref={sectionRef}>
        <div className="container" style={{ maxWidth: "1500px" }}>
          <HeaderComponent
            eyebrow=""
            title="Website Development"
            description="Here are some of the websites I've built, showcasing modern technologies, responsive design, and SEO-optimized. Each project reflects my commitment to clean architecture, accessibility, and user-centric interfaces."
          />
          
          <div className="mt-20">
            {/* Other Projects */}
            <div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {websites.filter(website => !website.featured).map((website, index) => (
                  <WebsiteCard key={website.title} website={website} index={index + 1} />
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
          </motion.div>
        </div>

        <style jsx>{`
          .container {
            margin: 0 auto;
            padding: 0 1rem;
          }
          
          @media (min-width: 768px) {
            .container {
              padding: 0 2rem;
            }
          }
        `}</style>
      </div>
    </section>
  );
};