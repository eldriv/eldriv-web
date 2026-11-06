"use client";

import { motion } from "framer-motion";
import { scrollViewport } from "@/components/scroll-reveal";

const headerStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function SectionHeader({
  title,
  eyebrow,
  description,
  index,
}: {
  title: string;
  eyebrow: string;
  description: string;
  index?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
      variants={headerStagger}
    >
      <motion.div
        variants={headerItem}
        className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-4"
      >
        <p className="font-pixel text-sm text-zinc-500 lowercase">
          {index !== undefined && <span className="text-accent">{String(index).padStart(2, "0")} — </span>}
          {eyebrow}
        </p>
        <span aria-hidden="true" className="halftone mask-fade-x hidden h-3 w-24 opacity-20 sm:block" />
      </motion.div>
      <motion.h2
        variants={headerItem}
        className="mt-8 font-pixel text-3xl leading-tight text-zinc-100 sm:text-4xl md:text-[2.6rem]"
      >
        {title}
      </motion.h2>
      <motion.p
        variants={headerItem}
        className="mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-400 sm:text-base"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
