"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const HTMLFlipBook: any = dynamic(() => import("react-pageflip"), {
  ssr: false,
  loading: () => <div className="pf-accent text-center py-10">📖 Loading book...</div>,
});

interface Project {
  Title: string;
  link: string;
  image: string;
  desc: string;
  tools?: string[];
}

interface Props {
  projects: Project[];
  openIndex?: number | undefined;
}

interface PageProps {
  project: Project;
  pageNumber: number;
}

const IntroCover = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="page shadow-2xl flex flex-col justify-center p-6 sm:p-8">
    <div className="text-center">
      <h3 className="text-2xl sm:text-3xl font-bold text-[#c5eafa] mb-2">Some of my personal projects</h3>
      <p className="text-sm sm:text-base text-[#7695a3] max-w-xl mx-auto">Browse a selection of projects I built — apps, experiments, and portfolio pieces demonstrating front-end and full-stack work.</p>
    </div>
  </div>
));

IntroCover.displayName = "IntroCover";

const BackCover = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="page shadow-2xl flex flex-col justify-center p-6 sm:p-8">
    <div className="text-center">
      <h3 className="text-2xl sm:text-3xl font-bold text-[#c5eafa] mb-2">Thanks for flipping through</h3>
      <p className="text-sm sm:text-base text-[#7695a3] max-w-xl mx-auto">You've reached the end — feel free to revisit the projects or get in touch to collaborate.</p>
    </div>
  </div>
));

BackCover.displayName = "BackCover";

