"use client";

import React, { useRef, useCallback } from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { ResumeData } from "@/lib/types1";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

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
      className="bg-white text-black p-8 rounded-lg shadow-md w-full max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="text-center border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold">{safeData.name}</h1>
        <div className="flex justify-center items-center flex-wrap gap-2 mt-3 text-gray-600 text-xl">
          {[
            safeData.jobtitle,
            safeData.degree,
            safeData.title,
          ]
            .filter(Boolean) // removes empty values
            .join(" | ")}
        </div>

        <div className="flex justify-center items-center flex-wrap gap-4 mt-3 text-gray-600">
          {safeData.email && (
            <span className="flex items-center gap-1">
              <MdEmail /> {safeData.email}
            </span>
          )}
          {safeData.phone && (
            <span className="flex items-center gap-1">
              <MdPhone /> {safeData.phone}
            </span>
          )}
          {safeData.location && (
            <span className="flex items-center gap-1">
              <MdLocationOn /> {safeData.location}
            </span>
          )}
          {safeData.linkedin && (
            <span className="flex items-center gap-1">
              <FaLinkedin /> {safeData.linkedin}
            </span>
          )}
          {safeData.github && (
            <span className="flex items-center gap-1">
              <FaGithub /> {safeData.github}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {safeData.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b pb-1 mb-2">Summary</h2>
          <p>{safeData.summary}</p>
        </section>
      )}

      {/* Education */}
      {safeData.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b pb-1 mb-2">Education</h2>
          {safeData.education.map((edu, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold">
                {edu.degree} in {edu.fieldOfStudy} — {edu.university}
              </p>
              <p className="text-sm text-gray-600">
                {edu.location} | {edu.date} | GPA: {edu.gpa}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {safeData.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b pb-1 mb-2">Experience</h2>
          {safeData.experience.map((exp, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold">
                {exp.position} — {exp.company}
              </p>
              <p className="text-sm text-gray-600">{exp.duration}</p>
              {exp.description && <p className="mt-1">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {safeData.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b pb-1 mb-2">Projects</h2>
          {safeData.projects.map((proj, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold">{proj.name}</p>
              <p className="text-sm text-gray-600">Tech: {proj.tech}</p>
              {proj.description && <p className="mt-1">{proj.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {safeData.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b pb-1 mb-2">Skills</h2>
          {safeData.skills.map((skill, i) => (
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

      {/* Achievements */}
      {safeData.achievement.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold border-b pb-1 mb-2">Achievements</h2>
          <ul className="list-disc ml-5">
            {safeData.achievement.map((ach, i) => (
              <li key={i}>{ach}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Download Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Preview;
