"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Stop = {
  /** Matches a `data-pointer` attribute anywhere on the page. */
  target: string;
  /** Where the tip lands within the target, as fractions of its width/height. */
  ax: number;
  ay: number;
  message: string;
  dwellMs?: number;
};

// Stops whose target isn't rendered at the current breakpoint are skipped,
// e.g. the desktop nav links on mobile and the menu button on desktop.
const STOPS: Stop[] = [
  { target: "photo", ax: 0.78, ay: 0.3, message: "Hi! I'm Adi, welcome to my website!" },
  { target: "name", ax: 0.85, ay: 0.55, message: "Product & Software Engineer from the Philippines" },
  { target: "nav-home", ax: 0.5, ay: 0.7, message: "Up here is my navigation. Home brings you back to the top" },
  { target: "nav-experience", ax: 0.5, ay: 0.7, message: "Experience: my roles, projects, and what I've shipped" },
  { target: "nav-blogs", ax: 0.5, ay: 0.7, message: "Blogs: articles I've written about building for the web" },
  { target: "nav-about", ax: 0.5, ay: 0.7, message: "About: my story, my toolbox, and what drives me" },
  { target: "nav-testimonials", ax: 0.5, ay: 0.7, message: "Testimonials: kind words from clients and teammates" },
  { target: "nav-contact", ax: 0.5, ay: 0.7, message: "Contact: send me a message, I'd love to hear from you" },
  {
    target: "nav-menu",
    ax: 0.5,
    ay: 0.65,
    message: "Open this menu to jump to my Experience, Blogs, About, Testimonials & Contact",
  },
  { target: "social-github", ax: 0.5, ay: 0.6, message: "Here are my social links! First, my GitHub" },
  { target: "social-linkedin", ax: 0.5, ay: 0.6, message: "Connect with me on LinkedIn" },
  { target: "social-x", ax: 0.5, ay: 0.6, message: "Follow me on X" },
  { target: "social-instagram", ax: 0.5, ay: 0.6, message: "Follow @miadknows on Instagram" },
  { target: "social-facebook", ax: 0.5, ay: 0.6, message: "Find me on Facebook" },
  { target: "social-email", ax: 0.5, ay: 0.6, message: "Or send me an email anytime" },
  { target: "work", ax: 0.7, ay: 0.6, message: "Check out my selected work" },
  { target: "contact", ax: 0.6, ay: 0.6, message: "Got a project in mind? Let's talk" },
  // The pointer parks above the scroll button and turns into it.
  { target: "next", ax: 0.5, ay: 0.1, message: "That's the tour! Scroll down for more" },
];

const LAST = STOPS.length - 1;
const TYPE_MS = 42;
const READ_MS = 1400;
const MIN_DWELL_MS = 2200;
const BUBBLE_SPACE = 260;
const SHORT_HOP_PX = 180;
const MORPH_S = 0.4;
const LONG_SPRING = { type: "spring", stiffness: 60, damping: 16 } as const;
const SHORT_SPRING = { type: "spring", stiffness: 170, damping: 22 } as const;

type Point = { x: number; y: number };
type Phase = "tour" | "morph" | "done";

function splitGraphemes(text: string) {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

function CursorArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 2.5 20.5 9.4c.9.35.86 1.64-.06 1.93l-7.06 2.2-2.2 7.06c-.29.92-1.58.96-1.93.06L2.5 3c-.2-.5.3-1 .5-.5Z"
        fill="#fd8128"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Reveals text one character at a time. Every character is laid out from
 * the start, so the bubble keeps its final size and centered lines don't
 * shift while typing.
 */
function TypeText({ text, delayS }: { text: string; delayS: number }) {
  const chars = useMemo(() => splitGraphemes(text), [text]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      let typed = 0;
      interval = setInterval(() => {
        typed += 1;
        setCount(typed);
        if (typed >= chars.length) clearInterval(interval);
      }, TYPE_MS);
    }, delayS * 1000);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [chars, delayS]);

  const typing = count < chars.length;

  return (
    <>
      {chars.map((char, i) => (
        <span key={i}>
          <span
            className={`transition-[opacity,filter] duration-300 ease-out ${
              i < count ? "opacity-100 blur-0" : "opacity-0 blur-[3px]"
            }`}
          >
            {char}
          </span>
          {typing && i === Math.max(0, count - 1) && (
            <span className="relative inline-block w-0 align-baseline">
              <span className="absolute -top-[0.95em] left-[1px] h-[1.1em] w-[2px] animate-pulse rounded-full bg-accent" />
            </span>
          )}
        </span>
      ))}
    </>
  );
}

