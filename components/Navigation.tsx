"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ContactModal from "./ContactModal";
import defaultProjects from "@/data/projects";

type Project = {
  Title: string;
  link: string;
  image: string;
  desc: string;
};

type Props = {
  onContact?: () => void;
  projects?: Project[];
};

export default function Navigation({ onContact, projects }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const popRef = useRef<HTMLDivElement | null>(null);

  const projectsToShow = projects ?? defaultProjects;

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!popRef.current) return;
      if (!popRef.current.contains(e.target as Node)) setShowProjects(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <>
      <header className="flex backdrop-blur-md justify-center fixed top-0 left-0 z-50 w-full">
        <div className="w-full flex items-center justify-between py-4 max-w-7xl mx-auto">
          <Link
            href="/#home"
            className="py-2 text-4xl no-underline font-bold brand-gradient"
          >
            DevFolio
          </Link>

          <nav className="flex gap-6 text-[16px] items-center">
            {/* Desktop nav - hidden on small screens */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setShowProjects((s) => !s)}
                className="relative px-2 nav-link no-underline transition duration-300"
              >
                Projects
              </button>
              <Link
                href="/about"
                className="relative px-2 nav-link no-underline transition duration-300"
              >
                About
              </Link>
              <Link
                href="/skills"
                className="relative px-2 nav-link no-underline transition duration-300"
              >
                Skills
              </Link>
              <Link
                href="/contact"
                className="relative px-2 nav-link no-underline transition duration-300"
              >
                Contact
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileMenuOpen((s) => !s)}
                className="p-2 rounded-md bg-black/20 hover:bg-black/30 transition"
              >
                {mobileMenuOpen ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* projects popover shown when Projects nav is clicked */}
      {showProjects && projectsToShow && projectsToShow.length > 0 && (
        <div
          ref={popRef}
          className="fixed top-16 right-8 z-60 w-96 bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <div className="grid grid-cols-1 gap-3">
            {projectsToShow.slice(0, 5).map((p, i) => (
              <a
                key={i}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowProjects(false)}
                className="flex gap-3 items-center p-2 rounded-md hover:bg-white/5 transition"
              >
                <img
                  src={p.image}
                  alt={p.Title}
                  className="w-16 h-12 object-cover rounded-md"
                />
                <div className="flex-1">
                  <div className="text-sm font-semibold project-title">
                    {p.Title}
                  </div>
                  <div className="text-xs project-desc line-clamp-2">
                    {p.desc}
                  </div>
                </div>
              </a>
            ))}

            <div className="pt-2">
              <Link href="/#project" className="text-sm text-accent underline">
                View more projects
              </Link>
            </div>
          </div>
        </div>
      )}

      <ContactModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        projects={projectsToShow}
      />

      {/* Mobile full-screen menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-70 bg-black/75 md:hidden">
          <div className="absolute top-4 right-4">
            <button
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md bg-white/6"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="h-full flex flex-col items-center justify-center gap-6 p-6 text-center">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl nav-link"
            >
              Home
            </Link>
            <button
              onClick={() => {
                setShowProjects((s) => !s);
              }}
              className="text-2xl nav-link"
            >
              Projects
            </button>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl nav-link"
            >
              About
            </Link>
            <Link
              href="/skills"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl nav-link"
            >
              Skills
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl nav-link"
            >
              Contact
            </Link>

            {/* show a small projects list inside the mobile menu if toggled */}
            {showProjects && (
              <div className="w-full max-w-md mt-4 bg-gray-900/60 rounded-lg p-4">
                {projectsToShow.slice(0, 5).map((p, i) => (
                  <a
                    key={i}
                    href={p.link}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex gap-3 items-center p-2 rounded-md hover:bg-white/5 transition"
                  >
                    <img
                      src={p.image}
                      alt={p.Title}
                      className="w-16 h-12 object-cover rounded-md"
                    />
                    <div className="flex-1 text-left">
                      <div className="text-sm font-semibold project-title">
                        {p.Title}
                      </div>
                      <div className="text-xs project-desc line-clamp-2">
                        {p.desc}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
