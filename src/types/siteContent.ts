/** 内容块来源 / Whether block data came from resume import or manual edit */
export type ContentSource = "resume" | "manual";

/** 顶栏导航项 / Nav visibility and label for a block */
export interface BlockNav {
  show: boolean;
  label: string;
}

/** CTA 按钮 / Call-to-action link */
export interface ContentCta {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

/** Hero 块 / Hero block */
export interface HeroBlock {
  type: "hero";
  id: string;
  nav: BlockNav;
  source: ContentSource;
  roleLine?: string;
  headline: string;
  tagline: string;
  intro?: string;
  ctas: ContentCta[];
}

/** 教育条目 / Education line in about block */
export interface AboutEducation {
  school: string;
  degree: string;
  period: string;
}

/** 关于我块 / About block */
export interface AboutBlock {
  type: "about";
  id: string;
  nav: BlockNav;
  source: ContentSource;
  title: string;
  subtitle?: string;
  summaryHeading: string;
  educationHeading: string;
  skillsHeading: string;
  summaryBullets: string[];
  education: AboutEducation[];
  skills: string[];
}

/** 项目卡片 / Project card in projects block */
export interface ProjectItem {
  title: string;
  period: string;
  company: string;
  description: string;
  tags: string[];
  highlights?: string[];
  imageUrl?: string | null;
  linkUrl?: string | null;
}

/** 项目经历块 / Projects block */
export interface ProjectsBlock {
  type: "projects";
  id: string;
  nav: BlockNav;
  source: ContentSource;
  title: string;
  subtitle?: string;
  items: ProjectItem[];
}

/** 联系方式块 / Contact block */
export interface ContactBlock {
  type: "contact";
  id: string;
  nav: BlockNav;
  source: ContentSource;
  title: string;
  subtitle?: string;
  emailLabel: string;
  phoneLabel: string;
  githubLabel: string;
  email: string;
  phone: string;
  githubUrl?: string | null;
}

/** 工作经历角色 / Role within experience block */
export interface ExperienceRole {
  title: string;
  period?: string;
  sections: { heading: string; items: string[] }[];
  items: string[];
}

/** 工作经历条目 / Company entry in experience block */
export interface ExperienceItem {
  company: string;
  period: string;
  roles: ExperienceRole[];
}

/** 工作经历块（首期可不渲染）/ Experience block — optional UI */
export interface ExperienceBlock {
  type: "experience";
  id: string;
  nav: BlockNav;
  source: ContentSource;
  title: string;
  subtitle?: string;
  items: ExperienceItem[];
}

/** 自定义段落块 / Freeform custom block */
export interface CustomBlock {
  type: "custom";
  id: string;
  nav: BlockNav;
  source: ContentSource;
  title: string;
  body: string;
}

/** 站点内容块联合 / Discriminated union of site blocks */
export type SiteBlock =
  | HeroBlock
  | AboutBlock
  | ProjectsBlock
  | ContactBlock
  | ExperienceBlock
  | CustomBlock;

export type SiteBlockType = SiteBlock["type"];

/** 页面 meta 模板 / Document meta templates with `{name}` `{year}` */
export interface SiteContentMeta {
  documentTitle: string;
  metaDescription: string;
  footer: string;
}

/** 站点内容根 / Runtime source of truth for page copy */
export interface SiteContent {
  version: 1;
  meta: SiteContentMeta;
  blocks: SiteBlock[];
}

/** 顶栏导航 / Header nav item derived from blocks */
export interface NavItem {
  href: string;
  label: string;
}