export function PointerGreeting({
  name = "Adi",
  onFinish,
}: {
  name?: string;
  /** Called when the pointer starts turning into the scroll button. */
  onFinish?: () => void;
}) {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(anchorRef, { amount: 0.05 });
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [cursor, setCursor] = useState({ index: 0, prev: 0 });
  const [started, setStarted] = useState(false);
  const [phase, setPhase] = useState<Phase>("tour");
  const [points, setPoints] = useState<(Point | null)[] | null>(null);
  const [viewport, setViewport] = useState({ width: 0, entryY: 0 });

  const findTarget = useCallback(
    (target: string) => document.querySelector<HTMLElement>(`[data-pointer="${target}"]`),
    [],
  );

  // Points are in document coordinates because the overlay is portaled to
  // <body>, which lets the pointer sit above the fixed header.
  const measure = useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const width = document.documentElement.clientWidth;
    const hero = anchor.getBoundingClientRect();
    setViewport({ width, entryY: hero.top + window.scrollY + Math.min(hero.height, window.innerHeight) });
    setPoints(
      STOPS.map(({ target, ax, ay }) => {
        // Inline text can wrap, so aim at its last line rather than the
        // bounding box of every line.
        const rects = findTarget(target)?.getClientRects();
        const rect = rects?.[rects.length - 1];
        if (!rect || rect.width === 0 || rect.height === 0) return null;
        return {
          x: Math.min(width - 12, Math.max(12, rect.left + window.scrollX + rect.width * ax)),
          y: rect.top + window.scrollY + rect.height * ay,
        };
      }),
    );
  }, [findTarget]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (reduceMotion) onFinish?.();
  }, [reduceMotion, onFinish]);

  // Wait for the hero entrance animation to settle before measuring targets.
  useEffect(() => {
    if (reduceMotion) return;
    measure();
    const timer = setTimeout(() => {
      measure();
      setStarted(true);
    }, 1400);
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(measure);
    if (anchorRef.current) observer.observe(anchorRef.current);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduceMotion, measure]);

  const { index, prev } = cursor;
  const stop = STOPS[index];
  const entry = { x: viewport.width + 40, y: viewport.entryY };
  const point = points?.[index] ?? entry;
  const prevPoint = points?.[prev] ?? point;
  const shortHop = Math.hypot(point.x - prevPoint.x, point.y - prevPoint.y) < SHORT_HOP_PX;
  const arriveS = shortHop ? 0.45 : 0.85;
  const typeMs = splitGraphemes(stop.message).length * TYPE_MS;

  // Scrolling re-measures, so read the latest points through a ref instead of
  // restarting the dwell timer on every scroll frame.
  const pointsRef = useRef(points);
  pointsRef.current = points;
  const measured = points !== null;

  useEffect(() => {
    if (!started || !inView || reduceMotion || phase !== "tour" || !measured) return;
    const dwell = Math.max(stop.dwellMs ?? MIN_DWELL_MS, arriveS * 1000 + typeMs + READ_MS);
    const timer = setTimeout(() => {
      const latest = pointsRef.current ?? [];
      let next = index + 1;
      while (next <= LAST && !latest[next]) next += 1;
      if (next > LAST) {
        setPhase("morph");
        onFinish?.();
        return;
      }
      setCursor({ index: next, prev: index });
    }, dwell);
    return () => clearTimeout(timer);
  }, [index, started, inView, reduceMotion, phase, measured, stop, arriveS, typeMs, onFinish]);

  useEffect(() => {
    if (phase !== "morph") return;
    const timer = setTimeout(() => setPhase("done"), MORPH_S * 1000 + 100);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (!started || phase !== "tour") return;
    const el = findTarget(stop.target);
    if (!el) return;
    const timer = setTimeout(() => el.setAttribute("data-pointer-active", ""), arriveS * 1000);
    return () => {
      clearTimeout(timer);
      el.removeAttribute("data-pointer-active");
    };
  }, [stop, started, phase, findTarget, arriveS]);

  const anchor = (
    <span ref={anchorRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />
  );

  if (reduceMotion || phase === "done" || !mounted || !points) return anchor;

  const isLast = index === LAST;
  const roomRight = viewport.width - point.x;
  const flipped = !isLast && roomRight < BUBBLE_SPACE && point.x > roomRight;
  // Lean into the direction of travel so each move reads as a turn; on the
  // last stop the arrow spins round to point straight down.
  const tilt = Math.max(-18, Math.min(18, (point.x - prevPoint.x) * 0.05));
  const rotate = isLast ? 225 : flipped ? -tilt : tilt;

  const bubblePosition = isLast
    ? "bottom-14 left-0 -translate-x-1/2"
    : flipped
      ? "right-3 top-7"
      : "left-3 top-7";
  const bubbleOrigin = isLast ? "50% 100%" : flipped ? "100% 0" : "0 0";

  const overlay = (
    <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-[60] h-0 w-full">
      <motion.div
        className="absolute left-0 top-0"
        initial={{ x: entry.x, y: entry.y, opacity: 0, scale: 1 }}
        animate={
          !started
            ? { x: entry.x, y: entry.y, opacity: 0, scale: 1 }
            : phase === "morph"
              ? { x: point.x, y: point.y + 18, opacity: 0, scale: 0.3 }
              : { x: point.x, y: point.y, opacity: 1, scale: 1 }
        }
        transition={
          phase === "morph"
            ? { duration: MORPH_S, ease: [0.4, 0, 0.2, 1] }
            : {
                x: shortHop ? SHORT_SPRING : LONG_SPRING,
                y: shortHop ? SHORT_SPRING : LONG_SPRING,
                opacity: { duration: 0.4 },
              }
        }
      >
        <motion.span
          key={`ripple-${index}`}
          className="absolute -left-3 -top-3 h-6 w-6 rounded-full border border-accent/70"
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ scale: [0.2, 1.6], opacity: [0.9, 0] }}
          transition={{ delay: arriveS, duration: 0.7, ease: "easeOut" }}
        />

        <motion.div
          className="relative"
          animate={{ scaleX: flipped ? -1 : 1, rotate }}
          transition={{ type: "spring", stiffness: isLast ? 120 : 220, damping: 18 }}
          style={{ transformOrigin: "0 0" }}
        >
          <CursorArrow className="-translate-x-[3px] -translate-y-[3px] drop-shadow-[0_4px_10px_rgba(253,129,40,0.45)]" />
        </motion.div>

        <AnimatePresence>
          {started && phase === "tour" && (
            <div key={index} className={`absolute ${bubblePosition}`}>
              <motion.div
                className="relative w-max max-w-[15rem] overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-3 text-center shadow-[0_12px_40px_-12px_rgba(0,0,0,0.75),inset_0_1px_0_0_rgba(255,255,255,0.14)] backdrop-blur-xl backdrop-saturate-150"
                style={{ transformOrigin: bubbleOrigin }}
                initial={{ opacity: 0, scale: 0.85, y: -4 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { delay: arriveS * 0.8, type: "spring", stiffness: 320, damping: 24 },
                }}
                exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.15 } }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-accent/[0.08]"
                />
                <span className="relative flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(253,129,40,0.9)]" />
                  <span className="-mr-[0.18em]">{name}</span>
                </span>
                <span className="relative mt-1.5 block text-[13px] font-medium leading-relaxed text-zinc-100">
                  <TypeText text={stop.message} delayS={arriveS * 0.8 + 0.15} />
                </span>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );

  return (
    <>
      {anchor}
      {createPortal(overlay, document.body)}
    </>
  );
}

export default PointerGreeting;
