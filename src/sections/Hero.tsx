"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDown, Facebook, Github, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { useCallback, useState, type ComponentType, type SVGProps } from "react";
import profileImage from "@/assets/images/adi.jpg";
import { PointerGreeting } from "@/components/PointerGreeting";

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.58l11.09 14.43Z" />
    </svg>
  );
}

type Social = {
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
};

const socials: Social[] = [
  { label: "github", href: "https://github.com/eldriv", Icon: Github },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/michael-adrian-villareal-9a344634a/",
    Icon: Linkedin,
  },
  { label: "x", href: "https://x.com/eldrivi", Icon: XIcon },
  { label: "instagram", href: "https://www.instagram.com/miadknows/", Icon: Instagram },
  { label: "facebook", href: "https://www.facebook.com/eldriv/", Icon: Facebook },
  { label: "email", href: "mailto:eldriv@proton.me", Icon: Mail },
];

const marquee = [
  "Web Apps",
  "Client Websites",
  "Shopify",
  "Next.js",
  "React",
  "Integrations",
  "Wix Studio",
  "WordPress",
  "TypeScript",
  "Automation",
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroSection() {
  const [showNext, setShowNext] = useState(false);
  const revealNext = useCallback(() => setShowNext(true), []);

  return (
    <section id="home" className="relative isolate px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-accent/[0.09] blur-[110px]"
      />

      <div className="relative mx-auto max-w-5xl">
        <PointerGreeting name="Adi" onFinish={revealNext} />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-10 md:grid-cols-[18rem_1fr] md:items-center md:gap-14"
        >
          <motion.div
            variants={item}
            data-pointer="photo"
            className="group relative mx-auto w-full max-w-[16rem] md:mx-0 md:max-w-[18rem]"
          >
            <div className="relative rounded-[1.1rem] bg-gradient-to-br from-accent/70 via-white/10 to-white/[0.03] p-px shadow-[0_30px_80px_-30px_rgba(253,129,40,0.45)]">
              <div className="relative overflow-hidden rounded-2xl bg-[#111115]">
                <Image
                  src={profileImage}
                  alt="Michael Adrian Villareal"
                  priority
                  className="aspect-square w-full object-cover grayscale contrast-125 transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0 group-data-[pointer-active]:scale-[1.03] group-data-[pointer-active]:grayscale-0"
                  sizes="(max-width: 768px) 256px, 288px"
                />
                <div
                  aria-hidden="true"
                  className="halftone pointer-events-none absolute inset-0 opacity-25 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0 group-data-[pointer-active]:opacity-0"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0c0c0f]/80 to-transparent"
                />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#0c0c0f]/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-200 backdrop-blur">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Available
                </span>
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/15 bg-[#0c0c0f]/70 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-300 backdrop-blur">
                  <MapPin className="h-3 w-3 text-accent" />
                  PH
                </span>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="halftone mask-circle pointer-events-none absolute -bottom-8 -left-8 -z-10 h-32 w-32 opacity-25"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-3 -top-3 -z-10 h-16 w-16 rounded-tr-2xl border-r border-t border-accent/50"
            />
          </motion.div>

          <div>
            <motion.p variants={item} className="label-mono inline-flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Product &amp; Software Engineer
            </motion.p>
            <motion.h1
              variants={item}
              className="mt-5 font-pixel text-4xl leading-[1.05] text-zinc-100 sm:text-5xl md:text-[3.25rem]"
            >
              Hi, I&apos;m{" "}
              <span data-pointer="name" className="text-accent-gradient">
                Michael Adrian Villareal
              </span>
              .
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-[15px] leading-7 text-zinc-400 sm:text-base sm:leading-8"
            >
              I build useful web products, client websites, and connected systems—from
              product direction and architecture through integrations and launch.
              Creator of BehindCourt and OnCourt at Behind Digitals.
            </motion.p>
            <motion.p variants={item} className="mt-4 font-mono text-[12px] text-zinc-500">
              Based in the Philippines · Working with teams worldwide
            </motion.p>
            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#web-apps"
                data-pointer="work"
                className="btn-ink group/cta min-h-11 gap-2 px-5 text-sm data-[pointer-active]:bg-accent-soft"
              >
                View selected work
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-data-[pointer-active]/cta:translate-x-0.5"
                >
                  →
                </span>
              </a>
              <a
                href="#contact"
                data-pointer="contact"
                className="glass-pill inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-medium text-zinc-300 transition-colors hover:border-white/25 hover:text-white data-[pointer-active]:border-white/25 data-[pointer-active]:text-white"
              >
                Get in touch
              </a>
            </motion.div>

            <motion.div variants={item} className="mt-8 border-t border-white/10 pt-6">
              <ul aria-label="Social links" className="flex flex-wrap items-center gap-2">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      data-pointer={`social-${label}`}
                      className="group/social inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 font-mono text-[12px] text-zinc-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/10 hover:text-accent data-[pointer-active]:-translate-y-0.5 data-[pointer-active]:border-accent/50 data-[pointer-active]:bg-accent/10 data-[pointer-active]:text-accent"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {label}
                      <span
                        aria-hidden="true"
                        className="text-zinc-600 transition-colors group-hover/social:text-accent group-data-[pointer-active]/social:text-accent"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        aria-hidden="true"
        className="mask-fade-x relative mx-auto mt-14 max-w-5xl overflow-hidden border-y border-white/10 py-3"
      >
        <div className="flex w-max animate-move-left [animation-duration:40s]">
          {[...marquee, ...marquee].map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="inline-flex items-center gap-8 pr-8 font-mono text-[12px] uppercase tracking-[0.2em] text-zinc-500"
            >
              {word}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </motion.div>

      <ScrollNext visible={showNext} />
    </section>
  );
}

function ScrollNext({ visible }: { visible: boolean }) {
  const reduceMotion = useReducedMotion();
  const [leaving, setLeaving] = useState(false);

  const goNext = () => {
    setLeaving(true);
    setTimeout(() => {
      const next = document.getElementById("experience");
      if (!next) return;
      const headerHeight = document.querySelector("header")?.offsetHeight ?? 0;
      window.scrollTo({
        top: next.getBoundingClientRect().top + window.scrollY - headerHeight,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }, 260);
    setTimeout(() => setLeaving(false), 1200);
  };

  return (
    <div className="mt-10 flex justify-center">
      <div data-pointer="next" className="flex h-20 w-32 justify-center">
        <AnimatePresence>
          {visible && (
            <motion.button
              type="button"
              onClick={goNext}
              aria-label="Scroll to the next section: experience"
              className="group/next flex h-fit flex-col items-center gap-2.5 rounded-full text-zinc-500 transition-colors hover:text-accent"
              initial={{ opacity: 0, scale: 0.3, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 15 }}
            >
              <span className="relative flex h-12 w-12">
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-accent/40"
                  initial={{ scale: 0.6, opacity: 0.9 }}
                  animate={{ scale: 2.4, opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 animate-ping rounded-full border border-accent/40 [animation-duration:2.4s]"
                />
                <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-accent/50 bg-accent/10 text-accent shadow-[0_0_30px_-8px_rgba(253,129,40,0.6)] transition-colors duration-300 group-hover/next:bg-accent group-hover/next:text-[#0c0c0f]">
                  <motion.span
                    aria-hidden="true"
                    animate={
                      leaving
                        ? { y: 32, opacity: 0 }
                        : reduceMotion
                          ? { y: 0, opacity: 1 }
                          : { y: [0, 5, 0], opacity: 1 }
                    }
                    transition={
                      leaving
                        ? { duration: 0.26, ease: "easeIn" }
                        : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
                    }
                  >
                    <ArrowDown className="h-5 w-5" />
                  </motion.span>
                </span>
              </span>
              <span className="-mr-[0.2em] whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em]">
                next · experience
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default HeroSection;
