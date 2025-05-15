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
  title: "Eldriv's Portfolio",
  description:
    "This website contains eldriv's portfolio with regards to his career in tech industry.",
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
