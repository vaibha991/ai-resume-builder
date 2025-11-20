"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";

const Header = () => {
  const { signOut } = useClerk();
  return (
    <header
      className="
        fixed top-0 left-0 w-full z-50
        bg-transparent
        backdrop-blur-sm
        border-b border-white/5
        transition-all duration-500
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <div className="text-white font-extrabold text-2xl tracking-wide">
          ResuCraft
        </div>

        <nav className="flex items-center gap-6 text-white font-medium">
          <Link href="/" className="hover:text-indigo-300 transition">
            Home
          </Link>

          <Link href="/feature" className="hover:text-indigo-300 transition">
            Features
          </Link>

          <Link href="/template" className="hover:text-indigo-300 transition">
            Templates
          </Link>

          <button
            onClick={() => signOut({ redirectUrl: "/sign-in" })}
            className="ml-4 border border-white/30 hover:border-white text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Sign 
          </button>


        </nav>

      </div>
    </header>
  );
};
export default function DashboardPage() {
  const [hideVideo, setHideVideo] = useState(false);

 
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, []);

  return (
    <div className="min-h-screen text-white font-sans overflow-hidden bg-black">
      <Header />

      <section className="relative w-full h-[100vh] flex items-center justify-center">
        <video
          autoPlay
          muted
          playsInline
          loop
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hideVideo ? "opacity-0" : "opacity-100"
            }`}
        >
          <source src="/videos/ai-resume.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />

        <div className="relative z-20 max-w-4xl mx-auto text-center px-6">
          <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 leading-tight">
            AI-Powered Resume Builder
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl mb-8">
            Transform your career with resumes crafted by AI. Fast,
            professional, and fully optimized for ATS.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="#main-content"
              onClick={() => (document.body.style.overflow = "auto")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg transition transform hover:scale-105"
            >
              Start Free Resume
            </Link>

            <Link
              href="/feature"
              className="bg-white/10 border border-white/20 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-2xl transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section
        id="main-content"
        className="relative pt-16 pb-16 overflow-hidden bg-black"
      >
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Build Your Resume in Minutes
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Craft job-winning resumes using AI-powered suggestions,
            templates, and professional formatting.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/resumes/ats"
              onClick={() => setHideVideo(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-xl transition"
            >
              Create Resume
            </Link>

            <Link
              href="/template"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-8 py-4 rounded-xl transition"
            >
              View Templates
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
