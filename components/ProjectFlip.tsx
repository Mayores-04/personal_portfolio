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
  <div ref={ref} className="page shadow-2xl flex flex-col justify-center p-8">
    <div className="text-center">
      <h3 className="text-3xl font-bold text-[#c5eafa] mb-2">Some of my personal projects</h3>
      <p className="text-[#7695a3] max-w-xl mx-auto">Browse a selection of projects I built — apps, experiments, and portfolio pieces demonstrating front-end and full-stack work.</p>
    </div>
  </div>
));

IntroCover.displayName = "IntroCover";

const BackCover = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="page shadow-2xl flex flex-col justify-center p-8">
    <div className="text-center">
      <h3 className="text-3xl font-bold text-[#c5eafa] mb-2">Thanks for flipping through</h3>
      <p className="text-[#7695a3] max-w-xl mx-auto">You've reached the end — feel free to revisit the projects or get in touch to collaborate.</p>
    </div>
  </div>
));

BackCover.displayName = "BackCover";

const Page = React.forwardRef<HTMLDivElement, PageProps>(({ project, pageNumber }, ref) => (
  <div ref={ref} className="page shadow-2xl flex flex-col justify-between p-8">
    <div className="flex flex-col flex-1">
          <div className="flex items-center justify-center mb-4 h-48">
            <img
              src={project.image}
              alt={project.Title}
              className="w-full h-full object-contain rounded-lg shadow-lg border border-[#4f85a2]/50"
            />
          </div>
      <h3 className="text-2xl font-bold text-[#c5eafa] mb-2">{project.Title}</h3>
      <p className="text-[#7695a3] text-base mb-3 shrink-0 line-clamp-3">{project.desc}</p>
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
          className="inline-block mt-2 px-5 py-2 bg-[#ffb400] text-white rounded-lg hover:bg-[#7cd4ff] transition-colors w-fit text-sm font-semibold"
        >
          View Project
        </a>
      )}
    </div>
    <div className="mt-4 text-center text-[#7cd4ff] text-sm font-medium">Page {pageNumber}</div>
  </div>
));

Page.displayName = "Page";

