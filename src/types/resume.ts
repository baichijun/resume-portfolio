export interface ResumeProject {
  title: string;
  period: string;
  company: string;
  description: string;
  highlights: string[];
  techStack: string[];
  imageUrl: string | null;
  linkUrl: string | null;
}

export interface ResumeExperience {
  company: string;
  period: string;
  roles: ResumeRole[];
}

export interface ResumeRole {
  title: string;
  period?: string;
  sections: { heading: string; items: string[] }[];
  items: string[];
}

export interface ResumeEducation {
  school: string;
  degree: string;
  period: string;
}

export interface ResumeData {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  summary: string[];
  skills: string[];
  education: ResumeEducation[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  placeholders: string[];
}

export type ThemeId = "dark" | "glass" | "brutalist";

export interface ThemeMeta {
  id: ThemeId;
  label: string;
  description: string;
}
