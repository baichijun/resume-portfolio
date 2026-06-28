/**
 * Capture full-page screenshots and layout metrics for Pencil design reference.
 * 为 Pencil 设计稿捕获全页截图与布局度量数据
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "design", "refs");
const BASE_URL = "http://localhost:5173/";

const THEMES = [
  "skill-frontend-design",
  "skill-ui-ux-pro-max",
  "skill-design-taste",
  "pencil-shadcn",
  "pencil-lunaris",
  "pencil-halo",
];
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const SELECTORS = [
  "header",
  "#hero",
  "#hero h1",
  "#about",
  "#about h2",
  "#projects",
  "#projects article",
  "#contact",
  "footer",
  '[aria-label="切换 UI 皮肤"]',
];

function rgbToHex(rgb) {
  if (!rgb || rgb === "transparent" || rgb === "rgba(0, 0, 0, 0)") return null;
  const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!m) return rgb;
  const r = Number(m[1]).toString(16).padStart(2, "0");
  const g = Number(m[2]).toString(16).padStart(2, "0");
  const b = Number(m[3]).toString(16).padStart(2, "0");
  const a = m[4] !== undefined ? Math.round(Number(m[4]) * 255).toString(16).padStart(2, "0") : "";
  return `#${r}${g}${b}${a}`.toUpperCase();
}

async function extractLayout(page) {
  return page.evaluate((selectors) => {
    const toMetrics = (el) => {
      const rect = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        paddingTop: cs.paddingTop,
        paddingRight: cs.paddingRight,
        paddingBottom: cs.paddingBottom,
        paddingLeft: cs.paddingLeft,
        marginTop: cs.marginTop,
        marginBottom: cs.marginBottom,
        gap: cs.gap,
        borderRadius: cs.borderRadius,
        borderWidth: cs.borderWidth,
        borderColor: cs.borderColor,
        boxShadow: cs.boxShadow,
      };
    };

    const result = { page: { width: window.innerWidth, height: document.documentElement.scrollHeight }, elements: {} };
    for (const sel of selectors) {
      const nodes = document.querySelectorAll(sel);
      if (nodes.length === 0) {
        result.elements[sel] = null;
        continue;
      }
      if (nodes.length === 1) {
        result.elements[sel] = toMetrics(nodes[0]);
      } else {
        result.elements[sel] = Array.from(nodes).slice(0, 6).map(toMetrics);
      }
    }
    return result;
  }, SELECTORS);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const allLayout = {};

  for (const vp of VIEWPORTS) {
    for (const theme of THEMES) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      const page = await context.newPage();

      await page.goto(BASE_URL, { waitUntil: "networkidle" });
      await page.evaluate((t) => {
        localStorage.setItem("resume-theme", t);
        document.documentElement.dataset.theme = t;
      }, theme);
      await page.reload({ waitUntil: "networkidle" });
      await page.waitForTimeout(800);

      const fileBase = `${vp.name}-${theme}`;
      const pngPath = path.join(OUT_DIR, `${fileBase}.png`);
      await page.screenshot({ path: pngPath, fullPage: true });

      const layout = await extractLayout(page);
      allLayout[fileBase] = layout;

      console.log(`Captured ${fileBase}.png (${layout.page.height}px tall)`);
      await context.close();
    }
  }

  await writeFile(
    path.join(OUT_DIR, "layout.json"),
    JSON.stringify(allLayout, null, 2),
    "utf8",
  );

  await browser.close();
  console.log(`Done. Output: ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
