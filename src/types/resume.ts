/** 简历数据结构 + 六皮肤 ThemeId / Resume domain types and six-skin theme ids */
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

export type ThemeId =
  | "skill-frontend-design"
  | "skill-ui-ux-pro-max"
  | "skill-design-taste"
  | "pencil-shadcn"
  | "pencil-lunaris"
  | "pencil-halo";

export type ThemeSource = "skill" | "pencil";

export interface ThemeMeta {
  id: ThemeId;
  label: string;
  description: string;
  source: ThemeSource;
  toolLabel: string;
}
