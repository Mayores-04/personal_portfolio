"use client";

import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SkillMorph from "@/components/SkillMorph";
import { Sparkles } from "lucide-react";
import BubbleCanvas from "@/components/BubbleCanvas";

export default function SkillsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(1200px_600px_at_50%_40%,rgba(8,35,52,0.6)_0%,rgba(6,16,26,0.85)_60%,rgba(4,10,16,1)_100%)] text-white">
      <Navigation />
            <BubbleCanvas />

      <main className="flex-1 pt-28">
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-5xl font-bold mb-6">What Skills I have as a Developer</h1>
            <p className="text-lg text-[#a9c0cc] mb-8">Below are the key areas I focus on. Click any card for more details.</p>

            <div className="grid md:grid-cols-3 gap-6">
              <article className="bg-[#0f2b45] rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">Soft Skills</h3>
                <ul className="list-disc list-inside text-[#cfeffb] space-y-2">
                  <li>Team collaboration</li>
                  <li>Critical Thinking</li>
                  <li>Active Listening</li>
                  <li>Adaptability</li>
                </ul>
              </article>

              <article className="bg-[#0f2b45] rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">Web Development</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 rounded bg-white/10">React</span>
                  <span className="px-3 py-1 rounded bg-white/10">Next.js</span>
                  <span className="px-3 py-1 rounded bg-white/10">HTML5</span>
                  <span className="px-3 py-1 rounded bg-white/10">CSS3</span>
                  <span className="px-3 py-1 rounded bg-white/10">JavaScript</span>
                  <span className="px-3 py-1 rounded bg-white/10">TypeScript</span>
                </div>
              </article>

              <article className="bg-[#0f2b45] rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">App Development</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 rounded bg-white/10">React Native</span>
                  <span className="px-3 py-1 rounded bg-white/10">Expo</span>
                  <span className="px-3 py-1 rounded bg-white/10">Android</span>
                  <span className="px-3 py-1 rounded bg-white/10">iOS</span>
                </div>
              </article>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <article className="bg-[#0f2b45] rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">Backend</h3>
                <p className="text-[#cfeffb] mb-3">I work with both NoSQL and relational databases depending on the project's needs.</p>
                <ul className="list-disc list-inside text-[#cfeffb] space-y-2">
                  <li>MongoDB — document database used for flexible schemas and fast iteration.</li>
                  <li>Microsoft SQL Server (MSSQL) — relational database used for structured data and complex queries.</li>
                </ul>
              </article>

              <article className="bg-[#0f2b45] rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">Deployment & Tools</h3>
                <div className="flex flex-col gap-2 text-[#cfeffb]">
                  {/* <span className="px-3 py-1 rounded bg-white/5 inline-block">XAMPP</span> */}
                  <span className="px-3 py-1 rounded bg-white/5 inline-block">Vercel / Azure</span>
                  <span className="px-3 py-1 rounded bg-white/5 inline-block">Git</span>
                </div>
              </article>
            </div>

            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-4">Live Skill Marquee</h2>
              <SkillMorph />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
