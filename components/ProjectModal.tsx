"use client";

import React from "react";
import ProjectFlip from "./ProjectFlip";
import { Project } from "../data/projects";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  projects: Project[];
}

export default function ProjectModal({ open, onClose, projects }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-[90%] max-w-6xl h-[80vh] bg-transparent rounded-xl p-4">
        <button
          aria-label="Close projects"
          onClick={onClose}
          className="absolute right-4 top-4 z-70 p-2 rounded-full bg-white/6 text-white hover:bg-white/10"
        >
          <X size={20} />
        </button>

        <div className="h-full w-full">
          <ProjectFlip projects={projects} />
        </div>
      </div>
    </div>
  );
}
