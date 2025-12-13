"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Components
import { Card } from "@/components/card";

// SVG Icons
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import GithubIcon from "@/assets/icons/github.svg";

export type ClientLocation = "US" | "UAE" | "PH";

export interface Website {
  title: string;
  description: string;
  image: StaticImageData | string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured?: boolean;
  clientLocation: ClientLocation;
}

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

interface WebsiteCardProps {
  website: Website;
  index: number;
  isVisible: boolean;
}

export const WebsiteCard = ({
  website,
  index,
  isVisible,
}: WebsiteCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 120; // Character limit for truncated description
  const needsTruncation = website.description.length > maxLength;
  const hasHiddenContent = needsTruncation || website.technologies.length > 0 || website.liveUrl || website.githubUrl;
  const displayDescription = isExpanded || !needsTruncation 
    ? website.description 
    : `${website.description.substring(0, maxLength)}...`;

  const handleCardClick = () => {
    if (website.liveUrl && !isExpanded) {
      window.open(website.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <Card
        className={`min-h-[400px] sm:min-h-[360px] md:min-h-[380px] ${!isExpanded ? 'sm:h-[360px] md:h-[380px]' : ''} p-0 flex flex-col group transition-all duration-300 ease-in-out touch-manipulation ${
          website.liveUrl && !isExpanded ? 'cursor-pointer' : ''
        } ${
          website.featured ? "md:col-span-2 lg:col-span-2" : ""
        }`}
        onClick={website.liveUrl && !isExpanded ? handleCardClick : undefined}
      >
        {/* Project Image */}
        <div className="relative h-40 sm:h-40 md:h-44 overflow-hidden rounded-t-2xl sm:rounded-t-3xl bg-gradient-to-br from-emerald-300/20 to-[#FD8128]/20 flex-shrink-0">
          {website.image ? (
            <Image
              src={website.image}
              alt={website.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-300/10 to-[#FD8128]/10">
              <span className="text-6xl opacity-20">🌐</span>
            </div>
          )}
          {/* Glassy hover effect - slides from left to right */}
          <div className="absolute inset-0 overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
            <div className="absolute inset-y-0 left-0 w-[200%] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          
          {/* Client Location Badge */}
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10">
            <span className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1 text-[11px] sm:text-xs font-semibold rounded-full border backdrop-blur-sm ${getLocationBadgeColors(website.clientLocation)}`}>
              <span className="text-base sm:text-base">{getLocationFlag(website.clientLocation)}</span>
              <span className="hidden sm:inline">{website.clientLocation} CLIENT</span>
              <span className="sm:hidden">{website.clientLocation}</span>
            </span>
          </div>
        </div>

        {/* Project Content */}
        <div className="flex flex-col p-4 sm:p-5 md:p-6 min-h-0">
          <div className="flex items-start justify-between mb-3 sm:mb-3 gap-3 flex-shrink-0">
            <h3 className="font-bold text-lg sm:text-lg md:text-xl text-white group-hover:text-emerald-300 transition-colors flex-1 min-w-0 leading-tight">
              {website.title}
            </h3>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -10 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="flex gap-2 sm:gap-2 flex-shrink-0"
                >
                  {website.liveUrl && (
                    <a
                      href={website.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 sm:p-2 rounded-full bg-gray-800 hover:bg-emerald-300/20 active:bg-emerald-300/30 transition-colors group/link touch-manipulation"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ArrowUpRightIcon className="w-4 h-4 sm:w-4 sm:h-4 text-emerald-300 group-hover/link:text-white" />
                    </a>
                  )}
                  {website.githubUrl && (
                    <a
                      href={website.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 sm:p-2 rounded-full bg-gray-800 hover:bg-emerald-300/20 active:bg-emerald-300/30 transition-colors group/github touch-manipulation"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GithubIcon className="w-4 h-4 sm:w-4 sm:h-4 text-emerald-300 group-hover/github:text-white" />
                    </a>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mb-4 sm:mb-4">
            <motion.p
              key={isExpanded ? 'expanded' : 'collapsed'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="text-white/70 text-sm sm:text-sm leading-relaxed"
            >
              {displayDescription}
            </motion.p>
            {hasHiddenContent && (
              <button
                onClick={handleReadMoreClick}
                className="mt-2 text-emerald-300 hover:text-emerald-200 text-xs sm:text-sm font-medium transition-colors touch-manipulation"
              >
                {isExpanded ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>

          {/* Technologies */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="flex flex-wrap gap-2 sm:gap-2 flex-shrink-0 overflow-hidden"
              >
                {website.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: techIndex * 0.05 }}
                    className="px-2.5 sm:px-3 py-1 sm:py-1 text-[11px] sm:text-xs rounded-full bg-gradient-to-r from-emerald-300/20 to-[#FD8128]/20 text-emerald-300 border border-emerald-300/20"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
};

