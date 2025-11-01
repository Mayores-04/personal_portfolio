"use client";

import React from "react";

type Project = {
  Title: string;
  link: string;
  image: string;
  desc: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  projects?: Project[];
  /** mode: 'contact' shows the contact UI; 'projects' shows a projects grid */
  mode?: "contact" | "projects";
};

export default function ContactModal({ open, onClose, projects, mode }: Props) {
  const [expanded, setExpanded] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);
  const [dragY, setDragY] = React.useState(0);
  const startYRef = React.useRef<number | null>(null);
  const panelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) {
      setExpanded(false);
      setDragging(false);
      setDragY(0);
      startYRef.current = null;
      document.documentElement.style.overflow = '';
    }
  }, [open]);

  // If the modal is opened in projects mode, start expanded so we show the
  // project cards immediately. If opened in contact mode, keep the collapsed
  // flyout so users can drag it open.
  React.useEffect(() => {
    if (!open) return;
    if (mode === "projects") {
      setExpanded(true);
      document.documentElement.style.overflow = 'hidden';
    } else {
      // contact flyout defaults collapsed (unless user drags/expands)
      setExpanded(false);
      document.documentElement.style.overflow = '';
    }
  }, [open, mode]);

  if (!open) return null;

  function onPointerDown(e: React.PointerEvent) {
    if (expanded) return; // only drag when collapsed
    startYRef.current = e.clientY;
    setDragging(true);
    try { (e.target as Element).setPointerCapture(e.pointerId); } catch {}
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging || startYRef.current === null) return;
    const delta = e.clientY - startYRef.current;
    if (delta > 0) setDragY(delta);
  }

  function onPointerUp() {
    if (!dragging) return;
    const threshold = 140;
    if (dragY > threshold) {
      setExpanded(true);
      document.documentElement.style.overflow = 'hidden';
    } else {
      setDragY(0);
    }
    setDragging(false);
    startYRef.current = null;
  }

  function collapse() {
    setExpanded(false);
    document.documentElement.style.overflow = '';
  }

  function handleClose() {
    onClose();
    document.documentElement.style.overflow = '';
  }

  const transformStyle: React.CSSProperties = dragging && !expanded ? { transform: `translateY(${Math.min(dragY, 600)}px)` } : {};

  return (
    <div id="contactModal" className="fixed inset-0 z-50 pointer-events-none">
      {expanded && (
        <div className="absolute inset-0 bg-black/60" onClick={collapse} />
      )}

      <div
        ref={panelRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={(e) => e.stopPropagation()}
        className={`pointer-events-auto transition-all duration-300 ${expanded ? 'fixed inset-0 flex items-start justify-center p-8' : 'fixed top-4 right-4'}`}
        style={expanded ? undefined : transformStyle}
      >
        <div className={`bg-white/6 backdrop-blur-sm text-white rounded-2xl shadow-2xl ${expanded ? 'w-full max-w-4xl h-full overflow-auto p-8' : 'w-80 h-28 p-4'}`}>
          <div className={`${expanded ? 'grid grid-cols-2 gap-8' : ''}`}>
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Get In Touch</h1>
                  {!expanded && <p className="text-sm text-[#a9c0cc]">Drag down to open contact</p>}
                </div>
                <div className="flex items-center gap-2">
                  {!expanded && (
                    <button
                      aria-label="Expand contact"
                      onClick={() => { setExpanded(true); document.documentElement.style.overflow = 'hidden'; }}
                      className="p-2 rounded-md bg-white/6 text-white hover:bg-white/10"
                    >
                      ⤓
                    </button>
                  )}
                  <button aria-label="Close" onClick={handleClose} className="p-2 rounded-md bg-white/6 text-white hover:bg-white/10">✕</button>
                </div>
              </div>

              <p className="py-1 text-[#a9c0cc]">You can connect with me via social media or email. I'd love to hear from you!</p>

              <div className="space-y-2">
                <p className="text-sm"><strong>📞</strong> <span className="text-[#7cd4ff]">09701275112</span></p>
                <p className="text-sm">
                  <strong>📧</strong>{' '}
                  <a href="mailto:jakemayores05@gmail.com" className="text-[#7cd4ff] hover:underline">jakemayores05@gmail.com</a>
                </p>
              </div>

              {expanded && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg font-semibold mt-4">
                  <a href="https://www.linkedin.com/in/jake-mayores-81677530a" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/6 text-white shadow hover:bg-[#375063] transition">
                    <i className="fab fa-linkedin text-2xl text-[#7cd4ff]" />
                    <span>Connect on LinkedIn</span>
                  </a>

                  <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/6 text-white shadow hover:bg-[#375063] transition">
                    <i className="fab fa-x-twitter text-2xl text-[#7cd4ff]" />
                    <span>Follow on X</span>
                  </a>

                  <a href="https://www.instagram.com/mayoresjake" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/6 text-white shadow hover:bg-[#375063] transition">
                    <i className="fab fa-instagram text-2xl text-[#7cd4ff]" />
                    <span>Follow on Instagram</span>
                  </a>

                  <a href="https://www.facebook.com/jakejmayores" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/6 text-white shadow hover:bg-[#375063] transition">
                    <i className="fab fa-facebook text-2xl text-[#7cd4ff]" />
                    <span>Follow on Facebook</span>
                  </a>
                </div>
              )}
            </div>

            {expanded ? (
              mode === "projects" ? (
                <div className="bg-white/5 rounded-xl p-6 shadow-lg text-white border border-white/6">
                  <h2 className="text-2xl font-bold mb-4">Projects</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projects && projects.length > 0 ? (
                      projects.map((p, i) => (
                        <div key={i} className="p-4 rounded-lg bg-white/6 border border-white/6">
                          <div className="h-40 mb-3 overflow-hidden rounded-md bg-black/20">
                            <img src={p.image} alt={p.Title} className="w-full h-full object-cover" />
                          </div>
                          <h3 className="font-semibold text-lg mb-1">{p.Title}</h3>
                          <p className="text-sm text-[#c9d8df] mb-3 line-clamp-3">{p.desc}</p>
                          {p.link && (
                            <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-block px-3 py-2 bg-[#ffb400] text-[#071828] rounded-md font-semibold">View Project</a>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-[#a9c0cc]">No projects available.</div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 rounded-xl p-6 shadow-lg text-white border border-white/6">
                  <h2 className="text-2xl font-bold mb-4">Send a Message</h2>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name"
                      className="w-full border border-white/10 bg-transparent text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7cd4ff]" required />

                    <input type="email" placeholder="Your Email"
                      className="w-full border border-white/10 bg-transparent text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7cd4ff]" required />

                    <textarea placeholder="Your Message" rows={6}
                      className="w-full border border-white/10 bg-transparent text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7cd4ff] resize-none" required />

                    <div className="flex gap-3">
                      <button type="submit"
                        className="flex-1 bg-[#ffb400] text-[#071828] font-semibold rounded-lg py-2 hover:opacity-95 transition">
                        Send Message
                      </button>
                      <button type="button" onClick={collapse} className="flex-1 border border-white/10 rounded-lg py-2">Close</button>
                    </div>
                  </form>
                </div>
              )
            ) : null}
          </div>
        </div>
      </div>
      {/* bottom book-like preview strip when modal is open but not expanded */}
      {projects && projects.length > 0 && !expanded && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-60 pointer-events-auto">
          <div className="flex items-center" aria-hidden>
            {projects.map((p, i) => (
              <button
                key={i}
                onClick={() => { setExpanded(true); document.documentElement.style.overflow = 'hidden'; }}
                className="-ml-6 first:ml-0 w-36 h-44 rounded-lg overflow-hidden border border-white/10 bg-black/20 shadow-lg transform transition-all hover:scale-105"
                style={{ zIndex: 100 + i, rotate: `${(i - Math.floor(projects.length/2)) * 4}deg` }}
                aria-label={`Open project preview ${p.Title}`}
              >
                <img src={p.image} alt={p.Title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
