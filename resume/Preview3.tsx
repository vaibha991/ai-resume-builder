"use client";

import React, { useRef, useCallback } from "react";
import { ResumeData } from "@/lib/types2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PreviewProps {
  data: ResumeData;
}

const Preview: React.FC<PreviewProps> = ({ data }) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    const element = resumeRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 3, backgroundColor: "#ffffff" });
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
  }, [data.name]);

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <Button onClick={handleDownload}>Download PDF</Button>
      </div>

      <div ref={resumeRef} className="p-6 bg-white text-gray-900 max-w-3xl mx-auto">

        {/* Header */}
        <div className="border-b pb-3 mb-4">
          <h1 className="text-2xl font-bold">{data.name}</h1>
          <p className="text-sm">{data.email} | {data.phone}</p>
          <p className="text-sm">{data.location}</p>
          <p className="flex flex-wrap gap-3 mt-1 text-sm text-blue-600">{data.linkedin} </p>

        </div>

        {/* Education */}
        <Section title="EDUCATION">
          {data.education?.map((e, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between">
                <strong>{e.university}</strong>
                <span className="text-sm text-gray-600">{e.location}</span>
              </div>
              <p className="text-sm italic">
                {e.degree}, {e.emphasis} ({e.date})
              </p>
              {e.gpa && <p className="text-sm">GPA: {e.gpa}</p>}
            </div>
          ))}
        </Section>

        {/* Skills */}
        <Section title="SKILLS SUMMARY">
          <p><strong>Languages:</strong> {data.skills.languages}</p>
          <p><strong>Frameworks:</strong> {data.skills.frameworks}</p>
          <p><strong>Tools:</strong> {data.skills.tools}</p>
          <p><strong>Platforms:</strong> {data.skills.platforms}</p>
          <p><strong>Soft Skills:</strong> {data.skills.soft}</p>
        </Section>

        {/* Experience */}
        <Section title="WORK EXPERIENCE">
          {data.experience?.map((exp, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between">
                <strong>{exp.role} — {exp.company}</strong>
                <span className="text-sm text-gray-500">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="text-sm text-gray-600">{exp.location}</p>
              <ul className="list-disc ml-6 mt-1 text-sm">
                {exp.description.split("\n").map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
          ))}
        </Section>

        {/* Projects */}
        <Section title="PROJECTS">
          {data.projects?.map((proj, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between">
                <strong>{proj.title}</strong>
                {proj.link && <a href={proj.link} className="text-blue-600 text-sm">Link</a>}
              </div>
              <p className="text-sm italic">{proj.techStack}</p>
              <ul className="list-disc ml-6 mt-1 text-sm">
                {proj.description.split("\n").map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
          ))}
        </Section>

        {/* Certificates */}
        <Section title="CERTIFICATES">
          {data.certificates?.map((cert, idx) => (
            <div key={idx} className="mb-2 flex justify-between">
              <span><strong>{cert.title}</strong> | {cert.issuer}</span>
              <span className="text-sm text-gray-500">{cert.date}</span>
            </div>
          ))}
        </Section>
      </div>
    </div>
  );
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="mb-4 border-none shadow-none">
      <CardContent className="p-0">
        <h2 className="text-lg font-semibold border-b mb-2">{title}</h2>
        {children}
      </CardContent>
    </Card>
  );
}

export default Preview;
