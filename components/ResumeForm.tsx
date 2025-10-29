"use client";

import React from "react";
import { ResumeData, Project, Experience, Education, Skill } from "@/lib/types"; // Make sure Experience, Education, Skill are exported from types
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { improveText } from "@/lib/ai";

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export default function ResumeForm({ resumeData, setResumeData }: ResumeFormProps) {
  // Use a safe wrapper to ensure all properties are defined for use in the component body
  const safeResumeData: ResumeData = {
    name: resumeData.name ?? "",
    title: resumeData.title ?? "",
    email: resumeData.email ?? "",
    phone: resumeData.phone ?? "",
    location: resumeData.location ?? "",
    linkedin: resumeData.linkedin ?? "",
    github: resumeData.github ?? "",
    summary: resumeData.summary ?? "",
    skills: resumeData.skills ?? [],
    experiences: resumeData.experiences ?? [],
    education: resumeData.education ?? [],
    languages: resumeData.languages ?? [],
    interests: resumeData.interests ?? [],
    projects: resumeData.projects ?? [],
  };

  // Helper function for top-level field updates
  const handleChange = (field: keyof ResumeData, value: any) =>
    setResumeData(prev => ({ ...prev, [field]: value }));

  // Helper functions for array additions/removals are fine as you wrote them
  const addArrayItem = (field: keyof ResumeData, defaultValue: any) => {
    setResumeData(prev => {
      const arr = [...(prev[field] as any[] || []), defaultValue];
      return { ...prev, [field]: arr };
    });
  };

  const removeArrayItem = (field: keyof ResumeData, index: number) => {
    setResumeData(prev => {
      const arr = [...(prev[field] as any[] || [])];
      arr.splice(index, 1);
      return { ...prev, [field]: arr };
    });
  };

  // Handlers for specific array sections

  const handleExperienceChange = (expIndex: number, field: keyof Experience, value: string) => {
    setResumeData(prev => {
      const updatedExperiences = [...(prev.experiences || [])];
      // Ensure the experience object exists before updating
      if (updatedExperiences[expIndex]) {
        updatedExperiences[expIndex] = { ...updatedExperiences[expIndex], [field]: value };
      }
      return { ...prev, experiences: updatedExperiences as Experience[] };
    });
  };

  const handleExperiencePointChange = (expIndex: number, pointIndex: number, value: string) => {
    setResumeData(prev => {
      const updatedExperiences = [...(prev.experiences || [])];
      if (updatedExperiences[expIndex]?.points) {
        const updatedPoints = [...updatedExperiences[expIndex].points];
        updatedPoints[pointIndex] = value;
        updatedExperiences[expIndex] = { ...updatedExperiences[expIndex], points: updatedPoints };
      }
      return { ...prev, experiences: updatedExperiences as Experience[] };
    });
  };

  const addExperiencePoint = (expIndex: number) => {
    setResumeData(prev => {
      const updatedExperiences = [...(prev.experiences || [])];
      if (updatedExperiences[expIndex]) {
        const updatedPoints = [...(updatedExperiences[expIndex].points || []), ""];
        updatedExperiences[expIndex] = { ...updatedExperiences[expIndex], points: updatedPoints };
      }
      return { ...prev, experiences: updatedExperiences as Experience[] };
    });
  };

  const handleEducationChange = (eduIndex: number, field: keyof Education, value: string) => {
    setResumeData(prev => {
      const updatedEducation = [...(prev.education || [])];
      if (updatedEducation[eduIndex]) {
        updatedEducation[eduIndex] = { ...updatedEducation[eduIndex], [field]: value };
      }
      return { ...prev, education: updatedEducation as Education[] };
    });
  };

  const handleProjectChange = (projIndex: number, field: keyof Project, value: string) => {
    setResumeData(prev => {
      const updatedProjects = [...(prev.projects || [])];
      if (updatedProjects[projIndex]) {
        updatedProjects[projIndex] = { ...updatedProjects[projIndex], [field]: value };
      }
      return { ...prev, projects: updatedProjects as Project[] };
    });
  };

  const handleSkillNameChange = (skillIndex: number, value: string) => {
    setResumeData(prev => {
      const updatedSkills = [...(prev.skills || [])];
      if (updatedSkills[skillIndex]) {
        updatedSkills[skillIndex] = { ...updatedSkills[skillIndex], name: value };
      }
      return { ...prev, skills: updatedSkills as Skill[] };
    });
  };

  const handleSkillDetailChange = (skillIndex: number, detailIndex: number, value: string) => {
    setResumeData(prev => {
      const updatedSkills = [...(prev.skills || [])];
      if (updatedSkills[skillIndex]?.details) {
        const updatedDetails = [...updatedSkills[skillIndex].details];
        updatedDetails[detailIndex] = value;
        updatedSkills[skillIndex] = { ...updatedSkills[skillIndex], details: updatedDetails };
      }
      return { ...prev, skills: updatedSkills as Skill[] };
    });
  };

  const addSkillDetail = (skillIndex: number) => {
    setResumeData(prev => {
      const updatedSkills = [...(prev.skills || [])];
      if (updatedSkills[skillIndex]) {
        const updatedDetails = [...(updatedSkills[skillIndex].details || []), ""];
        updatedSkills[skillIndex] = { ...updatedSkills[skillIndex], details: updatedDetails };
      }
      return { ...prev, skills: updatedSkills as Skill[] };
    });
  };

  const removeSkillDetail = (skillIndex: number, detailIndex: number) => {
    setResumeData(prev => {
      const updatedSkills = [...(prev.skills || [])];
      if (updatedSkills[skillIndex]?.details) {
        const updatedDetails = [...updatedSkills[skillIndex].details];
        updatedDetails.splice(detailIndex, 1);
        updatedSkills[skillIndex] = { ...updatedSkills[skillIndex], details: updatedDetails };
      }
      return { ...prev, skills: updatedSkills as Skill[] };
    });
  };

  // AI Improvement function

  const improveSummary = async () => {
    const improved = await improveText(safeResumeData.summary, "summary");
    handleChange("summary", improved);
  };

  const improveExperiencePoint = async (expIndex: number, pointIndex: number) => {
    const oldText = safeResumeData.experiences[expIndex]?.points?.[pointIndex] || "";
    const improved = await improveText(oldText, "experience");

    // Update state using the explicit handler
    handleExperiencePointChange(expIndex, pointIndex, improved);
  };

  const improveProjectDescription = async (projIndex: number) => {
    const oldText = safeResumeData.projects[projIndex]?.description || "";
    const improved = await improveText(oldText, "project");

    // Update state using the explicit handler
    handleProjectChange(projIndex, "description", improved);
  };


  // Array addition functions
  const addExperience = () => {
    addArrayItem("experiences", { role: "", company: "", date: "", points: [""] });
  };

  const addEducation = () => {
    addArrayItem("education", { degree: "", school: "", date: "" });
  };

  const addProject = () => {
    addArrayItem("projects", { name: "", link: "", description: "" } as Project);
  };

  const handleLanguageChange = (value: string, index: number) => {
    setResumeData(prev => {
      const updatedLanguages = [...(prev.languages || [])];
      updatedLanguages[index] = { ...updatedLanguages[index], preference: value };
      return { ...prev, languages: updatedLanguages };
    });
  };

  // --- Rendered Form ---
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">

      {/* Header (Display) */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">{safeResumeData.name}</h1>
        <h2 className="text-xl text-gray-700">{safeResumeData.title}</h2>
      </div>

      <hr className="my-6" />

      {/* Personal Info */}
      <h2 className="text-xl font-bold">Personal Information</h2>
      <Input placeholder="Full Name" value={safeResumeData.name} onChange={e => handleChange("name", e.target.value)} />
      <Input placeholder="Email" value={safeResumeData.email} onChange={e => handleChange("email", e.target.value)} />
      <Input placeholder="Phone" value={safeResumeData.phone} onChange={e => handleChange("phone", e.target.value)} />
      <Input placeholder="Location" value={safeResumeData.location} onChange={e => handleChange("location", e.target.value)} />
      <Input placeholder="LinkedIn URL" value={safeResumeData.linkedin} onChange={e => handleChange("linkedin", e.target.value)} />
      <Input placeholder="GitHub URL" value={safeResumeData.github} onChange={e => handleChange("github", e.target.value)} />

      {/* Job Title */}
      <h2 className="text-xl font-bold mt-6">Job Title</h2>
      <div className="relative">
        <Textarea rows={1} placeholder="Job Title" value={safeResumeData.title} onChange={e => handleChange("title", e.target.value)} />
      </div>

      {/* Summary */}
      <h2 className="text-xl font-bold mt-6">Summary</h2>
      <div className="relative">
        <Textarea rows={4} placeholder="Summary" value={safeResumeData.summary} onChange={e => handleChange("summary", e.target.value)} />
        <Button size="sm" className="absolute top-2 right-2" onClick={improveSummary}>Improve with AI</Button>
      </div>

      <hr className="my-6" />

      {/* Experience */}
      <h2 className="text-xl font-bold mt-6">Experience</h2>
      {safeResumeData.experiences.map((exp, expIndex) => (
        <div key={expIndex} className="space-y-3 border p-4 rounded-md shadow-sm">
          <Input
            placeholder="Role"
            value={exp.role}
            onChange={e => handleExperienceChange(expIndex, "role", e.target.value)}
          />
          <Input
            placeholder="Company"
            value={exp.company}
            onChange={e => handleExperienceChange(expIndex, "company", e.target.value)}
          />
          <Input
            placeholder="Date (e.g., Jan 2020 - Dec 2022)"
            value={exp.date}
            onChange={e => handleExperienceChange(expIndex, "date", e.target.value)}
          />
          <Button
            type="button"
            variant="ghost"
            className="w-full text-red-500 hover:bg-red-50"
            onClick={() => removeArrayItem("experiences", expIndex)}>
            Remove Experience
          </Button>

          <h3 className="font-semibold mt-4">Job Points</h3>
          {exp.points.map((point, pointIndex) => (
            <div key={pointIndex} className="relative flex items-center space-x-2">
              <Textarea
                placeholder={`Point ${pointIndex + 1}`}
                rows={1}
                value={point}
                onChange={e => handleExperiencePointChange(expIndex, pointIndex, e.target.value)}
              />
              <Button size="sm" onClick={() => improveExperiencePoint(expIndex, pointIndex)} className="shrink-0">
                AI
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-red-500 hover:bg-red-50 shrink-0"
                onClick={() => {
                  setResumeData(prev => {
                    const updated = [...(prev.experiences || [])];
                    updated[expIndex].points.splice(pointIndex, 1);
                    return { ...prev, experiences: updated };
                  });
                }}>
                X
              </Button>
            </div>
          ))}
          <Button type="button" size="sm" onClick={() => addExperiencePoint(expIndex)}>
            + Add Point
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addExperience}>Add Experience</Button>

      <hr className="my-6" />

      {/* Education */}
      <h2 className="text-xl font-bold mt-6">Education</h2>
      {safeResumeData.education.map((edu, i) => (
        <div key={i} className="space-y-3 border p-4 rounded-md shadow-sm">
          <Input
            placeholder="Degree/Field of Study"
            value={edu.degree}
            onChange={e => handleEducationChange(i, "degree", e.target.value)}
          />
          <Input
            placeholder="School/University"
            value={edu.school}
            onChange={e => handleEducationChange(i, "school", e.target.value)}
          />
          <Input
            placeholder="Date (e.g., Aug 2016 - May 2020)"
            value={edu.date}
            onChange={e => handleEducationChange(i, "date", e.target.value)}
          />
          <Button
            type="button"
            variant="ghost"
            className="w-full text-red-500 hover:bg-red-50"
            onClick={() => removeArrayItem("education", i)}>
            Remove Education
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addEducation}>Add Education</Button>

      <hr className="my-6" />

      {/* Projects */}
      <h2 className="text-xl font-bold mt-6">Projects</h2>
      {safeResumeData.projects.map((proj, i) => (
        <div key={i} className="space-y-3 border p-4 rounded-md shadow-sm">
          <Input
            placeholder="Project Name"
            value={proj.name}
            onChange={e => handleProjectChange(i, "name", e.target.value)}
          />
          <Input
            placeholder="Project Link"
            value={proj.link}
            onChange={e => handleProjectChange(i, "link", e.target.value)}
          />
          <div className="relative">
            <Textarea
              placeholder="Project Description"
              rows={3}
              value={proj.description}
              onChange={e => handleProjectChange(i, "description", e.target.value)}
            />
            <Button size="sm" className="absolute top-2 right-2" onClick={() => improveProjectDescription(i)}>Improve with AI</Button>
          </div>
          <Button
            type="button"
            variant="ghost"
            className="w-full text-red-500 hover:bg-red-50"
            onClick={() => removeArrayItem("projects", i)}>
            Remove Project
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addProject}>Add Project</Button>

      <hr className="my-6" />

      {/* Skills */}
      <h2 className="text-xl font-bold mt-6">Technical Skills</h2>
      {safeResumeData.skills.map((skill, i) => (
        <div key={i} className="border p-4 rounded-md shadow-sm space-y-3">
          {/* Skill Name */}
          <div className="flex items-center space-x-2">
            <Input
              placeholder={`Technical Skill Category ${i + 1}`}
              value={skill.name}
              onChange={e => handleSkillNameChange(i, e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              className="text-red-500 hover:bg-red-50 shrink-0"
              onClick={() => removeArrayItem("skills", i)}
            >
              Remove
            </Button>
          </div>

          {/* Skill Details */}
          <h3 className="font-semibold text-sm ml-2">
            Details (e.g., Languages, Frameworks)
          </h3>

          {(skill.details ?? []).map((detail, detailIdx) => (
            <div key={detailIdx} className="flex items-center ml-4 space-x-2">
              <Input
                placeholder={`Detail ${detailIdx + 1}`}
                value={detail}
                onChange={e => handleSkillDetailChange(i, detailIdx, e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-red-500 hover:bg-red-50 shrink-0"
                onClick={() => removeSkillDetail(i, detailIdx)}
              >
                X
              </Button>
            </div>
          ))}


          {/* Add Detail Button */}
          <Button
            type="button"
            size="sm"
            className="ml-4"
            onClick={() => addSkillDetail(i)}
          >
            + Add Detail
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => addArrayItem("skills", { name: "", details: [] })}
      >
        Add Technical Skill Category
      </Button>

      <hr className="my-6" />

      {/* Languages */}
      <h2 className="text-xl font-bold mt-6">Languages</h2>
      {safeResumeData.languages.map((lang, i) => (
        <div key={i} className="flex items-center mb-2 space-x-2">
          <Input placeholder={`Language ${i + 1}`} value={lang.preference} onChange={e => handleLanguageChange(e.target.value, i)} />
          <Button type="button" variant="ghost" className="text-red-500 hover:bg-red-50" onClick={() => removeArrayItem("languages", i)}>Remove</Button>
        </div>
      ))}
      <Button type="button" onClick={() => addArrayItem("languages", { preference: "" })}>Add Language</Button>

      {/* Interests */}
      <h2 className="text-xl font-bold mt-6">Interests</h2>
      {safeResumeData.interests.map((interest, i) => (
        <div key={i} className="flex items-center mb-2 space-x-2">
          <Input
            placeholder={`Interest ${i + 1}`}
            value={interest}
            onChange={e => {
              const updated = [...safeResumeData.interests]; // copy array
              updated[i] = e.target.value;                  // update only this element
              setResumeData(prev => ({ ...prev, interests: updated })); // update state
            }}
          />
          <Button
            type="button"
            variant="ghost"
            className="text-red-500 hover:bg-red-50"
            onClick={() => {
              const updated = [...safeResumeData.interests];
              updated.splice(i, 1); // remove this interest
              setResumeData(prev => ({ ...prev, interests: updated }));
            }}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={() =>
          setResumeData(prev => ({
            ...prev,
            interests: [...(prev.interests || []), ""], // add new empty interest
          }))
        }
      >
        Add Interest
      </Button>

    </div>
  );
}