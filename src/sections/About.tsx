"use client";

// Components
import { SectionHeader } from "@/components/SectionHeader"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Card } from "@/components/card"
import { CardHeader } from "@/components/cardHeader"
import { ToolboxItems } from "@/components/toolBoxItem"
import { useEffect, useMemo, useRef, useState } from "react"

// SVG Icons
import JavaScriptIcon from "@/assets/icons/square-js.svg"
import HtmlIcon from "@/assets/icons/html5.svg"
import CssIcon from "@/assets/icons/css3.svg"
import ReactIcon from "@/assets/icons/react.svg"
import GithubIcon from "@/assets/icons/github.svg"
import NixIcon from "@/assets/icons/nixos.svg"
import CommonLispIcon from "@/assets/icons/clisp.svg"
import ShellIcon from "@/assets/icons/shell.svg"
import JavaIcon from "@/assets/icons/java.svg"
import PythonIcon from "@/assets/icons/python.svg"
import CSharpIcon from "@/assets/icons/c.svg"
import VBIcon from "@/assets/icons/vbnet.svg"
import VSIcon from "@/assets/icons/vscode.svg"
import EmacsIcon from "@/assets/icons/doom.svg"
import VimIcon from "@/assets/icons/vim.svg"
import WPIcon from "@/assets/icons/wordpress.svg"
import HugoIcon from "@/assets/icons/hugo.svg"
import DockerIcon from "@/assets/icons/docker.svg"
import OracleIcon from "@/assets/icons/oracle.svg"
import LatexIcon from "@/assets/icons/latex.svg"
import MarkdownIcon from "@/assets/icons/markdown.svg"
import OrgIcon from "@/assets/icons/org.svg"
import PandocIcon from "@/assets/icons/pandoc.svg"
import ClogIcon from "@/assets/icons/clog.svg"
import FlameGraphIcon from "@/assets/icons/flamegraph.svg"
import n8nIcon from "@/assets/icons/n8n.svg"
import zapierIcon from "@/assets/icons/zapier.svg"

import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg"
import StarIcon from "@/assets/icons/star.svg"
import Link from "next/link"

// motion
import { motion } from 'framer-motion' 

// Shared hover treatment so every About card feels alive and on-brand.
const cardHoverClass =
  "transition-all duration-300 ease-out will-change-transform motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6),_0_0_0_1px_rgba(253,129,40,0.18)] hover:border-[#fd8128]/40";


const tool = [
  {
    title: "React",
    iconType: ReactIcon,
  },
  {
    title: "CSS",
    iconType: CssIcon,
  },
  {
    title: "HTML",
    iconType: HtmlIcon,
  },
  {
    title: "GitHub",
    iconType: GithubIcon,
  },
  {
    title: "JavaScript",
    iconType: JavaScriptIcon,
  },
  {
    title: "Nix",
    iconType: NixIcon,
  },
  {
    title: "Common Lisp",
    iconType: CommonLispIcon,
  },
  {
    title: "Shell",
    iconType: ShellIcon,
  },
  {
    title: "Java",
    iconType: JavaIcon,
  },
  {
    title: "Python",
    iconType: PythonIcon,
  },
  {
    title: "C#",
    iconType: CSharpIcon,
  },
  {
    title: "VB.net",
    iconType: VBIcon,
  },
  {
    title: "Parenscript",
    // No icon provided in original code
  },
  {
    title: "Emacs",
    iconType: EmacsIcon,
  },
  {
    title: "Vim",
    iconType: VimIcon,
  },
  {
    title: "VSCode",
    iconType: VSIcon,
  },
  {
    title: "WordPress",
    iconType: WPIcon,
  },
  {
    title: "Hugo",
    iconType: HugoIcon,
  },
  {
    title: "Docker",
    iconType: DockerIcon,
  },
  {
    title: "Oracle",
    iconType: OracleIcon,
  },
  {
    title: "LaTeX",
    iconType: LatexIcon,
  },
  {
    title: "Markdown",
    iconType: MarkdownIcon,
  },
  {
    title: "Org",
    iconType: OrgIcon,
  },
  {
    title: "Pandoc",
    iconType: PandocIcon,
  },
  {
    title: "CLOG",
    iconType: ClogIcon,
  },
  {
    title: "FlameGraph",
    iconType: FlameGraphIcon,
  },
  {
    title: "n8n",
    iconType: n8nIcon,
  },
  {
    title: "Zapier",
    iconType: zapierIcon,
  },
];

