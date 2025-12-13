'use client';

// Lib
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Image
import profileImage from '@/assets/images/adi.jpg'; 
import Image from 'next/image';

// Define the type for our Lisp command examples
interface LispExample {
  command: string;
  result: string;
}

export function HeroSection() {
  const lispExamples = React.useMemo<LispExample[]>(() => [
    { command: '(defun greetings ()  (format nil "Hello, Everyone!!"))', result: '"Hello, Everyone!!"' },
    { command: '(greetings)', result: '"Hello, Everyone!!"' },
    { command: '(+ (* 5 5) 25)', result: '55'},
  ], []);

  // State for terminal animation - properly typed
  const [currentText, setCurrentText] = useState<string>('');
  const [completedCommands, setCompletedCommands] = useState<LispExample[]>([]);
  const [activePrompt] = useState<string>('CL-USER> ');
  const [terminalVisible, setTerminalVisible] = useState<boolean>(false);
  const [minimized, setMinimized] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(true);

  // Futuristic hover-lines state (SaaS-style)
  const sectionRef = useRef<HTMLElement>(null);
  const [isBgHovering, setIsBgHovering] = useState(false);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerCurrentRef = useRef({ x: 0, y: 0 });
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const [sectionSize, setSectionSize] = useState({ w: 0, h: 0 });

  const [gridSize, setGridSize] = useState(60);
  
  useEffect(() => {
    const updateGridSize = () => {
      setGridSize(window.innerWidth < 640 ? 40 : 60);
    };
    updateGridSize();
    window.addEventListener('resize', updateGridSize);
    return () => window.removeEventListener('resize', updateGridSize);
  }, []);

  const startPointerLoop = () => {
    if (rafRef.current != null) return;
    const tick = () => {
      // Smooth follow (low-pass filter) - optimized for smooth grid transitions
      const t = pointerTargetRef.current;
      const c = pointerCurrentRef.current;
      // Use adaptive smoothing for smoother grid cell transitions
      const dx = Math.abs(t.x - c.x);
      const dy = Math.abs(t.y - c.y);
      const distance = Math.sqrt(dx * dx + dy * dy);
      // Adaptive k: smoother when moving slowly, more responsive when moving fast
      // Use 50px threshold (between mobile 40px and desktop 60px grid sizes)
      const k = distance > 50 ? 0.15 : 0.10;
      c.x += (t.x - c.x) * k;
      c.y += (t.y - c.y) * k;
      pointerCurrentRef.current = c;
      setPointer({ x: c.x, y: c.y });
      rafRef.current = window.requestAnimationFrame(tick);
    };
    rafRef.current = window.requestAnimationFrame(tick);
  };

  const stopPointerLoop = () => {
    if (rafRef.current != null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pointerTargetRef.current = { x, y };
    if (isBgHovering) startPointerLoop();
  };

  const handleSectionMouseEnter = () => {
    setIsBgHovering(true);
    startPointerLoop();
  };

  const handleSectionMouseLeave = () => {
    setIsBgHovering(false);
    stopPointerLoop();
  };

  useEffect(() => {
    return () => stopPointerLoop();
  }, []);

  // Track section size so lines can reach the full width/height responsively
  useEffect(() => {
    if (!sectionRef.current) return;

    const el = sectionRef.current;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setSectionSize({ w: rect.width, h: rect.height });
    };

    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Lock the glow to the nearest grid intersection (exact grid lines)
  // Smooth-snap to grid (reduces jitter between cells) - optimized for Chrome
  const snappedRef = useRef({ x: 0, y: 0 });
  const snappedPointer = (() => {
    const target = {
      x: Math.round(pointer.x / gridSize) * gridSize,
      y: Math.round(pointer.y / gridSize) * gridSize,
    };
    const s = snappedRef.current;
    // Use adaptive smoothing: faster when far, slower when close for smooth transitions
    const dx = Math.abs(target.x - s.x);
    const dy = Math.abs(target.y - s.y);
    const distance = Math.sqrt(dx * dx + dy * dy);
    // Adaptive snapK: lower when close to target (smooth), higher when far (responsive)
    const snapK = distance > gridSize * 0.5 ? 0.20 : 0.12;
    s.x += (target.x - s.x) * snapK;
    s.y += (target.y - s.y) * snapK;
    snappedRef.current = s;
    return { x: s.x, y: s.y };
  })();
  
  // Handle toggle terminal visibility
  const handleCloseTerminal = () => {
    setTerminalVisible(false);
  };
  
  // Handle minimize/maximize terminal
  const handleMinimizeTerminal = () => {
    setMinimized(!minimized);
  };
  
  // Handle open terminal
  const handleOpenTerminal = () => {
    setTerminalVisible(true);
    setMinimized(false);
  };

  // Handle mouse enter on image
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  // Handle mouse leave on image
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  useEffect(() => {
    if (!terminalVisible || minimized) return;
    
    let currentIndex = 0;
    let commandIndex = 0;
    let isTypingCommand = true;

    const interval = setInterval(() => {
      if (commandIndex >= lispExamples.length) {
        commandIndex = 0;
        setCompletedCommands([]);
      }

      const currentExample = lispExamples[commandIndex];

      if (isTypingCommand) {
        if (currentIndex <= currentExample.command.length) {
          setCurrentText(currentExample.command.slice(0, currentIndex));
          currentIndex++;
        } else {
          isTypingCommand = false;
          currentIndex = 0;
          setTimeout(() => {
            setCompletedCommands(prev => [...prev, { command: currentExample.command, result: currentExample.result }]);
            setCurrentText('');
            isTypingCommand = true;
            commandIndex++;
          }, 900);
        }
      }
    }, 80);

    return () => clearInterval(interval);
  }, [lispExamples, terminalVisible, minimized]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-8 md:py-20 lg:py-24 overflow-hidden w-full" 
      id="home"
      onMouseMove={handleSectionMouseMove}
      onMouseEnter={handleSectionMouseEnter}
      onMouseLeave={handleSectionMouseLeave}
    >
      {/* Grid + flowing light segments on the actual grid lines (activate on hover, follow pointer) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Base grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(253, 129, 40, 0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(253, 129, 40, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: `${gridSize}px ${gridSize}px`,
          }}
        />

        {/* Flowing segments pinned to the nearest grid intersection */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isBgHovering ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{
            // help the GPU; we animate transform via RAF-updated pointer smoothing
            willChange: 'opacity',
          }}
        >
          {(() => {
            const t = 1; // keep thin
            const x = Math.max(0, Math.min(snappedPointer.x, sectionSize.w));
            const y = Math.max(0, Math.min(snappedPointer.y, sectionSize.h));

            // Full-width / full-height segments that meet at the dot (grid intersection)
            const leftW = Math.max(0, x);
            const rightW = Math.max(0, sectionSize.w - x);
            const upH = Math.max(0, y);
            const downH = Math.max(0, sectionSize.h - y);

            return (
              <>
                {/* Horizontal flowing segments (to both edges) */}
                <div
                  className="grid-flow-seg grid-flow-right"
                  style={{ left: x, top: y, width: rightW, height: t }}
                />
                <div
                  className="grid-flow-seg grid-flow-left"
                  style={{ left: 0, top: y, width: leftW, height: t }}
                />

                {/* Vertical flowing segments (to both edges) */}
                <div
                  className="grid-flow-seg grid-flow-down"
                  style={{ left: x, top: y, width: t, height: downH }}
                />
                <div
                  className="grid-flow-seg grid-flow-up"
                  style={{ left: x, top: 0, width: t, height: upH }}
                />

                {/* Center dot (no glow) */}
                <div
                  className="grid-flow-dot"
                  style={{ left: x - 4, top: y - 4 }}
                />
              </>
            );
          })()}
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto mt-4 md:mt-6 px-4 sm:px-6 md:px-8" style={{ maxWidth: "1500px" }}>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10">
          {/* Row 1: Profile Image/REPL Terminal - Full Width */}
          <div className="w-full flex justify-center relative overflow-visible">
            <AnimatePresence mode="wait">
              {terminalVisible ? (
                /* Terminal Window */
                <motion.div 
                  key="terminal"
                  className="relative w-full max-w-2xl mx-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  {/* Popup message above terminal - Only shown initially */}
                  <motion.div 
                    className="absolute -top-8 sm:-top-9 left-0 sm:left-0 bg-[#FD8128] text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-medium z-20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    Close
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FD8128]"></div>
                  </motion.div>
                  
                  {/* Terminal Window */}
                  <div className="relative bg-gray-900 rounded-lg border border-gray-700 overflow-hidden shadow-2xl w-full max-w-full mx-2 sm:mx-0">
                    {/* Terminal Header */}
                    <div className="bg-gray-800 px-3 sm:px-4 py-2 flex items-center justify-between border-b border-gray-700">
                      <div className="flex gap-2">
                        <div 
                          className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-600 transition-colors flex items-center justify-center relative"
                          onClick={handleCloseTerminal}
                          title="Close REPL"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-red-900" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        
                        <div 
                          className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:bg-yellow-600 transition-colors flex items-center justify-center"
                          onClick={handleMinimizeTerminal}
                          title="Minimize REPL"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-yellow-900" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-gray-400 text-xs">REPL</div>
                      <div className="w-10"></div> {/* Empty space for balance */}
                    </div>

                    {/* Terminal Content - show only if not minimized */}
                    {!minimized && (
                      <div className="p-2 sm:p-3 font-mono text-xs sm:text-sm h-48 sm:h-56 md:h-64 overflow-y-auto bg-gray-950 text-gray-200 flex flex-col">
                        {/* Show completed commands and results */}
                        {completedCommands.map((item, index) => (
                          <div key={index} className="mt-2">
                            <div className="flex">
                              <span className="text-green-400">{activePrompt}</span>
                              <span className="text-white">{item.command}</span>
                            </div>
                            <div className="text-red-300 ml-2">{item.result}</div>
                          </div>
                        ))}
                        
                        {/* Current prompt and command being typed */}
                        <div className="flex items-start mt-2">
                          <span className="text-green-400">{activePrompt}</span>
                          <span className="text-white">{currentText}</span>
                          <span className="animate-pulse text-white">▌</span>
                        </div>
                      </div>
                    )}

                    {/* Terminal footer */}
                    <div className="bg-gray-800/70 px-4 py-2 border-t border-gray-700 backdrop-blur-sm">
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-400">☯︎ Lisp</div>
                        <div className="bg-gray-900/80 border border-gray-800 px-3 py-1 inline-flex items-center gap-2 rounded-lg backdrop-blur-sm">
                          <div className="bg-green-500 w-2 h-2 rounded-full animate-ping-large"></div>
                          <div className="text-xs font-medium text-gray-200">Adi is currently online!</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Profile Photo */
                <motion.div 
                  key="profile"
                  className="flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Profile Photo - Now clickable */}
                  <div className="relative mb-6 w-full flex justify-center">
                    <div className="relative">
                      <motion.div 
                        className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden cursor-pointer relative shadow-2xl"
                        onClick={handleOpenTerminal}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Image 
                          src={profileImage} 
                          alt="Michael Adrian Villareal" 
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Black fade effect around the edges */}
                        <div className="absolute inset-0 rounded-full" style={{
                          background: 'radial-gradient(circle, transparent 60%, rgba(0, 0, 0, 0.4) 80%, rgba(0, 0, 0, 0.7) 100%)'
                        }}></div>
                        
                        {/* Pulsing overlay - Only visible on hover */}
                        {showTooltip && (
                          <motion.div 
                            className="absolute inset-0 bg-[#FD8128]/10 flex items-center justify-center rounded-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            exit={{ opacity: 0 }}
                          >
                            <motion.div 
                              className="text-white text-3xl"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                            >
                            </motion.div>
                          </motion.div>
                        )}
                      </motion.div>
                      
                      {/* Tooltip popup - Always visible when terminal is closed */}
                      {!terminalVisible && (
                        <motion.div 
                          className="absolute top-2 left-0 bg-[#FD8128] text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-medium z-20 flex items-center justify-center gap-1.5 shadow-lg whitespace-nowrap"
                          style={{ 
                            transform: 'translate(-50%, -50%)',
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span>Click/Tap to see the REPL</span>
                          <span className="text-sm sm:text-base">☯︎</span>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Online Status */}
                  <div className="mb-4 sm:mb-6 bg-gray-900/80 border border-gray-800 px-3 sm:px-4 py-1.5 sm:py-2 inline-flex items-center gap-2 rounded-lg backdrop-blur-sm">
                    <div className="bg-green-500 w-2 h-2 rounded-full animate-ping-large"></div>
                    <div className="text-xs sm:text-sm font-medium text-gray-200">Adi is currently online!</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Row 2: Name/Subheader (Left) and Description (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left Column: Name and Title */}
            <div className="flex flex-col px-0 sm:px-0 md:px-6 lg:px-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide text-white font-medium text-left">
                {"Adrian Villareal".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.04,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mt-3 silver-gradient text-left">
                {"Web Developer & Software Engineer".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: 1.0 + index * 0.025,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </p>
              
              {/* Action Button */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.a
                  href="https://www.linkedin.com/in/michael-adrian-villareal-9a344634a/"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 text-white/90 bg-[#FD8128] h-11 sm:h-12 px-5 sm:px-6 rounded-xl transition-all hover:bg-[#E87320] text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>👋</span>
                  <span className="font-semibold">Let's Connect!</span>
                </motion.a>
              </motion.div>
            </div>

            {/* Right Column: Bio/Description */}
            <motion.div
              className="flex flex-col px-0 sm:px-0 md:px-6 lg:px-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-white/90 text-sm sm:text-base md:text-lg text-left leading-relaxed">
                Adi's curiosity about computing started at the age of eight when he first used an old system unit
                around the year 2009, and then began his pursuit of a Computer Science in Adamson University.
                His technical proficiency spans diverse areas, including Lisp programming and web design and development. He also has a
                deep curiosity about connectiveness proposing they resemble networks similar to quantum physics,
                these links begins with investigating the way how universe connects to our human mind.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom fade to black */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 md:h-36 lg:h-44"
        style={{
          background:
            // Fade to #03050D (rgb(3, 5, 13))
            // Start fade later to avoid covering the button
            'linear-gradient(to bottom, rgba(3,5,13,0) 0%, rgba(3,5,13,0) 40%, rgba(3,5,13,0.5) 70%, rgba(3,5,13,0.9) 90%, rgba(3,5,13,1) 100%)',
        }}
      />

      <style jsx>{`
        .silver-gradient {
          background: linear-gradient(
            to right,
            #FD8128,
            #333333,
            #808080,
            #C0C0C0,
            #E8E8E8,
            #FFFFFF,
            #E8E8E8,
            #C0C0C0,
            #808080,
            #333333,
            #FD8128
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: shineEffect 10s linear infinite;
          font-weight: 600;
          position: relative;
          display: inline-block;
        }

        @keyframes shineEffect {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        /* Flow segments ON the grid lines (no custom curves) */
        .grid-flow-seg {
          position: absolute;
          pointer-events: none;
          border-radius: 1px;
          opacity: 0.95;
          /* no glow (flat line only) */
          box-shadow: none;
          will-change: background-position, left, top, width, height;
          transform: translateZ(0); /* Force GPU acceleration for Chrome */
        }

        /* A moving pulse that travels along the segment */
        .grid-flow-right {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(253, 129, 40, 0.18) 35%,
            rgba(253, 129, 40, 0.55) 50%,
            rgba(253, 129, 40, 0.18) 65%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: gridFlowX 2.4s linear infinite;
        }
        .grid-flow-left {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(253, 129, 40, 0.18) 35%,
            rgba(253, 129, 40, 0.55) 50%,
            rgba(253, 129, 40, 0.18) 65%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: gridFlowXReverse 2.4s linear infinite;
        }
        .grid-flow-down {
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(253, 129, 40, 0.18) 35%,
            rgba(253, 129, 40, 0.55) 50%,
            rgba(253, 129, 40, 0.18) 65%,
            transparent 100%
          );
          background-size: 100% 200%;
          animation: gridFlowY 2.4s linear infinite;
        }
        .grid-flow-up {
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(253, 129, 40, 0.18) 35%,
            rgba(253, 129, 40, 0.55) 50%,
            rgba(253, 129, 40, 0.18) 65%,
            transparent 100%
          );
          background-size: 100% 200%;
          animation: gridFlowYReverse 2.4s linear infinite;
        }

        @keyframes gridFlowX {
          0% { background-position: 0% 50%; }
          100% { background-position: -200% 50%; }
        }
        @keyframes gridFlowXReverse {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes gridFlowY {
          0% { background-position: 50% 0%; }
          100% { background-position: 50% -200%; }
        }
        @keyframes gridFlowYReverse {
          0% { background-position: 50% 0%; }
          100% { background-position: 50% 200%; }
        }

        .grid-flow-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(253, 129, 40, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.35);
          box-shadow: none; /* keep no-glow rule */
          will-change: left, top;
          transform: translateZ(0); /* Force GPU acceleration for Chrome */
        }
      `}</style>
    </section>
  );
}

export default HeroSection;