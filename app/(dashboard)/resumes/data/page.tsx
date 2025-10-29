"use client";

import { useEffect, useState } from "react";
import Form from "@/resume/Form2"; // your form.tsx with photo section
import Preview from "@/resume/Preview2"; // your preview.tsx with download button
import { ResumeData } from "@/lib/types1";

export default function ResumePage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  // ✅ Load resume data from localStorage on mount
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

      // ✅ Empty structure for a fresh resume
      const emptyData: ResumeData = {
        name: "",
        title: "",
        jobtitle: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        skill: [],
        github: "",
        degree: "",
        summary: "",
        photo: "",
        education: [],
        experience: [],
        projects: [],
        skills: [],
        relevantCoursework: [],
        achievement: [],
        interests: [],
        languages: [],
      };

      setResumeData(emptyData);
    } catch (error) {
      console.error("❌ Failed to load resume:", error);
    }
  }, []);

  // ✅ Update state on form change
  const handleChange = (updatedData: ResumeData) => {
    setResumeData(updatedData);
  };

  // ✅ Save to localStorage
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
      <h1 className="text-3xl font-bold text-center mb-8">Professional Resume Builder</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Panel — Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
          <Form
            initialData={resumeData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isNew
          />
        </div>

        {/* Right Panel — Preview */}
        <div className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
          <Preview data={resumeData} />
        </div>
      </div>
    </div>
  );
}