// Define contribution and project types
interface Contribution {
title: string;
left: string;
top: string;
href: string;
isOpenSource?: boolean;
}

interface OpenSourceProject {
name: string;
href: string;
}

const contributions: Contribution[] = [
{
  title: "Information Mapping System",
  left: "5%",
  top: "35%",
  href: "https://codeberg.org/vti/white-paper/src/branch/main/white-paper.pdf",
},
{
  title: "Vix",
  left: "25%",
  top: "15%",
  href: "https://codeberg.org/vti/vix",
},
{
  title: "Marie",
  left: "50%",
  top: "45%",
  href: "https://codeberg.org/vti/marie",
},
{
  title: "Meria",
  left: "10%",
  top: "70%",
  href: "https://codeberg.org/vti/meria",
},
{
  title: "cl-skel",
  left: "60%",
  top: "20%",
  href: "https://github.com/eldriv/cl-skel",
},
];

// Open-source project options
const openSourceProjects: OpenSourceProject[] = [
{ name: "Vix", href: "https://github.com/veda-systems/vix" },
{ name: "Marie", href: "https://github.com/veda-systems/marie" },
{ name: "Meria", href: "https://github.com/veda-systems/meria" },
{ name: "cl-skel", href: "https://github.com/eldriv/cl-skel" },
];

// "Books In Queue" reading list — rendered as a stylized bookshelf.
type ReadingStatus = "reading" | "next";
interface Book {
  id: string;
  title: string;
  short: string;
  spineLabel: string; // very short label for the rotated spine text on narrow screens
  author: string;
  spine: string;
  status?: ReadingStatus;
}

const books: Book[] = [
  {
    id: "grokking",
    title: "Grokking Algorithms",
    short: "Grokking Algorithms",
    spineLabel: "GROKKING",
    author: "Aditya Y. Bhargava",
    spine: "from-emerald-400 via-emerald-600 to-emerald-800",
    status: "next",
  },
  {
    id: "cloud-native",
    title: "Cloud Native Apps with Docker and Kubernetes",
    short: "Cloud Native Apps",
    spineLabel: "CLOUD NATIVE",
    author: "Jonathan Bartlett",
    spine: "from-[#fd8128] via-orange-600 to-orange-800",
    status: "reading",
  },
  {
    id: "unix",
    title: "UNIX Programmer's Manual",
    short: "UNIX Manual",
    spineLabel: "UNIX",
    author: "Bell Labs",
    spine: "from-amber-300 via-amber-500 to-amber-700",
  },
  {
    id: "networking",
    title: "Networking for Dummies",
    short: "Networking",
    spineLabel: "NETWORKING",
    author: "Doug Lowe",
    spine: "from-yellow-400 via-yellow-600 to-amber-700",
  },
  {
    id: "convict",
    title: "Convict Conditioning",
    short: "Convict Conditioning",
    spineLabel: "CONVICT",
    author: "Paul Wade",
    spine: "from-slate-700 via-slate-800 to-black",
  },
  {
    id: "power",
    title: "The 48 Laws of Power",
    short: "48 Laws of Power",
    spineLabel: "48 LAWS",
    author: "Robert Greene",
    spine: "from-rose-500 via-rose-700 to-rose-900",
  },
];

