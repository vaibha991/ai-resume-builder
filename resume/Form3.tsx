"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  ResumeData,
  Education,
  Experience,
  Project,
  Certificate,
  Skills,
} from "@/lib/types2";

interface FormProps {
  initialData?: ResumeData;
  onChange: (data: ResumeData) => void;
  onSubmit: (data: ResumeData) => void;
}

const emptyResume: ResumeData = {
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

export default function ResumeForm({ initialData, onChange, onSubmit }: FormProps) {
  const [form, setForm] = useState<ResumeData>(initialData ?? emptyResume);

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  // -----------------------
  // BASIC FIELD CHANGE
  // -----------------------
  const handleChange = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    onChange(updated);
  };

  // -----------------------
  // SAFE ARRAY FIELD CHANGE
  // -----------------------
  // /C:/Users/ADMIN/Desktop/vs/New folder (3)/resume/ai-resume-builder/resume/Form3.tsx

// ... (handleArrayChange generic definitions are correct)

// -----------------------
// SAFE ARRAY FIELD CHANGE
// -----------------------
const handleArrayChange = <
  K extends keyof ResumeData,
  T extends Record<string, any> & (ResumeData[K] extends Array<infer U> ? U : never)
>(
  section: K,
  index: number,
  field: keyof T,
  value: any
) => {
  // FIX: Cast form[section] to 'unknown' first before casting to T[]
  const current = Array.isArray(form[section]) ? (form[section] as unknown as T[]) : []; // <-- FIX LINE 81

  const updatedArray = [...current];
  updatedArray[index] = { ...updatedArray[index], [field]: value }; 

  const updated = { ...form, [section]: updatedArray };
  setForm(updated);
  onChange(updated);
};

// ... (Other functions)

// -----------------------
// ADD NEW ITEM
// -----------------------
const addArrayItem = <
  K extends keyof ResumeData,
  T extends Record<string, any> & (ResumeData[K] extends Array<infer U> ? U : never)
>(
  section: K,
  emptyItem: T
) => {
  // FIX: Cast form[section] to 'unknown' first before casting to T[]
  const current = Array.isArray(form[section]) ? (form[section] as unknown as T[]) : []; // <-- FIX LINE 103
  const updatedArray = [...current, emptyItem];

  const updated = { ...form, [section]: updatedArray };
  setForm(updated);
  onChange(updated);
};
  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-3xl mx-auto space-y-6"
      style={{ fontFamily: "Calibri, Lato, sans-serif" }}
    >

      {/* BASIC INFO */}
      <div>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Basic Info</h2>

        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="Full Name" value={form.name}
            onChange={(e) => handleChange("name", e.target.value)} />

          <Input placeholder="Email" value={form.email}
            onChange={(e) => handleChange("email", e.target.value)} />

          <Input placeholder="Phone" value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)} />

          <Input placeholder="LinkedIn URL" value={form.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)} />
        </div>
      </div>

      {/* EDUCATION */}
      <div>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Education</h2>

        {form.education.map((edu, i) => (
          <div key={i} className="border p-3 rounded mb-3 space-y-2">
            <Input placeholder="Institute Name" value={edu.university}
              onChange={(e) => handleArrayChange("education", i, "university", e.target.value)} />

            <Input placeholder="Degree" value={edu.degree}
              onChange={(e) => handleArrayChange("education", i, "degree", e.target.value)} />

            <Input placeholder="Location" value={edu.location}
              onChange={(e) => handleArrayChange("education", i, "location", e.target.value)} />

            <Input placeholder="Duration" value={edu.date}
              onChange={(e) => handleArrayChange("education", i, "date", e.target.value)} />

            <Input placeholder="GPA" value={edu.gpa}
              onChange={(e) => handleArrayChange("education", i, "gpa", e.target.value)} />
          </div>
        ))}

        <Button
          onClick={() =>
            addArrayItem("education", {
              university: "",
              degree: "",
              location: "",
              date: "",
              gpa: "",
              emphasis: "",
            })
          }
        >
          + Add Education
        </Button>
      </div>

      {/* SKILLS SUMMARY */}
      <div>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Skills Summary</h2>

        <Textarea placeholder="Languages" value={form.skills.languages}
          onChange={(e) => handleChange("skills", { ...form.skills, languages: e.target.value })} />

        <Textarea placeholder="Frameworks" value={form.skills.frameworks}
          onChange={(e) => handleChange("skills", { ...form.skills, frameworks: e.target.value })} />

        <Textarea placeholder="Tools" value={form.skills.tools}
          onChange={(e) => handleChange("skills", { ...form.skills, tools: e.target.value })} />

        <Textarea placeholder="Platforms" value={form.skills.platforms}
          onChange={(e) => handleChange("skills", { ...form.skills, platforms: e.target.value })} />

        <Textarea placeholder="Soft Skills" value={form.skills.soft}
          onChange={(e) => handleChange("skills", { ...form.skills, soft: e.target.value })} />
      </div>

      {/* EXPERIENCE */}
      <div>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Work Experience</h2>

        {form.experience.map((exp, i) => (
          <div key={i} className="border p-3 rounded mb-3 space-y-2">
            <Input placeholder="Position" value={exp.position}
              onChange={(e) => handleArrayChange("experience", i, "position", e.target.value)} />

            <Input placeholder="Company" value={exp.company}
              onChange={(e) => handleArrayChange("experience", i, "company", e.target.value)} />

            <Input placeholder="Location" value={exp.location}
              onChange={(e) => handleArrayChange("experience", i, "location", e.target.value)} />

            <Input placeholder="Duration" value={exp.duration}
              onChange={(e) => handleArrayChange("experience", i, "duration", e.target.value)} />

            <Textarea placeholder="Responsibilities" value={exp.description}
              onChange={(e) => handleArrayChange("experience", i, "description", e.target.value)} />
          </div>
        ))}

        <Button
          onClick={() =>
            addArrayItem("experience", {
              position: "",
              company: "",
              location: "",
              duration: "",
              description: "",
              role: "",
              startDate: "",
              endDate: "",
            })
          }
        >
          + Add Experience
        </Button>
      </div>

      {/* PROJECTS */}
      <div>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Projects</h2>

        {form.projects.map((proj, i) => (
          <div key={i} className="border p-3 rounded mb-3 space-y-2">
            <Input placeholder="Project Name" value={proj.name}
              onChange={(e) => handleArrayChange("projects", i, "name", e.target.value)} />

            <Input placeholder="Tech Stack" value={proj.tech}
              onChange={(e) => handleArrayChange("projects", i, "tech", e.target.value)} />

            <Textarea placeholder="Project Description" value={proj.description}
              onChange={(e) => handleArrayChange("projects", i, "description", e.target.value)} />
          </div>
        ))}

        <Button
          onClick={() =>
            addArrayItem("projects", {
              name: "",
              tech: "",
              description: "",
              duration: "",
              position: "",
              date: "",
              title: "",
            })
          }
        >
          + Add Project
        </Button>
      </div>

      {/* CERTIFICATES */}
      <div>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Certificates</h2>

        {form.certificates.map((cert, i) => (
          <div key={i} className="border p-3 rounded mb-3 space-y-2">
            <Input placeholder="Certificate Title" value={cert.title}
              onChange={(e) => handleArrayChange("certificates", i, "title", e.target.value)} />

            <Input placeholder="Issuer" value={cert.issuer}
              onChange={(e) => handleArrayChange("certificates", i, "issuer", e.target.value)} />

            <Input placeholder="Issue Date" value={cert.date}
              onChange={(e) => handleArrayChange("certificates", i, "date", e.target.value)} />

            <Textarea placeholder="About Certificate" value={cert.description}
              onChange={(e) => handleArrayChange("certificates", i, "description", e.target.value)} />
          </div>
        ))}

        <Button
          onClick={() =>
            addArrayItem("certificates", {
              title: "",
              issuer: "",
              date: "",
              description: "",
            })
          }
        >
          + Add Certificate
        </Button>
      </div>

      {/* SUBMIT */}
      <Button onClick={() => onSubmit(form)} className="w-full bg-blue-600 text-white">
        Save Resume
      </Button>
    </div>
  );
}


