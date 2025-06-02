'use client';

// Lib
import React, { useState, useEffect } from 'react';
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
    <section className="relative py-8 md:py-48 overflow-hidden w-full" id="home">
      <div className="container relative z-10 mx-auto px-4 mt-4 md:mt-10" style={{ maxWidth: "1500px" }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Side: Name, Title, Bio and Buttons */}
          <div className="w-full md:w-1/2 flex flex-col">
            {/* Name and Title */}
            <motion.div
              className="flex flex-col mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="md:text-6xl lg:text-6xl text-4xl tracking-wide text-white font-medium">
              Michael Adrian Villareal
              </h1>
              <p className="md:text-3xl text-xl font-medium mt-3 silver-gradient">
                Software Engineer and Web Developer
              </p>
            </motion.div>

            {/* Bio */}
            <motion.p
              className="text-white/90 md:text-lg mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Adi's curiosity about computing started at the age of eight when he first used an old system unit
              around the year 2009, and then began his pursuit of a Computer Science in Adamson University.
              His technical proficiency spans diverse areas, including Lisp programming and web design and development. He also has a
              deep curiosity about connectiveness proposing they resemble networks similar to quantum physics,
              these links begins with investigating the way how universe connects to our human mind.
            </motion.p>

            {/* Action Buttons - Modified to be vertical on mobile, horizontal on desktop */}
            <motion.div
              className="flex flex-col md:flex-row gap-5 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.a
                href="https://www.linkedin.com/in/michael-adrian-villareal-9a344634a/"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 text-white/90 bg-[#FD8128] h-12 px-6 rounded-xl transition-all hover:bg-[#E87320] relative w-full md:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>👋</span>
                <span className="font-semibold">Let's Connect!</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Side: REPL Terminal or Profile Image */}
          <div className="w-full md:w-1/2 relative mt-10 md:mt-0">
            <AnimatePresence mode="wait">
              {terminalVisible ? (
                /* Terminal Window */
                <motion.div 
                  key="terminal"
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  {/* Popup message above terminal - Only shown initially */}
                  <motion.div 
                    className="absolute -top-9 left-1 bg-[#FD8128] text-white px-3 py-1 rounded-lg text-xs font-medium z-20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    Close
                    <div className="absolute bottom-0 left-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-[#FD8128]"></div>
                  </motion.div>
                  
                  {/* Terminal Window */}
                  <div className="relative bg-gray-900 rounded-lg border border-gray-700 overflow-hidden shadow-2xl">
                    {/* Terminal Header */}
                    <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
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
                      <div className="p-2 font-mono text-sm h-64 overflow-y-auto bg-gray-950 text-gray-200 flex flex-col">
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
                  <div className="relative mb-6">
                    <motion.div 
                      className="w-80 h-80 rounded-full overflow-hidden border-4 border-[#FD8128]/50 shadow-lg shadow-[#FD8128]/20 cursor-pointer relative"
                      onClick={handleOpenTerminal}
                      whileHover={{ scale: 1.05, borderColor: "#FD8128" }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Image 
                        src={profileImage} 
                        alt="Michael Adrian Villareal" 
                        className="w-full h-full object-cover -translate-y-1"
                      />
                      
                      {/* Pulsing overlay - Only visible on hover */}
                      {showTooltip && (
                        <motion.div 
                          className="absolute inset-0 bg-[#FD8128]/10 flex items-center justify-center"
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
                    
                    {/* Tooltip popup - Only visible on hover */}
                    <AnimatePresence>
                      {showTooltip && (
                        <motion.div 
                          className="absolute -right-1 bottom-2 transform -translate-y-1/2 bg-[#FD8128] text-white px-4 py-2 rounded-lg text-sm font-medium z-20 flex items-center gap-2 shadow-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span>Click/Tap to see the REPL</span>
                          <span className="text-xl">☯︎</span>
                          <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-3 h-3 bg-[#FD8128]"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Online Status */}
                  <div className="mb-6 bg-gray-900/80 border border-gray-800 px-4 py-2 inline-flex items-center gap-2 rounded-lg backdrop-blur-sm">
                    <div className="bg-green-500 w-2 h-2 rounded-full animate-ping-large"></div>
                    <div className="text-sm font-medium text-gray-200">Adi is currently online!</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

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
      `}</style>
    </section>
  );
}

export default HeroSection;