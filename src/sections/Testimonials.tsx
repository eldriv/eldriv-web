"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

import { SectionHeader } from "@/components/SectionHeader";
import {
  TestimonialCard,
  type Testimonial,
} from "@/components/TestimonialCard";
import { TestimonialModal } from "@/components/TestimonialModal";

import angelicaMaeviAvatar from "@/assets/images/angelica-maevi.png";
import evaHooftAvatar from "@/assets/images/eva-hooft-profile.png";
import cassandraDaherAvatar from "@/assets/images/cassandra-profile.png";

const STORAGE_KEY = "eldriv:user-testimonials:v1";

export const seedTestimonials: Testimonial[] = [
  {
    quote:
      "He really listened to what I wanted. The site feels like me, and working with him was smooth and easy to trust.",
    name: "Eva Hooft",
    title: "CEO · Evahooft",
    imageUrl: evaHooftAvatar.src,
    source: "seed",
  },
  {
    quote:
      "Working with Eldriv was straightforward and professional. He delivered a polished site that matches our brand and events work.",
    name: "UAE Client",
    title: "Confidential · Crown Catering",
    source: "seed",
  },
  {
    quote:
      "His communication was great from start to launch. The site is clear, clean, and explains our services much better than before.",
    name: "UAE Client",
    title: "Confidential · Proserv Hospitality",
    source: "seed",
  },
  {
    quote:
      "He captured our studio vibe perfectly. Feedback was easy, timelines were clear, and launch day felt stress-free.",
    name: "Angelica Villareal",
    title: "CEO · Maevi Studio",
    imageUrl: angelicaMaeviAvatar.src,
    source: "seed",
  },
  {
    quote: "Beautiful, it looks great!",
    name: "Cassandra Daher",
    title: "Founder · Cassandra Daher",
    imageUrl: cassandraDaherAvatar.src,
    source: "seed",
  },
];

const ChatPlusIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <line x1="12" y1="9" x2="12" y2="14" />
    <line x1="9.5" y1="11.5" x2="14.5" y2="11.5" />
  </svg>
);

const loadStoredTestimonials = (): Testimonial[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Testimonial[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (t) => t && typeof t.quote === "string" && typeof t.name === "string"
    );
  } catch {
    return [];
  }
};

const persistStoredTestimonials = (items: Testimonial[]) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage might be full or disabled — fail silently, the in-memory copy is fine.
  }
};

export const TestimonialsSection = () => {
  const HeaderComponent = SectionHeader();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [userTestimonials, setUserTestimonials] = useState<Testimonial[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  // Hydrate user-submitted testimonials from localStorage.
  useEffect(() => {
    setUserTestimonials(loadStoredTestimonials());
  }, []);

  // Reveal animations when scrolled into view.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // User testimonials appear first (newest), seeds round out the carousel.
  const allTestimonials = useMemo<Testimonial[]>(
    () => [...userTestimonials, ...seedTestimonials],
    [userTestimonials]
  );

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: true,
    },
    [
      AutoScroll({
        speed: 0.8,
        direction: "backward",
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const handleSubmit = (t: Testimonial) => {
    const next = [t, ...userTestimonials];
    setUserTestimonials(next);
    persistStoredTestimonials(next);
    setModalOpen(false);
    setJustSubmitted(true);
    window.setTimeout(() => setJustSubmitted(false), 4000);
  };

  const handleDelete = (id: string) => {
    const next = userTestimonials.filter((t) => t.id !== id);
    setUserTestimonials(next);
    persistStoredTestimonials(next);
  };

  return (
    <section id="testimonials" className="relative">
      <div
        ref={sectionRef}
        className="py-12 sm:py-16 lg:py-28 relative"
      >
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8">
          <HeaderComponent
            eyebrow="Testimonials"
            title="What clients say about working with me."
            description="A handful of kind words from the people I've collaborated with — and an open invitation for clients to add their own."
          />

          {/* Share yours CTA */}
          <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3">
            <motion.button
              type="button"
              onClick={() => setModalOpen(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="group inline-flex items-center gap-2.5 rounded-full border-2 border-[#fd8128] bg-[#fd8128]/[0.06] hover:bg-[#fd8128]/15 text-white px-5 sm:px-6 h-11 sm:h-12 text-sm sm:text-base font-semibold transition-colors backdrop-blur-sm"
            >
              <ChatPlusIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#fd8128] group-hover:text-white transition-colors" />
              <span>Share yours</span>
            </motion.button>

            <AnimatePresence>
              {justSubmitted && (
                <motion.p
                  key="thanks"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="text-sm text-emerald-300"
                  role="status"
                >
                  Thanks for sharing — your testimonial is now in the carousel.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-10 sm:mt-12 md:mt-16 relative">
            {/* Mobile: vertical stack */}
            <div className="block sm:hidden space-y-4">
              {allTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id ?? `${testimonial.name}-${index}`}
                  testimonial={testimonial}
                  index={index}
                  isVisible={isVisible}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {/* Desktop: continuous auto-scroll carousel */}
            <div className="hidden sm:block relative">
              <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 lg:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 lg:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {[...allTestimonials, ...allTestimonials].map(
                    (testimonial, index) => (
                      <div
                        key={`${testimonial.id ?? testimonial.name}-${index}`}
                        className="flex-[0_0_85%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-3 md:px-4 lg:px-5"
                      >
                        <TestimonialCard
                          testimonial={testimonial}
                          index={index % allTestimonials.length}
                          isVisible={isVisible}
                          onDelete={handleDelete}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Carousel hint — matches Web.tsx styling */}
            <div className="hidden sm:flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 text-white/50 text-xs sm:text-sm px-4">
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Hover to pause
              </span>
              <span className="text-white/30">•</span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                Drag to explore
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <TestimonialModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </section>
  );
};
