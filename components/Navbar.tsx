"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-black text-white">
      <Link href="/" className="text-xl font-bold">
        AI Resume Builder
      </Link>
      <div className="flex gap-4">
        <Link href="/(dashboard)/dashboard">Dashboard</Link>
        <Link href="/(auth)/sign-in">Login</Link>
        <Link href="/(auth)/sign-up">Sign Up</Link>
      </div>
    </nav>
  );
}
