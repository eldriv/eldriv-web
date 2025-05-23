'use client';
import { useState, useEffect, useRef } from 'react';

export const Header = () => {
  const [activeLink, setActiveLink] = useState('Home');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const navLinks = ['Home', 'Experience', 'Blogs', 'About', 'Contact'];

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
      {/* Desktop Navigation */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <nav className="relative flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur-md shadow-lg">
          {/* Sliding Highlight */}
          <span
            className="absolute top-0 bottom-0 bg-[#fd8128] rounded-full transition-all duration-500 ease-in-out z-0"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
            }}
          />
          {/* Navigation Links */}
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              ref={(el) => {
                navRefs.current[link] = el;
              }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link);
              }}
              className={`
                relative z-10 px-4 py-1.5 rounded-full text-sm font-medium
                transition-colors duration-300
                ${activeLink === link ? 'text-white' : 'text-white/70 hover:text-white'}
              `}
            >
              {link}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="mobile-nav-container fixed top-4 right-4 z-50 md:hidden">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center w-12 h-12 border border-white/15 rounded-full bg-white/10 backdrop-blur-md shadow-lg transition-all duration-300 hover:bg-white/20"
          aria-label="Toggle menu"
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
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        />

        {/* Mobile Menu */}
        <div
          className={`absolute top-14 right-0 w-44 border border-white/15 rounded-xl bg-white/10 backdrop-blur-md shadow-lg transition-all duration-300 z-50 ${
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
                  block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${activeLink === link 
                    ? 'text-white bg-[#fd8128]' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
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