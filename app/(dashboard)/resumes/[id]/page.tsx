"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Form from "@/resume/Form";
import Preview from "@/resume/Preview";
import { ResumeData } from "@/lib/types1";

export default function ResumePage() {
  const { id } = useParams();
  const resumeId = Array.isArray(id) ? id[0] : id; // ensure string

  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!resumeId) return;

    const storedResumes = JSON.parse(localStorage.getItem("resumes") || "{}");
    const data = storedResumes[resumeId];

    // If no data exists, initialize empty resume
    if (data) {
      setResumeData(data);
    } else {
      setResumeData({
        name: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        summary: "",
        skills: [],
        experience: [],
        education: [],
        projects: [],
        interests: [],
        achievement: [],
        languages: [],
      });
    }
  }, [resumeId]);

  if (!mounted) return <p className="text-center mt-20">Loading...</p>;
  if (!resumeData) return <p className="text-center mt-20">Resume not found.</p>;

  const handleSave = (updatedData: ResumeData) => {
    setResumeData(updatedData);
    if (!resumeId) return;

    const storedResumes = JSON.parse(localStorage.getItem("resumes") || "{}");
    storedResumes[resumeId] = updatedData;
    localStorage.setItem("resumes", JSON.stringify(storedResumes));
    alert("Resume saved successfully!");
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Resume</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 space-y-4">
          <Form
            initialData={resumeData}
            onChange={setResumeData}
            onSubmit={handleSave}
            isNew={false}
          />
        </div>

        <div className="md:w-1/2">
          <Preview data={resumeData} />
        </div>
      </div>
    </div>
  );
}
