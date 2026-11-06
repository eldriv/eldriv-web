import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";
import { twMerge } from "tailwind-merge";

const calistoga = {
  variable: "--font-serif",
  style: "font-family: 'Times New Roman', Times, serif;",
};

export const metadata: Metadata = {
  title: "Michael Adrian Villareal | Product & Software Engineer",
  description: "Michael Adrian Villareal builds web products, client websites, and connected systems—from product direction and architecture through integrations and launch.",
  
  openGraph: {
    title: "Michael Adrian Villareal | Product & Software Engineer",
    description: "Web products, client websites, and connected systems built from product direction through launch.",
    url: "https://eldriv-portfolio.netlify.app",
    siteName: "Eldriv",
    images: [
      {
        url: "https://eldriv-portfolio.netlify.app/assets/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Eldriv's Portfolio - Software Engineer showcasing technical skills and projects",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Michael Adrian Villareal | Product & Software Engineer",
    description: "Web products, client websites, and connected systems built from product direction through launch.",
    images: ["https://portfolio.eldriv.com/assets/images/og-image.png"],
    creator: "@eldrivi", 
  },

  // Additional SEO tags
  keywords: [
    "software engineer",
    "portfolio",
    "web developer",
    "technical skills",
    "side projects",
    "programming",
    "full stack developer",
    "eldriv"
  ],
  
  // Canonical URL
  alternates: {
    canonical: "https://portfolio.eldriv.com",
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} ${calistoga.variable}`}
    >
      <body
        className={twMerge(
          "bg-[#0c0c0f] text-zinc-100 antialiased font-sans relative min-h-screen overflow-x-hidden"
        )}
      >
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="halftone mask-corner-tr absolute -right-10 -top-10 h-[420px] w-[520px] opacity-[0.14]" />
          <div className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-accent/[0.07] blur-[120px]" />
          <div className="halftone mask-corner-bl absolute -bottom-10 -left-10 h-[420px] w-[520px] opacity-[0.12]" />
        </div>

        {/* 🔤 Main content */}
        {children}
      </body>
    </html>
  );
}