export default function ProjectBook({ projects, openIndex }: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTwoUp, setIsTwoUp] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const bookRef = useRef<any>(null);
  // removed dynamic measurement to avoid layout-stutter; rely on CSS fallbacks

  const totalPages = projects.length;
  // include intro/back covers
  const totalSpreadPages = projects.length + 2;

  // Hide tutorial automatically after 8s
  useEffect(() => {
    if (showTutorial) {
      const timer = setTimeout(() => setShowTutorial(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [showTutorial]);

  // Responsiveness — determine two-page or single-page mode
  useEffect(() => {
    const update = () => setIsTwoUp(window.innerWidth >= 900);
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
  // map project index -> actual page index (accounting for intro cover at 0)
  const goToPage = useCallback((index: number) => bookRef.current?.pageFlip().flip(index + 1), []);

  // If an `openIndex` prop is provided (via ?openProject=N), flip to that project
  useEffect(() => {
    if (openIndex === undefined || openIndex === null) return;
    const idx = Number(openIndex);
    if (Number.isNaN(idx)) return;
    // ensure index in range
    if (idx < 0 || idx >= projects.length) return;

    const tryFlip = () => {
      try {
        const flip = bookRef.current?.pageFlip();
        if (flip && typeof flip.flip === "function") {
          // flip to project page (intro cover is page 0, projects start at page 1)
          flip.flip(idx + 1);
        } else {
          // not yet ready, retry shortly
          setTimeout(tryFlip, 120);
        }
      } catch (err) {
        // swallow and retry
        setTimeout(tryFlip, 150);
      }
    };

    tryFlip();
  }, [openIndex, projects.length]);

  // NO-OP: removed dynamic measurement to prevent JS-driven height changes

  return (
    <div id="project" className="w-full  px-4 pf-section">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-5xl font-bold pf-accent mb-3 mt-5">My Projects</h2>
          <p className="pf-muted text-lg">Explore my work by flipping through the pages</p>
        </div>

        {/* Tutorial Popup */}
        {showTutorial && (
          <div
            role="status"
            aria-live="polite"
            className="fixed top-6 right-6 z-50 w-full max-w-sm animate-fadeIn  bg-black/50 rounded-xl"
          >
            <div className="pf-toast rounded-xl shadow-xl p-4 flex gap-3 items-start">
              <div className="text-2xl">📖</div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold pf-accent">How to navigate</h4>
                    <p className="text-sm pf-muted-light">
                      Drag the corner, use arrows, or click the dots below.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowTutorial(false)}
                    aria-label="Close tutorial"
                    className="ml-2 p-1 rounded-md pf-muted hover:pf-accent transition"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <div className="px-3 py-1 rounded pf-badge">Click & Drag</div>
                  <div className="px-3 py-1 rounded pf-badge">Arrow Buttons</div>
                  <div className="px-3 py-1 rounded pf-badge">Page Dots</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Flipbook Section */}
        <div className="relative flex items-center justify-center">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="absolute left-0 md:left-4 z-60 p-3 pf-nav text-white rounded-full shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95"
            aria-label="Previous page"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Flipbook Container */}
          <div className="book-container">
            {/* clipped viewport that reserves space and prevents child transforms from creating scrollbars */}
            <div className="book-clip">
              <div className="book-inner mt-16 mb-16">
                {isTwoUp ? (
                  <HTMLFlipBook
                    ref={bookRef}
                    width={900}
                    height={800}
                    size="stretch"
                    showCover={false}
                    className="book-flip"
                    minWidth={600}
                    maxWidth={1200}
                    onFlip={onFlip}
                    startPage={0}
                    drawShadow
                    flippingTime={900}
                    usePortrait={false}
                    clickEventForward
                    showPageCorners
                    mobileScrollSupport
                    startZIndex={1}
                  >
                    {/* first left intro cover */}
                    <IntroCover key="intro" />
                    {projects.map((p, i) => (
                      <Page key={i} project={p} pageNumber={i + 2} />
                    ))}
                    {/* last right back cover */}
                    <BackCover key="back" />
                  </HTMLFlipBook>
                ) : (
                  <HTMLFlipBook
                    ref={bookRef}
                    width={360}
                    height={700}
                    size="stretch"
                    showCover={false}
                    className="book-flip"
                    onFlip={onFlip}
                    startPage={0}
                    flippingTime={700}
                    usePortrait
                    showPageCorners
                    mobileScrollSupport
                    drawShadow
                    startZIndex={1}
                  >
                    <IntroCover key="intro-sm" />
                    {projects.map((p, i) => (
                      <Page key={i} project={p} pageNumber={i + 2} />
                    ))}
                    <BackCover key="back-sm" />
                  </HTMLFlipBook>
                )}
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalSpreadPages - 1}
            className="absolute right-0 md:right-4 z-60 p-3 pf-nav text-white rounded-full shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95"
            aria-label="Next page"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Pagination Dots
        <div className="text-center mt-4 pf-accent font-semibold text-lg">
          Page {currentPage + 1} of {totalSpreadPages}
        </div>
        <div className="flex justify-center gap-2 mt-4 flex-wrap max-w-md mx-auto">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToPage(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentPage ? "pf-dot-active w-8" : "pf-dot"
              }`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div> */}
{/* 
        <div className="text-center">
          <button
            onClick={() => setShowTutorial(true)}
            className="pf-muted hover:pf-accent transition text-sm underline"
          >
            Need help? Show tutorial
          </button>
        </div> */}
      </div>

      <style jsx global>{`
        :root {
          /* Map project-flip palette to global theme variables */
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
          /* Prevent hover shadow / transform from changing surrounding layout
             by reserving the flipbook's visual height. Adjusts for the two
             sizes we render (mobile and desktop). */
        min-height: 520px;
          z-index: 45; /* sit above animated canvas (z-40) but below header (z-50) */
        }

        .book-flip {
          margin: 0 auto;
          /* reduce shadow spread so visuals don't create large overflow */
          box-shadow: 0 18px 48px rgba(6, 30, 60, 0.45);
          background: transparent;
          border-radius: 20px;
        }

        /* viewport clip to prevent child transforms from growing page scroll extents */
        .book-clip {
          position: relative;
          overflow: hidden;
          width: 100%;
          /* reserve reasonable default height until ResizeObserver measures the book */
      min-height: 520px;
        }

        /* inner wrapper: keep the book in normal flow but centered inside the clip
           using flexbox. Using relative positioning here avoids layout issues
           with react-pageflip which expects the flip element to be in flow. */
        .book-inner {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          width: 100%;
          z-index: 46; /* ensure the inner book renders above the clip */
        }

        /* Desktop two-up spread uses a taller visual area; ensure we reserve it */
        @media (min-width: 900px) {
      .book-container { min-height: 580px; }
      .book-clip { min-height: 580px; }
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
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
