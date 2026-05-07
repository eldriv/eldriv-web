"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Components
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/card";

// Images
import memojiAvatar1 from "@/assets/images/taijitu-lisp.png";
import memojiAvatar2 from "@/assets/images/taijitu-lisp.png";
import memojiAvatar3 from "@/assets/images/tmux.png";
import memojiAvatar4 from "@/assets/images/nixos.png";
import memojiAvatar5 from "@/assets/images/docker.png";
import memojiAvatar6 from "@/assets/images/taijitu-lisp.png";
import memojiAvatar7 from "@/assets/images/taijitu-lisp.png";
import memojiAvatar8 from "@/assets/images/ubuntu.png";

// Icons
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";

interface Preview {
  filename: string;
  lines: string[];
}

interface Article {
  name: string;
  topic: string;
  text: string;
  avatar: any;
  href: string;
  target: string;
  tags: string[];
  preview?: Preview;
}

const Articles: Article[] = [
  {
    name: "Building 'adz' in Common Lisp with Clingon",
    topic: "Programming",
    text: "Engineers need tools that prioritize efficiency and flexibility — Clingon makes building purpose-built CLIs in Common Lisp surprisingly elegant.",
    avatar: memojiAvatar1,
    href: "https://eldriv-blogs.netlify.app/en/adz",
    target: "_blank",
    tags: ["common-lisp", "cli", "clingon"],
    preview: {
      filename: "adz.lisp",
      lines: [
        "(defcommand main ()",
        "  (:description \"a tiny task-runner\")",
        "  (format t \"~&hello, ~a!~%\" *name*))",
      ],
    },
  },
  {
    name: "A Wanderer's Tale of Discovering Lisp",
    topic: "Programming",
    text: "In February 2024, I felt lost in an unfamiliar forest, where a strong aura seemed to fill the air as if someone were watching me.",
    avatar: memojiAvatar2,
    href: "https://eldriv-blogs.netlify.app/en/lisp",
    target: "_blank",
    tags: ["common-lisp", "story", "discovery"],
    preview: {
      filename: "wanderer.lisp",
      lines: [
        ";; the path was unfamiliar — but luminous",
        "(loop for thought in *forest*",
        "      collect (parenthesize thought))",
      ],
    },
  },
  {
    name: "Using Tmux to Perk Up Your Terminal Experience",
    topic: "System Administration",
    text: "As engineers, the terminal is our most essential tool — and Tmux turns it into a dependable, multiplexed home base.",
    avatar: memojiAvatar3,
    href: "https://eldriv-blogs.netlify.app/en/tmux",
    target: "_blank",
    tags: ["tmux", "terminal", "productivity"],
    preview: {
      filename: "~/.tmux.conf",
      lines: [
        "set -g prefix C-a",
        "set -g mouse on",
        "bind | split-window -h",
      ],
    },
  },
  {
    name: "How NixOS Treated a Novice Sysadmin",
    topic: "Operating System",
    text: "Have you ever seen someone very skilled treat their machine like a contract, declaratively? NixOS made me one of them.",
    avatar: memojiAvatar4,
    href: "https://eldriv-blogs.netlify.app/en/nixos",
    target: "_blank",
    tags: ["nixos", "linux", "declarative"],
    preview: {
      filename: "configuration.nix",
      lines: [
        "{ pkgs, ... }: {",
        "  environment.systemPackages = with pkgs;",
        "    [ git tmux emacs sbcl ];",
        "}",
      ],
    },
  },
  {
    name: "Docker Containers Are Fast",
    topic: "System Administration",
    text: "From the last article: NixOS exceeded my expectations. Then I met Docker — and the build/ship/run loop became near-instant.",
    avatar: memojiAvatar5,
    href: "https://eldriv-blogs.netlify.app/en/docker",
    target: "_blank",
    tags: ["docker", "containers", "devops"],
    preview: {
      filename: "Dockerfile",
      lines: [
        "FROM alpine:latest",
        "RUN apk add --no-cache sbcl",
        "CMD [\"sbcl\", \"--script\", \"run.lisp\"]",
      ],
    },
  },
  {
    name: "Testing a Testing Framework",
    topic: "Quality Testing",
    text: "I've worked in Common Lisp for about eight months, and I became curious about how to test my code with FiveAM.",
    avatar: memojiAvatar6,
    href: "https://eldriv-blogs.netlify.app/en/fiveam",
    target: "_blank",
    tags: ["fiveam", "testing", "common-lisp"],
    preview: {
      filename: "tests.lisp",
      lines: [
        "(test addition",
        "  (is (= 4 (+ 2 2)))",
        "  (is (= 0 (+ -1 1))))",
      ],
    },
  },
  {
    name: "Explore Parsing in S-expression",
    topic: "Programming",
    text: "Parsing is a technique used to analyze and understand the structure of a text or code in order to extract meaningful information.",
    avatar: memojiAvatar7,
    href: "https://eldriv-blogs.netlify.app/en/parser",
    target: "_blank",
    tags: ["parsing", "s-expression", "lisp"],
    preview: {
      filename: "parser.lisp",
      lines: [
        "(defun parse (tokens)",
        "  (cond ((eq (car tokens) #\\() (read-list))",
        "        (t (read-atom tokens))))",
      ],
    },
  },
  {
    name: "How I Installed Ubuntu From Windows",
    topic: "Operating System",
    text: "I used Windows for about a decade, so switching to a different operating system was a brave move — and Ubuntu rewarded the leap.",
    avatar: memojiAvatar8,
    href: "https://eldriv-blogs.netlify.app/en/ubuntu",
    target: "_blank",
    tags: ["ubuntu", "linux", "switch"],
    preview: {
      filename: "first-boot.sh",
      lines: [
        "sudo apt update && sudo apt upgrade -y",
        "sudo apt install build-essential git tmux",
        "echo \"welcome home.\"",
      ],
    },
  },
];

