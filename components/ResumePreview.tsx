"use client";

import React, { useCallback, useRef } from "react";
import { ResumeData, Skill } from "@/lib/types"; // Make sure Skill interface is added in types.ts
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaLinkedin, FaGithub } from "react-icons/fa";


interface ResumePreviewProps {
  resumeData: ResumeData;
}

// PDF-Safe Bullet Point Component
interface BulletPointItemProps {
  content: string;
}
function BulletPointItem({ content }: BulletPointItemProps) {
  return (
    <div className="flex">
      <span className="mr-2 text-sm leading-snug align-top">•</span>
      <p className="flex-1 text-sm">{content}</p>
    </div>
  );
}

export default function ResumePreview({ resumeData }: ResumePreviewProps) {
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

      pdf.save(`${resumeData.name || "resume"}.pdf`);
    } catch (error) {
      console.error(error);
      alert("Failed to download PDF. Please try again.");
    }
  }, [resumeData.name]);

  return (
    <div className="relative">
      {/* Download PDF Button */}
      <button
        onClick={handleDownload}
        className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 z-10 print:hidden"
        aria-label="Download Resume as PDF"
      >
        Download PDF
      </button>

      <div
        ref={resumeRef}
        className="bg-white p-10 rounded-xl shadow-xl mt-10 max-w-6xl mx-auto text-gray-800"
      >
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">{resumeData.name}</h1>
          {resumeData.title && <h2 className="text-xl text-gray-600 mt-1">{resumeData.title}</h2>}
          <div className="flex flex-wrap justify-center items-center gap-4 mt-3 text-sm">
            {resumeData.email && (
              <div className="flex items-center gap-1">
                <MdEmail className="text-blue-500" />
                <a href={`mailto:${resumeData.email}`} className="text-gray-600 hover:underline">
                  {resumeData.email}
                </a>
              </div>
            )}

            {resumeData.phone && (
              <div className="flex items-center gap-1">
                <MdPhone className="text-green-500" />
                <a href={`tel:${resumeData.phone}`} className="text-gray-600 hover:underline">
                  {resumeData.phone}
                </a>
              </div>
            )}

            {resumeData.linkedin && (
              <div className="flex items-center gap-1">
                <FaLinkedin className="text-blue-600" />
                <a
                  href={resumeData.linkedin.startsWith("http") ? resumeData.linkedin : `https://${resumeData.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {resumeData.linkedin}
                </a>
              </div>
            )}

            {resumeData.github && (
              <div className="flex items-center gap-1">
                <FaGithub className="text-gray-800" />
                <a
                  href={resumeData.github.startsWith("http") ? resumeData.github : `https://${resumeData.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {resumeData.github}
                </a>
              </div>
            )}
            {resumeData.location && (
              <div className="flex items-center gap-1">
                <MdLocationOn className="text-red-500" />
                <span className="text-gray-600">{resumeData.location}</span>
              </div>
            )}
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <aside className="col-span-1 space-y-8 p-4 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
            {/* Technical Skills */}
            {resumeData.skills?.length > 0 && (
              <section aria-labelledby="skills-heading">
                <h3 id="skills-heading" className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-1 mb-2">
                  Technical Skills
                </h3>
                <div className="space-y-1 text-gray-700">
                  {resumeData.skills.map((skill: Skill, i: number) => (
                    <div key={i}>
                      <BulletPointItem content={skill.name} />
                      {skill.details?.map((detail, idx) => (
                        <div key={idx} className="ml-4">
                          <BulletPointItem content={detail} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {resumeData.languages?.length > 0 && (
              <section aria-labelledby="languages-heading">
                <h3 id="languages-heading" className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-1 mb-2">
                  Languages
                </h3>
                <div className="space-y-1 text-gray-700">
                  {resumeData.languages.map((l, i) => (
                    <BulletPointItem key={i} content={l.preference} />
                  ))}
                </div>
              </section>
            )}

            {/* Interests */}
            {resumeData.interests?.length > 0 && (
              <section aria-labelledby="interests-heading">
                <h3 id="interests-heading" className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-1 mb-2">
                  Interests
                </h3>
                <p className="text-gray-700">{resumeData.interests.join(", ")}</p>
              </section>
            )}
          </aside>

          {/* Main Content */}
          <main className="col-span-2 space-y-10">
            {/* Summary */}
            {resumeData.summary && (
              <section className="p-4 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-1 mb-2">
                  Summary
                </h3>
                <p className="text-gray-700">{resumeData.summary}</p>
              </section>
            )}

            {/* Experience */}
            {resumeData.experiences?.length > 0 && (
              <section className="p-4 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-1 mb-2">
                  Experience
                </h3>
                <div className="space-y-4">
                  {resumeData.experiences.map((exp, i) => (
                    <div key={i}>
                      <p className="font-semibold text-gray-800">{exp.role} @ {exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.date}</p>
                      {exp.points?.length > 0 && (
                        <div className="mt-1 space-y-1 text-gray-700 pl-4">
                          {exp.points.map((p, idx) => (
                            <BulletPointItem key={idx} content={p} />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {resumeData.education?.length > 0 && (
              <section className="p-4 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-1 mb-2">
                  Education
                </h3>
                <div className="space-y-2">
                  {resumeData.education.map((edu, i) => (
                    <div key={i}>
                      <p className="font-semibold text-gray-800">{edu.degree} – {edu.school}</p>
                      <p className="text-sm text-gray-500">{edu.date}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {resumeData.projects?.length > 0 && (
              <section className="p-4 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-1 mb-2">
                  Projects
                </h3>
                <div className="space-y-2">
                  {resumeData.projects.map((proj, i) => (
                    <div key={i}>
                      <p className="font-semibold text-gray-800">{proj.name}</p>
                      <p className="text-sm text-gray-500">{proj.description}</p>
                      {proj.link && (
                        <a href={proj.link} className="text-blue-600 text-sm hover:underline" target="_blank" rel="noopener noreferrer">
                          {proj.link}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
