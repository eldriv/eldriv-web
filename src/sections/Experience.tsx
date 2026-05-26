"use client";

// Components
import { SectionHeader } from '@/components/SectionHeader';
import { ScrollReveal } from '@/components/scroll-reveal';
import { useState, useEffect, MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion'; // Import framer-motion

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
import VedaLandingPage from "@/assets/images/veda.png";
import certificateImage from "@/assets/images/coc.png";
import freelanceImage from "@/assets/images/figma.png";
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
    company: "Veda Technologies, Inc.",
    Date: "May 2024–May 2025",
    title: "Junior Software Engineer",
    results: [
      { title: "Wrote a components and a parser for Information Mapping System." },
      { title: "Independently developed and maintained the company website." },
      { title: "Wrote a technical documentation on every tool and systems." },
      { title: "Collaborated with AI scientist on Artificial General Intelligence (AGI)." },
      { title: "Enhanced Knowledge Base, a Wiki.js fork, by integrating it with Vik." }, 
      { title: "Enhanced PMS, a Redmine fork for project management system." },
      { title: "Managed internal tooling—Common Lisp, Shell, and Nix." },
      { title: "Successfully ported the codebase from SBCL to LispWorks." },
      { title: "Ported the deployment tool from Shell script to Common Lisp." }, 
    ],
    link: "https://veda-tech.com",
    target: "_blank",
    image: VedaLandingPage,
    buttonText: "Visit Website",
    buttonType: "link"
  },
  {
    company: "Valmiz, Inc",
    Date: "February 2024–April 2024",
    title: "Intern",
    results: [
      { title: "Successfully finished 2 books—Practical Common Lisp and CLAGTISC."},
      { title: "Developed a CLOG web based application for Valmiz Search Interface and a portfolio website journey using CLOG, Javascript and Common Lisp." },
    ],
    certificateImage: certificateImage, // Certificate image
    image: portfolioImage7,
    buttonText: "View Certificate",
    buttonType: "certificate"
  },
  {
    company: "Independent Contractor",
    Date: "January 2024 - Present",
    title: "Web Developer",
    results: [
      { title: "Clients Worldwide" },
      { title: "UI/UX Design (Figma)" },
      { title: "SEO" },
      { title: "Automations (Zapier, n8n, etc.)" },
      { title: "Funnels (Landing Pages, Sales Pages, etc.)" },
      { title: "Content Creation (Blog Posts, Articles, etc.)" },
    ],
    image: freelanceImage,
    link: "#web",
    target: "_self",
    buttonText: "View Portfolio",
    buttonType: "link"
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
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [lightboxState, setLightboxState] = useState<LightboxState>({
    isOpen: false,
    type: null,
    currentImage: null,
    currentIndex: 0
  });
  
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
  const selectedProject = portfolioExperience[selectedProjectIndex];

  return (
    <section className="py-12 sm:py-16 lg:py-24" id="experience">
      <div className="container px-4 sm:px-6 md:px-8" style={{ maxWidth: "1280px" }}>
        <SectionHeader
          eyebrow="Eldriv's"
          title="Professional History"
          description="A look at the work I've done—designing systems, graphics design, writing code, and collaborating with teams to build useful and scalable solutions."
        />
        <ScrollReveal className="mt-12 sm:mt-16 md:mt-20" delay={0.08}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Tabs */}
            <div className="lg:col-span-3 xl:col-span-3">
              <Card className="p-2.5 sm:p-3 bg-gray-800/95 border border-white/15">
                <div className="text-xs uppercase tracking-widest text-white/50 px-2 pb-2">Experience</div>
                <div className="space-y-2">
                  {portfolioExperience.map((project, index) => {
                    const isActive = selectedProjectIndex === index;
                    return (
                      <motion.button
                        key={project.title}
                        onClick={() => setSelectedProjectIndex(index)}
                        className={`w-full text-left rounded-xl px-3 py-3 border transition-all ${
                          isActive
                            ? 'bg-white/10 border-[#fd8128]/50 shadow-[0_0_0_1px_rgba(253,129,40,0.25)]'
                            : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.07]'
                        }`}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'tween', duration: 0.2 }}
                      >
                        <p className="text-[14px] font-semibold text-white">{project.company}</p>
                        <p className="text-[14px] text-white/60 mt-1">{project.title}</p>
                        <p className="text-[14px] text-[#fd8128] mt-1">{project.Date}</p>
                      </motion.button>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Active tab panel */}
            <div className="lg:col-span-9 xl:col-span-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProjectIndex}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                <Card className="px-4 sm:px-6 md:px-8 pt-6 pb-6 md:pt-8 bg-gray-800/95 border border-white/15">
                  <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-stretch">
                    <div className="lg:col-span-6 flex flex-col h-full">
                      <div className="inline-flex items-start sm:items-center gap-2 rounded-2xl sm:rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] max-w-full">
                        <span className="h-2 w-2 mt-1 sm:mt-0 rounded-full bg-[#fd8128] flex-shrink-0" />
                        <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex flex-wrap gap-x-2 gap-y-0.5 font-bold uppercase tracking-[0.16em] text-transparent bg-clip-text">
                          <span>{selectedProject.company}</span>
                          <span className="text-white/50 hidden sm:inline">&bull;</span>
                          <span>{selectedProject.Date}</span>
                        </div>
                      </div>

                      <h3 className="font-sans text-2xl sm:text-3xl mt-4">{selectedProject.title}</h3>
                      <div className="mt-4 h-px w-full bg-gradient-to-r from-[#fd8128]/80 via-white/20 to-transparent" />

                      <div className="mt-4 min-h-0 overflow-y-auto pr-1 max-h-[190px] sm:max-h-[220px] scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                        <ul className="flex flex-col gap-4">
                          {selectedProject.results.map((result, resultIndex) => (
                              <motion.li
                                key={`${selectedProject.title}-${result.title}`}
                                className="flex gap-2 text-sm text-white/100 md:text-base"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: resultIndex * 0.06 }}
                              >
                                <CheckIcon className="w-5 h-5 flex-shrink-0" />
                                <span>{result.title}</span>
                              </motion.li>
                          ))}
                        </ul>
                      </div>

                      {selectedProject.buttonType === 'link' && selectedProject.link ? (
                        <a href={selectedProject.link} target={selectedProject.target ?? "_blank"} rel="noreferrer">
                          <motion.button
                            className="bg-[#fd8128] text-white h-11 sm:h-12 w-full md:w-auto px-5 sm:px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-6 text-sm sm:text-base"
                            whileHover={{ scale: 1.05, backgroundColor: "#ff9033" }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                          >
                            <span>{selectedProject.buttonText}</span>
                            <ArrowUprightIcon className="size-4" />
                          </motion.button>
                        </a>
                      ) : (
                        <motion.button
                          onClick={() => {
                            if (selectedProject.buttonType === 'certificate' && selectedProject.certificateImage) {
                              openLightbox('certificate', selectedProject.certificateImage);
                            } else if (selectedProject.buttonType === 'gallery') {
                              openLightbox('gallery', portfolioImages[0], 0);
                            }
                          }}
                          className="bg-[#fd8128] text-white h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-6"
                          whileHover={{ scale: 1.05, backgroundColor: "#ff9033" }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span>{selectedProject.buttonText}</span>
                          <ArrowUprightIcon className="size-4" />
                        </motion.button>
                      )}
                    </div>

                    <div className="lg:col-span-6 mt-6 lg:mt-0">
                      <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-2 sm:p-3">
                        <div className="relative w-full h-[360px] sm:h-[420px] lg:h-full min-h-[360px] rounded-xl overflow-hidden">
                          <motion.div
                            variants={imageVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            className="absolute inset-0"
                          >
                            <Image
                              src={selectedProject.image}
                              alt={selectedProject.title}
                              fill
                              sizes="(min-width: 1024px) 50vw, 100vw"
                              className="object-cover object-left"
                              priority={selectedProjectIndex < 2}
                            />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>
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