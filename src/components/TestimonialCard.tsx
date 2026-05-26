"use client";

import { motion } from "framer-motion";
import { scrollViewport } from "@/components/scroll-reveal";
import { Card } from "@/components/card";

export type Testimonial = {
  id?: string;
  quote: string;
  name: string;
  title?: string;
  imageUrl?: string;
  source?: "seed" | "user";
  createdAt?: string;
  /** Optional human-readable name of the related project */
  projectTitle?: string;
  /** In-page anchor (e.g. "#web") or external URL of the related project */
  projectHref?: string;
};

const QuoteMark = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M7.17 6C4.87 6 3 7.87 3 10.17v6.66C3 17.47 3.53 18 4.17 18h4.66c.64 0 1.17-.53 1.17-1.17v-4.66c0-.64-.53-1.17-1.17-1.17H6c0-1.66 1.34-3 3-3h.17C9.62 8 10 7.62 10 7.17V6.83C10 6.37 9.62 6 9.17 6H7.17zm10 0c-2.3 0-4.17 1.87-4.17 4.17v6.66c0 .64.53 1.17 1.17 1.17h4.66c.64 0 1.17-.53 1.17-1.17v-4.66c0-.64-.53-1.17-1.17-1.17H16c0-1.66 1.34-3 3-3h.17C19.62 8 20 7.62 20 7.17V6.83C20 6.37 19.62 6 19.17 6h-2z" />
  </svg>
);

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("") || "?";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  onDelete?: (id: string) => void;
}

const TrashIcon = ({ className }: { className?: string }) => (
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
    <path d="M3 6h18" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

export const TestimonialCard = ({
  testimonial,
  index,
  onDelete,
}: TestimonialCardProps) => {
  const isUser = testimonial.source === "user";
  const canDelete = isUser && !!testimonial.id && !!onDelete;

  const handleDelete = () => {
    if (!testimonial.id || !onDelete) return;
    if (
      typeof window !== "undefined" &&
      !window.confirm("Remove this testimonial?")
    ) {
      return;
    }
    onDelete(testimonial.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={scrollViewport}
      transition={{
        duration: 0.6,
        delay: (index % 6) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <Card className="h-full min-h-[300px] sm:min-h-[320px] p-6 sm:p-7 md:p-8 flex flex-col justify-between group transition-all duration-300 hover:border-[#fd8128]/40 hover:shadow-[0_0_0_1px_rgba(253,129,40,0.15)]">
        {/* Top row: quote glyph + source badge */}
        <div className="flex items-start justify-between mb-5 gap-3">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-full bg-[#fd8128]/15 blur-md"
            />
            <QuoteMark className="relative w-8 h-8 sm:w-9 sm:h-9 text-[#fd8128]" />
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className={`text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border backdrop-blur-sm ${
                isUser
                  ? "bg-emerald-300/15 text-emerald-300 border-emerald-300/30"
                  : "bg-[#fd8128]/15 text-[#fd8128] border-[#fd8128]/30"
              }`}
            >
              {isUser ? "Client" : "Featured"}
            </span>
            {canDelete && (
              <button
                type="button"
                onClick={handleDelete}
                aria-label="Remove this testimonial"
                title="Remove this testimonial"
                className="h-7 w-7 rounded-full border border-white/15 bg-white/[0.04] text-white/60 hover:text-red-300 hover:border-red-400/40 hover:bg-red-500/10 transition-colors flex items-center justify-center"
              >
                <TrashIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Quote */}
        <blockquote className="text-white/90 text-[15px] sm:text-base leading-relaxed font-serif italic flex-1">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        {/* Divider */}
        <div className="mt-6 h-px w-full bg-gradient-to-r from-[#fd8128]/60 via-white/15 to-transparent" />

        {/* Author + project link */}
        <div className="mt-5 flex items-center gap-3">
          {testimonial.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={testimonial.imageUrl}
              alt={testimonial.name}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-white/10"
            />
          ) : (
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#fd8128] to-emerald-400 text-white font-semibold flex items-center justify-center ring-2 ring-white/10 text-sm">
              {getInitials(testimonial.name)}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-white font-semibold text-sm sm:text-base truncate">
              {testimonial.name}
            </p>
            {testimonial.title && (
              <p className="text-white/60 text-xs sm:text-[13px] truncate">
                {testimonial.title}
              </p>
            )}
          </div>

          {testimonial.projectHref && (
            <ProjectLink
              href={testimonial.projectHref}
              label={testimonial.projectTitle}
            />
          )}
        </div>
      </Card>
    </motion.div>
  );
};

const ArrowRightIcon = ({ className }: { className?: string }) => (
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
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

interface ProjectLinkProps {
  href: string;
  label?: string;
}

const ProjectLink = ({ href, label }: ProjectLinkProps) => {
  const isAnchor = href.startsWith("#");

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isAnchor) return;
    if (typeof document === "undefined") return;
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      try {
        window.history.replaceState(null, "", href);
      } catch {
        // history.replaceState may be unavailable in restricted contexts; ignore.
      }
    }
  };

  return (
    <a
      href={href}
      onClick={isAnchor ? handleAnchorClick : undefined}
      target={isAnchor ? undefined : "_blank"}
      rel={isAnchor ? undefined : "noopener noreferrer"}
      title={label ? `View ${label}` : "View project"}
      aria-label={label ? `View ${label}` : "View project"}
      className="group/link flex-shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] hover:border-[#fd8128]/50 hover:bg-[#fd8128]/10 hover:text-white text-white/70 text-[11px] sm:text-xs font-medium px-2.5 py-1.5 transition-colors"
    >
      <span className="hidden md:inline">View project</span>
      <span className="md:hidden">View</span>
      <ArrowRightIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover/link:translate-x-0.5" />
    </a>
  );
};
