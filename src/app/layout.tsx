import type { Metadata } from "next";
import { Roboto, Calistoga } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";

const roboto = Roboto ({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300"],
});

const calistoga = {
  variable: "--font-serif",
  style: "font-family: 'Times New Roman', Times, serif;",
};

export const metadata = {
  title: "Eldriv's Portfolio",
  description: "Get to know more about my technical proficiencies, my side-projects, and what inspires me as a Software Engineer.",
  
  openGraph: {
    title: "Eldriv's Portfolio",
    description: "Get to know more about my technical proficiencies, my side-projects, and what inspires me as a Software Engineer.",
    url: "https://portfolio.eldriv.com",
    siteName: "Eldriv's Portfolio",
    images: [
      {
        url: "https://https://portfolio.eldriv.com/assets/images/og-image.jpg", 
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
    title: "Eldriv's Portfolio",
    description: "Get to know more about my technical proficiencies, my side-projects, and what inspires me as a Software Engineer.",
    images: ["https://https://portfolio.eldriv.com/assets/images/og-image.jpg"], 
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
}

export const aboutMetadata = {
  title: "About Eldriv | Software Engineer Portfolio",
  description: "Learn about my journey as a Software Engineer, technical background, and what drives my passion for creating innovative solutions.",
  openGraph: {
    title: "About Eldriv | Software Engineer",
    description: "Learn about my journey as a Software Engineer, technical background, and what drives my passion for creating innovative solutions.",
    images: ["/assets/images/og-image.jpg"],
  },
}

export const projectsMetadata = {
  title: "Projects | Eldriv's Portfolio",
  description: "Explore my side-projects and technical work",
  openGraph: {
    title: "Projects | Eldriv's Portfolio",
    description: "Explore my side-projects and technical work",
    images: ["/assets/images/og-image.jpg"],
  },
}

export const experienceMetadata = {
  title: "Experience | Eldriv's Portfolio",
  description: "Discover my professional experience, technical proficiencies, and career journey as a Software Engineer.",
  openGraph: {
    title: "Experience | Eldriv's Portfolio", 
    description: "Discover my professional experience, technical proficiencies, and career journey as a Software Engineer.",
    images: ["/assets/images/og-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${calistoga.variable}`}>
      <body
        className={twMerge(
          "bg-black text-white antialiased font-sans relative min-h-screen overflow-x-hidden"
        )}
      >
        {/* 🔵 Background grid and highlights */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-950" />
          <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,transparent_calc(100%_-_1px),rgba(75,75,75,0.05)_calc(100%_-_1px)),linear-gradient(to_bottom,transparent_calc(100%_-_1px),rgba(75,75,75,0.05)_calc(100%_-_1px))]" />
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,transparent_calc(100%_-_1px),rgba(100,100,100,0.1)_calc(100%_-_1px)),linear-gradient(135deg,transparent_calc(100%_-_1px),rgba(100,100,100,0.1)_calc(100%_-_1px))]" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_35%,#3366FF_0%,transparent_25%)]" />
        </div>

        {/* 🔤 Main content */}
        {children}
      </body>
    </html>
  );
}
