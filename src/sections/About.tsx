"use client";

// Components
import { SectionHeader } from "@/components/SectionHeader"
import { Card } from "@/components/card"
import { CardHeader } from "@/components/cardHeader"
import { ToolboxItems } from "@/components/toolBoxItem"
import { useEffect, useRef, useState } from "react" // Added useState and useRef for animation

// Image
import bookImage from "@/assets/images/bookss.png"
import Image from "next/image"

// SVG Icons
import JavaScriptIcon from "@/assets/icons/square-js.svg"
import HtmlIcon from "@/assets/icons/html5.svg"
import CssIcon from "@/assets/icons/css3.svg"
import ReactIcon from "@/assets/icons/react.svg"
import GithubIcon from "@/assets/icons/github.svg"
import NixIcon from "@/assets/icons/nixos.svg"
import CommonLispIcon from "@/assets/icons/common-lisp.svg"
import ShellIcon from "@/assets/icons/shell.svg"
import JavaIcon from "@/assets/icons/java.svg"
import PythonIcon from "@/assets/icons/python.svg"
import CSharpIcon from "@/assets/icons/c#.svg"
import VBIcon from "@/assets/icons/vbnet.svg"
import VSIcon from "@/assets/icons/vscode.svg"
import EmacsIcon from "@/assets/icons/emacs.svg"
import VimIcon from "@/assets/icons/vim.svg"
import WPIcon from "@/assets/icons/wordpress.svg"
import HugoIcon from "@/assets/icons/hugo.svg"
import DockerIcon from "@/assets/icons/docker.svg"
import OracleIcon from "@/assets/icons/oracle.svg"
import LatexIcon from "@/assets/icons/latex.svg"
import MarkdownIcon from "@/assets/icons/markdown.svg"
import OrgIcon from "@/assets/icons/org.svg"
import PandocIcon from "@/assets/icons/pandoc.svg"
import ClogIcon from "@/assets/icons/clog.svg"
import FlameGraphIcon from "@/assets/icons/flamegraph.svg"

import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg"

// motion
import { motion } from 'framer-motion' 


const tool= [
  {
    title: "React",
    iconType: ReactIcon,
  },

  {
    title: "CSS",
    iconType: CssIcon,
  },

  {
    title: "HTML",
    iconType: HtmlIcon,
  },

  {
    title: "GitHub",
    iconType: GithubIcon,
  },

  {
    title: "JavaScript",
    iconType: JavaScriptIcon,
  },
  {
    title: "Nix",
    iconType: NixIcon,
  },
  {
    title: "Common Lisp",
    iconType: CommonLispIcon,
  },
  {
    title: "Shell",
    iconType: ShellIcon,

  },
  {
    title: "Java",
    iconType: JavaIcon,
  },
  {
    title: "Python",
    iconType: PythonIcon,
  },
  {
    title: "C#",
    iconType: CSharpIcon,
  },
  {
    title: "VB.net",
    iconType: VBIcon,
  },
  {
    title: "Parenscript",
  },

  {
    title: "Emacs",
    iconType: EmacsIcon,
  },

  {
    title: "Vim",
    iconType: VimIcon,
  },

  {
    title: "VSCode",
    iconType: VSIcon,
  },
  {
    title: "WordPress",
    iconType: WPIcon,
  },
  {
    title: "Hugo",
    iconType: HugoIcon,
  },
  {
    title: "Docker",
    iconType: DockerIcon,
  },
  {
    title: "Oracle",
    iconType: OracleIcon,
  },
  {
    title: "LaTeX",

    iconType: LatexIcon,
  },
  {
    title: "Markdown",

    iconType: MarkdownIcon,
  },
  {
    title: "Org",

    iconType: OrgIcon,
  },
  {
    title: "Pandoc",

    iconType: PandocIcon,
  },
  {
    title: "CLOG",

    iconType: ClogIcon,
  },

  {
    title: "FlameGraph",

    iconType: FlameGraphIcon,
  },
]

const contributions = [
  {
    title: "Information Mapping",
    left: "5%",
    top: "35%",
  },
  {
    title: "Open-source Libraries",
    left: "35%",
    top: "65%",
  },
  {
    title: "Philippine Dental Association Newsletter",
    left: "10%",
    top: "0%",
  },
]

