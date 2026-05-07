"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Testimonial } from "@/components/TestimonialCard";

const MAX_QUOTE_LENGTH = 400;
const MAX_PHOTO_BYTES = 2 * 1024 * 1024; // 2 MB
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const PhotoIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 16l5-5 4 4 3-3 6 6" />
    <circle cx="9" cy="10" r="1.5" />
  </svg>
);

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("File read error"));
    reader.readAsDataURL(file);
  });

interface TestimonialModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (t: Testimonial) => void;
}

export const TestimonialModal = ({
  open,
  onClose,
  onSubmit,
}: TestimonialModalProps) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [quote, setQuote] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [photoName, setPhotoName] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // Reset form whenever the modal closes.
  useEffect(() => {
    if (!open) {
      setName("");
      setTitle("");
      setQuote("");
      setPhotoUrl(undefined);
      setPhotoName(undefined);
      setError(undefined);
      setSubmitting(false);
    }
  }, [open]);

  // ESC to close + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const handlePhotoChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Photo must be JPG, PNG, WebP, or GIF.");
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setError("Photo must be 2 MB or smaller.");
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      setPhotoUrl(dataUrl);
      setPhotoName(file.name);
      setError(undefined);
    } catch {
      setError("Could not read that photo. Please try another file.");
    }
  };

  const removePhoto = () => {
    setPhotoUrl(undefined);
    setPhotoName(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const generateId = () => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    return `t_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedQuote = quote.trim();

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }
    if (!trimmedQuote) {
      setError("Please share a short testimonial.");
      return;
    }
    if (trimmedQuote.length > MAX_QUOTE_LENGTH) {
      setError(`Testimonial must be ${MAX_QUOTE_LENGTH} characters or fewer.`);
      return;
    }

    setSubmitting(true);
    const newTestimonial: Testimonial = {
      id: generateId(),
      quote: trimmedQuote,
      name: trimmedName,
      title: title.trim() || undefined,
      imageUrl: photoUrl,
      source: "user",
      createdAt: new Date().toISOString(),
    };
    onSubmit(newTestimonial);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden={!open}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
          />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="testimonial-modal-title"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-lg rounded-3xl bg-gray-900/95 border border-white/15 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* Subtle brand glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[#fd8128]/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl"
            />

            <div className="relative p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3
                    id="testimonial-modal-title"
                    className="font-sans text-xl sm:text-2xl text-white"
                  >
                    Share your experience
                  </h3>
                  <p className="text-white/60 text-sm mt-1.5 leading-relaxed">
                    Tell us what working with Eldriv was like — your testimonial
                    may appear in the carousel.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="shrink-0 h-9 w-9 rounded-full border border-[#fd8128]/40 text-white/80 hover:text-white hover:bg-[#fd8128]/15 transition-colors flex items-center justify-center"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="t-name"
                    className="block text-sm font-medium text-white"
                  >
                    Your name <span className="text-[#fd8128]">*</span>
                  </label>
                  <input
                    id="t-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    autoComplete="name"
                    maxLength={80}
                    required
                    className="mt-2 w-full rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/40 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#fd8128]/60 focus:bg-white/[0.06] transition-colors"
                  />
                </div>

                {/* Role / company */}
                <div>
                  <label
                    htmlFor="t-title"
                    className="block text-sm font-medium text-white"
                  >
                    Role &amp; company{" "}
                    <span className="text-white/50 font-normal">(optional)</span>
                  </label>
                  <input
                    id="t-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Founder · Acme Co."
                    maxLength={100}
                    className="mt-2 w-full rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/40 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#fd8128]/60 focus:bg-white/[0.06] transition-colors"
                  />
                </div>

                {/* Quote */}
                <div>
                  <label
                    htmlFor="t-quote"
                    className="block text-sm font-medium text-white"
                  >
                    Your testimonial <span className="text-[#fd8128]">*</span>
                  </label>
                  <textarea
                    id="t-quote"
                    value={quote}
                    onChange={(e) =>
                      setQuote(e.target.value.slice(0, MAX_QUOTE_LENGTH))
                    }
                    placeholder="Working with Eldriv was..."
                    rows={4}
                    required
                    className="mt-2 w-full rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/40 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#fd8128]/60 focus:bg-white/[0.06] transition-colors resize-y min-h-[110px]"
                  />
                  <div className="mt-1.5 flex justify-end text-xs text-white/50">
                    {quote.length}/{MAX_QUOTE_LENGTH}
                  </div>
                </div>

                {/* Photo */}
                <div>
                  <label className="block text-sm font-medium text-white">
                    Photo{" "}
                    <span className="text-white/50 font-normal">(optional)</span>
                  </label>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-14 w-14 rounded-xl bg-white/[0.04] border border-white/15 flex items-center justify-center overflow-hidden">
                      {photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={photoUrl}
                          alt="Selected avatar"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <PhotoIcon className="w-6 h-6 text-white/50" />
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="rounded-lg border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs sm:text-sm px-3 py-1.5 transition-colors"
                        >
                          {photoUrl ? "Change photo" : "Choose photo"}
                        </button>
                        {photoUrl && (
                          <button
                            type="button"
                            onClick={removePhoto}
                            className="text-xs text-white/60 hover:text-[#fd8128] transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <p className="text-[11px] text-white/50">
                        {photoName
                          ? photoName
                          : "JPG, PNG, WebP, or GIF · max 2 MB"}
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={ALLOWED_IMAGE_TYPES.join(",")}
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                  </div>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-400/30 bg-red-500/10 text-red-200 text-sm px-3 py-2"
                  >
                    {error}
                  </div>
                )}

                <div className="pt-2 border-t border-white/10 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-white text-sm font-medium px-5 h-11 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-xl bg-[#fd8128] hover:bg-[#ff9033] text-white text-sm font-semibold px-5 h-11 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Submitting…" : "Submit testimonial"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
