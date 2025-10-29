"use client";

import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

export default function Sidebar() {
  return (
    <aside className="w-60 h-screen bg-gray-100 border-r p-4 flex flex-col justify-between">
      {/* Top links */}
      <div className="flex flex-col gap-4">
        <Link 
          href="/dashboard" 
          className="block px-3 py-2 rounded text-gray-800 hover:bg-gray-200 hover:text-black font-medium"
        >
          🏠 Dashboard
        </Link>
        <Link 
          href="/resumes/new" 
          className="block px-3 py-2 rounded text-gray-800 hover:bg-gray-200 hover:text-black font-medium"
        >
          ➕ New Resume
        </Link>
        <Link 
          href="/resumes" 
          className="block px-3 py-2 rounded text-gray-800 hover:bg-gray-200 hover:text-black font-medium"
        >
          📄 My Resumes
        </Link>
      </div>

      {/* Footer / Sign out button */}
      <div className="border-t pt-4">
        <SignOutButton>
          <button className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
            🚪 Sign Out
          </button>
        </SignOutButton>
      </div>
    </aside>
  );
}
