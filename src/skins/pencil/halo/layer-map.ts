/** Layer 名 ↔ site content 路径对照 / Pencil layer to site content bindings */
export const HALO_LAYER_MAP = {
  "Hero/Headline": "blocks.hero.headline",
  "Hero/Tagline": "blocks.hero.tagline",
  "Hero/Glow": "decorative",
  "Hero/Avatar": "constants.AVATAR_SRC",
  "Hero/CTA": "blocks.hero.ctas[0]",
  "Section/About": "blocks.about.title",
  "Card/About": "blocks.about.summaryBullets[]",
  "Section/Projects": "blocks.projects.title",
  "Card/Project": "blocks.projects.items[]",
  "Card/Project/Title": "blocks.projects.items[].title",
  "Card/Project/Meta": "blocks.projects.items[].period + company",
  "Card/Project/Description": "blocks.projects.items[].description",
  "Card/Project/Tags": "blocks.projects.items[].tags[]",
  "Section/Contact": "blocks.contact.title",
  "Card/Contact/Email": "blocks.contact.email",
  "Card/Contact/Phone": "blocks.contact.phone",
} as const;

export type HaloLayerName = keyof typeof HALO_LAYER_MAP;

/** Desktop frame node id in UI-Pencil-Halo.pen / Pencil Desktop 节点 id */
export const HALO_PEN_DESKTOP_ID = "N4q5X";

/** Last export date for re-export workflow / 最近导出日期 */
export const HALO_EXPORT_DATE = "2026-06-28";
