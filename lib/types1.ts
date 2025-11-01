// 
export interface Education {
  university: string;
  degree: string;
  emphasis: string;
  fieldOfStudy: string;
  location: string;
  date: string;
  gpa: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description?: string;
  location: string;
}

export interface Skill {
  programming: string;
  operating: string;
  database: string;
  software: string;
  frameworks: string;
  cloud: string;
  languages: string;
}

export interface Project {
  name: string;
  description?: string;
  tech: string;
}

export interface ResumeData {
  id?: string;
  name: string;
  title: string;
  jobtitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  degree: string;
  skills: Skill[];          
  photo?: string;
  relevantCoursework?: string[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  interests: string[];
  languages: string[];
  achievement: string[];
}
