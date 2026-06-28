/**
 * Pencil export helper — prints MCP export_html workflow per theme.
 * 打印各 Pencil 皮肤的 export_html 工作流说明
 *
 * Usage:
 *   node scripts/pen-export-theme.mjs shadcn
 *   node scripts/pen-export-theme.mjs lunaris
 *   node scripts/pen-export-theme.mjs halo
 *
 * Requires: target .pen open in Pencil, then Agent calls export_html MCP.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const THEMES = {
  shadcn: {
    pen: "design/UI-Pencil-Shadcn.pen",
    themeId: "pencil-shadcn",
    bootstrap: "scripts/pen-bootstrap-shadcn.js",
    outDir: "src/skins/pencil/shadcn/export",
  },
  lunaris: {
    pen: "design/UI-Pencil-Lunaris.pen",
    themeId: "pencil-lunaris",
    bootstrap: "scripts/pen-bootstrap-lunaris.js",
    outDir: "src/skins/pencil/lunaris/export",
  },
  halo: {
    pen: "design/UI-Pencil-Halo.pen",
    themeId: "pencil-halo",
    bootstrap: "scripts/pen-bootstrap-halo.js",
    outDir: "src/skins/pencil/halo/export",
  },
};

const key = process.argv[2];

if (!key || !THEMES[key]) {
  console.error("Usage: node scripts/pen-export-theme.mjs <shadcn|lunaris|halo>");
  process.exit(1);
}

const cfg = THEMES[key];
const bootstrap = readFileSync(path.join(ROOT, cfg.bootstrap), "utf8");

console.log(`# Pencil export: ${key}`);
console.log(`# 1. Open ${cfg.pen} ONLY in Pencil`);
console.log(`# 2. Apply Design Goodies → Design Systems → ${key === "shadcn" ? "Shadcn UI" : key[0].toUpperCase() + key.slice(1)}`);
console.log(`# 3. If empty, run batch_design from ${cfg.bootstrap}`);
console.log(`# 4. Ctrl+S save`);
console.log(`# 5. batch_get → find Desktop/Mobile node ids`);
console.log(`# 6. export_html({ filePath, nodeIds: [desktopId], outputPath: "${ROOT.replace(/\\\\/g, "/")}/${cfg.outDir}/desktop.html", format: "html-tailwind", includeLayerNames: true })`);
console.log(`# 7. Agent converts HTML → React in src/skins/pencil/${key}/`);
console.log("");
console.log("--- bootstrap (batch_design input) ---");
console.log(bootstrap);
