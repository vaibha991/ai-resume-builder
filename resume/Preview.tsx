"use client";

import React, { useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ResumeData } from "@/lib/types1";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaLinkedin, FaGithub } from "react-icons/fa";

interface ResumePreviewProps {
  data: ResumeData;
}

// PDF-safe bullet point component with proper multi-line alignment
const BulletPointItem: React.FC<{ content: string }> = ({ content }) => (
  <p className="text-sm leading-snug relative pl-4 mb-1">
    <span className="absolute left-0 top-0 text-black">•</span>
    {content}
  </p>
);

const Preview: React.FC<ResumePreviewProps> = ({ data }) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!resumeRef.current) return alert("Resume content not available for download.");

    try {
      const canvas = await html2canvas(resumeRef.current, {
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

      {/* Resume Content */}
      <div ref={resumeRef}>
        <Card className="max-w-3xl mx-auto my-6 border shadow-md bg-white">
          <CardContent className="p-8 space-y-3">
            {/* Header */}
            <div className="text-center pb-2 space-y-1">
              <h1 className="text-3xl font-bold">{data.name || "Your Name"}</h1>
              <p className="text-gray-600">{data.title}</p>

              <p className="text-gray-600 flex flex-wrap justify-center items-center gap-2 text-sm">
                {data.email && (
                  <span className="flex items-center gap-1">
                    <MdEmail /> {data.email}
                  </span>
                )}
                {data.phone && (
                  <>
                    <span>|</span>
                    <span className="flex items-center gap-1">
                      <MdPhone /> {data.phone}
                    </span>
                  </>
                )}
                {data.location && (
                  <>
                    <span>|</span>
                    <span className="flex items-center gap-1">
                      <MdLocationOn /> {data.location}
                    </span>
                  </>
                )}
                {data.linkedin && (
                  <>
                    <span>|</span>
                    <span className="flex items-center gap-1">
                      <FaLinkedin />
                      <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                        LinkedIn
                      </a>
                    </span>
                  </>
                )}
                {data.github && (
                  <>
                    <span>|</span>
                    <span className="flex items-center gap-1">
                      <FaGithub />
                      <a href={data.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-800">
                        GitHub
                      </a>
                    </span>
                  </>
                )}
              </p>
            </div>

            {/* Summary */}
            {data.summary && (
              <section className="mb-2">
                <h2 className="text-xl font-semibold border-b mb-1">Summary</h2>
                <p className="text-gray-700 leading-relaxed text-sm">{data.summary}</p>
              </section>
            )}

            {/* Education */}
            {Array.isArray(data.education) && data.education.length > 0 && (
              <section className="mb-2">
                <h2 className="text-xl font-semibold border-b mb-1">Education</h2>
                {data.education.map((edu, i) => (
                  <div key={i} className="mb-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <p className="font-arial text-black font-black text-sm">{edu.university}</p>
                      <p className="text-gray-700">{edu.location}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-700">{edu.degree}</p>
                      <p className="text-gray-600">{edu.date}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-700">{edu.fieldOfStudy}</p>
                      <p className="text-gray-600">GPA: {edu.gpa}</p>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Relevant Coursework */}
            {Array.isArray(data.relevantCoursework) && data.relevantCoursework.length > 0 && (
              <section className="mb-2">
                <h2 className="text-xl font-semibold border-b mb-1">Relevant Coursework</h2>
                <p className="text-gray-700 text-sm">{data.relevantCoursework.join(", ")}</p>
              </section>
            )}

            {/* Skills */}
            {Array.isArray(data.skills) && data.skills.length > 0 && (
              <section className="mb-2">
                <h2 className="text-xl font-semibold border-b mb-1">Technical Skills</h2>
                {data.skills.map((skill, i) => (
                  <div key={i} className="mb-1 text-sm space-y-0.5">
                    {skill.programming && <BulletPointItem content={`Programming Languages: ${skill.programming}`} />}
                    {skill.operating && <BulletPointItem content={`Operating Systems: ${skill.operating}`} />}
                    {skill.database && <BulletPointItem content={`Database: ${skill.database}`} />}
                    {skill.software && <BulletPointItem content={`Software Tools: ${skill.software}`} />}
                  </div>
                ))}
              </section>
            )}

            {/* Experience */}
            {Array.isArray(data.experience) && data.experience.length > 0 && (
              <section className="mb-2">
                <h2 className="text-xl font-semibold border-b mb-1">Experience</h2>
                {data.experience.map((exp, i) => (
                  <div key={i} className="mb-2 text-sm space-y-1">
                    <p className="font-semibold">{exp.position} @ {exp.company}</p>
                    <p className="text-gray-700">{exp.duration}</p>
                    {exp.description &&
                      exp.description
                        .split(". ")
                        .filter(Boolean)
                        .map((line, idx) => <BulletPointItem key={idx} content={line.trim() + "."} />)}
                  </div>
                ))}
              </section>
            )}

            {/* Projects */}
            {Array.isArray(data.projects) && data.projects.length > 0 && (
              <section className="mb-2">
                <h2 className="text-xl font-semibold border-b mb-1">Projects</h2>
                {data.projects.map((proj, i) => (
                  <div key={i} className="mb-2 text-sm space-y-1">
                    <div className="flex justify-between">
                      <p className="font-semibold">{proj.name}</p>
                      <p className="text-gray-500 text-sm">Tech: {proj.tech}</p>
                    </div>
                    {proj.description &&
                      proj.description
                        .split(". ")
                        .filter(Boolean)
                        .map((line, idx) => <BulletPointItem key={idx} content={line.trim() + "."} />)}
                  </div>
                ))}
              </section>
            )}

            {/* Achievements */}
            {Array.isArray(data.achievement) && data.achievement.length > 0 && (
              <section className="mb-2">
                <h2 className="text-xl font-semibold border-b mb-1">Achievements</h2>
                <div className="space-y-0.5"> {/* reduce spacing between bullets */}
                  {data.achievement.map((achieve, i) => (
                    <BulletPointItem key={i} content={achieve} />
                  ))}
                </div>
              </section>
            )}

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Preview;
