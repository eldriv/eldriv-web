"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image, { StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface Screenshot {
  src: StaticImageData | string;
  caption?: string;
}

interface ScreenshotGalleryProps {
  title: string;
  screenshots: Screenshot[];
  isOpen: boolean;
  onClose: () => void;
}

export const ScreenshotGallery = ({
  title,
  screenshots,
  isOpen,
  onClose,
}: ScreenshotGalleryProps) => {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const count = screenshots.length;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isOpen) setIndex(0);
  }, [isOpen]);

  const go = useCallback(
    (step: number) => setIndex((i) => (i + step + count) % count),
    [count]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose, go]);

  if (!mounted || count === 0) return null;

  const current = screenshots[index];

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} screenshots`}
        >
          <div className="absolute inset-0 bg-[#0c0c0f]/85 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            className="glass-strong relative flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <h3 className="truncate font-pixel text-base text-zinc-100 sm:text-lg">{title}</h3>
                <p className="label-mono mt-0.5">
                  {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="glass-pill flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:text-white"
                aria-label="Close screenshots"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative bg-black/40">
              <div className="relative h-[min(640px,62vw,calc(100dvh-11rem))] min-h-[180px] w-full">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={index}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Image
                      src={current.src}
                      alt={current.caption ?? `${title} screenshot ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {count > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="glass-strong absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-zinc-300 transition-colors hover:text-white sm:left-3"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="glass-strong absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-zinc-300 transition-colors hover:text-white sm:right-3"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <p className="text-sm text-zinc-400">{current.caption}</p>
              {count > 1 && (
                <div className="flex gap-2">
                  {screenshots.map((shot, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setIndex(i)}
                      className={`relative h-10 w-16 overflow-hidden rounded-md border transition-all ${
                        i === index
                          ? "border-accent opacity-100"
                          : "border-white/10 opacity-50 hover:opacity-80"
                      }`}
                      aria-label={`Show screenshot ${i + 1}`}
                      aria-current={i === index}
                    >
                      <Image src={shot.src} alt="" fill className="object-cover" sizes="64px" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
