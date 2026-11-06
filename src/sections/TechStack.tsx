"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { ScrollReveal, scrollViewport } from "@/components/scroll-reveal";

interface StackCategory {
  name: string;
  summary: string;
  items: string[];
  // Highlighted as the tools used most across projects.
  core?: string[];
}

const stack: StackCategory[] = [
  {
    name: "Languages",
    summary: "What the code is written in.",
    items: [
      "TypeScript",
      "JavaScript",
      "Python",
      "SQL",
      "Common Lisp",
      "Shell / Bash",
      "PHP",
      "Liquid",
      "HTML",
      "CSS",
      "Emacs Lisp",
      "Nix",
      "Parenscript",
      "Java",
      "C#",
      "VB.NET",
    ],
    core: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    name: "Frontend",
    summary: "Interfaces, motion, and state.",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Vite",
      "shadcn/ui",
      "Radix UI",
      "Framer Motion",
      "GSAP",
      "Three.js",
      "React Three Fiber",
      "TanStack Query",
      "Zustand",
      "React Hook Form",
      "Zod",
      "React Router",
      "Recharts",
      "Leaflet",
      "Embla Carousel",
      "Lenis",
    ],
    core: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    name: "Backend & APIs",
    summary: "Servers, realtime, and auth.",
    items: [
      "Node.js",
      "Express",
      "Next.js Route Handlers",
      "REST APIs",
      "Webhooks",
      "WebSockets",
      "Socket.IO",
      "BullMQ",
      "JWT",
      "OAuth 2.0",
      "NextAuth",
      "bcrypt",
      "Nodemailer",
      "CLOG",
    ],
    core: ["Node.js", "REST APIs", "Webhooks"],
  },
  {
    name: "Databases & Storage",
    summary: "Where the data lives.",
    items: [
      "PostgreSQL",
      "Supabase",
      "Prisma",
      "SQLite",
      "Cloudflare D1",
      "MongoDB",
      "Mongoose",
      "Redis",
      "Upstash",
      "Cloudflare R2",
      "Amazon S3",
      "Oracle",
    ],
    core: ["PostgreSQL", "Supabase", "SQLite"],
  },
  {
    name: "Cloud & DevOps",
    summary: "Shipping, hosting, and monitoring.",
    items: [
      "Cloudflare Workers",
      "Durable Objects",
      "Render",
      "Docker",
      "Docker Compose",
      "GitHub Actions",
      "Turborepo",
      "Sentry",
      "NixOS",
      "Linux",
      "GitHub Pages",
      "Makefile",
    ],
    core: ["Cloudflare Workers", "Docker", "GitHub Actions"],
  },
  {
    name: "AI & Automation",
    summary: "Models, agents, and workflows.",
    items: [
      "OpenAI",
      "Anthropic Claude",
      "Google Gemini",
      "OpenRouter",
      "Groq",
      "Ollama",
      "Multi-agent Systems",
      "Speech Recognition",
      "n8n",
      "Zapier",
      "Make.com",
      "Playwright",
      "Puppeteer",
      "Web Scraping",
    ],
    core: ["OpenAI", "Anthropic Claude", "Google Gemini", "n8n"],
  },
  {
    name: "Desktop, Mobile & Extensions",
    summary: "Beyond the browser tab.",
    items: [
      "Electron",
      "Capacitor",
      "Android",
      "PWA",
      "Chrome Extensions",
      "Plasmo",
      "PyQt6",
      "RevenueCat",
      "Web Push",
    ],
    core: ["Electron", "Capacitor"],
  },
  {
    name: "Payments & Integrations",
    summary: "Third-party services wired together.",
    items: [
      "Stripe",
      "PayMongo",
      "Square",
      "Cloudbeds",
      "Recharge",
      "Google Calendar API",
      "Google Sheets API",
      "Google Maps API",
      "Brevo",
      "Resend",
      "Reclub",
      "Quo",
    ],
    core: ["Stripe", "PayMongo"],
  },
  {
    name: "CMS & Site Builders",
    summary: "Client sites and storefronts.",
    items: [
      "Shopify",
      "Wix Studio",
      "Velo",
      "WordPress",
      "WooCommerce",
      "Hugo",
      "Jekyll",
    ],
    core: ["Shopify", "Wix Studio"],
  },
  {
    name: "Data, Docs & Media",
    summary: "Reports, files, and processing.",
    items: [
      "Pandas",
      "NumPy",
      "OpenCV",
      "Jupyter",
      "ExcelJS",
      "openpyxl",
      "jsPDF",
      "PDFKit",
      "python-docx",
      "PptxGenJS",
      "FFmpeg",
      "Sharp",
    ],
  },
  {
    name: "Testing & Quality",
    summary: "Keeping it working.",
    items: [
      "Vitest",
      "Playwright Test",
      "Testing Library",
      "Jest",
      "ESLint",
      "Prettier",
      "Husky",
    ],
    core: ["Vitest", "ESLint"],
  },
  {
    name: "Developer Tools",
    summary: "The daily workbench.",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "Emacs (Doom)",
      "Vim",
      "tmux",
      "Zsh",
      "npm",
      "Bun",
      "Org mode",
      "Markdown",
      "LaTeX",
      "Pandoc",
      "FlameGraph",
      "SBCL",
      "LispWorks",
    ],
    core: ["Git", "Emacs (Doom)", "Vim"],
  },
];

const totalTools = stack.reduce((sum, category) => sum + category.items.length, 0);

export const TechStackSection = () => {
  return (
    <section id="stack" className="py-10 md:py-16 lg:py-24">
      <div className="container px-5 md:px-8" style={{ maxWidth: "1280px" }}>
        <SectionHeader
          index={2}
          eyebrow="Tech Stack"
          title="Tools I build with"
          description="The languages, frameworks, and platforms I reach for across the front end, back end, infrastructure, AI, and client integrations."
        />

        <ScrollReveal className="mt-6 md:mt-10" delay={0.08}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="type-meta text-zinc-500">
              <span className="text-accent">{totalTools}+</span> tools ·{" "}
              {stack.length} categories
            </p>
            <p className="type-meta inline-flex items-center gap-1.5 text-zinc-500">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(253,129,40,0.8)]" />
              Used most
            </p>
          </div>

          <ol className="mt-4 border-t border-white/10 md:mt-6">
            {stack.map((category, categoryIndex) => {
              const core = new Set(category.core);
              return (
                <motion.li
                  key={category.name}
                  className="grid gap-3 border-b border-white/10 py-5 md:grid-cols-[13rem_1fr] md:gap-8 md:py-6"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={scrollViewport}
                  transition={{ duration: 0.45, delay: (categoryIndex % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div>
                    <p className="type-meta text-zinc-500">
                      {String(categoryIndex + 1).padStart(2, "0")} · {category.items.length} tools
                    </p>
                    <h3 className="type-card-title mt-1.5 text-zinc-100">{category.name}</h3>
                    <p className="type-small mt-1 text-zinc-500">{category.summary}</p>
                  </div>

                  <ul className="flex flex-wrap content-start gap-2" aria-label={`${category.name} tools`}>
                    {category.items.map((item) => {
                      const isCore = core.has(item);
                      return (
                        <li
                          key={item}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors md:text-sm ${
                            isCore
                              ? "border-accent/45 bg-accent/10 text-accent-soft"
                              : "border-white/10 bg-white/[0.02] text-zinc-300 hover:border-white/25 hover:text-white"
                          }`}
                        >
                          {isCore && (
                            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
                          )}
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </motion.li>
              );
            })}
          </ol>
        </ScrollReveal>
      </div>
    </section>
  );
};