export const AboutSection = () => {
const constrainRef = useRef<HTMLDivElement>(null);
const [showOpenSourceOptions, setShowOpenSourceOptions] = useState(false);
const [activeContribution, setActiveContribution] = useState<Contribution | null>(null);
// On mobile we drop the drift/drag and use a tidy wrap layout — the
// scattered absolute positions don't fit the narrow card width.
const [isMobile, setIsMobile] = useState(false);
// Bookshelf — hovering a spine swaps the headline detail row.
const [hoveredBookIdx, setHoveredBookIdx] = useState<number | null>(null);
const displayedBook = useMemo(() => {
  if (hoveredBookIdx !== null) return books[hoveredBookIdx];
  return books.find((b) => b.status === "reading") ?? books[0];
}, [hoveredBookIdx]);

useEffect(() => {
  const mq = window.matchMedia("(max-width: 767px)");
  const update = () => setIsMobile(mq.matches);
  update();
  mq.addEventListener("change", update);
  return () => mq.removeEventListener("change", update);
}, []);

// Close project selection when clicking outside
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (showOpenSourceOptions && 
        constrainRef.current && 
        !(constrainRef.current as any).contains(event.target)) {
      setShowOpenSourceOptions(false);
      setActiveContribution(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [showOpenSourceOptions]);

const handleContributionClick = (contribution: Contribution, e: React.MouseEvent<HTMLAnchorElement>) => {
  if (contribution.isOpenSource) {
    e.preventDefault();
    // Toggle the open source options when clicking on the open-source libraries button
    if (showOpenSourceOptions && activeContribution?.title === contribution.title) {
      setShowOpenSourceOptions(false);
      setActiveContribution(null);
    } else {
      setShowOpenSourceOptions(true);
      setActiveContribution(contribution);
    }
  }
};

return (
  <section id="about">
  <div className="py-12 sm:py-16 lg:py-24 relative">
    <div className="container px-4 sm:px-6 md:px-8" style={{ maxWidth: "1280px"}}>
      <SectionHeader
        eyebrow="About Me"
        title="More about Eldriv's"
        description="Learn more about my technical proficiencies, my side-projects, and what inspires me as a Software Engineer and Web Developer."
      />
      <ScrollReveal delay={0.08} className="mt-12 sm:mt-16 md:mt-20 flex flex-col gap-6 sm:gap-8">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className={`h-[280px] sm:h-[300px] md:h-[320px] md:col-span-1 lg:col-span-1 overflow-hidden flex flex-col p-0 ${cardHoverClass}`}>
            <CardHeader
              title="Books In Queue"
              description="The books that I'm currently reading."
              className="px-4 sm:px-6 pt-4 sm:pt-6 pb-0"
            />
            <div className="relative flex-1 flex flex-col px-4 sm:px-6 pb-4 sm:pb-6">
              {/* Dynamic detail row — reflects the hovered spine, falls back to the
                  current "reading" book when nothing is hovered. */}
              <div className="flex items-center gap-2 min-h-[28px] -mt-1">
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] flex-shrink-0 ${
                    displayedBook.status === "reading"
                      ? "bg-[#fd8128]/15 ring-1 ring-[#fd8128]/30 text-[#fd8128]"
                      : displayedBook.status === "next"
                      ? "bg-emerald-300/15 ring-1 ring-emerald-300/30 text-emerald-300"
                      : "bg-white/5 ring-1 ring-white/15 text-white/60"
                  }`}
                >
                  {displayedBook.status === "reading" && (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[#fd8128] opacity-75 animate-ping" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#fd8128]" />
                    </span>
                  )}
                  {displayedBook.status === "reading"
                    ? "Now Reading"
                    : displayedBook.status === "next"
                    ? "Up Next"
                    : "Queued"}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm text-white truncate font-medium">
                    {displayedBook.short}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-white/50 truncate font-mono">
                    {displayedBook.author}
                  </div>
                </div>
              </div>

              {/* Bookshelf */}
              <div className="flex-1 flex items-end justify-center gap-1.5 sm:gap-2 pt-3">
                {books.map((book, idx) => {
                  const isReading = book.status === "reading";
                  const isUpNext = book.status === "next";
                  return (
                    <motion.button
                      key={book.id}
                      type="button"
                      onMouseEnter={() => setHoveredBookIdx(idx)}
                      onMouseLeave={() => setHoveredBookIdx(null)}
                      onFocus={() => setHoveredBookIdx(idx)}
                      onBlur={() => setHoveredBookIdx(null)}
                      aria-label={`${book.title} by ${book.author}`}
                      className={`relative h-[130px] sm:h-[145px] md:h-[160px] w-8 sm:w-10 md:w-11 rounded-sm bg-gradient-to-b ${book.spine} cursor-pointer flex-shrink-0 shadow-[0_6px_14px_-4px_rgba(0,0,0,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800`}
                      animate={{ y: [0, -1.5, 0, 1.5, 0] }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: (idx * 0.22) % 5,
                      }}
                      whileHover={{
                        y: -8,
                        scale: 1.08,
                        transition: { duration: 0.25, ease: "easeOut" },
                      }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {/* Spine chrome — soft inner highlight + opposite-edge shadow give it dimension. */}
                      <span className="pointer-events-none absolute inset-y-0 left-0 w-px bg-black/45" />
                      <span className="pointer-events-none absolute inset-y-0 right-0 w-px bg-white/30" />
                      <span className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-b from-white/25 to-transparent" />
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="pointer-events-none absolute inset-x-1 top-3 h-px bg-white/20" />
                      <span className="pointer-events-none absolute inset-x-1 bottom-5 h-px bg-white/20" />

                      {/* Vertical title — uses CSS writing-mode for clean rotation that respects line-height. */}
                      <span
                        className="absolute inset-0 flex items-center justify-center text-[9px] sm:text-[10px] md:text-[11px] font-bold text-white/95 whitespace-nowrap drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] tracking-wide px-1"
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {book.spineLabel}
                      </span>

                      {/* Status pin — pulse for currently reading, soft for up next. */}
                      {isReading && (
                        <span className="absolute -top-1 left-1/2 -translate-x-1/2 flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-[#fd8128] opacity-75 animate-ping" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#fd8128] ring-2 ring-gray-800" />
                        </span>
                      )}
                      {isUpNext && (
                        <span className="absolute -top-1 left-1/2 -translate-x-1/2 inline-flex h-2 w-2 rounded-full bg-emerald-300 ring-2 ring-gray-800" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </Card>
          <Card className={`h-[280px] sm:h-[300px] md:h-[320px] md:col-span-1 lg:col-span-2 flex flex-col ${cardHoverClass}`}>
            <CardHeader
              title="Toolbox"
              description="Explore the technologies that I am proficient with."
              className="px-4 sm:px-6"
            />
            <div className="flex-1 flex flex-col justify-end pb-6 sm:pb-8 md:pb-10">
              <ToolboxItems 
              tools={tool} 
              className="mt-3" 
              itemsWrapperClassName="animate-move-left [animation-duration:80s]"/>
              <ToolboxItems
                tools={tool}
                className="mt-6"
                itemsWrapperClassName="-translate-x-1/2 animate-move-right [animation-duration:80s]"
              />
            </div>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className={`h-[280px] sm:h-[300px] md:h-[320px] p-0 flex flex-col md:col-span-1 lg:col-span-1 ${cardHoverClass}`}>
            <CardHeader
              title="Collaborations"
              description="Tap to explore my tech contributions and my side-projects."
              className="px-4 sm:px-6 py-4 sm:py-6"
            />
            <div
              className={`relative flex-1 ${isMobile ? "flex flex-wrap items-center justify-center gap-2 px-4 pb-4 content-center" : ""}`}
              ref={constrainRef}
            >
              {contributions.map((contribution, pillIndex) => {
                // Each pill gets its own little spline so the group never moves
                // in lock-step. Different durations + offsets keep the chaos
                // looking intentional rather than mechanical.
                const driftSpec = [
                  { x: [0, 8, -4, 6, 0], y: [0, -6, 4, -2, 0], duration: 9 },
                  { x: [0, -7, 5, -3, 0], y: [0, 5, -4, 3, 0], duration: 11 },
                  { x: [0, 6, -5, 3, 0], y: [0, -4, 6, -2, 0], duration: 13 },
                  { x: [0, -5, 4, -7, 0], y: [0, 3, -5, 4, 0], duration: 10 },
                  { x: [0, 4, -6, 8, 0], y: [0, -3, 5, -4, 0], duration: 12 },
                ][pillIndex % 5];

                return (
                  <motion.a
                    key={contribution.title}
                    href={contribution.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => handleContributionClick(contribution, e)}
                    className={`inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-emerald-300 to-[#FD8128] rounded-full py-1 sm:py-1 md:py-1.5 cursor-pointer text-[11px] sm:text-xs md:text-sm shadow-[0_6px_16px_-6px_rgba(253,129,40,0.5)] ${
                      isMobile ? "relative" : "absolute"
                    }`}
                    style={isMobile ? undefined : { left: contribution.left, top: contribution.top }}
                    drag={!isMobile}
                    dragConstraints={isMobile ? undefined : constrainRef}
                    animate={isMobile ? { x: 0, y: 0 } : { x: driftSpec.x, y: driftSpec.y }}
                    transition={
                      isMobile
                        ? { duration: 0.2 }
                        : {
                            duration: driftSpec.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: pillIndex * 0.4,
                          }
                    }
                    whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.96 }}
                    whileDrag={isMobile ? undefined : { scale: 1.1, zIndex: 20 }}
                  >
                    <span className="font-medium text-gray-950 whitespace-nowrap">{contribution.title}</span>
                    <ArrowUpRightIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-950 flex-shrink-0" />
                  </motion.a>
                );
              })}

              {showOpenSourceOptions && (
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg z-10 max-w-[90%] sm:max-w-none">
                  <div className="flex flex-col gap-1.5 sm:gap-2 mb-16 sm:mb-20">
                    <h4 className="text-emerald-300 font-medium text-sm sm:text-base">Select a Project</h4>
                    {openSourceProjects.map((project) => (
                      <a
                        key={project.name}
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors text-sm sm:text-base"
                        onClick={(e) => {
                          // Don't close the popup when clicking a project link
                          e.stopPropagation();
                        }}
                      >
                        <span>{project.name}</span>
                        <ArrowUpRightIcon className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-300" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
          <Card className={`h-[320px] sm:h-[340px] md:h-[320px] p-0 relative md:col-span-1 lg:col-span-1 group/research ${cardHoverClass}`}>
            <div className="relative h-full p-4 sm:p-6 flex flex-col">
              {/* Decorative chart graphic in the background — hints at "forecasting" without shouting. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 120 60"
                className="pointer-events-none absolute right-3 top-3 w-24 sm:w-28 h-12 sm:h-14 text-[#fd8128]/20 group-hover/research:text-[#fd8128]/35 transition-colors duration-500"
              >
                <defs>
                  <linearGradient id="researchLine" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="currentColor" stopOpacity="0.2" />
                    <stop offset="1" stopColor="currentColor" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <g stroke="currentColor" strokeWidth="0.4" opacity="0.35">
                  <line x1="0" y1="15" x2="120" y2="15" />
                  <line x1="0" y1="30" x2="120" y2="30" />
                  <line x1="0" y1="45" x2="120" y2="45" />
                </g>
                <polyline
                  fill="none"
                  stroke="url(#researchLine)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="0,42 18,36 32,40 48,28 64,32 80,18 96,22 120,8"
                />
              </svg>

              <span className="inline-flex items-center self-start gap-1.5 px-2 py-0.5 rounded-full bg-emerald-300/10 ring-1 ring-emerald-300/25 text-emerald-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-3">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="9" y1="13" x2="15" y2="13" />
                  <line x1="9" y1="17" x2="13" y2="17" />
                </svg>
                Capstone Research
              </span>

              <div className="inline-flex items-center gap-2 mb-2">
                <StarIcon className="size-7 sm:size-8 text-emerald-300" />
                <h3 className="font-sans text-2xl sm:text-3xl text-white">Research</h3>
              </div>

              <h4 className="text-sm sm:text-base font-semibold text-[#fd8128] leading-snug mb-3 border-l-2 border-[#fd8128]/60 pl-3">
                Evaluating the Efficacy of ARIMA in Forecasting Rootcrops Prices in NCR.
              </h4>

              <p className="text-xs sm:text-sm text-white/75 leading-relaxed flex-1">
                Assessment of ARIMA model effectiveness for forecasting prices of five key root crops in the National Capital Region of the Philippines.
              </p>

              <Link
                href="https://docs.google.com/document/d/1uKjc8QfxJVrcqyIhEklHguA3H9d2d6mcAyxkeH1gdC4/edit?tab=t.0"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center self-start gap-1.5 px-3 py-1.5 rounded-full bg-emerald-300/10 hover:bg-[#fd8128]/15 ring-1 ring-emerald-300/30 hover:ring-[#fd8128]/50 text-emerald-300 hover:text-[#fd8128] text-xs sm:text-sm font-medium transition-all"
              >
                View Research
                <ArrowUpRightIcon className="w-3.5 h-3.5 transition-transform group-hover/research:translate-x-0.5 group-hover/research:-translate-y-0.5" />
              </Link>
            </div>
          </Card>
          <Card className={`h-[320px] sm:h-[340px] md:h-[320px] p-0 relative md:col-span-1 lg:col-span-1 bg-gradient-to-br from-black/80 via-slate-900 to-slate-900 ${cardHoverClass}`}>
            <div className="relative h-full p-4 sm:p-6 flex flex-col">
              {/* Live "available" status — small but punchy. */}
              <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-400/10 ring-1 ring-emerald-400/30 text-emerald-300 text-[10px] sm:text-xs font-semibold">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Available
              </span>

              <div className="inline-flex items-center gap-2 mb-2 pr-24">
                <StarIcon className="size-7 sm:size-8 text-emerald-300" />
                <h3 className="font-sans text-2xl sm:text-3xl text-white">Contact</h3>
              </div>

              <p className="text-sm sm:text-base text-white font-medium mb-2">
                Let&apos;s create something amazing together.
              </p>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4">
                Passionate about websites, AI, and software engineering? I&apos;d love to connect.
              </p>

              <a
                href="mailto:eldriv@proton.me"
                className="group/email flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-white/5 hover:bg-[#fd8128]/10 ring-1 ring-white/10 hover:ring-[#fd8128]/40 transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-400/15 ring-1 ring-emerald-400/30 grid place-items-center">
                    <svg className="w-3.5 h-3.5 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] text-white/50 uppercase tracking-wider leading-tight">Email</div>
                    <div className="text-xs sm:text-sm text-white truncate group-hover/email:text-[#fd8128] transition-colors">eldriv@proton.me</div>
                  </div>
                </div>
                <ArrowUpRightIcon className="w-4 h-4 text-white/50 group-hover/email:text-[#fd8128] flex-shrink-0 transition-colors" />
              </a>

              <div className="flex items-center gap-2 mt-3">
                <a
                  href="https://github.com/eldriv"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#fd8128]/15 ring-1 ring-white/10 hover:ring-[#fd8128]/40 grid place-items-center transition-all hover:-translate-y-0.5"
                >
                  <GithubIcon className="w-4 h-4 text-emerald-300" />
                </a>
                <a
                  href="https://www.linkedin.com/in/michael-adrian-villareal-9a344634a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#fd8128]/15 ring-1 ring-white/10 hover:ring-[#fd8128]/40 grid place-items-center transition-all hover:-translate-y-0.5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-emerald-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.027-3.063-1.867-3.063-1.872 0-2.159 1.461-2.159 2.971v5.696h-3v-11h2.879v1.509h.041c.401-.757 1.381-1.557 2.841-1.557 3.038 0 3.6 2.001 3.6 4.604v6.444z"/>
                  </svg>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </ScrollReveal>
    </div>
    <style jsx>{`
      @keyframes float-up {
        0% {
          transform: translateY(40px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      .transition-all {
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 2000ms;
      }
    `}</style>
  </div>
</section>
);
};