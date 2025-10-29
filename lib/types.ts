// lib/type.ts

// Single interface for Resume sections
export interface ResumeSection {
  id: string;      // unique identifier for each section
  title: string;   // section title, e.g. "Experience", "Education"
  content: string; // section content
}

// Project type
export interface Project {
  name: string;
  description: string;
  link: string;
}
export interface Skill {
  name: string;
  details?: string[]; // sub-points under the skill
}
export interface Experience {
  role: string;
  company: string;
  date: string;
  points: string[];
  description?: string; // ✅ string, not array
}

export interface Education {
    degree: string;
    school: string;
    date: string;
}
// Main resume data structure
export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string; 
  summary: string;
  skills: Skill[];   // 🔥 FIXED: now uses Skill interface
  experiences: {
    role: string;
    company: string;
    date: string;
    points: string[];
    description?: string; 
  }[];
  education: {
    degree: string;
    school: string;
    date: string;
  }[];
  languages: { preference: string }[];
  interests: string[];
  projects: Project[];
}