const Page = React.forwardRef<HTMLDivElement, PageProps>(({ project, pageNumber }, ref) => (
  <div ref={ref} className="page shadow-2xl flex flex-col justify-between p-5 sm:p-8">
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-center mb-3 sm:mb-4 h-36 sm:h-48">
        <img
          src={project.image}
          alt={project.Title}
          className="w-full h-full object-contain rounded-lg shadow-lg border border-[#4f85a2]/50"
        />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-[#c5eafa] mb-2">{project.Title}</h3>
      <p className="text-sm sm:text-base text-[#7695a3] mb-3 shrink-0 line-clamp-3">{project.desc}</p>
      {project.tools && project.tools.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-2">
          {project.tools.map((t, idx) => (
            <span
              key={idx}
              className="text-xs font-medium px-2 py-1 rounded-md bg-[#0f3b53] text-[#cfeffb] border border-[#274f63]/30"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 sm:mt-2 px-4 sm:px-5 py-2 bg-[#ffb400] text-white rounded-lg hover:bg-[#7cd4ff] transition-colors w-fit text-sm font-semibold"
        >
          View Project
        </a>
      )}
    </div>
    <div className="mt-3 sm:mt-4 text-center text-[#7cd4ff] text-sm font-medium">Page {pageNumber}</div>
  </div>
));

Page.displayName = "Page";

export default function ProjectBook({ projects, openIndex }: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTwoUp, setIsTwoUp] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [bookDims, setBookDims] = useState({ width: 360, height: 600 });
  const bookRef = useRef<any>(null);

  const totalSpreadPages = projects.length + 2;

  // Hide tutorial automatically after 8s
  useEffect(() => {
    if (showTutorial) {
      const timer = setTimeout(() => setShowTutorial(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [showTutorial]);

  // Responsiveness — determine two-page or single-page mode with dynamic sizing
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const two = vw >= 900;
      setIsTwoUp(two);

      if (two) {
        // Desktop: two-page spread
        setBookDims({ width: 900, height: 800 });
      } else {
        // Mobile/Tablet: single page with dynamic sizing
        // Use 85% of viewport width, leaving room for navigation buttons
        const availableWidth = vw - 100; // Leave space for buttons (50px each side)
        const width = Math.min(500, Math.max(340, availableWidth));
        // Height proportional to width with a good reading ratio
        const height = Math.floor(width * 1.65);
        setBookDims({ width, height: Math.min(height, vh * 0.75) });
      }
    };
    
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Navigation Handlers
  const handleNext = useCallback(() => {
    bookRef.current?.pageFlip().flipNext();
  }, []);
  
  const handlePrev = useCallback(() => {
    bookRef.current?.pageFlip().flipPrev();
  }, []);
  
  const onFlip = useCallback((e: any) => setCurrentPage(e.data), []);
  
  const goToPage = useCallback((index: number) => {
    bookRef.current?.pageFlip().flip(index + 1);
  }, []);

  // If an `openIndex` prop is provided, flip to that project
  useEffect(() => {
    if (openIndex === undefined || openIndex === null) return;
    const idx = Number(openIndex);
    if (Number.isNaN(idx)) return;
    if (idx < 0 || idx >= projects.length) return;

    const tryFlip = () => {
      try {
        const flip = bookRef.current?.pageFlip();
        if (flip && typeof flip.flip === "function") {
          flip.flip(idx + 1);
        } else {
          setTimeout(tryFlip, 120);
        }
      } catch (err) {
        setTimeout(tryFlip, 150);
      }
    };

    tryFlip();
  }, [openIndex, projects.length]);

  return (
    <div id="project" className="w-full px-2 sm:px-4 pf-section">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold pf-accent mb-2 sm:mb-3 mt-4 sm:mt-5">
            My Projects
          </h2>
          <p className="pf-muted text-base sm:text-lg px-4">
            Explore my work by flipping through the pages
          </p>
        </div>

        {/* Tutorial Popup */}
        {showTutorial && (
          <div
            role="status"
            aria-live="polite"
            className="fixed top-4 right-4 left-4 sm:left-auto sm:top-6 sm:right-6 z-50 w-auto sm:w-full max-w-sm animate-fadeIn bg-black/50 rounded-xl"
          >
            <div className="pf-toast rounded-xl shadow-xl p-3 sm:p-4 flex gap-2 sm:gap-3 items-start">
              <div className="text-xl sm:text-2xl">📖</div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold pf-accent">How to navigate</h4>
                    <p className="text-xs sm:text-sm pf-muted-light">
                      Drag the corner, use arrows, or click the dots below.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowTutorial(false)}
                    aria-label="Close tutorial"
                    className="ml-2 p-1 rounded-md pf-muted hover:pf-accent transition"
                  >
                    <X size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                </div>
                <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-3 flex-wrap">
                  <div className="px-2 sm:px-3 py-1 text-xs rounded pf-badge">Click & Drag</div>
                  <div className="px-2 sm:px-3 py-1 text-xs rounded pf-badge">Arrow Buttons</div>
                  <div className="px-2 sm:px-3 py-1 text-xs rounded pf-badge">Page Dots</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Flipbook Section */}
        <div className="relative flex items-center justify-center my-6 sm:my-8">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="absolute left-0 sm:left-2 md:left-4 z-[60] p-2 sm:p-3 pf-nav text-white rounded-full shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5 sm:w-8 sm:h-8" />
          </button>

          {/* Flipbook Container */}
          <div className="book-container">
            <div className="book-clip">
              <div className="book-inner">
                <HTMLFlipBook
                  key={isTwoUp ? 'two-up' : 'single'}
                  ref={bookRef}
                  width={bookDims.width}
                  height={bookDims.height}
                  size="stretch"
                  showCover={false}
                  className="book-flip"
                  minWidth={isTwoUp ? 600 : 300}
                  maxWidth={isTwoUp ? 1200 : 600}
                  onFlip={onFlip}
                  startPage={0}
                  drawShadow
                  flippingTime={isTwoUp ? 900 : 700}
                  usePortrait={!isTwoUp}
                  clickEventForward
                  showPageCorners
                  mobileScrollSupport
                  startZIndex={1}
                >
                  <IntroCover />
                  {projects.map((p, i) => (
                    <Page key={i} project={p} pageNumber={i + 2} />
                  ))}
                  <BackCover />
                </HTMLFlipBook>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalSpreadPages - 1}
            className="absolute right-0 sm:right-2 md:right-4 z-[60] p-2 sm:p-3 pf-nav text-white rounded-full shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5 sm:w-8 sm:h-8" />
          </button>
        </div>

        {/* Pagination - Uncomment if needed */}
        {/* 
        <div className="text-center mt-3 sm:mt-4 pf-accent font-semibold text-sm sm:text-base md:text-lg">
          Page {currentPage + 1} of {totalSpreadPages}
        </div>
        <div className="flex justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 flex-wrap max-w-md mx-auto px-4">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToPage(idx)}
              className={`rounded-full transition-all ${
                idx + 1 === currentPage ? "pf-dot-active w-6 sm:w-8 h-2.5 sm:h-3" : "pf-dot w-2.5 sm:w-3 h-2.5 sm:h-3"
              }`}
              aria-label={`Go to page ${idx + 2}`}
            />
          ))}
        </div>

        <div className="text-center mt-4 sm:mt-6 mb-6 sm:mb-8">
          <button
            onClick={() => setShowTutorial(true)}
            className="pf-muted hover:pf-accent transition text-xs sm:text-sm underline"
          >
            Need help? Show tutorial
          </button>
        </div>
        */}
      </div>

      <style jsx global>{`
        :root {
          --pf-accent: var(--page-text);
          --pf-muted: var(--muted);
          --pf-muted-light: var(--muted-light);
          --pf-nav: var(--nav);
          --pf-nav-hover: var(--nav-hover);
          --pf-cta: var(--cta);
          --pf-cta-hover: var(--cta-hover);
          --pf-dot: var(--muted);
          --pf-dot-active: var(--accent);
        }

        .book-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1800px;
          overflow: visible;
          min-height: 520px;
          z-index: 45;
        }

        .book-flip {
          margin: 0 auto;
          box-shadow: 0 18px 48px rgba(6, 30, 60, 0.45);
          background: transparent;
          border-radius: 12px;
        }

        .book-clip {
          position: relative;
          overflow: hidden;
          width: 100%;
          min-height: 520px;
        }

        .book-inner {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          width: 100%;
          padding: 2rem 0;
          z-index: 46;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .book-container {
            min-height: 450px;
          }
          .book-clip {
            min-height: 450px;
          }
          .book-inner {
            padding: 1.5rem 0;
          }
          .book-flip {
            border-radius: 10px;
          }
        }

        /* Tablet adjustments */
        @media (min-width: 641px) and (max-width: 899px) {
          .book-container {
            min-height: 550px;
          }
          .book-clip {
            min-height: 550px;
          }
          .book-flip {
            border-radius: 16px;
          }
        }

        /* Desktop two-up spread */
        @media (min-width: 900px) {
          .book-container {
            min-height: 580px;
          }
          .book-clip {
            min-height: 580px;
          }
          .book-flip {
            border-radius: 20px;
          }
          .book-inner {
            padding: 4rem 0;
          }
        }

        .page {
          background: linear-gradient(135deg, #0f2b45, #072033);
          color: #cfeffb;
          border-radius: 12px;
          overflow: hidden;
        }

        .pf-dot {
          background: var(--pf-dot);
          transition: width 0.2s ease, background 0.2s ease;
        }

        .pf-dot-active {
          background: var(--pf-dot-active);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}