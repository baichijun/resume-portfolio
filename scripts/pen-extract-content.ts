/**
 * Merge Pencil-extracted layer text into content/site.json
 * 将 Pencil 提取的 layer 文本合并进站点内容
 *
 * Input JSON shape: { "Hero/Headline": "...", "Section/About": "..." }
 *
 * Usage: npx tsx scripts/pen-extract-content.ts halo design/pen-extract-halo.json
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type {
  AboutBlock,
  HeroBlock,
  SiteContent,
} from "../src/types/siteContent.ts";
import { HALO_LAYER_MAP } from "../src/skins/pencil/halo/layer-map.ts";
import { LUNARIS_LAYER_MAP } from "../src/skins/pencil/lunaris/layer-map.ts";
import { SHADCN_LAYER_MAP } from "../src/skins/pencil/shadcn/layer-map.ts";
import { getBlockByType } from "../src/lib/siteContentUtils.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONTENT_PATH = path.join(ROOT, "content", "site.json");

const THEMES = {
  halo: HALO_LAYER_MAP,
  lunaris: LUNARIS_LAYER_MAP,
  shadcn: SHADCN_LAYER_MAP,
} as const;

const themeKey = process.argv[2] as keyof typeof THEMES | undefined;
const extractPath = process.argv[3];

if (!themeKey || !THEMES[themeKey] || !extractPath) {
  console.error(
    "Usage: npx tsx scripts/pen-extract-content.ts <halo|lunaris|shadcn> <extract.json>",
  );
  process.exit(1);
}

const fullExtractPath = path.isAbsolute(extractPath)
  ? extractPath
  : path.join(ROOT, extractPath);

if (!existsSync(fullExtractPath)) {
  console.error(`Extract file not found: ${fullExtractPath}`);
  process.exit(1);
}

const layerMap = THEMES[themeKey];
const extracted = JSON.parse(readFileSync(fullExtractPath, "utf8")) as Record<
  string,
  string
>;
const content = JSON.parse(readFileSync(CONTENT_PATH, "utf8")) as SiteContent;

function applyLayer(layer: string, value: string) {
  const contentPath = layerMap[layer as keyof typeof layerMap];
  if (!contentPath || contentPath === "decorative") return;

  if (layer === "Hero/Headline") {
    const hero = getBlockByType(content, "hero");
    if (hero) {
      (hero as HeroBlock).headline = value;
      hero.source = "manual";
    }
    return;
  }
  if (layer === "Hero/Tagline") {
    const hero = getBlockByType(content, "hero");
    if (hero) {
      hero.tagline = value;
      hero.source = "manual";
    }
    return;
  }
  if (layer === "Hero/CTA") {
    const hero = getBlockByType(content, "hero");
    if (hero && hero.ctas[0]) {
      hero.ctas[0].label = value;
      hero.source = "manual";
    }
    return;
  }
  if (layer === "Section/About") {
    const about = getBlockByType(content, "about");
    if (about) {
      about.title = value;
      about.source = "manual";
    }
    return;
  }
  if (layer === "Section/Projects") {
    const projects = getBlockByType(content, "projects");
    if (projects) {
      projects.title = value;
      projects.source = "manual";
    }
    return;
  }
  if (layer === "Section/Contact") {
    const contact = getBlockByType(content, "contact");
    if (contact) {
      contact.title = value;
      contact.source = "manual";
    }
    return;
  }
  if (layer === "Card/About") {
    const about = getBlockByType(content, "about");
    if (about) {
      (about as AboutBlock).summaryBullets = value
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      about.source = "manual";
    }
  }
}

for (const [layer, value] of Object.entries(extracted)) {
  if (typeof value !== "string") continue;
  applyLayer(layer, value);
}

writeFileSync(CONTENT_PATH, `${JSON.stringify(content, null, 2)}\n`, "utf8");
console.log(`Updated ${CONTENT_PATH} from ${fullExtractPath}`);
