"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function TemplatePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = document.body.scrollHeight);

   
    interface Star {
      x: number;
      y: number;
      size: number;
      speed: number;
      alpha: number;
    }

    const stars: Star[] = [];
    const count = 120;

    // Create stars
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 1 + 0.2,
        alpha: Math.random() * 0.8 + 0.2,
      });
    }

    let animationFrame: number;

    const draw = () => {
      ctx.fillStyle = "rgba(5, 8, 20, 0.4)";
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        s.y += s.speed;
        if (s.y > h) s.y = -5;

        s.x += Math.sin(s.y / 50) * 0.3;
      }

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = document.body.scrollHeight;
    };
    const handleScroll = () => {
      const newHeight = document.body.scrollHeight;
      if (newHeight !== h) {
        h = canvas.height = newHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const templates = [
    { id: 1, img: "/image/template1.png", href: "/resumes/resume", ats: 92 },
    { id: 2, img: "/image/template2.png", href: "/resumes/[id]", ats: 88 },
    { id: 3, img: "/image/template3.png", href: "/resumes/new", ats: 85 },
    { id: 4, img: "/image/template4.png", href: "/resumes/data", ats: 90 },
    { id: 5, img: "/image/template5.png", href: "/resumes/ats", ats: 80 },
    { id: 6, img: "/image/template6.jpg", href: "/resumes/[id]", ats: 95 },
  ];

  return (
    <div className="relative w-screen min-h-screen overflow-auto flex items-center justify-center bg-[#0b0f19] text-white">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center py-16 px-4">
        <h1 className="text-5xl font-extrabold mb-12 text-indigo-300 tracking-wide drop-shadow-[0_0_10px_rgba(99,102,241,0.6)]">
          Choose Your Resume Template
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {templates.map((tpl) => (
            <FlipCard key={tpl.id} img={tpl.img} href={tpl.href} ats={tpl.ats} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FlipCard({
  img,
  href,
  ats,
}: {
  img: string;
  href: string;
  ats: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`relative w-72 h-[420px] [transform-style:preserve-3d] transition-transform duration-700 cursor-pointer rounded-2xl shadow-[0_0_25px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] ${
        flipped ? "[transform:rotateY(180deg)]" : ""
      }`}
      onClick={() => setFlipped(!flipped)}
    >

      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white text-center text-lg font-semibold [backface-visibility:hidden]">
        <p>Click to Preview</p>
        <span className="mt-3 text-4xl">✨</span>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-between bg-[#101623] rounded-2xl border border-indigo-700 overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
        <div className="relative w-full flex-1 flex items-center justify-center">
          <Image
            src={img}
            alt="Template Preview"
            width={230}
            height={300}
            className="rounded-xl object-cover border border-indigo-600 shadow-md hover:scale-105 transition-transform duration-300"
          />

          <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
            ATS: {ats}%
          </div>
        </div>

        <a
          href={href}
          className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-500 hover:to-indigo-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105"
        >
          Use This Template
        </a>
      </div>
    </div>
  );
}
