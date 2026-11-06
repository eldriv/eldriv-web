'use client';
import { useState, useEffect, useRef } from 'react';

export const Header = () => {
  const [activeLink, setActiveLink] = useState('Home');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const navLinks = ['Home', 'Experience', 'Stack', 'Blogs', 'About', 'Testimonials', 'Contact'];

  // Improved animation effect with proper timing
  useEffect(() => {
    const el = navRefs.current[activeLink];
    if (el && !isMobileMenuOpen) {
      // Only update indicator on desktop
      setIndicatorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [activeLink, isMobileMenuOpen]);

  // Add scroll detection to update active link based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link =>
        document.getElementById(link.toLowerCase())
      );
      const currentSection = sections.findIndex(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (currentSection !== -1 && navLinks[currentSection] !== activeLink) {
        setActiveLink(navLinks[currentSection]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeLink]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.mobile-nav-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (link: string) => {
    setActiveLink(link);
    setIsMobileMenuOpen(false); // Close mobile menu when clicking a link
    const section = document.getElementById(link.toLowerCase());
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#0c0c0f]/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-5 sm:px-6 md:px-8">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('Home');
            }}
            className="font-pixel text-[15px] text-zinc-100"
          >
            Eldriv<span aria-hidden="true" className="text-accent">.</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="relative hidden items-center gap-1 md:flex">
            <span
              className="absolute -bottom-[17px] h-[2px] bg-accent shadow-[0_0_10px_rgba(253,129,40,0.7)] transition-all duration-500 ease-in-out"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
              }}
            />
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                data-pointer={`nav-${link.toLowerCase()}`}
                ref={(el) => {
                  navRefs.current[link] = el;
                }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link);
                }}
                className={`
                  relative rounded-full px-3 py-1.5 font-mono text-[12px] lowercase
                  transition-colors duration-300
                  data-[pointer-active]:bg-accent/10 data-[pointer-active]:text-accent
                  ${activeLink === link ? 'text-zinc-100' : 'text-zinc-500 hover:text-zinc-200'}
                `}
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="mobile-nav-container fixed top-1 right-3 z-50 md:hidden">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:bg-white/10 data-[pointer-active]:bg-accent/15 data-[pointer-active]:ring-1 data-[pointer-active]:ring-accent/50"
          aria-label="Toggle menu"
          data-pointer="nav-menu"
        >
          <div className="relative w-5 h-5">
            {/* Hamburger Icon */}
            <span
              className={`absolute left-0 w-5 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'top-2 rotate-45' : 'top-1'
              }`}
            />
            <span
              className={`absolute left-0 top-2 w-5 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 w-5 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-3'
              }`}
            />
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-[#0c0c0f]/60 backdrop-blur-sm transition-opacity duration-300 z-40 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        />

        {/* Mobile Menu */}
        <div
          className={`glass-strong absolute top-14 right-0 w-48 rounded-2xl transition-all duration-300 z-50 ${
            isMobileMenuOpen 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
          }`}
        >
          <nav className="p-1.5">
            {navLinks.map((link, index) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link);
                }}
                className={`
                  block px-3 py-2 rounded-xl font-mono text-[13px] lowercase transition-all duration-200
                  ${activeLink === link 
                    ? 'text-accent bg-accent/10' 
                    : 'text-zinc-500 hover:text-zinc-100 hover:bg-white/[0.05]'
                  }
                `}
                style={{
                  animationDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms'
                }}
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};