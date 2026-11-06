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
import BehindDigitalsImage from "@/assets/images/behind-digitals.png";
import certificateImage from "@/assets/images/coc.png";
import freelanceImage from "@/assets/images/figma.png";
import Image, { StaticImageData } from "next/image"; 

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
      className="fixed inset-0 z-50 bg-[#0c0c0f]/85 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute top-6 right-6">
        <button 
          onClick={onClose}
          className="text-white h-10 w-10 flex items-center justify-center rounded-full glass-pill hover:bg-white/15 transition-colors"
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
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white h-12 w-12 flex items-center justify-center rounded-full glass-pill hover:bg-white/15 transition-colors"
                aria-label="Previous image"
              >
                <LeftArrowIcon className="w-6 h-6" />
              </button>
              
              <button 
                onClick={onNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white h-12 w-12 flex items-center justify-center rounded-full glass-pill hover:bg-white/15 transition-colors"
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
                  className={`w-16 h-16 flex-shrink-0 cursor-pointer ${index === currentIndex ? 'ring-2 ring-white/15' : ''}`}
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
    company: "Behind Digitals",
    Date: "January 2026–Present",
    title: "Founder & Technical Lead",
    results: [
      {
        title:
          "Creator of BehindCourt and OnCourt at Behind Digitals.",
      },
      {
        title:
          "Lead product direction and architecture for websites, automations, and custom systems.",
      },
      {
        title:
          "Build integrations and connected workflows that keep client tools in sync without manual handoffs.",
      },
      {
        title:
          "Own deployment and delivery, taking products from plan through launch.",
      },
      {
        title:
          "Ship case-study work across web design, automations, and bespoke products for Behind Digitals clients.",
      },
    ],
    link: "https://behinddigitals.com",
    target: "_blank",
    image: BehindDigitalsImage,
    buttonText: "Visit Website",
    buttonType: "link",
  },
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
      { title: "Designed and built responsive, SEO-optimized websites for clients in the UAE, US, and Philippines." },
      { title: "Developed custom websites and web apps, including payment integrations with PayMongo and Stripe." },
      { title: "Set up marketing automations with n8n, Zapier, or Make to fit each client's workflow." },
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

export const ExperienceSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
  return (
    <section className="py-12 sm:py-16 lg:py-24" id="experience">
      <div className="container px-4 sm:px-6 md:px-8" style={{ maxWidth: "1280px" }}>
        <SectionHeader
          index={1}
          eyebrow="Eldriv's"
          title="Professional History"
          description="Product engineering, software development, and client work across the Philippines, UAE, and US."
        />
        <ScrollReveal className="mt-10 sm:mt-14" delay={0.08}>
          <ol className="border-t border-white/10">
            {portfolioExperience.map((project, index) => {
              const isOpen = openIndex === index;
              const isCurrent = /present/i.test(project.Date);
              const panelId = `experience-panel-${index}`;
              return (
                <li key={project.company} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="group grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 py-5 text-left sm:grid-cols-[13rem_1fr_auto] sm:gap-x-8 sm:py-6"
                  >
                    <span
                      className={`col-span-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider transition-colors sm:col-span-1 sm:text-xs ${
                        isOpen ? "text-accent" : "text-zinc-500"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                          isCurrent ? "bg-accent shadow-[0_0_8px_rgba(253,129,40,0.8)]" : "bg-zinc-700"
                        }`}
                      />
                      {project.Date}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block font-pixel text-lg leading-tight transition-colors sm:text-xl ${
                          isOpen ? "text-white" : "text-zinc-200 group-hover:text-white"
                        }`}
                      >
                        {project.title}
                      </span>
                      <span className="mt-1 block text-sm text-zinc-500">{project.company}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex h-8 w-8 items-center justify-center rounded-full border font-mono text-sm transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-accent/60 bg-accent/15 text-accent"
                          : "border-white/10 text-zinc-500 group-hover:border-accent/40 group-hover:text-accent"
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-6 pb-8 sm:grid-cols-[13rem_1fr] sm:gap-x-8">
                          <div className="hidden sm:block" />
                          <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,22rem)] lg:gap-8">
                            <div className="flex flex-col">
                              <ul className="flex flex-col gap-3">
                                {project.results.map((result, resultIndex) => (
                                  <motion.li
                                    key={`${project.title}-${result.title}`}
                                    className="flex gap-3 text-sm leading-relaxed text-zinc-300 md:text-[15px]"
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 + resultIndex * 0.04 }}
                                  >
                                    <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent/80" />
                                    <span>{result.title}</span>
                                  </motion.li>
                                ))}
                              </ul>

                              {project.buttonType === "link" && project.link ? (
                                <a
                                  href={project.link}
                                  target={project.target ?? "_blank"}
                                  rel="noreferrer"
                                  className="btn-ink mt-6 inline-flex h-10 items-center justify-center gap-2 self-start rounded-full px-5 text-sm transition-[filter] hover:brightness-110"
                                >
                                  <span>{project.buttonText}</span>
                                  <ArrowUprightIcon className="size-4" />
                                </a>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (project.buttonType === "certificate" && project.certificateImage) {
                                      openLightbox("certificate", project.certificateImage);
                                    } else if (project.buttonType === "gallery") {
                                      openLightbox("gallery", portfolioImages[0], 0);
                                    }
                                  }}
                                  className="btn-ink mt-6 inline-flex h-10 items-center justify-center gap-2 self-start rounded-full px-5 text-sm transition-[filter] hover:brightness-110"
                                >
                                  <span>{project.buttonText}</span>
                                  <ArrowUprightIcon className="size-4" />
                                </button>
                              )}
                            </div>

                            <div className="group/img relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                sizes="(min-width: 1024px) 352px, 100vw"
                                className="object-cover object-left-top transition-transform duration-700 ease-out group-hover/img:scale-[1.03]"
                                priority={index === 0}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>
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