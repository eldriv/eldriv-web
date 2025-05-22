"use client";

// Link
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

// Components
import { SectionHeader } from '@/components/SectionHeader';
import { Card } from '@/components/card';

// Images
import Image from 'next/image';
import memojiAvatar1 from "@/assets/images/taijitu-lisp.png";
import memojiAvatar2 from "@/assets/images/taijitu-lisp.png";
import memojiAvatar3 from "@/assets/images/tmux.png";
import memojiAvatar4 from "@/assets/images/nixos.png";
import memojiAvatar5 from "@/assets/images/docker.png";
import memojiAvatar6 from "@/assets/images/taijitu-lisp.png";
import memojiAvatar7 from "@/assets/images/taijitu-lisp.png";
import memojiAvatar8 from "@/assets/images/ubuntu.png";
import { Fragment } from 'react';

// Define interface for article items
interface Article {
  name: string;
  topic: string;
  text: string;
  avatar: any; // Using any for image imports
  href: string;
  target: string;
}

const Articles: Article[] = [
  {
    name: "Building 'adz' in Common Lisp with Clingon",
    topic: "Programming",
    text: "In software development, engineers require tools that prioritize efficiency and flexibility. When dealing with complex systems, there's a...",
    avatar: memojiAvatar1,
    href: "https://eldriv.com/en/adz",
    target: "_blank",
  },
  {
    name: "A Wanderer's Tale of Discovering Lisp",
    topic: "Programming",
    text: "In February 2024, I felt lost in an unfamiliar forest, where a strong aura seemed to fill the air as if someone were watching me. The path...",
    avatar: memojiAvatar2,
    href: "https://eldriv.com/en/lisp",
    target: "_blank",
  },
  {
    name: "Using Tmux to Perk Up Your Terminal Experience",
    topic: "System Administration",
    text: "As engineers, one of the essential tools we've always relied on is the terminal, due to its efficieny and speed that allows us to execute...",
    avatar: memojiAvatar3,
    href: "https://eldriv.com/en/tmux",
    target: "_blank",
  },
  {
    name: "How NixOS Treated a Novice Sysadmin",
    topic: "Operating System",
    text: "For anyone reading this article now, you might be wondering why I chose such a title. Have you ever seen someone who is very skilled...",
    avatar: memojiAvatar4,
    href: "https://eldriv.com/en/nixos",
    target: "_blank",
  },
  {
    name: "Docker Containers Are Fast",
    topic: "System Administration",
    text: "Hello there! From the last article, I mentioned NixOS, right? My machine fully supports NixOS, and my experiences so far have exceeded...",
    avatar: memojiAvatar5,
    href: "https://eldriv.com/en/docker",
    target: "_blank",
  },
  {
    name: "Testing a Testing Framework",
    topic: "Quality Testing",
    text: "I've been working with Common Lisp for about eight months now, and I've become curious about how to test my code in this language...",
    avatar: memojiAvatar6,
    href: "https://eldriv.com/en/fiveam",
    target: "_blank",
  },
  {
    name: "Explore Parsing in S-expression",
    topic: "Programming",
    text: "Parsing is a technique where we use to analyze and understand the structure of a text or code in order to extract meaningful...",
    avatar: memojiAvatar7,
    href: "https://eldriv.com/en/parser",
    target: "_blank",
  },
  {
    name: "How I Installed Ubuntu From Windows",
    topic: "Operating System",
    text: "I have been using Windows for about 10 years, so switching to a different operating system was a brave move for me. I chose...",
    avatar: memojiAvatar8,
    href: "https://eldriv.com/en/ubuntu",
    target: "_blank",
  },
];

