"use client";

import React, { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Sparkles, Heart, Target, Lightbulb } from "lucide-react";

const values = [
  { icon: Sparkles, title: "Creativity", description: "Bringing unique and innovative ideas to every project" },
  { icon: Heart, title: "Passion", description: "Loving what I do and putting heart into every work" },
  { icon: Target, title: "Excellence", description: "Committed to delivering high-quality work every time" },
  { icon: Lightbulb, title: "Innovation", description: "Always exploring new techniques and creative solutions" },
];

const ACHIEVEMENTS = [
  {
    title: "Alpha Certification",
    description: "Completed the ALPHA certification program.",
    image: "/Certificates/ALPHA_CERTIFICATEhide.png",
  },
  {
    title: "CSharp Programming (UMAK)",
    description: "Certified in CSharp programming fundamentals.",
    image: "/Certificates/CSharp_Programming_UMAKhide.jpg",
  },
  {
    title: "Java Certification",
    description: "Java programming certification.",
    image: "/Certificates/JAVA_CERTIFICATEhide.png",
  },
{
    title: "Game Development Competition",
    description: "Participated in a game development competition.",
    image: "/Certificates/Game_Dev_STI_Ortigas-Caintahide.jpg",
  },
];

export default function AboutPage() {
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [showAchievements, setShowAchievements] = useState(false);
  const achievementsRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(1200px_600px_at_50%_40%,rgba(8,35,52,0.6)_0%,rgba(6,16,26,0.85)_60%,rgba(4,10,16,1)_100%)] text-white">
      <Navigation />

      <main className="flex-1 pt-28">
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold">About Me</h1>
                <p className="text-lg text-[#a9c0cc]">Hi — I'm Jake Mayores, a front-end developer passionate about building delightful interfaces.</p>

                <div className="flex gap-3">
                  <a
                    href="/Mayores_Jake_Resume.pdf"
                    download="Mayores_Jake_Resume.pdf"
                    className="px-5 py-2 rounded-full bg-[#375063] text-white font-medium shadow hover:bg-[#4f85a2] transition"
                  >
                    Download CV
                  </a>

                  <button
                    onClick={() => {
                      if (!showAchievements) {
                        setShowAchievements(true);
                        // wait for the section to render then scroll
                        requestAnimationFrame(() => achievementsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
                      } else {
                        setShowAchievements(false);
                      }
                    }}
                    className="px-5 py-2 rounded-full bg-blue-200 text-[#375063] font-medium shadow hover:bg-[#7bb1ce] transition"
                  >
                    Achievements
                  </button>
                </div>

                <div className="space-y-4 text-[#c9d8df]">
                  <p>
                    I'm a passionate Front-End Web Developer with a strong Computer Science background. Skilled in HTML, CSS,
                    JavaScript, and familiar with React, Next.js and TailwindCSS.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <img src="/images/profile.png" alt="profile" className="rounded-lg w-64 h-64 object-cover shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">My Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div key={i} className="bg-white/5 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7cd4ff] to-[#ffb400] flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-white" size={26} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{v.title}</h3>
                    <p className="text-[#9db3bd]">{v.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Achievements section - toggled */}
        {showAchievements && (
          <section ref={achievementsRef} className="py-12 bg-white/5">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold mb-6">Achievements</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {ACHIEVEMENTS.map((a, idx) => (
                  <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-48 object-cover cursor-pointer"
                      onClick={() => setZoomImage(a.image)}
                    />
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 text-gray-900">{a.title}</h3>
                      <p className="text-gray-700">{a.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Zoom modal for images */}
        {zoomImage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={() => setZoomImage(null)}>
            <img src={zoomImage} alt="zoom" className="max-w-[90%] max-h-[90%] rounded-lg object-contain" />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

