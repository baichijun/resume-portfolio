/**
 * Sync design token JSON files to generated theme CSS.
 * 将 design/tokens/*.json 同步为 src/styles/themes/*.generated.css
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TOKENS_DIR = path.join(ROOT, "design", "tokens");
const OUT_DIR = path.join(ROOT, "src", "styles", "themes");

const THEME_IDS = ["dark", "glass", "brutalist"];

const PEN_TO_CSS = {
  "--theme-bg": "--theme-bg",
  "--theme-bg-secondary": "--theme-bg-secondary",
  "--theme-text": "--theme-text",
  "--theme-text-muted": "--theme-text-muted",
  "--theme-accent": "--theme-accent",
  "--theme-accent-secondary": "--theme-accent-secondary",
  "--theme-border": "--theme-border",
  "--theme-card": "--theme-card",
  "--theme-card-hover": "--theme-card-hover",
  "--theme-radius": "--theme-radius",
  "--theme-shadow": "--theme-shadow",
  "--theme-font-display": "--theme-font-display",
};

function formatCssValue(name, value) {
  if (name === "--theme-radius") {
    const num = Number(value);
    if (!Number.isNaN(num)) {
      return num === 0 ? "0" : `${num / 16}rem`;
    }
  }
  if (name === "--theme-font-display") {
    return `var(--font-display)`;
  }
  return String(value);
}

function renderThemeCss(themeId, variables) {
  const lines = Object.entries(PEN_TO_CSS)
    .filter(([key]) => variables[key] !== undefined)
    .map(
      ([key, cssVar]) =>
        `  ${cssVar}: ${formatCssValue(key, variables[key])};`,
    );

  return [
    `/* AUTO-GENERATED from design/tokens/${themeId}.json — do not edit */`,
    `[data-theme="${themeId}"] {`,
    ...lines,
    "}",
    "",
  ].join("\n");
}

async function syncTheme(themeId) {
  const tokenPath = path.join(TOKENS_DIR, `${themeId}.json`);
  const raw = await readFile(tokenPath, "utf8");
  const data = JSON.parse(raw);
  const css = renderThemeCss(themeId, data.variables);
  const outPath = path.join(OUT_DIR, `${themeId}.generated.css`);
  await writeFile(outPath, css, "utf8");
  console.log(`Synced ${themeId} -> ${path.relative(ROOT, outPath)}`);
}

async function main() {
  const only = process.argv[2];
  const targets = only ? [only] : THEME_IDS;

  for (const id of targets) {
    if (!THEME_IDS.includes(id)) {
      console.error(`Unknown theme "${id}". Use: dark | glass | brutalist`);
      process.exit(1);
    }
  }

  await mkdir(OUT_DIR, { recursive: true });

  for (const id of targets) {
    await syncTheme(id);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
