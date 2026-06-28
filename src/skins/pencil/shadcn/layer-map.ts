import { siteCopy } from "@/config/siteCopy";

/** Layer 名 ↔ ResumeData 字段对照 / Pencil layer to resume data bindings */
export const SHADCN_LAYER_MAP = {
  "Hero/Headline": "name",
  "Hero/Tagline": "tagline",
  "Hero/CTA": `anchor:${siteCopy.hero.ctaPrimaryHref}`,
  "Section/About": `static:${siteCopy.sections.about.title}`,
  "Card/About": "summary[]",
  "Section/Projects": `static:${siteCopy.sections.projects.title}`,
  "Card/Project": "projects[]",
  "Card/Project/Title": "projects[].title",
  "Card/Project/Meta": "projects[].period + projects[].company",
  "Card/Project/Description": "projects[].description",
  "Card/Project/Tags": "projects[].techStack[]",
  "Section/Contact": `static:${siteCopy.sections.contact.title}`,
  "Card/Contact/Email": "email",
  "Card/Contact/Phone": "phone",
} as const;

export type ShadcnLayerName = keyof typeof SHADCN_LAYER_MAP;

/** Desktop frame node id in UI-Pencil-Shadcn.pen / Pencil Desktop 节点 id */
export const SHADCN_PEN_DESKTOP_ID = "yc9zJ";

/** Last export date for re-export workflow / 最近导出日期 */
export const SHADCN_EXPORT_DATE = "2026-06-28";
