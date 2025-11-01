"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import ContactModal from "../components/ContactModal";
import Footer from "../components/Footer";
import BubbleCanvas from "../components/BubbleCanvas";
import Typing from "../components/Typing";
import SkillMorph from "../components/SkillMorph";
import ProjectFlip from "../components/ProjectFlip";

import projects from "@/data/projects";
import React from "react";
import Link from "next/link";

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
    <div id="home" className="h-full lg:min-h-screen md:min-h-screen w-full font-sans text-white">
      <BubbleCanvas />
      <Navigation onContact={() => setOpenContact(true)} projects={projects} />

      <main className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 pt-20 sm:pt-24 md:pt-28 lg:pt-32 lg:min-h-screen pb-12 sm:pb-14 md:pb-16 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
        <section className="flex-1 max-w-2xl w-full">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl py-1 sm:py-1.5 md:py-2 text-muted">Hello, I'm</p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-page leading-tight">
            Jake Mayores
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-accent font-bold py-2 sm:py-2.5 md:py-3 lg:py-4">
            <Typing />
          </h2>

          <div className="flex gap-3 sm:gap-3.5 md:gap-4 lg:gap-5 text-lg sm:text-xl md:text-2xl text-muted my-3 sm:my-4 md:my-5 lg:my-6 flex-wrap">
            <a href="https://github.com/Mayores-04" target="_blank" rel="noopener noreferrer" title="GitHub - Jake Mayores" className="hover:text-white transition duration-300">
              <i className="fab fa-github" />
            </a>
            <a href="https://www.linkedin.com/in/jake-mayores-81677530a/" target="_blank" rel="noopener noreferrer" title="LinkedIn - Jake Mayores" className="hover:text-white transition duration-300">
              <i className="fab fa-linkedin" />
            </a>
            <a href="mailto:jakemayores05@gmail.com" title="Email Jake" className="hover:text-white transition duration-300">
              <i className="fas fa-envelope" />
            </a>
            <a href="https://www.facebook.com/jakejmayores" target="_blank" rel="noopener noreferrer" title="Facebook - Jake Mayores" className="hover:text-white transition duration-300">
              <i className="fab fa-facebook" />
            </a>
            <a href="https://www.instagram.com/mayoresjake/" target="_blank" rel="noopener noreferrer" title="Instagram - Jake Mayores" className="hover:text-white transition duration-300">
              <i className="fab fa-instagram" />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-5 md:mt-6">
            <Link
              href="#project"
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg border-2 project-title border-nav hover:bg-cta hover:text-white transition duration-300 text-center cursor-pointer"
            >
              Browse Projects
            </Link>
            <Link
              href="/contact"
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg btn-cta text-center transition duration-300"
            >
              Contact me
            </Link>
          </div>
        </section>
        
        <aside className="w-full lg:w-auto flex items-center justify-center lg:justify-end mt-6 sm:mt-8 md:mt-10 lg:mt-0">
          <Image
            src="/images/image.png"
            alt="profile picture"
            priority
            width={500}
            height={500}
            className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 2xl:w-[500px] 2xl:h-[500px] object-cover border-2 border-nav rounded-3xl md:rounded-[40px] lg:rounded-[48px] xl:rounded-[60px] transition duration-500 hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] hover:scale-105"
          />
        </aside>
      </main>

      {/* Morphing skills divider */}
      <SkillMorph />

      {/* Projects interactive bubbles section */}
      <ProjectFlip projects={projects} openIndex={openIndex} />

  {/* Contact modal (global) */}
  <ContactModal open={openContact} onClose={() => setOpenContact(false)} projects={projects} />

  <Footer />
    </div>
  );
}