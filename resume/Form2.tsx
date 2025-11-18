"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ResumeData, Skill, Experience, Education, Project } from "@/lib/types1";
import { improveText } from "@/lib/ai";

interface FormProps {
    initialData: ResumeData;
    onChange: (data: ResumeData) => void;
    onSubmit?: (data: ResumeData) => void;
    isNew?: boolean;
}

type ArrayKeys = "skills" | "experience" | "education" | "projects";

export default function ResumeForm({ initialData, onChange }: FormProps) {
    const [form, setForm] = useState<ResumeData>(initialData);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setForm(initialData);
    }, [initialData]);

    // ---------------------------------------------------------
    // 1️⃣ Safe handleChange (NO ANY)
    // ---------------------------------------------------------
    const handleChange = <K extends keyof ResumeData>(
        key: K,
        value: ResumeData[K]
    ) => {
        const updated = { ...form, [key]: value };
        setForm(updated);
        onChange(updated);
    };

    // ---------------------------------------------------------
    // 2️⃣ Improve Summary (NO ANY)
    // ---------------------------------------------------------
    const handleImproveSummary = async () => {
        if (!form.summary) return;

        try {
            setLoading(true);
            const improved = await improveText(form.summary, "summary");

            const updated = { ...form, summary: improved };
            setForm(updated);
            onChange(updated);
        } finally {
            setLoading(false);
        }
    };

    // ---------------------------------------------------------
    // 3️⃣ Add item to array (skills, experience, etc.)
    // ---------------------------------------------------------
    const handleAddItem = <T,>(field: ArrayKeys, emptyItem: T) => {
        const updatedArray = [...(form[field] as T[]), emptyItem];
        handleChange(field, updatedArray as ResumeData[typeof field]);
    };

    // ---------------------------------------------------------
    // 4️⃣ Update array item (NO ANY)
    // ---------------------------------------------------------
    const handleArrayChange = <
        T extends Skill | Experience | Education | Project,
        K extends keyof T
    >(
        section: ArrayKeys,
        index: number,
        key: K,
        value: T[K]
    ) => {
        const updatedArray = [...(form[section] as T[])];
        updatedArray[index] = { ...updatedArray[index], [key]: value };

        handleChange(section, updatedArray as ResumeData[typeof section]);
    };

    // ---------------------------------------------------------
    // 5️⃣ Upload Photo (NO ANY)
    // ---------------------------------------------------------
    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => handleChange("photo", reader.result as string);
        reader.readAsDataURL(file);
    };

    // ---------------------------------------------------------
    //  UI START
    // ---------------------------------------------------------
    return (
        <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-3xl mx-auto space-y-6">

            {/* PHOTO */}
            <div>
                <h2 className="text-2xl font-semibold border-b pb-1 mb-4">Profile Photo</h2>
                <div className="flex items-center gap-4">
                    {form.photo ? (
                        <img
                            src={form.photo}
                            alt="Profile"
                            className="w-24 h-24 object-cover border rounded-md"
                        />
                    ) : (
                        <div className="w-24 h-24 border rounded-md flex items-center justify-center">
                            No photo
                        </div>
                    )}

                    <Input type="file" accept="image/*" onChange={handlePhotoUpload} />
                </div>
            </div>

            {/* BASIC INFO */}
            <div>
                <h2 className="text-2xl font-semibold border-b pb-1 mb-4">Basic Info</h2>
                <div className="grid grid-cols-2 gap-3">

                    <Input
                        placeholder="Full Name"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />

                    <Input
                        placeholder="Job Title"
                        value={form.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />

                    <Input
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />

                    <Input
                        placeholder="Location"
                        value={form.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                    />

                    <Input
                        placeholder="LinkedIn"
                        value={form.linkedin}
                        onChange={(e) => handleChange("linkedin", e.target.value)}
                    />

                    <Input
                        placeholder="GitHub"
                        value={form.github}
                        onChange={(e) => handleChange("github", e.target.value)}
                    />
                </div>
            </div>

            {/* SUMMARY */}
            <div>
                <h2 className="text-2xl font-semibold border-b pb-1 mb-4">Summary</h2>

                <Textarea
                    value={form.summary}
                    onChange={(e) => handleChange("summary", e.target.value)}
                />

                <Button
                    className="bg-blue-600 text-white mt-2"
                    onClick={handleImproveSummary}
                    disabled={loading}
                >
                    {loading ? "Improving..." : "Improve with AI"}
                </Button>
            </div>

            {/* EXPERIENCE */}
            <div>
                <h2 className="text-2xl font-semibold border-b pb-1 mb-4">Work History</h2>

                {form.experience.map((exp, i) => (
                    <div key={i} className="border p-3 rounded space-y-2 mb-3">

                        <Input
                            placeholder="Position"
                            value={exp.position}
                            onChange={(e) =>
                                handleArrayChange("experience", i, "position", e.target.value)
                            }
                        />

                        <Input
                            placeholder="Company"
                            value={exp.company}
                            onChange={(e) =>
                                handleArrayChange("experience", i, "company", e.target.value)
                            }
                        />

                        <Input
                            placeholder="Duration"
                            value={exp.duration}
                            onChange={(e) =>
                                handleArrayChange("experience", i, "duration", e.target.value)
                            }
                        />

                        <Input
                            placeholder="Location"
                            value={exp.location}
                            onChange={(e) =>
                                handleArrayChange("experience", i, "location", e.target.value)
                            }
                        />

                        <Textarea
                            placeholder="Description"
                            value={exp.description}
                            onChange={(e) =>
                                handleArrayChange("experience", i, "description", e.target.value)
                            }
                        />
                    </div>
                ))}

                <Button
                    onClick={() =>
                        handleAddItem<Experience>("experience", {
                            position: "",
                            company: "",
                            duration: "",
                            location: "",
                            description: "",
                        })
                    }
                >
                    + Add Work Experience
                </Button>
            </div>

            {/* EDUCATION */}
            <div>
                <h2 className="text-2xl font-semibold border-b pb-1 mb-4">Education</h2>

                {form.education.map((edu, i) => (
                    <div key={i} className="border p-3 rounded space-y-2 mb-3">

                        <Input
                            placeholder="Degree"
                            value={edu.degree}
                            onChange={(e) =>
                                handleArrayChange("education", i, "degree", e.target.value)
                            }
                        />

                        <Input
                            placeholder="University"
                            value={edu.university}
                            onChange={(e) =>
                                handleArrayChange("education", i, "university", e.target.value)
                            }
                        />

                        <Input
                            placeholder="Date"
                            value={edu.date}
                            onChange={(e) =>
                                handleArrayChange("education", i, "date", e.target.value)
                            }
                        />
                    </div>
                ))}

                <Button
                    onClick={() =>
                        handleAddItem<Education>("education", {
                            degree: "",
                            university: "",
                            date: "",
                            emphasis: "",
                            fieldOfStudy: "",
                            location: "",
                            gpa: "",
                        })
                    }
                >
                    + Add Education
                </Button>
            </div>

            {/* SKILLS */}
            <div>
                <h2 className="text-2xl font-semibold border-b pb-1 mb-4">Skills</h2>

                {form.skills.map((skill, i) => (
                    <div key={i} className="border p-3 rounded space-y-2 mb-3">

                        <Input
                            placeholder="Languages"
                            value={skill.languages}
                            onChange={(e) =>
                                handleArrayChange("skills", i, "languages", e.target.value)
                            }
                        />

                        <Input
                            placeholder="Frameworks"
                            value={skill.frameworks}
                            onChange={(e) =>
                                handleArrayChange("skills", i, "frameworks", e.target.value)
                            }
                        />

                        <Input
                            placeholder="Cloud / Database"
                            value={skill.cloud}
                            onChange={(e) =>
                                handleArrayChange("skills", i, "cloud", e.target.value)
                            }
                        />
                    </div>
                ))}

                <Button
                    onClick={() =>
                        handleAddItem<Skill>("skills", {
                            programming: "",
                            operating: "",
                            database: "",
                            software: "",
                            frameworks: "",
                            cloud: "",
                            languages: "",
                        })
                    }
                >
                    + Add Skill
                </Button>
            </div>
        </div>
    );
}