const TOPICS = [
  "All",
  "Programming",
  "Operating System",
  "System Administration",
  "Quality Testing",
] as const;

export const ArticlesSection = () => {
  const HeaderComponent = SectionHeader();
  const [activeTopic, setActiveTopic] = useState<(typeof TOPICS)[number]>("All");

  const filtered = useMemo(
    () => (activeTopic === "All" ? Articles : Articles.filter((a) => a.topic === activeTopic)),
    [activeTopic]
  );

  return (
    <div className="py-12 sm:py-16 lg:py-24 relative" id="blogs">
      {/* Soft ambient glows — dark, branded, very subtle. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-[15%] h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-emerald-500/[0.06] blur-3xl" />
        <div className="absolute -bottom-32 right-[10%] h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-[#fd8128]/[0.06] blur-3xl" />
      </div>

      <div className="container px-6 sm:px-8 md:px-10" style={{ maxWidth: "1280px" }}>
        <HeaderComponent
          eyebrow="Eldriv's"
          title="Life and Tech Blogs"
          description="A personal journey through life and technology — written to inspire others to explore their own paths and the profound possibilities that lie beyond."
        />

        {/* Filter chrome */}
        <div className="mt-12 sm:mt-16 lg:mt-20 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((topic) => {
              const isActive = activeTopic === topic;
              return (
                <button
                  key={topic}
                  onClick={() => setActiveTopic(topic)}
                  className={`relative px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-300 to-[#fd8128] text-gray-950 shadow-[0_6px_16px_-6px_rgba(253,129,40,0.5)]"
                      : "bg-white/5 text-white/70 ring-1 ring-white/10 hover:bg-white/10 hover:text-white hover:ring-white/20"
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>

          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-300/70" />
            {filtered.length.toString().padStart(2, "0")} entries
          </div>
        </div>

        {/* Bento grid */}
        <motion.div
          layout
          className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((article, idx) => {
              const isFeatured = idx === 0;
              const indexLabel = `// ${String(idx + 1).padStart(2, "0")}`;

              return (
                <motion.div
                  key={article.href}
                  layout
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className={
                    isFeatured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
                  }
                >
                  <Link
                    href={article.href}
                    target={article.target}
                    className="block h-full group/post"
                  >
                    <Card
                      className={`relative h-full p-4 sm:p-5 ${
                        isFeatured
                          ? "min-h-[220px] lg:min-h-[320px]"
                          : "min-h-[150px]"
                      } flex flex-col transition-all duration-300 will-change-transform motion-safe:hover:-translate-y-1 hover:border-[#fd8128]/40 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6),_0_0_0_1px_rgba(253,129,40,0.18)]`}
                    >
                      {/* Top-right ornament: Featured pulse on featured, mono index on others. */}
                      {isFeatured ? (
                        <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#fd8128]/15 ring-1 ring-[#fd8128]/30 text-[#fd8128] text-[10px] font-mono uppercase tracking-[0.2em]">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-[#fd8128] opacity-75 animate-ping" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#fd8128]" />
                          </span>
                          Featured
                        </span>
                      ) : (
                        <span className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 group-hover/post:text-[#fd8128]/70 transition-colors">
                          {indexLabel}
                        </span>
                      )}

                      <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
                        <div
                          className={`${
                            isFeatured ? "size-10 sm:size-12" : "size-9"
                          } rounded-lg bg-white/5 ring-1 ring-white/10 grid place-items-center overflow-hidden flex-shrink-0`}
                        >
                          <Image
                            src={article.avatar}
                            alt={article.name}
                            className="max-h-full max-w-full"
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-emerald-300">
                            {article.topic}
                          </span>
                          {isFeatured && (
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
                              {indexLabel} · Latest
                            </span>
                          )}
                        </div>
                      </div>

                      <h3
                        className={`${
                          isFeatured
                            ? "text-lg sm:text-xl md:text-2xl"
                            : "text-sm sm:text-base"
                        } font-semibold text-white group-hover/post:text-[#fd8128] transition-colors leading-snug ${
                          isFeatured ? "mb-2" : "mb-1.5"
                        }`}
                      >
                        {article.name}
                      </h3>

                      <p
                        className={`${
                          isFeatured ? "text-xs sm:text-sm" : "text-xs"
                        } text-white/70 leading-relaxed ${
                          isFeatured ? "line-clamp-2" : "line-clamp-2"
                        }`}
                      >
                        {article.text}
                      </p>

                      {/* Featured-only extras: terminal-style code preview + tags. */}
                      {isFeatured && article.preview && (
                        <div className="mt-3 rounded-lg bg-gray-900/70 ring-1 ring-white/10 overflow-hidden">
                          <div className="flex items-center gap-2 px-3 py-1.5 border-b border-white/5 bg-white/[0.02]">
                            <span className="flex gap-1">
                              <span className="w-2 h-2 rounded-full bg-rose-400/60" />
                              <span className="w-2 h-2 rounded-full bg-amber-400/60" />
                              <span className="w-2 h-2 rounded-full bg-emerald-400/60" />
                            </span>
                            <span className="font-mono text-[10px] text-white/40">{article.preview.filename}</span>
                          </div>
                          <div className="px-3 py-2 font-mono text-[10px] sm:text-[11px] leading-relaxed">
                            {article.preview.lines.map((line, i) => (
                              <div key={i} className="flex gap-3 whitespace-pre">
                                <span className="text-white/25 select-none">{String(i + 1).padStart(2, "0")}</span>
                                <span className="text-white/80 truncate">{line}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {isFeatured && article.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {article.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full bg-white/5 ring-1 ring-white/10 text-[10px] font-mono text-white/60 group-hover/post:text-white/80 transition-colors"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-auto pt-3 inline-flex items-center gap-1.5 self-start text-emerald-300 group-hover/post:text-[#fd8128] transition-colors text-xs sm:text-sm font-medium">
                        Read article
                        <ArrowUpRightIcon className="w-3.5 h-3.5 transition-transform group-hover/post:translate-x-0.5 group-hover/post:-translate-y-0.5" />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-10 text-center font-mono text-sm text-white/50">
            // no entries for &quot;{activeTopic}&quot;
          </div>
        )}

        {/* View all CTA */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link
            href="https://eldriv-blogs.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group/cta inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-[#fd8128]/15 ring-1 ring-white/10 hover:ring-[#fd8128]/40 text-white hover:text-[#fd8128] transition-all text-sm font-medium"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300 group-hover/cta:text-[#fd8128] transition-colors">
              {">"}_
            </span>
            View all posts on the blog
            <ArrowUpRightIcon className="w-4 h-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
