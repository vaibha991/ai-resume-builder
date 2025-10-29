"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ResumeData } from "@/lib/types1";

interface FormProps {
    initialData: ResumeData;
    onChange: (data: ResumeData) => void;
    onSubmit: (data: ResumeData) => void;
    isNew?: boolean;
}

export default function ResumeForm({ initialData, onChange }: FormProps) {
    const [form, setForm] = useState<ResumeData>(initialData);

    const handleChange = (key: string, value: any) => {
        const updated = { ...form, [key]: value };
        setForm(updated);
        onChange(updated);
    };

    const handleArrayChange = (
        section: keyof ResumeData,
        index: number,
        field: string,
        value: any
    ) => {
        const updatedSection = [...(form[section] as any[])];
        updatedSection[index][field] = value;
        const updated = { ...form, [section]: updatedSection };
        setForm(updated);
        onChange(updated);
    };

    const addArrayItem = (section: keyof ResumeData, template: any) => {
        const updated = {
            ...form,
            [section]: [...(form[section] as any[]), template],
        };
        setForm(updated);
        onChange(updated);
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                handleChange("photo", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-3xl mx-auto space-y-6">
            {/* Photo Upload Section */}
            <div>
                <h2 className="text-2xl font-semibold border-b pb-1 mb-4">Profile Photo</h2>
                <div className="flex items-center gap-4">
                    {form.photo ? (
                        <img
                            src={form.photo}
                            alt="Profile Preview"
                            className="w-24 h-24 rounded-md border object-cover"
                        />
                    ) : (
                        <div className="w-24 h-24 border rounded-md flex items-center justify-center text-gray-400 text-sm">
                            No photo
                        </div>
                    )}
                    <div>
                        <Input type="file" accept="image/*" onChange={handlePhotoUpload} />
                        <p className="text-sm text-gray-500 mt-1">
                            Upload a square profile image (e.g. 200×200)
                        </p>
                    </div>
                </div>
            </div>

            {/* Basic Info */}
            <div>
                <h2 className="text-2xl font-semibold border-b pb-1 mb-4">Basic Info</h2>
                <div className="grid grid-cols-2 gap-3">
                    <Input
                        placeholder="Full Name"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                    <Input
                        placeholder="Job Title (e.g. Senior Software Engineer)"
                        value={form.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />
                    <Input
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                    <Input
                        placeholder="Location (e.g. New Delhi)"
                        value={form.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                    />
                    <Input
                        placeholder="LinkedIn URL"
                        value={form.linkedin}
                        onChange={(e) => handleChange("linkedin", e.target.value)}
                    />
                    <Input
                        placeholder="GitHub URL"
                        value={form.github}
                        onChange={(e) => handleChange("github", e.target.value)}
                    />
                </div>
            </div>

            {/* Summary */}
            <div>
                <h2 className="text-2xl font-semibold border-b pb-1 mb-4">Summary</h2>
                <Textarea
                    placeholder="Write your professional summary..."
                    value={form.summary}
                    onChange={(e) => handleChange("summary", e.target.value)}
                />
            </div>

            {/* Work History */}
            <div>
                <h2 className="text-2xl font-semibold border-b pb-1 mb-4">Work History</h2>
                {form.experience.map((exp, i) => (
                    <div key={i} className="border p-3 rounded mb-3 space-y-2">
                        <Input
                            placeholder="Position (e.g. Senior Software Engineer)"
                            value={exp.position}
                            onChange={(e) =>
                                handleArrayChange("experience", i, "position", e.target.value)
                            }
                        />
                        <Input
                            placeholder="Company (e.g. Paytm)"
                            value={exp.company}
                            onChange={(e) =>
                                handleArrayChange("experience", i, "company", e.target.value)
                            }
                        />
                        <Input
                            placeholder="Duration (e.g. 04/2024 - Present)"
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
                            placeholder="Description (e.g. Designed internal framework...)"
                            value={exp.description}
                            onChange={(e) =>
                                handleArrayChange("experience", i, "description", e.target.value)
                            }
                        />
                    </div>
                ))}
                <Button
                    onClick={() =>
                        addArrayItem("experience", {
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

            {/* Education */}
            <div>
                <h2 className="text-2xl font-semibold border-b pb-1 mb-4">Education</h2>
                {form.education.map((edu, i) => (
                    <div key={i} className="border p-3 rounded mb-3 space-y-2">
                        <Input
                            placeholder="Degree (e.g. Bachelor of Engineering)"
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
                            placeholder="Duration (e.g. 07/2016 - 06/2020)"
                            value={edu.date}
                            onChange={(e) =>
                                handleArrayChange("education", i, "date", e.target.value)
                            }
                        />
                    </div>
                ))}
                <Button
                    onClick={() =>
                        addArrayItem("education", {
                            degree: "",
                            university: "",
                            date: "",
                        })
                    }
                >
                    + Add Education
                </Button>
            </div>

            {/* Skills */}
            <div>
                <h2 className="text-2xl font-semibold border-b pb-1 mb-4">Skills</h2>
                <Textarea
                    placeholder="e.g. HTML, CSS, JavaScript, React"
                    value={form.skill.join(", ")} // show joined text
                    onChange={(e) =>
                        onChange({
                            ...form,
                            skill: e.target.value.split(",").map((s) => s.trim()), // ✅ convert to array
                        })
                    }
                />

            </div>
        </div>
    );
}
