/** 站点壳层文案（不在简历内容.md）/ Site chrome copy not sourced from resume markdown */

export const siteCopy = {
  documentTitle: "{name} | 个人简历",
  metaDescription: "{name} - 项目管理部经理个人简历",
  hero: {
    roleLine: "Project Manager · PMO",
    ctaPrimary: "查看项目",
    ctaSecondary: "联系我",
    ctaPrimaryHref: "#projects",
    ctaSecondaryHref: "#contact",
  },
  sections: {
    about: {
      id: "about",
      title: "关于我",
      subtitle: "个人优势、教育背景与核心技能",
      summaryHeading: "个人优势",
      educationHeading: "教育经历",
      skillsHeading: "核心技能",
    },
    projects: {
      id: "projects",
      title: "项目经历",
      subtitle: "智慧建筑、物联网与交通领域代表性项目",
    },
    contact: {
      id: "contact",
      title: "联系方式",
      subtitle: "欢迎通过以下方式联系",
      emailLabel: "邮箱",
      phoneLabel: "电话",
      githubLabel: "GitHub",
    },
  },
  nav: {
    hero: { href: "#hero", label: "首页" },
    about: { href: "#about", label: "关于" },
    projects: { href: "#projects", label: "项目" },
    contact: { href: "#contact", label: "联系" },
  },
  chrome: {
    menuOpen: "菜单",
    menuClose: "关闭",
    menuAriaLabel: "打开菜单",
    themeSwitcherTitle: "UI 皮肤对比",
    themeSwitcherAriaLabel: "切换 UI 皮肤",
    themeGroupSkill: "Skill 皮肤",
    themeGroupPencil: "Pencil 皮肤",
  },
  footer: "© {year} {name} · Resume Portfolio",
  projectCard: {
    expand: "展开全文",
    collapse: "收起",
  },
  missing: {
    fallback: "待补充",
  },
} as const;

/** 替换模板占位符 / Interpolate `{name}` and `{year}` in shell templates */
export function formatSiteTemplate(
  template: string,
  vars: { name?: string; year?: number },
): string {
  const year = vars.year ?? new Date().getFullYear();
  return template
    .replaceAll("{name}", vars.name ?? "")
    .replaceAll("{year}", String(year));
}

/** 浏览器标题 / Document title from resume name */
export function formatDocumentTitle(name: string): string {
  return formatSiteTemplate(siteCopy.documentTitle, { name });
}

/** SEO 描述 / Meta description from resume name */
export function formatMetaDescription(name: string): string {
  return formatSiteTemplate(siteCopy.metaDescription, { name });
}

/** 页脚文案 / Footer line from resume name */
export function formatFooterText(name: string): string {
  return formatSiteTemplate(siteCopy.footer, { name });
}