export const AboutSection = () => {
  const constrainRef = useRef(null);
  const HeaderComponent = SectionHeader();
  const bookRef = useRef(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 } // Trigger animation earlier
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section  id="about">
    <div className="py-16 lg:py-28 relative" ref={sectionRef}>
      <div className="container" style={{ maxWidth: "1500px"}}>
        <HeaderComponent
          eyebrow="About Me"
          title="More about Eldriv's"
          description="Learn more about my technical proficiencies, my side-projects, and what inspires me as a Software Engineer."
        />
        <div className="mt-20 flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="h-[320px] md:col-span-1 lg:col-span-1 overflow-hidden">
              <CardHeader
                title="Books In Queue"
                description="The books that I'm currently reading."
              />
              <div 
                ref={bookRef}
                className={`w-50 mx-auto md:-mt-1 -mt-10 lg:-mt-10 px-8 transition-all duration-2000 ease-in-out ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                }`}
              >
                <Image src={bookImage} alt="Book cover" />
              </div>
            </Card>
            <Card className="h-[320px] md:col-span-1 lg:col-span-2">
              <CardHeader
                title="Toolbox"
                description="Explore the technologies that I am proficient with."
                className=""
              />
              <ToolboxItems 
              tools={tool} 
              className="mt-3" 
              itemsWrapperClassName="animate-move-left [animation-duration:80s]"/>
              <ToolboxItems
                tools={tool}
                className="mt-6"
                itemsWrapperClassName="-translate-x-1/2 animate-move-right [animation-duration:80s]"
              />
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="h-[320px] p-0 flex flex-col md:col-span-1 lg:col-span-1">
              <CardHeader
                title="Collaborations"
                description="Tap to explore my tech contributions and my side-projects."
                className="px-6 py-6"
              />
              <div className="relative flex-1" ref= {constrainRef}>
                {contributions.map((contribution) => (
                  <motion.div
                    key={contribution.title}
                    className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-emerald-300 to-[#FD8128] rounded-full py-1.5 absolute"
                    style={{
                      left: contribution.left,
                      top: contribution.top,
                    }}
                    drag
                    dragConstraints={constrainRef}
                  >
                    <span className="font-medium text-gray-950">{contribution.title}</span>
                    <span></span>
                  </motion.div>
                ))}
              </div>
            </Card>
            <Card className="h-[320px] p-0 relative md:col-span-1 lg:col-span-1">
              <CardHeader
                title="Research"
                subtitle="➤ Evaluating the Efficacy of ARIMA in Forecasting Rootcrops Prices in NCR."
                researchLink="https://docs.google.com/document/d/1uKjc8QfxJVrcqyIhEklHguA3H9d2d6mcAyxkeH1gdC4/edit?tab=t.0"
                description="Assessment of ARIMA model effectiveness for forecasting prices of five key root crops in the National Capital Region of the Philippines."
                className="px-6 py-6"
              />
            </Card>
            <Card className="h-[320px] p-0 flex flex-col md:col-span-1 lg:col-span-1 bg-gradient-to-r from-black/80 to-darkblue">
              <CardHeader
                title="Contact"
                description="Let's create something amazing together."
                className="px-6 py-6"
              />
              <div className="flex-1 flex flex-col justify-between px-6 pb-10">
                <p className="text-sm md:text-base mb-4">
                  If you're passionate about technology and want to contribute to open-source, I'd be thrilled to connect with you.
                </p>
                <div className="flex items-center gap-1">
                  <span className="font-medium">Email:</span>
                  <a
                    href="mailto:eldriv@proton.me"
                    className="text-emerald-300 hover:text-[#FD8128] transition-colors"
                  >
                    eldriv@proton.me
                  </a>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <a href="https://github.com/eldriv" target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="w-6 h-6 text-emerald-300 hover:text-[#FD8128] transition-colors" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/michael-adrian-villareal-9a344634a/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-emerald-300 hover:text-[#FD8128] transition-colors"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.027-3.063-1.867-3.063-1.872 0-2.159 1.461-2.159 2.971v5.696h-3v-11h2.879v1.509h.041c.401-.757 1.381-1.557 2.841-1.557 3.038 0 3.6 2.001 3.6 4.604v6.444z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(40px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 2000ms;
        }
      `}</style>
    </div>
  </section>
  );
};