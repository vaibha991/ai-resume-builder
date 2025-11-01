"use client";

import { useEffect, useState } from "react";
import Form from "@/resume/Form3";
import Preview from "@/resume/Preview3";
import { ResumeData } from "@/lib/types2";

export default function ResumePage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  useEffect(() => {
    try {
      const storedResumes = localStorage.getItem("resumes");

      if (storedResumes) {
        const parsed = JSON.parse(storedResumes);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setResumeData(parsed[0]);
          return;
        }
      }

      // Default empty resume
      const emptyData: ResumeData = {
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        portfolio: "",
        skillsSummary: "",
        summary: "",
        location: "",

        education: [],
        experience: [],
        projects: [],
        certificates: [],

        skills: {
          technical: "",
          soft: "",
          frameworks: "",
          languages: "",
          platforms: "",
          tools: "",
        },


      };

      setResumeData(emptyData);
    } catch (error) {
      console.error("❌ Failed to load resume:", error);
    }
  }, []);

  const handleChange = (updatedData: ResumeData) => {
    setResumeData(updatedData);
  };

  const handleSubmit = (data: ResumeData) => {
    try {
      const storedResumes = localStorage.getItem("resumes");
      const resumes = storedResumes ? JSON.parse(storedResumes) : [];
      const updatedResumes = [data, ...resumes];
      localStorage.setItem("resumes", JSON.stringify(updatedResumes));
      alert("✅ Resume saved successfully!");
    } catch (error) {
      console.error("Error saving resume:", error);
    }
  };

  if (!resumeData)
    return (
      <p className="text-center mt-10 text-gray-600">Loading your resume...</p>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Professional Resume Builder
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
          <Form initialData={resumeData} onChange={handleChange} onSubmit={handleSubmit} />
        </div>

        {/* Preview */}
        <div className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] border">
          <Preview data={resumeData} />
        </div>
      </div>
    </div>
  );
}
