"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ResumeData, Skill, Project, Experience, Education } from "@/lib/types1";
import { improveText } from "@/lib/ai";

interface FormProps {
  initialData: ResumeData;
  onChange: (updatedData: ResumeData) => void;
  onSubmit: (data: ResumeData) => void;
  isNew?: boolean;
}

const Form: React.FC<FormProps> = ({ initialData, onChange, onSubmit, isNew = false }) => {
  const [formData, setFormData] = useState<ResumeData>(initialData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  // --- Handle text inputs ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    onChange(updated);
  };

  // --- Handle array fields like education, experience, etc. ---
  const handleArrayChange = (
    section: keyof ResumeData,
    index: number,
    field: string,
    value: string
  ) => {
    if (Array.isArray(formData[section])) {
      const updatedArray = [...(formData[section] as any[])];
      updatedArray[index] = { ...updatedArray[index], [field]: value };
      const updated = { ...formData, [section]: updatedArray as any };
      setFormData(updated);
      onChange(updated);
    }
  };

  // --- Add new section item ---
  const addNewField = (section: keyof ResumeData, emptyTemplate: any) => {
    if (Array.isArray(formData[section])) {
      const updated = {
        ...formData,
        [section]: [...(formData[section] as any[]), emptyTemplate],
      };
      setFormData(updated);
      onChange(updated);
    }
  };

  // --- Submit form ---
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    },
    [formData, onSubmit]
  );

  // --- Empty templates ---
  const emptyEducation: Education = {
    university: "",
    emphasis: "",
    degree: "",
    fieldOfStudy: "",
    location: "",
    date: "",
    gpa: "",
  };

  const emptyExperience: Experience = {
    company: "",
    position: "",
    duration: "",
    description: "",
  };

  const emptyProject: Project = { name: "", description: "", tech: "" };

  const emptySkill: Skill = {
    programming: "",
    operating: "",
    database: "",
    software: "",
    Frameworks: "",
    Cloud: "",
    Languages: "",
  };

  // --- Improve Summary with AI ---
  const handleImproveSummary = async () => {
    if (!formData.summary) return;
    try {
      setLoading(true);
      const improved = await improveText(formData.summary, "summary");
      const updated = { ...formData, summary: improved };
      setFormData(updated);
      onChange(updated);
    } catch (error) {
      console.error("AI improvement failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white rounded-xl shadow max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">📝 Resume Builder</h2>

      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Basic Info</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
          <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <Input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
          <Input name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} />
          <Input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
          <Input name="linkedin" placeholder="LinkedIn URL" value={formData.linkedin} onChange={handleChange} />
          <Input name="github" placeholder="GitHub URL" value={formData.github} onChange={handleChange} />
        </div>
      </div>

      {/* Professional Summary */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Professional Summary</h3>
        <Textarea
          name="summary"
          placeholder="Write a brief summary about yourself..."
          value={formData.summary || ""}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 border rounded"
        />
        <Button
          type="button"
          onClick={handleImproveSummary}
          disabled={loading}
          className="bg-blue-600 text-white mt-2"
        >
          {loading ? "Improving..." : "Improve with AI"}
        </Button>
      </div>

      {/* Education */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="space-y-2 border p-3 rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="University"
                value={edu.university}
                onChange={(e) =>
                  handleArrayChange("education", index, "university", e.target.value)
                }
              />
              <Input
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) =>
                  handleArrayChange("education", index, "degree", e.target.value)
                }
              />
              <Input
                placeholder="Field of Study"
                value={edu.fieldOfStudy}
                onChange={(e) =>
                  handleArrayChange("education", index, "fieldOfStudy", e.target.value)
                }
              />
              <Input
                placeholder="Location"
                value={edu.location}
                onChange={(e) =>
                  handleArrayChange("education", index, "location", e.target.value)
                }
              />
              <Input
                placeholder="Date"
                value={edu.date}
                onChange={(e) =>
                  handleArrayChange("education", index, "date", e.target.value)
                }
              />
              <Input
                placeholder="GPA (Optional)"
                value={edu.gpa}
                onChange={(e) =>
                  handleArrayChange("education", index, "gpa", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <Button type="button" onClick={() => addNewField("education", emptyEducation)}>
          + Add Education
        </Button>
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Experience</h3>
        {formData.experience.map((exp, index) => (
          <div key={index} className="space-y-2 border p-3 rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="Company"
                value={exp.company}
                onChange={(e) =>
                  handleArrayChange("experience", index, "company", e.target.value)
                }
              />
              <Input
                placeholder="Position"
                value={exp.position}
                onChange={(e) =>
                  handleArrayChange("experience", index, "position", e.target.value)
                }
              />
              <Input
                placeholder="Duration"
                value={exp.duration}
                onChange={(e) =>
                  handleArrayChange("experience", index, "duration", e.target.value)
                }
              />
            </div>
            <Textarea
              placeholder="Description"
              value={exp.description || ""}
              onChange={(e) =>
                handleArrayChange("experience", index, "description", e.target.value)
              }
            />
          </div>
        ))}
        <Button type="button" onClick={() => addNewField("experience", emptyExperience)}>
          + Add Experience
        </Button>
      </div>

      {/* Projects */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Projects</h3>
        {formData.projects.map((proj, index) => (
          <div key={index} className="space-y-2 border p-3 rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="Project Name"
                value={proj.name}
                onChange={(e) =>
                  handleArrayChange("projects", index, "name", e.target.value)
                }
              />
              <Input
                placeholder="Tech Used"
                value={proj.tech}
                onChange={(e) =>
                  handleArrayChange("projects", index, "tech", e.target.value)
                }
              />
            </div>
            <Textarea
              placeholder="Project Description"
              value={proj.description || ""}
              onChange={(e) =>
                handleArrayChange("projects", index, "description", e.target.value)
              }
            />
          </div>
        ))}
        <Button type="button" onClick={() => addNewField("projects", emptyProject)}>
          + Add Project
        </Button>
      </div>



      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Relevant Coursework</h3>
        {formData.relevantCoursework?.map((course, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              placeholder={`Course ${index + 1}`}
              value={course}
              onChange={(e) => {
                const updatedCourses = [...(formData.relevantCoursework || [])];
                updatedCourses[index] = e.target.value;
                setFormData({ ...formData, relevantCoursework: updatedCourses });
                onChange({ ...formData, relevantCoursework: updatedCourses });
              }}
            />
            <Button
              type="button"
              onClick={() => {
                const updatedCourses = [...(formData.relevantCoursework || [])];
                updatedCourses.splice(index, 1);
                setFormData({ ...formData, relevantCoursework: updatedCourses });
                onChange({ ...formData, relevantCoursework: updatedCourses });
              }}
            >
              Delete
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            setFormData({
              ...formData,
              relevantCoursework: [...(formData.relevantCoursework || []), ""]
            })
          }
        >
          + Add Coursework
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Achievement</h3>
        {formData.achievement?.map((course, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              placeholder={`Course ${index + 1}`}
              value={course}
              onChange={(e) => {
                const updatedCourses = [...(formData.achievement || [])];
                updatedCourses[index] = e.target.value;
                setFormData({ ...formData, achievement: updatedCourses });
                onChange({ ...formData, achievement: updatedCourses });
              }}
            />
            <Button
              type="button"
              onClick={() => {
                const updatedCourses = [...(formData.achievement || [])];
                updatedCourses.splice(index, 1);
                setFormData({ ...formData, achievement: updatedCourses });
                onChange({ ...formData, achievement: updatedCourses });
              }}
            >
              Delete
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            setFormData({
              ...formData,
              achievement: [...(formData.achievement || []), ""]
            })
          }
        >
          + Add Coursework
        </Button>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Skills</h3>
        {formData.skills.map((skill, i) => (
          <div key={i} className="space-y-2 border p-3 rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="Programming Languages"
                value={skill.programming}
                onChange={(e) =>
                  handleArrayChange("skills", i, "programming", e.target.value)
                }
              />
              <Input
                placeholder="Operating Systems"
                value={skill.operating}
                onChange={(e) =>
                  handleArrayChange("skills", i, "operating", e.target.value)
                }
              />
              <Input
                placeholder="Database"
                value={skill.database}
                onChange={(e) =>
                  handleArrayChange("skills", i, "database", e.target.value)
                }
              />
              <Input
                placeholder="Software Tools"
                value={skill.software}
                onChange={(e) =>
                  handleArrayChange("skills", i, "software", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <Button type="button" onClick={() => addNewField("skills", emptySkill)}>
          + Add Skill
        </Button>
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full">
        {isNew ? "Create & View Resume" : "Save Changes"}
      </Button>
    </form>
  );
};

export default Form;
