// 📁 lib/types2.ts

// 🎓 Education section
export interface Education {
  university: string;
  degree: string;
  emphasis: string;
  location: string;
  date: string;
  gpa?: string;
}

// 💼 Work Experience section
export interface Experience {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  duration: string;
  position: string;
}

// 🧠 Skills Summary section
export interface Skills {
  technical: string; // e.g. "React, TypeScript, Node.js"
  soft?: string;  
  languages: string;
  frameworks: string;
  tools: string;
  platforms: string;   // e.g. "Leadership, Teamwork"
}

// 🧪 Project section
export interface Project {
  title: string;
  techStack: string;
  description: string;
  link?: string;
  name: string;
  duration: string;
  position: string;
  date: string;
}

// 🪪 Certificate section
export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  description: string;
}

// 🧾 Full Resume Structure
export interface ResumeData {
  // 🧍‍♂️ Personal Info
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  skillsSummary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skills;
  certificates: Certificate[];
  location: string;
  summary?: string;
}
