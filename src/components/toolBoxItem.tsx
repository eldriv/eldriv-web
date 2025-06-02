import React, { Fragment, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { TechIcon } from "./TechIcon";
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

export interface ToolboxItem {
  title: string;
  iconType?: React.ElementType;
  description?: string;
}

// Enhanced tool descriptions
const toolDescriptions: Record<string, string> = {
  "React": "A powerful JavaScript library for building interactive user interfaces with component-based architecture",
  "CSS": "Cascading Style Sheets for designing responsive and beautiful web layouts",
  "HTML": "The foundation markup language for structuring web content and applications",
  "GitHub": "Version control platform for collaborative software development and project management",
  "JavaScript": "Dynamic programming language that powers modern web interactivity and functionality",
  "Nix": "Declarative package manager and build system for reproducible development environments",
  "Common Lisp": "a powerful, high-level programming language that is part of the Lisp family. It's known for its flexibility, dynamic typing, and support for various programming paradigms, including functional and object-oriented programming. ",
  "Shell": "Command-line scripting for system automation and development workflow optimization",
  "Java": "Enterprise-grade object-oriented programming language for scalable applications",
  "Python": "Versatile programming language perfect for data science, AI, and backend development",
  "C#": "Microsoft's modern programming language for .NET applications and enterprise solutions",
  "VB.net": "Visual Basic .NET for rapid application development in the Microsoft ecosystem",
  "Parenscript": "Lisp-to-JavaScript compiler for functional web development",
  "Emacs": "Extensible text editor and development environment with powerful customization",
  "Vim": "Highly efficient modal text editor for lightning-fast code editing",
  "VSCode": "Feature-rich code editor with extensive extensions and debugging capabilities",
  "WordPress": "Popular content management system for building websites and blogs",
  "Hugo": "Fast static site generator for creating high-performance websites",
  "Docker": "Containerization platform for consistent application deployment across environments",
  "Oracle": "Enterprise database management system for mission-critical applications",
  "LaTeX": "Professional typesetting system for creating high-quality technical documents",
  "Markdown": "Lightweight markup language for writing formatted text with simple syntax",
  "Org": "Emacs-based system for note-taking, planning, and literate programming",
  "Pandoc": "Universal document converter supporting multiple markup formats",
  "CLOG": "Common Lisp web framework for building modern web applications",
  "FlameGraph": "Performance profiling tool for visualizing CPU usage and bottlenecks"
};

export const ToolboxItems = ({
  tools,
  className,
  itemsWrapperClassName,
}: {
  tools: ToolboxItem[];
  className?: string;
  itemsWrapperClassName?: string;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Create modal root element on mount
  useEffect(() => {
    let modalElement = document.getElementById('toolbox-modal-root');
    if (!modalElement) {
      modalElement = document.createElement('div');
      modalElement.id = 'toolbox-modal-root';
      modalElement.style.position = 'fixed';
      modalElement.style.top = '0';
      modalElement.style.left = '0';
      modalElement.style.width = '100%';
      modalElement.style.height = '100%';
      modalElement.style.zIndex = '2147483647';
      modalElement.style.pointerEvents = 'none';
      document.body.appendChild(modalElement);
    }
    setModalRoot(modalElement);

    return () => {
      // Clean up on unmount
      const element = document.getElementById('toolbox-modal-root');
      if (element && !showModal) {
        document.body.removeChild(element);
      }
    };
  }, []);

  // Handle body scroll lock
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  // Add descriptions to tools
  const enhancedTools = tools.map(tool => ({
    ...tool,
    description: toolDescriptions[tool.title] || `Professional experience with ${tool.title}`
  }));

  // Handle tool interaction (click on mobile, hover on desktop)
  const handleToolInteraction = (toolTitle: string) => {
    if (isMobile) {
      // On mobile, toggle the description
      setHoveredTool(hoveredTool === toolTitle ? null : toolTitle);
    } else {
      // On desktop, just set hover
      setHoveredTool(toolTitle);
    }
  };

  const handleToolLeave = () => {
    if (!isMobile) {
      setHoveredTool(null);
    }
  };

  return (
    <>
      <div className={twMerge(
        "flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] relative",
        className
      )}>
        <div className={twMerge("flex flex-none py-0.5 gap-3 md:gap-6 pr-6 md:pr-12", itemsWrapperClassName)}>
          {[...new Array(2)].fill(0).map((_, index) => (
            <Fragment key={index}>
              {enhancedTools.map((item) => (
                <div
                  key={item.title}
                  className="inline-flex items-center gap-2 md:gap-4 py-1.5 md:py-2 px-2 md:px-3 outline outline-2 outline-white/10 rounded-lg text-sm md:text-base"
                >
                  <div className="scale-75 md:scale-100">
                    <TechIcon component={item.iconType} />
                  </div>
                  <span className="font-semibold whitespace-nowrap">{item.title}</span>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
        
        {/* View All Button */}
        <motion.button
          onClick={() => setShowModal(true)}
          className="absolute top-2 md:top-3 right-2 md:right-3 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 p-1.5 md:p-2 rounded-full shadow-lg hover:shadow-emerald-400/25 transition-all duration-300">
            <svg 
              className="w-4 h-4 md:w-5 md:h-5 text-gray-900 group-hover:rotate-180 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </motion.button>
      </div>

      {/* Modal - Rendered as Portal */}
      {modalRoot && createPortal(
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 md:p-4"
              style={{ 
                pointerEvents: 'auto',
                zIndex: 2147483647
              }}
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="bg-gray-800/95 backdrop-blur-md rounded-xl md:rounded-2xl border border-emerald-400/20 p-4 md:p-8 max-w-4xl w-full max-h-[90vh] md:max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      Complete Toolbox
                    </h2>
                    <p className="text-gray-400 mt-1 md:mt-2 text-sm md:text-base">My technical arsenal and expertise, tap to see each descriptions.</p>
                  </div>
                  <motion.button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-full touch-manipulation"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {enhancedTools.map((tool, index) => (
                    <motion.div
                      key={tool.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative group"
                      onMouseEnter={() => !isMobile && handleToolInteraction(tool.title)}
                      onMouseLeave={handleToolLeave}
                      onClick={() => isMobile && handleToolInteraction(tool.title)}
                    >
                      <div className="bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 hover:border-emerald-400/50 rounded-lg md:rounded-xl p-3 md:p-4 transition-all duration-300 cursor-pointer group-hover:shadow-lg group-hover:shadow-emerald-400/10 touch-manipulation">
                        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                          <div className="p-1.5 md:p-2 bg-gray-600/50 rounded-md md:rounded-lg group-hover:bg-emerald-400/20 transition-colors">
                            <div className="scale-75 md:scale-100">
                              <TechIcon component={tool.iconType} />
                            </div>
                          </div>
                          <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors text-sm md:text-base">
                            {tool.title}
                          </h3>
                        </div>
                        
                        {/* Description - Always visible on mobile when selected, hover on desktop */}
                        <AnimatePresence>
                          {hoveredTool === tool.title && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className="text-xs md:text-sm text-gray-300 leading-relaxed pt-2 border-t border-gray-600/50">
                                {tool.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-700">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs md:text-sm text-gray-400">
                    <span>Total Technologies: {enhancedTools.length}</span>
                    <span className="text-center sm:text-right">
                      {isMobile ? "Tap any tool to see details" : "Hover over any tool to see details"}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        modalRoot
      )}
    </>
  );
};