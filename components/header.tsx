"use client";

import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header
      className="
        fixed top-0 left-0 w-full z-50
        bg-white/10 
        backdrop-blur-xl 
        border-b border-white/20
        shadow-[0_4px_30px_rgba(0,0,0,0.2)]
        transition-all duration-500
        p-4 flex items-center justify-between
      "
    >
      {/* Left Side: Logo + Links */}
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="text-xl font-bold text-white">
          AI Resume Builder
        </Link>

        <nav className="hidden sm:flex items-center gap-4">
          <Link 
            href="/dashboard"
            className="text-white/80 hover:text-white font-medium transition"
          >
            Dashboard
          </Link>

          <Link 
            href="/resumes/new"
            className="text-white/80 hover:text-white font-medium transition"
          >
            New Resume
          </Link>

          <Link 
            href="/resumes"
            className="text-white/80 hover:text-white font-medium transition"
          >
            My Resumes
          </Link>
        </nav>
      </div>

      {/* Right Side: Sign Out */}
      <div>
        <SignOutButton>
          <button className="
            px-4 py-2 
            bg-red-500/80 
            text-white 
            rounded-lg 
            hover:bg-red-600 
            transition 
            font-medium
            backdrop-blur-sm
          ">
            Sign Out
          </button>
        </SignOutButton>
      </div>
    </header>
  );
}
