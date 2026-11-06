"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { scrollViewport } from "@/components/scroll-reveal";

// Components
import { Card } from "@/components/card";
import { ScreenshotGallery, type Screenshot } from "@/components/ScreenshotGallery";

// SVG Icons
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import GithubIcon from "@/assets/icons/github.svg";

export type ClientLocation = "US" | "UAE" | "PH";

export interface Website {
  title: string;
  description: string;
  image?: StaticImageData | string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured?: boolean;
  clientLocation?: ClientLocation;
  projectType?: "client" | "app" | "mock";
  screenshots?: Screenshot[];
}

const badgeColors = "bg-[#0c0c0f]/80 text-zinc-200 border-white/15";

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
}

export const WebsiteCard = ({
  website,
  index,
}: WebsiteCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const hasGallery = (website.screenshots?.length ?? 0) > 0;
  const isClickable = hasGallery || Boolean(website.liveUrl);
  const maxLength = 120; // Character limit for truncated description
  const needsTruncation = website.description.length > maxLength;
  const hasHiddenContent = needsTruncation || website.technologies.length > 0 || website.liveUrl || website.githubUrl;
  const displayDescription = isExpanded || !needsTruncation 
    ? website.description 
    : `${website.description.substring(0, maxLength)}...`;

  const handleCardClick = () => {
    if (hasGallery) {
      setIsGalleryOpen(true);
    } else if (website.liveUrl) {
      window.open(website.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={scrollViewport}
      transition={{
        duration: 0.6,
        delay: (index % 6) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <Card
        className={`md:min-h-[380px] ${!isExpanded ? 'md:h-[380px]' : ''} p-0 flex flex-col group transition-all duration-300 ease-out touch-manipulation motion-safe:hover:-translate-y-1 hover:border-accent/40 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_30px_60px_-30px_rgba(253,129,40,0.35)] ${
          isClickable ? 'cursor-pointer' : ''
        } ${
          website.featured ? "md:col-span-2 lg:col-span-2" : ""
        }`}
        onClick={isClickable ? handleCardClick : undefined}
        role={hasGallery ? 'button' : website.liveUrl ? 'link' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={
          isClickable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick();
                }
              }
            : undefined
        }
        aria-label={
          hasGallery
            ? `View ${website.title} screenshots`
            : website.liveUrl
              ? `Open ${website.title} in a new tab`
              : undefined
        }
      >
        {/* Project Image */}
        <div className="relative m-2 md:m-2.5 h-36 md:h-44 overflow-hidden rounded-xl md:rounded-2xl ring-1 ring-white/10 bg-gradient-to-br from-white/10 to-white/5 flex-shrink-0">
          {website.image ? (
            <Image
              src={website.image}
              alt={website.title}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
              <span className="glass-pill flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-semibold tracking-wide text-white/80">
                {website.title.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
          {/* Glassy hover effect - slides from left to right */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute inset-y-0 left-0 w-[200%] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          
          {hasGallery && (
            <span className="glass-strong absolute bottom-2 right-2 z-10 rounded-full px-2 py-0.5 type-meta text-zinc-200 md:bottom-3 md:right-3 md:px-2.5 md:py-1">
              {website.screenshots!.length} screenshots ↗
            </span>
          )}

          {/* Project badge */}
          <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10">
            {website.projectType === "app" ? (
              <span className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-0.5 md:py-1 type-meta rounded-full border backdrop-blur-md bg-[#0c0c0f]/80 text-zinc-200 border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                <span className="text-xs md:text-sm">⚡</span>
                <span>WEB APP</span>
              </span>
            ) : website.projectType === "mock" ? (
              <span className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-0.5 md:py-1 type-meta rounded-full border backdrop-blur-md bg-[#0c0c0f]/80 text-zinc-200 border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                <span className="text-xs md:text-sm">✦</span>
                <span className="hidden md:inline">MOCK DESIGN PORTFOLIO</span>
                <span className="md:hidden">MOCK DESIGN</span>
              </span>
            ) : website.clientLocation ? (
              <span className={`flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-0.5 md:py-1 type-meta rounded-full border backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] ${badgeColors}`}>
                <span className="text-sm md:text-base">{getLocationFlag(website.clientLocation)}</span>
                <span>{website.clientLocation} CLIENT</span>
              </span>
            ) : null}
          </div>
        </div>

        {/* Project Content */}
        <div className="flex flex-col px-3.5 pb-3.5 pt-1.5 md:px-6 md:pb-6 md:pt-2 min-h-0">
          <div className="flex items-start justify-between mb-2 md:mb-3 gap-3 flex-shrink-0">
            <h3 className="type-card-title text-zinc-100 group-hover:text-accent transition-colors flex-1 min-w-0">
              {website.title}
            </h3>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -10 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="flex gap-2 flex-shrink-0"
                >
                  {website.liveUrl && (
                    <a
                      href={website.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full glass-pill hover:bg-white/[0.06] active:bg-white/[0.06] transition-colors group/link touch-manipulation"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ArrowUpRightIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-200 group-hover/link:text-white" />
                    </a>
                  )}
                  {website.githubUrl && (
                    <a
                      href={website.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full glass-pill hover:bg-white/[0.06] active:bg-white/[0.06] transition-colors group/github touch-manipulation"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GithubIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-200 group-hover/github:text-white" />
                    </a>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mb-1 md:mb-4">
            <motion.p
              key={isExpanded ? 'expanded' : 'collapsed'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="type-body text-white/70"
            >
              {displayDescription}
            </motion.p>
            {hasHiddenContent && (
              <button
                onClick={handleReadMoreClick}
                className="mt-1.5 md:mt-2 text-accent hover:text-accent-soft text-sm font-medium transition-colors touch-manipulation"
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
                className="flex flex-wrap gap-1.5 md:gap-2 mt-2 md:mt-0 flex-shrink-0 overflow-hidden"
              >
                {website.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: techIndex * 0.05 }}
                    className="px-2 md:px-3 py-0.5 md:py-1 text-xs rounded-full bg-gradient-to-r from-white/10 to-white/5 text-zinc-200 border border-white/15"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
      {hasGallery && (
        <ScreenshotGallery
          title={website.title}
          screenshots={website.screenshots!}
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
        />
      )}
    </motion.div>
  );
};
