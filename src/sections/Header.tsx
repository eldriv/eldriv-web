'use client';
import { useState, useEffect, useRef } from 'react';

export const Header = () => {
  const [activeLink, setActiveLink] = useState('Home');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const navLinks = ['Home', 'Experience', 'Blogs', 'About', 'Contact'];
  
  // Improved animation effect with proper timing
  useEffect(() => {
    const el = navRefs.current[activeLink];
    if (el) {
      // Set the indicator position with smooth transition
      setIndicatorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [activeLink]);

  // Add scroll detection to update active link based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link =>
        document.getElementById(link.toLowerCase())
      );
      const currentSection = sections.findIndex(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        // Adjust this value based on when you want the section to be considered "active"
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (currentSection !== -1 && navLinks[currentSection] !== activeLink) {
        setActiveLink(navLinks[currentSection]);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeLink]);

  const scrollToSection = (link: string) => {
    setActiveLink(link);
    const section = document.getElementById(link.toLowerCase());
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Adjust offset as needed
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="relative flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur-md shadow-lg">
        {/* Sliding Highlight with improved animation */}
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
  );
};