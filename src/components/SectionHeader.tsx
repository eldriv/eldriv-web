"use client";

import { motion } from "framer-motion";
import { scrollViewport } from "@/components/scroll-reveal";

const headerStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.04,
    },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function SectionHeader({
  title,
  eyebrow,
  description,
}: {
  title: string;
  eyebrow: string;
  description: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
      variants={headerStagger}
    >
      <motion.div variants={headerItem} className="flex justify-center">
        <p className="uppercase md:text-10xl text-3xl font-semibold tracking-widest bg-gradient-to-r from-white to-[#fd8128] text-center text-transparent bg-clip-text">
          {eyebrow}
        </p>
      </motion.div>
      <motion.h2
        variants={headerItem}
        className="font-sans md:text-5xl text-3xl text-center mt-6 sm:mt-8"
      >
        {title}
      </motion.h2>
      <motion.p
        variants={headerItem}
        className="text-center md:text-lg text-white/90 mt-6 sm:mt-8 lg:mt-10 lg:text-xl max-w-2xl mx-auto sm:text-lg"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
