"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ResumeData, Skill, Project, Experience, Education } from "@/lib/types1";
import { improveText } from "@/lib/ai";


type ArraySectionKey = 'experience' | 'education' | 'projects' | 'skills' | 'interests' | 'languages' | 'achievement' | 'relevantCoursework';

// Mapped type to get the item type from an ArraySectionKey
type ArrayItem<K extends ArraySectionKey> =
  K extends 'experience' ? Experience :
  K extends 'education' ? Education :
  K extends 'projects' ? Project :
  K extends 'skills' ? Skill :
  // Keys that hold string arrays:
  K extends 'interests' ? string :
  K extends 'languages' ? string :
  K extends 'achievement' ? string :
  K extends 'relevantCoursework' ? string :
  never;


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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updated: ResumeData = { ...formData, [name]: value };
    setFormData(updated);
    onChange(updated);
  };

  const handleArrayChange = <
    K extends 'education' | 'experience' | 'projects' | 'skills',
    T extends ArrayItem<K>
  >(
    section: K,
    index: number,
    field: keyof T,
    value: string
  ) => {
    const sectionArray = formData[section];

    if (Array.isArray(sectionArray)) {
      const updatedArray = [...(sectionArray as T[])];

      updatedArray[index] = {
        ...updatedArray[index] as T,
        [field]: value
      } as T;

      const updated: ResumeData = { ...formData, [section]: updatedArray };
      setFormData(updated);
      onChange(updated);
    }
  };


  const addNewField = <
    K extends ArraySectionKey,
    T extends ArrayItem<K>
  >(
    section: K,
    emptyTemplate: T 
  ) => {
    const sectionArray = formData[section];

    if (Array.isArray(sectionArray)) {
      const updatedArray = [...(sectionArray as T[]), emptyTemplate];

      const updated: ResumeData = {
        ...formData,
        [section]: updatedArray,
      };
      setFormData(updated);
      onChange(updated);
    }
  };

 
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    },
    [formData, onSubmit]
  );

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
    location: "",
  };

  const emptyProject: Project = { name: "", description: "", tech: "" };

  const emptySkill: Skill = {
    programming: "",
    operating: "",
    database: "",
    software: "",
    frameworks: "",
    cloud: "",
    languages: "",
  };


  const handleImproveSummary = async () => {
    if (!formData.summary) return;
    try {
      setLoading(true);
      const improved = await improveText(formData.summary, "summary");
      const updated: ResumeData = { ...formData, summary: improved };
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


      {/* Relevant Coursework (String Array) */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Relevant Coursework</h3>
        {/*
          NOTE: Direct state update is used here because it's a simple string array.
          If you wanted to use a generic handler, you'd use addNewField for adding and 
          a dedicated handler or a modified handleArrayChange for updating/deleting.
        */}
        {formData.relevantCoursework?.map((course, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              placeholder={`Course ${index + 1}`}
              value={course}
              onChange={(e) => {
                const updatedCourses = [...(formData.relevantCoursework || [])];
                updatedCourses[index] = e.target.value;
                const updated: ResumeData = { ...formData, relevantCoursework: updatedCourses };
                setFormData(updated);
                onChange(updated);
              }}
            />
            <Button
              type="button"
              onClick={() => {
                const updatedCourses = [...(formData.relevantCoursework || [])];
                updatedCourses.splice(index, 1);
                const updated: ResumeData = { ...formData, relevantCoursework: updatedCourses };
                setFormData(updated);
                onChange(updated);
              }}
            >
              Delete
            </Button>
          </div>
        ))}
        <Button
          type="button"
          // Uses the generic addNewField, passing 'relevantCoursework' as K and '' as T
          onClick={() => addNewField("relevantCoursework", "")}
        >
          + Add Coursework
        </Button>
      </div>

      {/* Achievement (String Array) */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Achievement</h3>
        {formData.achievement?.map((ach, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              placeholder={`Achievement ${index + 1}`}
              value={ach}
              onChange={(e) => {
                const updatedAchievements = [...(formData.achievement || [])];
                updatedAchievements[index] = e.target.value;
                const updated: ResumeData = { ...formData, achievement: updatedAchievements };
                setFormData(updated);
                onChange(updated);
              }}
            />
            <Button
              type="button"
              onClick={() => {
                const updatedAchievements = [...(formData.achievement || [])];
                updatedAchievements.splice(index, 1);
                const updated: ResumeData = { ...formData, achievement: updatedAchievements };
                setFormData(updated);
                onChange(updated);
              }}
            >
              Delete
            </Button>
          </div>
        ))}
        <Button
          type="button"
          // Uses the generic addNewField, passing 'achievement' as K and '' as T
          onClick={() => addNewField("achievement", "")}
        >
          + Add Achievement
        </Button>
      </div>

      {/* Skills (Complex Object Array) */}
      {/* NOTE: Since the 'skills' array in your ResumeData only holds a single Skill object 
        (Skill[]), the map loop only runs once (i=0). This structure is unusual for skills, 
        but the code handles it correctly using handleArrayChange.
      */}
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
            {/* ... other skill fields here ... */}
          </div>
        ))}
        <Button type="button" onClick={() => addNewField("skills", emptySkill)}>
          + Add Skill Set
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