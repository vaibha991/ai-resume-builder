// "use client";

// import React, { useRef } from "react";
// import { Button } from "@/components/ui/button";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { ResumeData } from "@/lib/types1";

// interface PreviewProps {
//     data: ResumeData;
// }

// export default function ResumePreview({ data }: PreviewProps) {
//     const resumeRef = useRef<HTMLDivElement>(null);

//     const downloadPDF = async () => {
//         const element = resumeRef.current;
//         if (!element) return;

//         const canvas = await html2canvas(element, { scale: 2 });
//         const imgData = canvas.toDataURL("image/png");

//         const pdf = new jsPDF("p", "mm", "a4");
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//         pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//         pdf.save(`${data.name || "resume"}.pdf`);
//     };

//     return (
//         <div className="flex flex-col items-center p-4 space-y-4">
//             <Button onClick={downloadPDF}>Download PDF</Button>

//             <div
//                 ref={resumeRef}
//                 className="bg-white shadow-md w-[210mm] min-h-[297mm] mx-auto p-8 font-sans text-gray-800"
//             >
//                 {/* Header */}
//                 <div className="flex items-center gap-6 border-b pb-4 mb-4">
//                     {data.photo && (
//                         <img
//                             src={data.photo}
//                             alt="Profile"
//                             className="w-28 h-28 rounded-full object-cover border"
//                         />
//                     )}
//                     <div>
//                         <h1 className="text-3xl font-bold">{data.name}</h1>
//                         <p className="text-lg text-gray-600">{data.title}</p>
//                         <p className="text-sm mt-2">{data.location}</p>
//                         <div className="text-sm text-gray-500 space-x-2 mt-1">
//                             {data.email && <span>{data.email}</span>}
//                             {data.linkedin && (
//                                 <span>• <a href={data.linkedin}>LinkedIn</a></span>
//                             )}
//                             {data.github && (
//                                 <span>• <a href={data.github}>GitHub</a></span>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Summary */}
//                 {data.summary && (
//                     <section className="mb-4">
//                         <h2 className="text-xl font-semibold border-b mb-2">Summary</h2>
//                         <p className="text-sm leading-relaxed">{data.summary}</p>
//                     </section>
//                 )}

//                 {data.experience && data.experience.length > 0 && (
//                     <section className="mb-5">
//                         <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-2">
//                             Work History
//                         </h2>
//                         {data.experience.map((exp, i) => (
//                             <div key={i} className="mb-4">
//                                 <p className="font-semibold text-base">
//                                     {exp.position}{" "}
//                                     <span className="text-gray-700">- {exp.company}</span>
//                                 </p>
//                                 <p className="text-sm text-gray-500 mb-1">
//                                     {exp.duration} • {exp.location}
//                                 </p>
//                                 <p className="text-sm leading-relaxed">{exp.description}</p>
//                             </div>
//                         ))}
//                     </section>
//                 )}

//                 {/* EDUCATION */}
//                 {data.education && data.education.length > 0 && (
//                     <section className="mb-5">
//                         <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-2">
//                             Education
//                         </h2>
//                         {data.education.map((edu, i) => (
//                             <div key={i} className="mb-3">
//                                 <p className="font-semibold text-base">{edu.degree}</p>
//                                 <p className="text-sm text-gray-700">{edu.university}</p>
//                                 <p className="text-xs text-gray-500">{edu.date}</p>
//                             </div>
//                         ))}
//                     </section>
//                 )}

//                 {/* SKILLS */}
//                 {data.skill && data.skill.length > 0 && (
//                     <section className="mb-5">
//                         <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-2">
//                             Skills
//                         </h2>
//                         <div className="flex flex-wrap gap-2 text-sm">
//                             {data.skills.map((skill, i) => (
//                                 <span
//                                     key={i}
//                                     className="border px-3 py-1 rounded-md bg-gray-100"
//                                 >
//                                     {skill}
//                                 </span>
//                             ))}
//                         </div>
//                     </section>
//                 )}


//             </div>
//         </div>
//     );
// }
