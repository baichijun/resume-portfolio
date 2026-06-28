/**
 * Print Pencil hydrate values from content/site.json + layer-map
 * 从站点内容生成 Pencil hydrate 对照表
 *
 * Usage: npx tsx scripts/pen-hydrate-content.ts halo
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { SiteContent } from "../src/types/siteContent.ts";
import {
  formatContentPathValue,
  resolveContentPath,
} from "../src/lib/contentPathResolver.ts";
import { HALO_LAYER_MAP } from "../src/skins/pencil/halo/layer-map.ts";
import { LUNARIS_LAYER_MAP } from "../src/skins/pencil/lunaris/layer-map.ts";
import { SHADCN_LAYER_MAP } from "../src/skins/pencil/shadcn/layer-map.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONTENT_PATH = path.join(ROOT, "content", "site.json");

const THEMES = {
  halo: { pen: "design/UI-Pencil-Halo.pen", map: HALO_LAYER_MAP },
  lunaris: { pen: "design/UI-Pencil-Lunaris.pen", map: LUNARIS_LAYER_MAP },
  shadcn: { pen: "design/UI-Pencil-Shadcn.pen", map: SHADCN_LAYER_MAP },
} as const;

const themeKey = process.argv[2] as keyof typeof THEMES | undefined;

if (!themeKey || !THEMES[themeKey]) {
  console.error("Usage: npx tsx scripts/pen-hydrate-content.ts <halo|lunaris|shadcn>");
  process.exit(1);
}

const cfg = THEMES[themeKey];
const content = JSON.parse(readFileSync(CONTENT_PATH, "utf8")) as SiteContent;

console.log(`# Pencil hydrate: ${themeKey}`);
console.log(`# 1. Open ${cfg.pen} ONLY in Pencil`);
console.log("# 2. Agent: batch_get → find nodes by layer name");
console.log("# 3. batch_design Update text content from table below");
console.log("# 4. Ctrl+S save");
console.log("");
console.log("| Layer | Content path | Value |");
console.log("|-------|--------------|-------|");

for (const [layer, contentPath] of Object.entries(cfg.map)) {
  const raw = resolveContentPath(content, contentPath);
  const formatted = formatContentPathValue(raw);
  if (!formatted) continue;
  const preview =
    formatted.length > 80 ? `${formatted.slice(0, 80)}…` : formatted;
  console.log(`| ${layer} | ${contentPath} | ${preview.replace(/\|/g, "\\|")} |`);
}

console.log("");
console.log(
  "# Projects: hydrate first 2 Card/Project templates; live site maps all items.",
);
