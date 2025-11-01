"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ResumeData, Skill, Project, Experience, Education } from "@/lib/types1";

interface FormProps {
  initialData: ResumeData;
  onChange: (updatedData: ResumeData) => void;
  onSubmit: (data: ResumeData) => void;
  isNew?: boolean;
}

export default function Form({ initialData, onChange, onSubmit, isNew }: FormProps) {
  const [formData, setFormData] = useState<ResumeData>(initialData);

  const handleChange = (field: keyof ResumeData, value: any) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onChange(updatedData);
  };

  const handleArrayChange = <T,>(field: keyof ResumeData, index: number, key: keyof T, value: any) => {
    const updatedArray = [...(formData[field] as T[])];
    (updatedArray[index] as any)[key] = value;
    handleChange(field, updatedArray);
  };

  const handleAddItem = <T,>(field: keyof ResumeData, emptyItem: T) => {
    const updatedArray = [...(formData[field] as T[]), emptyItem];
    handleChange(field, updatedArray);
  };

  const handleRemoveItem = (field: keyof ResumeData, index: number) => {
    const updatedArray = (formData[field] as any[]).filter((_, i) => i !== index);
    handleChange(field, updatedArray);
  };

  const handleArrayFieldChange = (field: keyof ResumeData, index: number, value: string) => {
    const updatedArray = [...(formData[field] as string[])];
    updatedArray[index] = value;
    handleChange(field, updatedArray);
  };

  const handleAddArrayItem = (field: keyof ResumeData) => {
    const updatedArray = [...(formData[field] as string[]), ""];
    handleChange(field, updatedArray);
  };

  const handleRemoveArrayItem = (field: keyof ResumeData, index: number) => {
    const updatedArray = (formData[field] as string[]).filter((_, i) => i !== index);
    handleChange(field, updatedArray);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div>
        <h2 className="text-xl font-bold mb-2">Basic Information</h2>
        <Input placeholder="Name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
        <Input placeholder="Job-Title" value={formData.jobtitle} onChange={(e) => handleChange("jobtitle", e.target.value)} />
        <Input placeholder="Email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
        <Input placeholder="Phone" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
        <Input placeholder="Location" value={formData.location} onChange={(e) => handleChange("location", e.target.value)} />
        <Input placeholder="LinkedIn" value={formData.linkedin} onChange={(e) => handleChange("linkedin", e.target.value)} />
        <Input placeholder="Title" value={formData.title} onChange={(e) => handleChange("title", e.target.value)} />
        <Input placeholder="Degree" value={formData.degree} onChange={(e) => handleChange("degree", e.target.value)} />
        <Input placeholder="GitHub" value={formData.github} onChange={(e) => handleChange("github", e.target.value)} />
        <Textarea placeholder="Summary" value={formData.summary} onChange={(e) => handleChange("summary", e.target.value)} />
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-xl font-bold mb-2">Skills</h2>
        {formData.skills.map((skill, i) => (
          <div key={i} className="space-y-2">
            <Input placeholder="Languages" value={skill.languages} onChange={(e) => handleArrayChange<Skill>("skills", i, "languages", e.target.value)} />
            <Input placeholder="Frameworks" value={skill.frameworks} onChange={(e) => handleArrayChange<Skill>("skills", i, "frameworks", e.target.value)} />
            <Input placeholder="Cloud/Database" value={skill.cloud} onChange={(e) => handleArrayChange<Skill>("skills", i, "cloud", e.target.value)} />
            <Button type="button" variant="destructive" onClick={() => handleRemoveItem("skills", i)}>Remove</Button>
          </div>
        ))}
        <Button type="button" onClick={() => handleAddItem<Skill>("skills", { languages: "", frameworks: "", cloud: "", database: "", programming: "", operating: "", software: "" })}>
          Add Skill
        </Button>
      </div>

      {/* Experience */}
      <div>
        <h2 className="text-xl font-bold mb-2">Experience</h2>
        {formData.experience.map((exp, i) => (
          <div key={i} className="space-y-2">
            <Input placeholder="Company" value={exp.company} onChange={(e) => handleArrayChange<Experience>("experience", i, "company", e.target.value)} />
            <Input placeholder="Position" value={exp.position} onChange={(e) => handleArrayChange<Experience>("experience", i, "position", e.target.value)} />
            <Input placeholder="Duration" value={exp.duration} onChange={(e) => handleArrayChange<Experience>("experience", i, "duration", e.target.value)} />
            <Textarea placeholder="Description" value={exp.description} onChange={(e) => handleArrayChange<Experience>("experience", i, "description", e.target.value)} />
            <Button type="button" variant="destructive" onClick={() => handleRemoveItem("experience", i)}>Remove</Button>
          </div>
        ))}
        <Button type="button" onClick={() => handleAddItem<Experience>("experience", { company: "", position: "", duration: "", description: "", location:""})}>
          Add Experience
        </Button>
      </div>

      {/* Education */}
      <div>
        <h2 className="text-xl font-bold mb-2">Education</h2>
        {formData.education.map((edu, i) => (
          <div key={i} className="space-y-2">
            <Input placeholder="University" value={edu.university} onChange={(e) => handleArrayChange<Education>("education", i, "university", e.target.value)} />
            <Input placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange<Education>("education", i, "degree", e.target.value)} />
            <Input placeholder="Emphasis" value={edu.emphasis} onChange={(e) => handleArrayChange<Education>("education", i, "emphasis", e.target.value)} />
            <Input placeholder="Location" value={edu.location} onChange={(e) => handleArrayChange<Education>("education", i, "location", e.target.value)} />
            <Input placeholder="Field of Study" value={edu.fieldOfStudy} onChange={(e) => handleArrayChange<Education>("education", i, "fieldOfStudy", e.target.value)} />
            <Input placeholder="Date" value={edu.date} onChange={(e) => handleArrayChange<Education>("education", i, "date", e.target.value)} />
            <Input placeholder="GPA" value={edu.gpa} onChange={(e) => handleArrayChange<Education>("education", i, "gpa", e.target.value)} />
            <Button type="button" variant="destructive" onClick={() => handleRemoveItem("education", i)}>Remove</Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => handleAddItem<Education>("education", { university: "", degree: "", emphasis: "", location: "", fieldOfStudy: "", date: "", gpa: "" })}
        >
          Add Education
        </Button>
      </div>

      {/* Projects */}
      <div>
        <h2 className="text-xl font-bold mb-2">Projects</h2>
        {formData.projects.map((project, i) => (
          <div key={i} className="space-y-2">
            <Input placeholder="Project Name" value={project.name} onChange={(e) => handleArrayChange<Project>("projects", i, "name", e.target.value)} />
            <Textarea placeholder="Description" value={project.description} onChange={(e) => handleArrayChange<Project>("projects", i, "description", e.target.value)} />
            <Input placeholder="Tech Stack" value={project.tech} onChange={(e) => handleArrayChange<Project>("projects", i, "tech", e.target.value)} />
            <Button type="button" variant="destructive" onClick={() => handleRemoveItem("projects", i)}>Remove</Button>
          </div>
        ))}
        <Button type="button" onClick={() => handleAddItem<Project>("projects", { name: "", description: "", tech: "" })}>
          Add Project
        </Button>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-xl font-bold mb-2">Achievements</h2>
        {formData.achievement.map((ach, i) => (
          <div key={i} className="flex items-center space-x-2">
            <Input placeholder={`Achievement ${i + 1}`} value={ach} onChange={(e) => handleArrayFieldChange("achievement", i, e.target.value)} />
            <Button type="button" variant="destructive" onClick={() => handleRemoveArrayItem("achievement", i)}>Remove</Button>
          </div>
        ))}
        <Button type="button" onClick={() => handleAddArrayItem("achievement")}>Add Achievement</Button>
      </div>

      <Button type="submit">{isNew ? "Create Resume" : "Update Resume"}</Button>
    </form>
  );
}
