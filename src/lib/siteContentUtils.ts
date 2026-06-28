import type {
  AboutBlock,
  ContactBlock,
  HeroBlock,
  NavItem,
  ProjectsBlock,
  SiteBlock,
  SiteBlockType,
  SiteContent,
} from "@/types/siteContent";

/** 按 id 查找块 / Find block by anchor id */
export function getBlockById(content: SiteContent, id: string): SiteBlock | undefined {
  return content.blocks.find((block) => block.id === id);
}

/** 按 type 查找块（首个）/ Find first block by type */
export function getBlockByType<T extends SiteBlockType>(
  content: SiteContent,
  type: T,
): SiteBlock & { type: T } | undefined {
  const block = content.blocks.find((b) => b.type === type);
  return block as (SiteBlock & { type: T }) | undefined;
}

/** Hero 块快捷访问 / Hero block accessor */
export function getHeroBlock(content: SiteContent): HeroBlock | undefined {
  return getBlockByType(content, "hero");
}

/** About 块快捷访问 / About block accessor */
export function getAboutBlock(content: SiteContent): AboutBlock | undefined {
  return getBlockByType(content, "about");
}

/** Projects 块快捷访问 / Projects block accessor */
export function getProjectsBlock(content: SiteContent): ProjectsBlock | undefined {
  return getBlockByType(content, "projects");
}

/** Contact 块快捷访问 / Contact block accessor */
export function getContactBlock(content: SiteContent): ContactBlock | undefined {
  return getBlockByType(content, "contact");
}

/** 从块 nav 生成顶栏项 / Build header nav from blocks with nav.show */
export function getNavItems(content: SiteContent): NavItem[] {
  return content.blocks
    .filter((block) => block.nav.show)
    .map((block) => ({
      href: `#${block.id}`,
      label: block.nav.label,
    }));
}

/** 替换 meta 模板占位符 / Interpolate `{name}` and `{year}` in content meta */
export function formatContentTemplate(
  template: string,
  vars: { name?: string; year?: number },
): string {
  const year = vars.year ?? new Date().getFullYear();
  return template
    .replaceAll("{name}", vars.name ?? "")
    .replaceAll("{year}", String(year));
}

/** 项目展示用标签 / Tags for project card display — real tags only */
export function getProjectDisplayTags(item: ProjectsBlock["items"][number]): string[] {
  return item.tags;
}

/** 主 CTA / Primary CTA from hero ctas */
export function getPrimaryCta(hero: HeroBlock): HeroBlock["ctas"][number] | undefined {
  return hero.ctas.find((cta) => cta.variant === "primary") ?? hero.ctas[0];
}
