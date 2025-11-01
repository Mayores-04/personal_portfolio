"use client";
"use client";

import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BubbleCanvas from "@/components/BubbleCanvas";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "Please enter your name.";
    if (!email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email.";
    if (!message.trim()) e.message = "Please enter a message.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    // Simulate submit
    setSubmitted(false);
    setTimeout(() => {
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 700);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(1200px_600px_at_50%_40%,rgba(8,35,52,0.6)_0%,rgba(6,16,26,0.85)_60%,rgba(4,10,16,1)_100%)] text-white">
      <Navigation />

      <BubbleCanvas />
      <main className="flex-1 pt-28">
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* LEFT: contact info + social gradient cards */}
              <div className="space-y-6">
                <h1 className="text-4xl font-bold">Contact Me</h1>
                <p className="text-lg text-[#a9c0cc]">I'd love to hear about your project or how we can collaborate. Reach out via email or social media, or send me a message below.</p>

                <div className="mt-6 space-y-3">
                  <div className="text-sm text-[#a9c0cc]"><strong>📞</strong> <span className="text-[#7cd4ff]">09701275112</span></div>
                  <div className="text-sm text-[#a9c0cc]"><strong>📧</strong> <a className="text-[#7cd4ff] hover:underline" href="mailto:jakemayores05@gmail.com">jakemayores05@gmail.com</a></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg font-semibold mt-4">
                  <a href="https://www.linkedin.com/in/jake-mayores-81677530a" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-linear-to-r from-[#0077b5] to-[#00a1e6] text-white shadow-md hover:scale-105 transition">
                    <i className="fab fa-linkedin text-2xl" />
                    <span>Connect on LinkedIn</span>
                  </a>

                  <a href="https://twitter.com/your-profile" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-linear-to-r from-black to-gray-700 text-white shadow-md hover:scale-105 transition">
                    <i className="fab fa-x-twitter text-2xl" />
                    <span>Follow on X</span>
                  </a>

                  <a href="https://www.instagram.com/mayoresjake" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-linear-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white shadow-md hover:scale-105 transition">
                    <i className="fab fa-instagram text-2xl" />
                    <span>Follow on Instagram</span>
                  </a>

                  <a href="https://www.facebook.com/jakejmayores" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-linear-to-r from-[#1877f2] to-[#3dc1fc] text-white shadow-md hover:scale-105 transition">
                    <i className="fab fa-facebook text-2xl" />
                    <span>Follow on Facebook</span>
                  </a>
                </div>

                {/* small decorative flourish */}
                <div className="mt-6 text-sm text-[#9bb9c4]">Prefer a quick chat? Click <a href="mailto:jakemayores05@gmail.com" className="text-[#7cd4ff] underline">email</a> or message me on LinkedIn.</div>
              </div>

              {/* RIGHT: form */}
              <div className="bg-white/5 rounded-xl p-6 shadow-lg text-white border border-white/6">
                {!submitted ? (
                  <>
                    <h2 className="text-2xl font-bold mb-4">Send a Message</h2>
                    <form onSubmit={onSubmit} className="space-y-4" noValidate>
                      <div>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          placeholder="Your Name"
                          className={`w-full border ${errors.name ? 'border-red-500' : 'border-white/10'} bg-transparent text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7cd4ff]`}
                        />
                        {errors.name && <div className="text-xs text-red-400 mt-1">{errors.name}</div>}
                      </div>

                      <div>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          placeholder="Your Email"
                          className={`w-full border ${errors.email ? 'border-red-500' : 'border-white/10'} bg-transparent text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7cd4ff]`}
                        />
                        {errors.email && <div className="text-xs text-red-400 mt-1">{errors.email}</div>}
                      </div>

                      <div>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Your Message"
                          rows={6}
                          className={`w-full border ${errors.message ? 'border-red-500' : 'border-white/10'} bg-transparent text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7cd4ff] resize-none`}
                        />
                        {errors.message && <div className="text-xs text-red-400 mt-1">{errors.message}</div>}
                      </div>

                      <div className="flex gap-3">
                        <button type="submit" className="flex-1 bg-[#ffb400] text-[#071828] font-semibold rounded-lg py-2 hover:opacity-95 transition">Send Message</button>
                        <a href="/#project" className="flex-1 border border-white/10 rounded-lg py-2 flex items-center justify-center">View Projects</a>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-20 h-20 rounded-full bg-[#0f2b45] flex items-center justify-center mb-4">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17l-5-5" stroke="#7cd4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold pf-accent">Message Sent</h3>
                    <p className="text-sm pf-muted mt-2">Thanks — I will get back to you soon. </p>
                    <button onClick={() => setSubmitted(false)} className="mt-6 px-4 py-2 rounded-lg bg-white/6">Send another</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
