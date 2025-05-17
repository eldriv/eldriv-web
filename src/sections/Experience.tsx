"use client";

// Components
import { SectionHeader } from '@/components/SectionHeader';
import { useState, useEffect, MouseEvent, useRef } from 'react'; 
import { motion } from 'framer-motion'; // Import framer-motion

// SVGs
import CheckIcon from '@/assets/icons/check-circle.svg';
import ArrowUprightIcon from '@/assets/icons/arrow-up-right.svg';

// Images
import portfolioImage1 from '@/assets/images/1.png';
import portfolioImage2 from '@/assets/images/2.png';
import portfolioImage3 from '@/assets/images/3.png';
import portfolioImage4 from '@/assets/images/4.png';
import portfolioImage5 from '@/assets/images/5.png';
import portfolioImage6 from '@/assets/images/6.png';
import portfolioImage7 from '@/assets/images/valmiz-front.png';
import KreiLandingPage from "@/assets/images/krei.png";
import certificateImage from "@/assets/images/coc.png";
import Image, { StaticImageData } from "next/image"; 
import { Card } from '@/components/card';

// Define types for portfolio items
interface PortfolioImage {
  id: number;
  src: StaticImageData;
  alt: string;
}

// Define types for project results
interface ProjectResult {
  title: string;
}

// Define types for portfolio experience items
interface PortfolioExperienceItem {
  company: string;
  Date: string;
  title: string;
  results: ProjectResult[];
  link?: string;
  image: StaticImageData;
  target?: string;
  certificateImage?: StaticImageData;
  buttonText: string;
  buttonType: 'link' | 'certificate' | 'gallery';
}

// Define lightbox state type
interface LightboxState {
  isOpen: boolean;
  type: 'certificate' | 'gallery' | null;
  currentImage: StaticImageData | PortfolioImage | null;
  currentIndex: number;
}

// Using actual numbered portfolio images
const portfolioImages: PortfolioImage[] = [
  {
    id: 1,
    src: portfolioImage1,
    alt: "Portfolio image 1"
  },
  {
    id: 2,
    src: portfolioImage2,
    alt: "Portfolio image 2"
  },
  {
    id: 3,
    src: portfolioImage3,
    alt: "Portfolio image 3"
  },
  {
    id: 4,
    src: portfolioImage4,
    alt: "Portfolio image 4"
  },
  {
    id: 5,
    src: portfolioImage5,
    alt: "Portfolio image 5"
  },
];

// Close button SVG component
const CloseIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// Arrow icons for gallery navigation
const LeftArrowIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M19 12H5"></path>
    <path d="M12 19l-7-7 7-7"></path>
  </svg>
);

const RightArrowIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14"></path>
    <path d="M12 5l7 7-7 7"></path>
  </svg>
);

// Define Lightbox props interface
interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'certificate' | 'gallery' | null;
  currentImage: StaticImageData | PortfolioImage | null;
  onPrev: (e: MouseEvent<HTMLButtonElement>) => void;
  onNext: (e: MouseEvent<HTMLButtonElement>) => void;
  onThumbnailClick: (index: number) => void;
  totalImages: number;
  currentIndex: number;
}

