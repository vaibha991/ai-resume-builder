// 🎓 Education section — matches Form3.tsx
export interface Education {
  university: string;
  degree: string;
  location: string;
  date: string;
  gpa?: string;
}

// 💼 Experience section — matches Form3.tsx
export interface Experience {
  position: string;
  company: string;
  location: string;
  duration: string;
  description: string;
}

// 🧠 Skills Section — matches your form structure
export interface Skills {
  technical: string;
  soft: string;
  languages: string;
  frameworks: string;
  tools: string;
  platforms: string;
}

export interface Project {
  title: string;
  name: string;
  tech: string;
  description: string;
  duration: string;
  position: string;
  date: string;
  link?: string;
}


// 🪪 Certificates — matches Form3.tsx
export interface Certificate {
  title: string;
  date: string;
  description: string;
  issuer?: string;
}

// 🧾 Full Resume Structure
export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  skillsSummary: string;
  summary: string;
  location: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  certificates: Certificate[];

  skills: Skills;
}
