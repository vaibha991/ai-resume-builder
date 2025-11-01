"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ResumeData } from "@/lib/types2";

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
  }
};

export default function ResumeForm({ initialData, onChange, onSubmit }: FormProps) {
  const [form, setForm] = useState<ResumeData>(initialData ?? emptyResume);

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (key: keyof ResumeData, value: any) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    onChange(updated);
  };

  const handleArrayChange = (
    section: keyof ResumeData,
    index: number,
    field: string,
    value: string
  ) => {
    const updatedSection = [...(form[section] as any[])];
    updatedSection[index][field] = value;
    const updated = { ...form, [section]: updatedSection };
    setForm(updated);
    onChange(updated);
  };

  const addArrayItem = (section: keyof ResumeData, empty: any) => {
    const updated = { ...form, [section]: [...(form[section] as any[]), empty] };
    setForm(updated);
    onChange(updated);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-3xl mx-auto space-y-6"
      style={{ fontFamily: "Calibri, Lato, sans-serif" }}
    >

      {/* Basic Info */}
      <div>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Basic Info</h2>

        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="Full Name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
          <Input placeholder="Email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
          <Input placeholder="Phone" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
          <Input placeholder="LinkedIn URL" value={form.linkedin} onChange={(e) => handleChange("linkedin", e.target.value)} />
        </div>
      </div>

      {/* Summary */}
      <div>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Profile Summary</h2>
        <Textarea
          placeholder="Short professional summary"
          value={form.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
        />
      </div>

      {/* Education */}
      <div>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Education</h2>
        {form.education.map((edu, i) => (
          <div key={i} className="border p-3 rounded mb-3 space-y-2">
            <Input placeholder="Institute Name" value={edu.university}
              onChange={(e) => handleArrayChange("education", i, "university", e.target.value)} />
            <Input placeholder="Degree" value={edu.degree}
              onChange={(e) => handleArrayChange("education", i, "degree", e.target.value)} />
            <Input placeholder="Location" value={edu.location || ""}
              onChange={(e) => handleArrayChange("education", i, "location", e.target.value)} />
            <Input placeholder="Duration" value={edu.date}
              onChange={(e) => handleArrayChange("education", i, "date", e.target.value)} />
            <Input placeholder="GPA" value={edu.gpa || ""}
              onChange={(e) => handleArrayChange("education", i, "gpa", e.target.value)} />
          </div>
        ))}
        <Button onClick={() => addArrayItem("education", { university: "", degree: "", location: "", date: "", gpa: "" })}>
          + Add Education
        </Button>
      </div>

      {/* Skills Summary */}
      <div>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Skills Summary</h2>
        <h3 className="text-lg font-medium mb-1">Languages</h3>
        <Textarea placeholder="Languages, Frameworks, Tools, Platforms"
          value={form.skills.languages}
          onChange={(e) => handleChange("skills", { ...form.skills, languages: e.target.value })}
        />

        <h3 className="text-lg font-medium mt-3 mb-1">Frameworks</h3>
        <Textarea placeholder="Teamwork, Communication, Leadership"
          value={form.skills.frameworks}
          onChange={(e) => handleChange("skills", { ...form.skills, frameworks: e.target.value })}
        />

        <h3 className="text-lg font-medium mt-3 mb-1">Tools</h3>
        <Textarea placeholder="Teamwork, Communication, Leadership"
          value={form.skills.tools}
          onChange={(e) => handleChange("skills", { ...form.skills, tools: e.target.value })}
        />

        <h3 className="text-lg font-medium mt-3 mb-1">Platforms</h3>
        <Textarea placeholder="Teamwork, Communication, Leadership"
          value={form.skills.platforms}
          onChange={(e) => handleChange("skills", { ...form.skills, platforms: e.target.value })}
        />

        <h3 className="text-lg font-medium mt-3 mb-1">Soft Skills</h3>
        <Textarea placeholder="Teamwork, Communication, Leadership"
          value={form.skills.soft}
          onChange={(e) => handleChange("skills", { ...form.skills, soft: e.target.value })}
        />
      </div>

      
      {/* Work Experience */}
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
            <Textarea placeholder="Responsibilities / Achievements"
              value={exp.description}
              onChange={(e) => handleArrayChange("experience", i, "description", e.target.value)}
            />
          </div>
        ))}
        <Button onClick={() =>
          addArrayItem("experience", { position: "", company: "", location: "", duration: "", description: "" })
        }>
          + Add Experience
        </Button>
      </div>

      {/* Projects */}
      <div>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Projects</h2>
        {form.projects.map((proj, i) => (
          <div key={i} className="border p-3 rounded mb-3 space-y-2">
            <Input placeholder="Project Title" value={proj.name}
              onChange={(e) => handleArrayChange("projects", i, "name", e.target.value)} />
            <Input placeholder="Duration" value={proj.date}
              onChange={(e) => handleArrayChange("projects", i, "date", e.target.value)} />
            <Textarea placeholder="Project Details"
              value={proj.description}
              onChange={(e) => handleArrayChange("projects", i, "description", e.target.value)}
            />
          </div>
        ))}
        <Button onClick={() => addArrayItem("projects", { name: "", date: "", description: "" })}>
          + Add Project
        </Button>
      </div>

      {/* Certificates */}
      <div>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Certificates</h2>
        {form.certificates?.map((cert, i) => (
          <div key={i} className="border p-3 rounded mb-3">
            <Input placeholder="Certificate Title" value={cert.title}
              onChange={(e) => handleArrayChange("certificates", i, "title", e.target.value)} />
            <Input placeholder="Issued Date" value={cert.date}
              onChange={(e) => handleArrayChange("certificates", i, "date", e.target.value)} />
          </div>
        ))}
        <Button onClick={() => addArrayItem("certificates", { title: "", date: "" })}>
          + Add Certificate
        </Button>
      </div>

      {/* Submit */}
      <Button onClick={() => onSubmit(form)} className="w-full bg-blue-600 text-white">
        Save Resume
      </Button>
    </div>
  );
}