// Lightbox component
const Lightbox = ({ 
  isOpen, 
  onClose, 
  type, 
  currentImage, 
  onPrev, 
  onNext, 
  onThumbnailClick,
  totalImages, 
  currentIndex 
}: LightboxProps) => {
  // Lock scrolling when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute top-6 right-6">
        <button 
          onClick={onClose}
          className="text-white h-10 w-10 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/50 transition-colors"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>
      
      <div className="relative w-full max-w-7xl">
        {type === 'certificate' && (
          <motion.div 
            className="flex justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {currentImage && !('id' in currentImage) && (
              <Image 
                src={currentImage} 
                alt="Certificate" 
                className="max-h-[80vh] w-auto object-contain rounded-lg"
              />
            )}
          </motion.div>
        )}
        
        {type === 'gallery' && (
          <div className="flex flex-col items-center">
            <motion.div 
              className="relative w-full flex justify-center"
              key={currentIndex}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {currentImage && 'id' in currentImage && (
                <Image 
                  src={currentImage.src} 
                  alt={currentImage.alt} 
                  className="max-h-[75vh] w-auto object-contain rounded-lg"
                />
              )}
              
              <button 
                onClick={onPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white h-12 w-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/50 transition-colors"
                aria-label="Previous image"
              >
                <LeftArrowIcon className="w-6 h-6" />
              </button>
              
              <button 
                onClick={onNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white h-12 w-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/50 transition-colors"
                aria-label="Next image"
              >
                <RightArrowIcon className="w-6 h-6" />
              </button>
            </motion.div>
            <div className="mt-4 text-white text-sm">
              {currentIndex + 1} / {totalImages}
            </div>
            
            {/* Thumbnail strip */}
            <div className="mt-4 flex gap-2 overflow-x-auto max-w-full pb-2">
              {portfolioImages.map((image, index) => (
                <motion.div 
                  key={image.id} 
                  className={`w-16 h-16 flex-shrink-0 cursor-pointer ${index === currentIndex ? 'ring-2 ring-[#fd8128]' : ''}`}
                  onClick={() => onThumbnailClick(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image 
                    src={image.src} 
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const portfolioExperience: PortfolioExperienceItem[] = [
  {
    company: "Krei.Systems",
    Date: "May 2024–May 2025",
    title: "Junior Software Engineer",
    results: [
      { title: "Wrote a components and a parser for Information Mapping System." },
      { title: "Independently developed and maintained the company website." },
      { title: "Wrote a technical documentation on every tool and systems." },
      { title: "Collaborated with AI scientist on Artificial General Intelligence (AGI)." },
      { title: "Enhanced Knoweldge Base, a Wiki.js fork, by integrating it with Vik." }, 
      { title: "Enhanced PMS, a Redmine fork for project management system." },
      { title: "Managed internal tooling—Common Lisp, Shell, and Nix." },
      { title: "Successfully ported the codebase from SBCL to LispWorks." },
      { title: "Ported the deployment tool from Shell script to Common Lisp." }, 
    ],
    link: "https://krei.systems",
    target: "_blank",
    image: KreiLandingPage,
    buttonText: "Visit Live Site",
    buttonType: "link"
  },
  {
    company: "Valmiz, Inc",
    Date: "February 2024–April 2024",
    title: "Intern",
    results: [
      { title: "Successfully finished 2 books—Practical Common Lisp and CLAGTISC."},
      { title: "Developed a CLOG web based application for Valmiz Search Interface using Common Lisp." },
    ],
    certificateImage: certificateImage, // Certificate image
    image: portfolioImage7,
    buttonText: "View Certificate",
    buttonType: "certificate"
  },
  {
    company: "Maevi Creative Studio",
    Date: "March 2021–July 2021",
    title: "Graphics Designer",
    results: [
      { title: "Created visual designs using Adobe Illustrator, Canva, and Adobe Photoshop" },
      { title: "Produced graphics for marketing materials and client projects." },
    ],
    image: portfolioImage6,
    buttonText: "View Portfolio",
    buttonType: "gallery"
  },
];

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    } 
  },
  hover: {
    scale: 1.03,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
    transition: { 
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

export const ExperienceSection = () => {
  const [expanded, setExpanded] = useState(false);
  const [lightboxState, setLightboxState] = useState<LightboxState>({
    isOpen: false,
    type: null,
    currentImage: null,
    currentIndex: 0
  });
  
  const [visibleSections, setVisibleSections] = useState<{[key: number]: boolean}>({});
  
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);
  
  const [isMobile, setIsMobile] = useState(false);
  
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const sectionRef = useRef<HTMLElement | null>(null);
  
  // Check if on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Set up card refs
  useEffect(() => {
    cardRefs.current = Array(portfolioExperience.length).fill(null);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.project-card');
      const viewportHeight = window.innerHeight;
      const viewportCenter = window.innerHeight / 2;
      
      // Track which sections are visible for animations
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        // Consider a section visible when at least partially in the viewport
        const isVisible = rect.top < viewportHeight && rect.bottom > 0;
        
        setVisibleSections(prev => {
          if (prev[index] !== isVisible) {
            return { ...prev, [index]: isVisible };
          }
          return prev;
        });
        
        // On mobile, don't dim any cards - keep them all fully visible
        if (isMobile) {
          setFocusedCardIndex(null);
          return;
        }
        
        // Calculate which card is most centered in the viewport
        // We do this separately to determine focused card for desktop
        const cards = cardRefs.current.filter(Boolean);
        
        if (cards.length) {
          let closestCard = 0;
          let minDistance = Infinity;
          
          cards.forEach((cardRef, idx) => {
            if (cardRef) {
              const cardRect = cardRef.getBoundingClientRect();
              const cardCenter = cardRect.top + cardRect.height / 2;
              const distanceFromViewportCenter = Math.abs(cardCenter - viewportCenter);
              
              if (distanceFromViewportCenter < minDistance) {
                minDistance = distanceFromViewportCenter;
                closestCard = idx;
              }
            }
          });
          
          setFocusedCardIndex(closestCard);
        }
      });
    };
    
    // Initialize visibility and focus on mount
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  // Open lightbox
  const openLightbox = (type: 'certificate' | 'gallery', image: StaticImageData | PortfolioImage, index = 0) => {
    setLightboxState({
      isOpen: true,
      type,
      currentImage: image,
      currentIndex: index
    });
  };
  
  // Close lightbox
  const closeLightbox = () => {
    setLightboxState({
      ...lightboxState,
      isOpen: false
    });
  };
  
  // Navigate to previous image in gallery
  const goToPrevImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newIndex = (lightboxState.currentIndex - 1 + portfolioImages.length) % portfolioImages.length;
    setLightboxState({
      ...lightboxState,
      currentImage: portfolioImages[newIndex],
      currentIndex: newIndex
    });
  };
  
  // Navigate to next image in gallery
  const goToNextImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newIndex = (lightboxState.currentIndex + 1) % portfolioImages.length;
    
    setLightboxState({
      ...lightboxState,
      currentImage: portfolioImages[newIndex],
      currentIndex: newIndex
    });
  };
  
  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setLightboxState({
      ...lightboxState,
      currentImage: portfolioImages[index],
      currentIndex: index
    });
  };
  
  // Helper function to calculate opacity based on focus
  const getCardOpacity = (index: number) => {
    // On mobile, all cards remain at full opacity
    if (isMobile || focusedCardIndex === null) return 1;
    
    // On desktop, focus-based opacity
    return index === focusedCardIndex ? 1 : 0.2;
  };
  
  // Helper function to calculate transition properties
  const getCardTransition = (index: number) => {
    // Smooth transition for opacity changes
    return {
      opacity: {
        duration: 0.5,
        ease: "easeInOut"
      }
    };
  };
  
  const HeaderComponent = SectionHeader();

  return (
    <section className="pb-16 lg:py-24" id="experience" ref={sectionRef}> 
      <div className="container" style={{ maxWidth: "1230px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HeaderComponent 
            eyebrow="Eldriv's" 
            title="Professional History" 
            description="A look at the work I've done—designing systems, graphics design, writing code, and collaborating with teams to build useful and scalable solutions."
          />
        </motion.div>
        <div className="mt-20 md:mt-20 relative">
          <div>
            {/* Sticky cards container */}
            <div className="space-y-10">
              {portfolioExperience.map((project, index) => (
                <div 
                  key={project.title} 
                  className="sticky project-card" 
                  style={{ top: `${100 + index * 35}px` }}
                  ref={(el) => { cardRefs.current[index] = el; }}
                >
                  <motion.div
                    initial="hidden"
                    animate={visibleSections[index] ? {
                      opacity: getCardOpacity(index),
                      y: 0
                    } : "hidden"}
                    transition={getCardTransition(index)}
                    variants={{
                      hidden: { opacity: 0, y: 70 },
                    }}
                  >
                    <Card className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20">
                      <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                        <div className="lg:pb-16">           
                          <div className="bg-gradient-to-r from-emerald-300 
                            to-sky-400 inline-flex gap-2 font-bold uppercase 
                            tracking widest text-sm text-transparent bg-clip-text">
                            <span>{project.company}</span>
                            <span>&bull;</span>
                            <span>{project.Date}</span>
                          </div>
                          <h3 className="font-sans text-2xl mt-2 md:mt-5 md:text-4xl">{project.title}</h3>
                          <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
                          <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                            {project.results
                              // For first card only: show all items when expanded, or first 2 when collapsed
                              .filter((_, resultIndex) => index !== 0 || expanded || resultIndex < 2)
                              .map((result, resultIndex) => (
                                <motion.li 
                                  key={result.title} 
                                  className="flex gap-2 text-sm text-white/100 md:text-base"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 + resultIndex * 0.1 }}
                                >
                                  <CheckIcon className="w-5 h-5 flex-shrink-0" />
                                  <span>
                                    {result.title}
                                  </span>
                                </motion.li>
                              ))
                            }
                          </ul>
                          
                          {/* Show View More/Less button only for the first project */}
                          {index === 0 && project.results.length > 2 && (
                            <motion.button 
                              onClick={toggleExpand}
                              className="mt-4 text-sm text-sky-400 font-medium flex items-center gap-1 hover:text-sky-300 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {expanded ? 'View Less -' : 'View More +'}
                            </motion.button>
                          )}
                          
                          {/* Conditional button based on project type */}
                          {project.buttonType === 'link' && project.link ? (
                            <a href={project.link} target="_blank">
                              <motion.button 
                                className="bg-[#fd8128] text-white h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8"
                                whileHover={{ scale: 1.05, backgroundColor: "#ff9033" }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                              >
                                <span>{project.buttonText}</span>  
                                <ArrowUprightIcon className="size-4" />
                              </motion.button>
                            </a>
                          ) : (
                            <motion.button 
                              onClick={() => {
                                if (project.buttonType === 'certificate' && project.certificateImage) {
                                  openLightbox('certificate', project.certificateImage);
                                } else if (project.buttonType === 'gallery') {
                                  openLightbox('gallery', portfolioImages[0], 0);
                                }
                              }}
                              className="bg-[#fd8128] text-white h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8"
                              whileHover={{ scale: 1.05, backgroundColor: "#ff9033" }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                            >
                              <span>{project.buttonText}</span>  
                              <ArrowUprightIcon className="size-4" />
                            </motion.button>
                          )}
                        </div>
                        <div className="relative">
                          <motion.div
                            variants={imageVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            className="w-full h-full lg:absolute"
                          >
                            <Image 
                              src={project.image} 
                              alt={project.title} 
                              className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none transform transition-transform"
                              priority={index < 2} // Prioritize loading the first two images
                            />
                          </motion.div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Lightbox component */}
      <Lightbox 
        isOpen={lightboxState.isOpen}
        onClose={closeLightbox}
        type={lightboxState.type}
        currentImage={lightboxState.currentImage}
        currentIndex={lightboxState.currentIndex}
        totalImages={portfolioImages.length}
        onPrev={goToPrevImage}
        onNext={goToNextImage}
        onThumbnailClick={handleThumbnailClick}
      />
    </section>
  );
};