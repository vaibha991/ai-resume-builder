"use client";

import { useEffect, useState } from "react";
import Form from "@/resume/Form1";
import Preview from "@/resume/Preview1";
import { ResumeData } from "@/lib/types1";

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

      // ✅ Empty resume initialized with all required fields
      const emptyData: ResumeData = {
        name: "",
        jobtitle: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        degree: "",
        title: "",
        github: "",
        summary: "",
        education: [],
        experience: [],
        projects: [],
        skills: [],
        relevantCoursework: [],
        achievement: [],
        interests: [],       // ✅ added
        languages: [],       // ✅ added
      };
      setResumeData(emptyData);
    } catch (error) {
      console.error("Failed to load resume:", error);
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
      <h1 className="text-3xl font-bold text-center mb-8">AI Resume Builder</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left - Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <Form
            initialData={resumeData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isNew
          />
        </div>

        {/* Right - Preview */}
        <div className="bg-white p-6 rounded-lg shadow overflow-y-auto max-h-[90vh]">
          <Preview data={resumeData} />
        </div>
      </div>
    </div>
  );
}
