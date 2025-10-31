"use client";

import React, { useState, useEffect, useRef } from "react";
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
          <a href="/" className="py-2 text-4xl no-underline font-bold brand-gradient">
            DevFolio
          </a>

          <nav className="flex gap-6 text-[16px]">
            <a href="/" className="relative px-2 nav-link no-underline transition duration-300">Home</a>
            <button onClick={() => setShowProjects((s) => !s)} className="relative px-2 nav-link no-underline transition duration-300">Projects</button>
            <a href="/about" className="relative px-2 nav-link no-underline transition duration-300">About</a>
            <a href="/skills" className="relative px-2 nav-link no-underline transition duration-300">Skills</a>
            <a href="/contact" className="relative px-2 nav-link no-underline transition duration-300">Contact</a>
          </nav>
        </div>
      </header>

      {/* projects popover shown when Projects nav is clicked */}
      {showProjects && projectsToShow && projectsToShow.length > 0 && (
        <div ref={popRef} className="fixed top-16 right-8 z-60 w-96 bg-gray-800 rounded-xl p-4 shadow-lg">
          <div className="grid grid-cols-1 gap-3">
            {projectsToShow.slice(0, 5).map((p, i) => (
              <a
                key={i}
                href={`/?openProject=${i}`}
                className="flex gap-3 items-center p-2 rounded-md hover:bg-white/5 transition"
              >
                <img src={p.image} alt={p.Title} className="w-16 h-12 object-cover rounded-md" />
                <div className="flex-1">
                  <div className="text-sm font-semibold project-title">{p.Title}</div>
                  <div className="text-xs project-desc line-clamp-2">{p.desc}</div>
                </div>
              </a>
            ))}

            <div className="pt-2">
              <a href="/#project" className="text-sm text-accent underline">View more projects</a>
            </div>
          </div>
        </div>
      )}

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} projects={projectsToShow} />
    </>
  );
}
