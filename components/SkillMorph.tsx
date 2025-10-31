"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

type Skill = { id: string; name: string; icon?: string };

const PATH_A =
  "M0,220 C180,260 360,120 600,160 C840,200 1020,240 1200,220 L1200,0 L0,0 Z";
const PATH_B =
  "M0,180 C140,140 360,280 620,200 C880,120 1040,100 1200,160 L1200,0 L0,0 Z";

const SKILLS: Skill[] = [
  { id: "react", name: "React", icon: "devicon-react-original colored" },
  { id: "next", name: "Next.js", icon: "devicon-nextjs-original-wordmark" },
  { id: "ts", name: "TypeScript", icon: "devicon-typescript-plain colored" },
  { id: "js", name: "JavaScript", icon: "devicon-javascript-plain colored" },
  { id: "html", name: "HTML5", icon: "devicon-html5-plain-wordmark colored" },
  { id: "css", name: "CSS3", icon: "devicon-css3-plain-wordmark colored" },
  { id: "tailwind", name: "Tailwind", icon: "devicon-tailwindcss-plain colored" },
  { id: "node", name: "Node.js", icon: "devicon-nodejs-plain colored" },
  { id: "express", name: "Express" },
  { id: "mongo", name: "MongoDB", icon: "devicon-mongodb-plain colored" },
  { id: "git", name: "Git", icon: "devicon-git-plain colored" },
  { id: "github", name: "GitHub", icon: "devicon-github-original" },
  { id: "rn", name: "React Native", icon: "devicon-react-original colored" },
  { id: "expo", name: "Expo" },
  { id: "electron", name: "Electron", icon: "devicon-electron-original colored" },
];

const SkillPill = React.memo(function SkillPill({ s }: { s: Skill }) {
  return (
    <li
      aria-label={s.name}
      className="skill-pill flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-lg list-none"
    >
      {s.icon ? (
        <i className={`${s.icon} text-5xl`} aria-hidden />
      ) : (
        <span className="text-lg">{s.name}</span>
      )}
    </li>
  );
});

export default function SkillMorph() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [groupCount, setGroupCount] = useState(3); // default to 3 groups

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measureAndDuplicate = () => {
      const group = track.querySelector(".track-group");
      if (!group) return;

      const viewportWidth = window.innerWidth;
      const groupWidth = group.scrollWidth;
      // Compute how many groups we need to cover + extra one for seamless scroll
      const neededGroups = Math.ceil(viewportWidth / groupWidth) + 2;
      setGroupCount(neededGroups);

      track.style.setProperty("--track-width", `${groupWidth}px`);
      track.classList.add("ready");
    };

    measureAndDuplicate();
    window.addEventListener("resize", measureAndDuplicate);

    return () => window.removeEventListener("resize", measureAndDuplicate);
  }, []);

  const renderGroup = useCallback(
    (gIndex: number) => (
      <ul key={gIndex} className="track-group flex gap-8" aria-label={`skills-group-${gIndex}`}>
        {SKILLS.map((s) => (
          <SkillPill key={`${gIndex}-${s.id}`} s={s} />
        ))}
      </ul>
    ),
    [],
  );

  return (
    <div id="skillsPage" style={{ scrollMarginTop: "6rem" }} className="skills-morph relative w-full overflow-hidden">
      <svg viewBox="0 0 1200 240" preserveAspectRatio="none" className="block w-full skills-morph-svg">
        <defs>
          <linearGradient id="g1" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#1E1E52" />
            <stop offset="100%" stopColor="#0a3c68" />
          </linearGradient>
        </defs>
        <path d={PATH_A} fill="url(#g1)">
          <animate attributeName="d" dur="6s" repeatCount="indefinite" values={`${PATH_A};${PATH_B};${PATH_A}`} />
        </path>
        <path d={PATH_B} fill="rgba(255,255,255,0.02)" />
      </svg>

      <div className="skills-marquee absolute left-0 w-full flex justify-start">
        <div ref={trackRef} className="skills-track flex">
          {Array.from({ length: groupCount }).map((_, i) => renderGroup(i))}
        </div>
      </div>
    </div>
  );
}
