/**
 * Helper: print Pencil batch_design bootstrap script for a theme.
 * 打印指定主题的 Pencil bootstrap 脚本，供 Agent 在对应 .pen 中执行。
 *
 * Also documents token import:
 *   get_variables → node scripts/import-pencil-variables.mjs {theme} vars.json
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const theme = process.argv[2];

if (!theme || !["dark", "glass", "brutalist"].includes(theme)) {
  console.error("Usage: node scripts/export-design-tokens.mjs <dark|glass|brutalist>");
  process.exit(1);
}

const penName =
  theme === "dark"
    ? "UI-Dark.pen"
    : theme === "glass"
      ? "UI-Glass.pen"
      : "UI-Brutalist.pen";

const bootstrapPath = path.join(__dirname, `pen-bootstrap-${theme}.js`);
const content = await readFile(bootstrapPath, "utf8");

console.log(`# Apply to design/${penName} via Pencil batch_design (file must be open in Pencil)`);
console.log(`# Then: get_variables → import-pencil-variables.mjs ${theme} → npm run design:sync -- ${theme}`);
console.log(content);
