"use client";

import React, { useRef, useCallback } from "react";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { ResumeData } from "@/lib/types1";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

interface PreviewProps {
  data: ResumeData;
}

const Preview: React.FC<PreviewProps> = ({ data }) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleDownload = useCallback(async () => {
    const element = resumeRef.current;
    if (!element) return;

    try {
      if (buttonRef.current) buttonRef.current.style.display = "none";
      await new Promise((res) => setTimeout(res, 100));

      const canvas = await html2canvas(element, {
        scale: 3,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      if (buttonRef.current) buttonRef.current.style.display = "block";

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, imgHeight);
      pdf.save(`${data.name || "resume"}.pdf`);
    } catch (err) {
      console.error("PDF error:", err);
    }
  }, [data.name]);

  const safeData = data || {};

  return (
    <div
      ref={resumeRef}
      className="bg-white text-black p-10 rounded-lg shadow-md w-full max-w-[900px] mx-auto"
    >

      {/* HEADER */}
      <div className="text-center pb-3">
        {safeData.name && (
          <h1 className="text-3xl font-bold text-gray-900">{safeData.name}</h1>
        )}

        <p className="text-base text-gray-700 mt-1">
          {[safeData.jobtitle, safeData.degree, safeData.title]
            .filter(Boolean)
            .join(" | ")}
        </p>

        <div className="flex justify-center mt-2 text-xs text-gray-600">
          <div className="flex flex-wrap items-center gap-3">
            {safeData.email && (
              <span className="flex items-center gap-1">
                <Mail size={12} /> {safeData.email}
              </span>
            )}
            {safeData.phone && (
              <span className="flex items-center gap-1">
                <Phone size={12} /> {safeData.phone}
              </span>
            )}
            {safeData.location && (
              <span className="flex items-center gap-1">
                <MapPin size={12} /> {safeData.location}
              </span>
            )}
            {safeData.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin size={12} /> {safeData.linkedin}
              </span>
            )}
            {safeData.github && (
              <span className="flex items-center gap-1">
                <Github size={12} /> {safeData.github}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      {safeData.summary && (
        <section className="mb-4">
          <h2 className="text-lg font-semibold border-b pb-1 mb-1">Summary</h2>
          <p className="leading-snug text-xs">{safeData.summary}</p>
        </section>
      )}

      {/* EDUCATION */}
      {safeData.education?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-semibold border-b pb-1 mb-1">Education</h2>
          {safeData.education.map((edu, i) => (
            <div key={i} className="mb-1">
              <p className="font-semibold text-sm">
                {edu.degree} in {edu.fieldOfStudy} — {edu.university}
              </p>
              <p className="text-xs text-gray-600">
                {edu.location} | {edu.date} | GPA: {edu.gpa}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* EXPERIENCE */}
      {safeData.experience?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-semibold border-b pb-1 mb-1">Experience</h2>
          {safeData.experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <p className="font-semibold text-sm">
                {exp.position} — {exp.company}
              </p>

              <p className="text-xs text-gray-600">{exp.duration}</p>

              {/* Bullet points for description */}
              {exp.description && (
                <ul className="mt-1 space-y-1">
                  {exp.description.split("\n").map((line, idx) => (
                    <li key={idx} className="flex items-start text-xs leading-tight">
                      <span className="mr-2 text-black mt-0.5">•</span>
                      <span>{line.trim()}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

        </section>
      )}

      {/* PROJECTS */}
      {safeData.projects?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-semibold border-b pb-1 mb-1">Projects</h2>
          {safeData.projects.map((proj, i) => (
            <div key={i} className="mb-2">

              <p className="font-semibold text-sm">{proj.name}</p>
              <p className="text-xs text-gray-600">Tech: {proj.tech}</p>

              {/* Bullet points for project description */}
              {proj.description && (
                <ul className="mt-1 space-y-1">
                  {proj.description.split("\n").map((line, idx) => (
                    <li key={idx} className="flex items-start text-xs leading-tight">
                      <span className="mr-2 text-black mt-0.5">•</span>
                      <span>{line.trim()}</span>
                    </li>
                  ))}
                </ul>
              )}

            </div>
          ))}

        </section>
      )}

      {/* SKILLS */}
      {safeData.skills?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-semibold border-b pb-1 mb-1">Skills</h2>
          {safeData.skills.map((skill, i) => (
            <div key={i} className="text-sm mb-1 leading-snug">
              <p><strong>Languages:</strong> {skill.languages}</p>
              <p><strong>Frameworks:</strong> {skill.frameworks}</p>
              <p><strong>Cloud / DB / Tech:</strong> {skill.cloud}</p>
            </div>
          ))}
        </section>
      )}

      {/* ACHIEVEMENTS */}
      <div className="mt-4">
        <h2 className="text-sm font-semibold border-b pb-1">Achievements</h2>

        <ul className="mt-2 space-y-1">
          {safeData.achievement?.map((item, index) => (
            <li key={index} className="flex items-start text-xs leading-tight">
              <span className="mr-2 text-black mt-0.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* DOWNLOAD BUTTON */}
      <div className="text-center mt-4">
        <button
          ref={buttonRef}
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
