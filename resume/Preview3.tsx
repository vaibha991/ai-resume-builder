"use client";

import React, { useRef, useCallback } from "react";
import { ResumeData } from "@/lib/types2";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";

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


  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <Button onClick={handleDownload}>Download PDF</Button>
      </div>

      <div ref={resumeRef} className="p-6 bg-white text-gray-900 max-w-3xl mx-auto">

        {/* Header */}
        <div className="border-b pb-3 mb-4">
          <div className="flex justify-between items-center w-full flex-wrap gap-1">
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <p className="text-sm text-gray-700">Email: {data.email}</p>
          </div>

          <div className="flex justify-between items-center mt-1 text-sm w-full">
            <p className="text-blue-600">LinkedIn: {data.linkedin}</p>
            <p>Phone: {data.phone}</p>
          </div>


        </div>

        {/* Education */}
        {/* Education Title */}
        <div className="text-center text-xl font-semibold border-b pb-2 mb-4">
          EDUCATION
        </div>

        <div className="mb-4">
          {data.education?.map((e, i) => (
            <div key={i} className="mb-3">

              <div className="flex justify-between">
                <strong>{e.university}</strong>
                <span className="text-sm text-gray-600">{e.location}</span>
              </div>

              <div className="flex justify-between items-center mt-1 text-sm w-full">
                <p className="text-sm italic">{e.degree}; GPA: {e.gpa}</p>
                <p>{e.date}</p>
              </div>

            </div>
          ))}
        </div>


        {/* Skills */}

        <div className="text-center text-xl font-semibold border-b pb-2 mb-4">
          SKILLS SUMMARY
        </div>

        <div className="mb-4 text-sm space-y-1">
          <p><strong>Languages:</strong> {data.skills.languages}</p>
          <p><strong>Frameworks:</strong> {data.skills.frameworks}</p>
          <p><strong>Tools:</strong> {data.skills.tools}</p>
          <p><strong>Platforms:</strong> {data.skills.platforms}</p>
          <p><strong>Soft Skills:</strong> {data.skills.soft}</p>
        </div>


        {/* Experience */}

        <div className="text-center text-xl font-semibold border-b pb-2 mb-4">
          WORK EXPERIENCE
        </div>

        <div className="mb-4">
          {data.experience?.map((e, i) => (
            <div key={i} className="mb-3">

              <div className="flex justify-between">
                <strong>{e.position}</strong>
                <span className="text-sm text-gray-600">{e.location}</span>
              </div>

              <div className="flex justify-between text-sm italic">
                <span>{e.company}</span>
                <span>{e.duration}</span>
              </div>


              <div className="mt-1 space-y-1 whitespace-pre-line break-words break-all">
                {e.description?.split("\n").map((line, idx) => (
                  <p key={idx} className="text-sm leading-snug">• {line}</p>
                ))}
              </div>

            </div>
          ))}
        </div>


        {/* Projects */}
        <div className="text-center text-xl font-semibold border-b pb-2 mb-4">
          PROJECTS
        </div>

        {/* Projects List (no Section wrapper) */}
        <div className="mb-4">
          {data.projects?.map((proj, i) => (
            <div key={i} className="mb-3">

              {/* Title + Duration */}
              <div className="flex justify-between">
                <strong>{proj.title}</strong>
                <span className="text-sm text-gray-600">{proj.duration}</span>
              </div>

              {/* Description */}
              <div className="mt-1 space-y-1 whitespace-pre-line break-words break-all">
                {proj.description?.split("\n").map((line, idx) => (
                  <p key={idx} className="text-sm leading-snug">• {line}</p>
                ))}
              </div>

            </div>
          ))}
        </div>



        {/* Certificates */}
        <div className="text-center text-xl font-semibold border-b pb-2 mb-4">
          CERTIFICATES
        </div>

        {/* Certificates List without Section border */}
        <div className="mb-4">
          {data.certificates?.map((cert, idx) => (
            <div key={idx} className="mb-3">

              <div className="flex justify-between">
                <span>
                  <strong>{cert.title}</strong> | {cert.issuer}
                </span>
                <span className="text-sm text-gray-500">{cert.date}</span>
              </div>

              <div className="mt-1 whitespace-pre-line break-words break-all">
                <p className="text-sm leading-snug">• {cert.description}</p>
              </div>

            </div>
          ))}
        </div>



      </div>
    </div>
  );
};



export default Preview;
