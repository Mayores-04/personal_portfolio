"use client";

import { useEffect, useRef } from "react";

type ParticleType = {
  life: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  update: () => void;
};

export default function BubbleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  const ctx = canvas.getContext("2d")!;

  let width = (canvas!.width = window.innerWidth);
  let height = (canvas!.height = window.innerHeight);
    const particles: ParticleType[] = [];
    let cursor = { x: width / 2, y: height / 2 };
    const fillColor = "#e6f1f7";
    const strokeColor = "#3a92c5";

    function resize() {
      width = (canvas!.width = window.innerWidth);
      height = (canvas!.height = window.innerHeight);
    }

    class Particle implements ParticleType {
      life: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      constructor(x: number, y: number) {
        this.life = 100;
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 1.0;
        this.vy = (Math.random() - 1) * 1.0;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        const scale = (100 - this.life) / 100;
        ctx.fillStyle = fillColor;
        ctx.strokeStyle = strokeColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 6 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    }

    function addParticle(x: number, y: number) {
      particles.push(new Particle(x, y));
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.life <= 0) particles.splice(i, 1);
      }
      requestAnimationFrame(animate);
    }

    const onMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      addParticle(cursor.x, cursor.y);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      id="bubbleCanvas"
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-40"
    />
  );
}