export const ArticlesSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const HeaderComponent = SectionHeader();
  
  const smoothScroll = (distance: number): void => {
    if (!scrollContainerRef.current || isScrolling) return;
    
    setIsAnimationPaused(true);
    setIsScrolling(true);
    
    const startPosition = scrollContainerRef.current.scrollLeft;
    const targetPosition = startPosition + distance;
    const startTime = performance.now();
    const duration = 500; // 500ms for smooth animation
    
    const animateScroll = (currentTime: number): void => {
      const elapsedTime = currentTime - startTime;
      
      if (elapsedTime < duration) {
        // Easing function: easeInOutCubic for smooth acceleration and deceleration
        const progress = elapsedTime / duration;
        const easeProgress = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = startPosition + (distance * easeProgress);
          requestAnimationFrame(animateScroll);
        }
      } else {
        // Ensure we end exactly at the target position
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = targetPosition;
        }
        setIsScrolling(false);
      }
    };
    
    requestAnimationFrame(animateScroll);
  };
  
  const scrollLeft = (): void => {
    smoothScroll(-300);
  };
  
  const scrollRight = (): void => {
    smoothScroll(300);
  };

  // Add event listeners for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      // Only handle keys if the scroll container is in view
      if (scrollContainerRef.current) {
        const containerRect = scrollContainerRef.current.getBoundingClientRect();
        const isVisible = 
          containerRect.top < window.innerHeight && 
          containerRect.bottom > 0;
          
        if (isVisible) {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            scrollLeft();
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            scrollRight();
          }
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isScrolling]); // Re-bind if scrolling state changes

  return ( 
    <div className="py-20 lg:py-24 relative" id="blogs">
      <div className="container" style={{ maxWidth: "1500px" }}>
        <HeaderComponent 
          eyebrow="Eldriv's" 
          title="Life and Tech Blogs" 
          description="This passage reflects a personal journey through life and technology. The author aims to inspire others to explore their own paths, 
            awakening to the profound possibilities that lie within their consciousness and beyond." 
        />
        
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="mt-16 lg:mt-20 flex overflow-x-auto hide-scrollbar 
            [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4 -my-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={() => setIsAnimationPaused(true)}
            onMouseLeave={() => setIsAnimationPaused(false)}
          > 
            <div 
              className={`flex gap-8 pr-8 flex-none animate-move-left [animation-duration:90s] ${isAnimationPaused ? '[animation-play-state:paused]' : ''}`}
            > 
              {[...new Array(2)].fill(0).map((_, index) => (
                <Fragment key={index}>
                  {Articles.map(article => (
                    <Link key={`${article.name}-${index}`} href={article.href} target={article.target}>
                      <Card className="max-w-xs md:max-w-md p-6 md:p-8 hover:-rotate-3 transition duration-300">
                        <div className="flex gap-4 items-center">
                          <div className="size-14 inline-flex items-center justify-center flex-shrink-0">
                            <Image 
                              src={article.avatar} 
                              alt={article.name} 
                              className="max-h-full"
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-[#fd8128]">{article.name}</div>
                            <div className="text-sm text-white/80 mt-1">{article.topic}</div>
                          </div>
                        </div>
                        <p className="mt-4 md:mt-6 text-sm md:text-base">{article.text}</p>
                      </Card>
                    </Link>
                  ))}
                </Fragment>
              ))}   
            </div>
          </div>
          
          {/* Navigation Arrows with visual feedback */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button 
              onClick={scrollLeft}
              disabled={isScrolling}
              className={`rounded-full p-2 transition-all duration-300 ${
                isScrolling 
                  ? 'bg-black/20 text-white/40 cursor-not-allowed' 
                  : 'bg-black/30 hover:bg-black/50 text-white/80 hover:text-white hover:scale-105'
              }`}
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            
            <button 
              onClick={scrollRight}
              disabled={isScrolling}
              className={`rounded-full p-2 transition-all duration-300 ${
                isScrolling 
                  ? 'bg-black/20 text-white/40 cursor-not-allowed' 
                  : 'bg-black/30 hover:bg-black/50 text-white/80 hover:text-white hover:scale-105'
              }`}
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Add custom CSS to hide scrollbar */}
        <style jsx global>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
};