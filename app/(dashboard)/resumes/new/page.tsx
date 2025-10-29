"use client";

import { useState, useEffect } from "react";
import ResumePreview from "@/components/ResumePreview";
import ResumeForm from "@/components/ResumeForm";
import { ResumeData } from "@/lib/types";

// Empty initial resume
const emptyResumeData: ResumeData = {
  name: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
  summary: "",
  skills: [],
  experiences: [],
  education: [],
  languages: [],
  interests: [],
  projects: [],
};

export default function NewResumePage() {
  const [resumeData, setResumeData] = useState<ResumeData>(emptyResumeData);
  const [viewMode, setViewMode] = useState<"builder" | "preview">("builder");
  const [mounted, setMounted] = useState(false);

  // Only render content after client mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Your Resume</h1>

      {/* Builder / Preview Toggle */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setViewMode("builder")}
          className={`px-6 py-2 rounded-full font-semibold transition-colors ${
            viewMode === "builder"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          Resume Builder
        </button>
      </div>

      {/* Builder View */}
      {viewMode === "builder" && (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 space-y-4">
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
          </div>

          <div className="md:w-1/2">
            <ResumePreview resumeData={resumeData} />
          </div>
        </div>
      )}

    </div>
  );
}
