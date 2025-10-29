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

const Preview: React.FC<ResumePreviewProps> = ({ data }) => {
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

      {/* Wrap Card in a native div to attach ref */}
      <div ref={resumeRef}>
        <Card className="max-w-3xl mx-auto my-6 border shadow-md bg-white">
          <CardContent className="p-8 space-y-6">
            {/* Header */}
            <div className="text-center border-b pb-4 space-y-2">
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
              <section>
                <h2 className="text-xl font-semibold border-b mb-2">Summary</h2>
                <p className="text-gray-700 leading-relaxed">{data.summary}</p>
              </section>
            )}


            {Array.isArray(data.education) && data.education.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold border-b mb-2">Education</h2>

                {data.education.map((edu, i) => (
                  <div key={i} className="mb-4 space-y-2 text-sm">

                    {/* Row 1: University - Location */}
                    <div className="flex justify-between">
                      <p className="font-arial text-black font-black text-sm">{edu.university}</p>
                      <p className="text-gray-700">{edu.location}</p>
                    </div>

                    {/* Row 2: Degree - Date */}
                    <div className="flex justify-between">
                      <p className="text-gray-700">{edu.degree}</p>
                      <p className="text-gray-600">{edu.date}</p>
                    </div>

                    {/* Row 3: Field of Study - GPA */}
                    <div className="flex justify-between">
                      <p className="text-gray-700">{edu.fieldOfStudy}</p>
                      <p className="text-gray-600">Major GPA: {edu.gpa}</p>
                    </div>

                  </div>
                ))}
              </section>
            )}
            {/* Relevant Coursework */}
            {Array.isArray(data.relevantCoursework) && data.relevantCoursework.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold border-b mb-2">Relevant Coursework</h2>
                <p className="text-gray-700">
                  {data.relevantCoursework.join(", ")}
                </p>
              </section>
            )}

            {/* Skills */}

            {Array.isArray(data.skills) && data.skills.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold border-b mb-2">Technical Skills</h2>
                {data.skills.map((skill, i) => (
                  <div key={i} className="mb-2">
                    <p className="text-gray-800 font-bold text-sm">
                      Programming Languages: <span className="font-normal">{skill.programming}</span>
                    </p>
                    <p className="text-gray-800 font-bold text-sm">
                      Operating Systems: <span className="font-normal">{skill.operating}</span>
                    </p>
                    <p className="text-gray-800 font-bold text-sm">
                      Database: <span className="font-normal">{skill.database}</span>
                    </p>
                    <p className="text-gray-800 font-bold text-sm">
                      Software Tools: <span className="font-normal">{skill.software}</span>
                    </p>
                  </div>
                ))}
              </section>
            )}


            {/* Experience */}
            {Array.isArray(data.experience) && data.experience.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold border-b mb-2">Experience</h2>
                {data.experience.map((exp, i) => (
                  <div key={i} className="mb-3">
                    <p className="font-semibold">
                      {exp.position} @ {exp.company}
                    </p>
                    <p className="text-gray-500 text-sm">{exp.duration}</p>
                    {exp.description && (
                      <p className="text-gray-700 mt-1">{exp.description}</p>
                    )}
                  </div>
                ))}
              </section>
            )}



            {/* Projects */}
            {Array.isArray(data.projects) && data.projects.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold border-b mb-2">Projects</h2>
                {data.projects.map((proj, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between">
                      <p className="font-semibold">{proj.name}</p>
                      <p className="text-gray-500 text-sm">Tech: {proj.tech}</p>
                    </div>

                    {/* Convert description into bullets */}
                    <ul className="list-disc pl-5 mt-1">
                      {proj.description
                        ?.split(". ")
                        .filter(Boolean)
                        .map((line, idx) => (
                          <li key={idx}>{line.trim()}</li>
                        ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}

     

            {/* Interests */}
            {Array.isArray(data.achievement) && data.achievement.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold border-b mb-2">Achievement</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {data.achievement.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </section>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Preview;


