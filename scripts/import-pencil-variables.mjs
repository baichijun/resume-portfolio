/**
 * Map Pencil get_variables JSON to design/tokens/{theme}.json
 * 将 Pencil MCP get_variables 输出写入 token JSON
 *
 * Usage:
 *   node scripts/import-pencil-variables.mjs dark < vars.json
 *   node scripts/import-pencil-variables.mjs glass design/tokens/glass.raw.json
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const PEN_TO_CSS = {
  bg: "--theme-bg",
  "bg-secondary": "--theme-bg-secondary",
  "text-primary": "--theme-text",
  "text-muted": "--theme-text-muted",
  accent: "--theme-accent",
  "accent-secondary": "--theme-accent-secondary",
  border: "--theme-border",
  "card-bg": "--theme-card",
  "card-hover": "--theme-card-hover",
  "radius-md": "--theme-radius",
  shadow: "--theme-shadow",
  "font-display": "--theme-font-display",
};

const SOURCE_PEN = {
  dark: "design/UI-Dark.pen",
  glass: "design/UI-Glass.pen",
  brutalist: "design/UI-Brutalist.pen",
};

function hexToRgba(hex) {
  const raw = String(hex).replace("#", "");
  if (raw.length === 8) {
    const r = parseInt(raw.slice(0, 2), 16);
    const g = parseInt(raw.slice(2, 4), 16);
    const b = parseInt(raw.slice(4, 6), 16);
    const a = parseInt(raw.slice(6, 8), 16) / 255;
    return `rgba(${r}, ${g}, ${b}, ${Number(a.toFixed(2))})`;
  }
  if (raw.length === 6) {
    return `#${raw.toLowerCase()}`;
  }
  return hex;
}

function mapValue(name, entry) {
  if (entry?.type === "number") {
    return entry.value;
  }
  if (entry?.type === "string") {
    return name === "font-display" ? entry.value : entry.value;
  }
  if (entry?.type === "color") {
    return hexToRgba(entry.value);
  }
  return entry?.value;
}

export function pencilVariablesToTokenJson(themeId, pencilPayload) {
  const vars = pencilPayload.variables ?? pencilPayload;
  const variables = {};

  for (const [penKey, cssKey] of Object.entries(PEN_TO_CSS)) {
    if (vars[penKey] !== undefined) {
      variables[cssKey] = mapValue(penKey, vars[penKey]);
    }
  }

  return {
    themeId,
    sourcePen: SOURCE_PEN[themeId],
    variables,
  };
}

async function main() {
  const themeId = process.argv[2];
  const inputPath = process.argv[3];

  if (!themeId || !SOURCE_PEN[themeId]) {
    console.error("Usage: node scripts/import-pencil-variables.mjs <dark|glass|brutalist> [input.json]");
    process.exit(1);
  }

  const raw = inputPath
    ? await readFile(path.resolve(ROOT, inputPath), "utf8")
    : await readFile(0, "utf8");

  const payload = JSON.parse(raw);
  const tokenJson = pencilVariablesToTokenJson(themeId, payload);
  const outPath = path.join(ROOT, "design", "tokens", `${themeId}.json`);
  await writeFile(outPath, `${JSON.stringify(tokenJson, null, 2)}\n`, "utf8");
  console.log(`Wrote ${path.relative(ROOT, outPath)}`);
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
