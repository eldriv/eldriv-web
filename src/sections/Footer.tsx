"use client";

import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg'
import { ScrollReveal } from '@/components/scroll-reveal';

const footerLinks = [
  {
    title: 'X',
    href: 'https://x.com/eldrivi',
    target: "_blank",
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/miadknows/',
    target: "_blank",
  },
  {
    title: 'Facebook',
    href: 'https://www.facebook.com/eldriv/',
    target: "_blank",
  },
]

export const Footer = () => {
  return (
    <footer className="relative z-10 overflow-x-clip w-full ">
      {/* Background gradient layer */}
      <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-accent/[0.08]
       [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10 pointer-events-none">
      </div>

      {/* Content */}
      <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-6 md:px-8 pb-6 sm:pb-8">
        <ScrollReveal variant="fadeIn" duration={0.5}>
        <div className="glass rounded-3xl md:rounded-full px-6 md:px-8 py-6 md:py-4 text-sm flex flex-col md:flex-row md:justify-between items-center gap-6 md:gap-8">
          <div className="text-white/40">
            &copy; 2025. All Rights Reserved. | Powered by Eldriv
          </div>
          <nav className="flex flex-col md:flex-row items-center gap-8">
            {footerLinks.map(link => (
              <a
                key={link.title}
                href={link.href}
                target={link.target}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-white/70 hover:text-accent hover:bg-accent/10 transition-colors"
              >
                <span className="font-semibold">{link.title}</span>
                <ArrowUpRightIcon className="size-4" />
              </a>
            ))}
          </nav>
        </div>
        </ScrollReveal>
      </div>
    </footer>
  )
}
