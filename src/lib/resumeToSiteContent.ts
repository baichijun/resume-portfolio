import type { ResumeData } from "@/types/resume";
import type {
  AboutBlock,
  ContactBlock,
  ExperienceBlock,
  HeroBlock,
  ProjectsBlock,
  ProjectItem,
  SiteContent,
} from "@/types/siteContent";

/** 默认区块标题与壳层文案种子 / Default section labels when mapping resume */
const DEFAULT_LABELS = {
  heroNav: "首页",
  aboutNav: "关于",
  projectsNav: "项目",
  contactNav: "联系",
  roleLine: "Project Manager · PMO",
  ctaPrimary: "查看项目",
  ctaSecondary: "联系我",
  aboutTitle: "关于我",
  aboutSubtitle: "个人优势、教育背景与核心技能",
  summaryHeading: "个人优势",
  educationHeading: "教育经历",
  skillsHeading: "核心技能",
  projectsTitle: "项目经历",
  projectsSubtitle: "智慧建筑、物联网与交通领域代表性项目",
  contactTitle: "联系方式",
  contactSubtitle: "欢迎通过以下方式联系",
  emailLabel: "邮箱",
  phoneLabel: "电话",
  githubLabel: "GitHub",
  experienceTitle: "工作经历",
  experienceSubtitle: "项目管理与研发交付经历",
  documentTitle: "{name} | 个人简历",
  metaDescription: "{name} - 项目管理部经理个人简历",
  footer: "© {year} {name} · Resume Portfolio",
} as const;

function mapProjectItem(project: ResumeData["projects"][number]): ProjectItem {
  return {
    title: project.title,
    period: project.period,
    company: project.company,
    description: project.description,
    tags: project.techStack,
    highlights: project.highlights,
    imageUrl: project.imageUrl,
    linkUrl: project.linkUrl,
  };
}

/** 从 ResumeData 构建默认 SiteContent / Build default site content from parsed resume */
export function resumeToSiteContent(data: ResumeData): SiteContent {
  const intro = data.summary.slice(0, 3).join("；");

  const hero: HeroBlock = {
    type: "hero",
    id: "hero",
    nav: { show: true, label: DEFAULT_LABELS.heroNav },
    source: "resume",
    roleLine: DEFAULT_LABELS.roleLine,
    headline: data.name,
    tagline: data.tagline,
    intro,
    ctas: [
      {
        label: DEFAULT_LABELS.ctaPrimary,
        href: "#projects",
        variant: "primary",
      },
      {
        label: DEFAULT_LABELS.ctaSecondary,
        href: "#contact",
        variant: "secondary",
      },
    ],
  };

  const about: AboutBlock = {
    type: "about",
    id: "about",
    nav: { show: true, label: DEFAULT_LABELS.aboutNav },
    source: "resume",
    title: DEFAULT_LABELS.aboutTitle,
    subtitle: DEFAULT_LABELS.aboutSubtitle,
    summaryHeading: DEFAULT_LABELS.summaryHeading,
    educationHeading: DEFAULT_LABELS.educationHeading,
    skillsHeading: DEFAULT_LABELS.skillsHeading,
    summaryBullets: data.summary,
    education: data.education.map((edu) => ({
      school: edu.school,
      degree: edu.degree,
      period: edu.period,
    })),
    skills: data.skills,
  };

  const projects: ProjectsBlock = {
    type: "projects",
    id: "projects",
    nav: { show: true, label: DEFAULT_LABELS.projectsNav },
    source: "resume",
    title: DEFAULT_LABELS.projectsTitle,
    subtitle: DEFAULT_LABELS.projectsSubtitle,
    items: data.projects.map(mapProjectItem),
  };

  const contact: ContactBlock = {
    type: "contact",
    id: "contact",
    nav: { show: true, label: DEFAULT_LABELS.contactNav },
    source: "resume",
    title: DEFAULT_LABELS.contactTitle,
    subtitle: DEFAULT_LABELS.contactSubtitle,
    emailLabel: DEFAULT_LABELS.emailLabel,
    phoneLabel: DEFAULT_LABELS.phoneLabel,
    githubLabel: DEFAULT_LABELS.githubLabel,
    email: data.email,
    phone: data.phone,
    githubUrl: null,
  };

  const experience: ExperienceBlock = {
    type: "experience",
    id: "experience",
    nav: { show: false, label: "经历" },
    source: "resume",
    title: DEFAULT_LABELS.experienceTitle,
    subtitle: DEFAULT_LABELS.experienceSubtitle,
    items: data.experience.map((exp) => ({
      company: exp.company,
      period: exp.period,
      roles: exp.roles.map((role) => ({
        title: role.title,
        period: role.period,
        sections: role.sections,
        items: role.items,
      })),
    })),
  };

  return {
    version: 1,
    meta: {
      documentTitle: DEFAULT_LABELS.documentTitle,
      metaDescription: DEFAULT_LABELS.metaDescription,
      footer: DEFAULT_LABELS.footer,
    },
    blocks: [hero, about, projects, contact, experience],
  };
}
