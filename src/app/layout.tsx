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