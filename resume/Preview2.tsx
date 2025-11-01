"use client";

import React, { useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ResumeData } from "@/lib/types1";

interface PreviewProps {
    data: ResumeData;
}

const Preview: React.FC<PreviewProps> = ({ data }) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    const element = resumeRef.current;
    if (!element) {
      alert("Error: Resume content not available for download.");
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 3,
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      pdf.save(`${data.name || "resume"}.pdf`);
    } catch (error) {
      console.error(error);
      alert("Failed to download PDF. Please try again.");
    }
  }, [data.name]);

  const safeData = data || {
    name: "",
    title: "",
    jobtitle: "",
    degree: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    summary: "",
    education: [],
    experience: [],
    projects: [],
    skills: [],
    achievement: [],
  };

    return (

            <div
                ref={resumeRef}
                className="bg-white shadow-md w-[210mm] min-h-[297mm] mx-auto p-8 font-sans text-gray-800"
            >
                {/* Header */}
                <div className="flex items-center gap-6 border-b pb-4 mb-4">
                    {data.photo && (
                        <img
                            src={data.photo}
                            alt="Profile"
                            className="w-28 h-28 rounded-full object-cover border"
                        />
                    )}
                    <div>
                        <h1 className="text-3xl font-bold">{data.name}</h1>
                        <p className="text-lg text-gray-600">{data.title}</p>
                        <div className="text-sm text-gray-500 space-x-2 mt-1">
                            {data.email && <span>• {data.email}</span>}
                            {data.location && <span>• {data.location}</span>}
                            {data.linkedin && <span>• {data.linkedin}</span>}
                            {data.github && <span>• {data.github}</span>}

                            {/* {data.linkedin && (
                                <span>• <a href={data.linkedin}>LinkedIn</a></span>
                            )} */}
                        </div>
                    </div>
                </div>

                {/* Summary */}
                {data.summary && (
                    <section className="mb-4">
                        <h2 className="text-xl font-semibold border-b mb-2">Summary</h2>
                        <p className="text-sm leading-relaxed">{data.summary}</p>
                    </section>

                    
                )}

                {data.experience && data.experience.length > 0 && (
                    <section className="mb-5">
                        <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-2">
                            Work History
                        </h2>
                        {data.experience.map((exp, i) => (
                            <div key={i} className="mb-4">
                                <p className="font-semibold text-base">
                                    {exp.position}{" "}
                                    <span className="text-gray-700">- {exp.company}</span>
                                </p>
                                <p className="text-sm text-gray-500 mb-1">
                                    {exp.duration} - {exp.location}
                                </p>
                                <p className="text-sm leading-relaxed">• {exp.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {/* EDUCATION */}
                {data.education && data.education.length > 0 && (
                    <section className="mb-5">
                        <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-2">
                            Education
                        </h2>
                        {data.education.map((edu, i) => (
                            <div key={i} className="mb-3">
                                <p className="font-semibold text-base">{edu.degree}</p>
                                <p className="text-sm text-gray-700">{edu.university}</p>
                                <p className="text-xs text-gray-500">{edu.date}</p>
                            </div>
                        ))}
                    </section>
                )}
                {/* Skills */}
                {data.skills.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-xl font-semibold border-b pb-1 mb-2">Skills</h2>
                        {data.skills.map((skill, i) => (
                            <div key={i} className="text-sm mb-1">
                                <p>
                                    <strong>Languages:</strong> {skill.languages}
                                </p>
                                <p>
                                    <strong>Frameworks:</strong> {skill.frameworks}
                                </p>
                                <p>
                                    <strong>Cloud/Database/Tech Stack:</strong> {skill.cloud}
                                </p>
                            </div>
                        ))}
                    </section>
                )}


            </div>
    );
}


export default Preview;
