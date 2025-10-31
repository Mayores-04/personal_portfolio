"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import BubbleCanvas from "../components/BubbleCanvas";
import Typing from "../components/Typing";
import SkillMorph from "../components/SkillMorph";
import ProjectFlip from "../components/ProjectFlip";

import projects from "@/data/projects";
import React from "react";

export default function Home() {
  const [openContact, setOpenContact] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const v = params.get("openProject");
    setOpenIndex(v ? parseInt(v, 10) : undefined);
  }, []);

  return (
    <div className="min-h-screen w-full font-sans text-white ">
  <BubbleCanvas />
  <Navigation onContact={() => setOpenContact(true)} projects={projects} />

      <main className="flex min-h-screen w-full max-w-6xl mx-auto items-center justify-between px-8 py-24">
        <section className="flex-1 max-w-2xl">
          <p className="text-2xl py-2 text-muted">Hello, I'm</p>

          <h1 className="text-6xl font-bold text-page">Jake Mayores</h1>

          <h2 className="text-4xl text-accent font-bold py-4">
            <Typing />
          </h2>

          <div className="flex gap-4 text-2xl text-muted my-4">
            <a href="https://github.com/Mayores-04" target="_blank" rel="noopener noreferrer" title="GitHub - Jake Mayores">
              <i className="fab fa-github hover:text-white" />
            </a>
            <a href="https://www.linkedin.com/in/jake-mayores-81677530a/" target="_blank" rel="noopener noreferrer" title="LinkedIn - Jake Mayores">
              <i className="fab fa-linkedin hover:text-white" />
            </a>
            <a href="mailto:jakemayores05@gmail.com" title="Email Jake">
              <i className="fas fa-envelope hover:text-white" />
            </a>
            <a href="https://www.facebook.com/jakejmayores" target="_blank" rel="noopener noreferrer" title="Facebook - Jake Mayores">
              <i className="fab fa-facebook hover:text-white" />
            </a>
            <a href="https://www.instagram.com/mayoresjake/" target="_blank" rel="noopener noreferrer" title="Instagram - Jake Mayores">
              <i className="fab fa-instagram hover:text-white" />
            </a>
          </div>

          <div className="flex gap-3 mt-6">
            <a className="text-2xl font-bold px-4 py-2 rounded-lg border-2 project-title border-nav hover:bg-[var(--cta)] hover:text-white transition">
              Hire me
            </a>
            <button
              onClick={() => setOpenContact(true)}
              className="text-2xl font-bold px-4 py-2 rounded-lg btn-cta"
            >
              Contact me
            </button>
          </div>
        </section>

        <aside className="w-[520px] flex items-center justify-center">
          <img
            src="https://mayores-jake.infinityfreeapp.com/images/profile.png"
            width={500}
            alt="profile picture"
            className="border-2 border-nav rounded-[60px] transition duration-500 hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] hover:scale-105"
          />
        </aside>
      </main>

      {/* Morphing skills divider */}
      <SkillMorph />

      {/* Projects interactive bubbles section */}
      <ProjectFlip projects={projects} openIndex={openIndex} />

    <Footer />
    </div>
  );
}
