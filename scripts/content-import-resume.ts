/**
 * Import 简历内容.md into content/site.json
 * 将简历 Markdown 导入站点内容层
 *
 * Usage:
 *   npx tsx scripts/content-import-resume.ts --merge
 *   npx tsx scripts/content-import-resume.ts --fresh
 *   npx tsx scripts/content-import-resume.ts --replace-section projects
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseResume } from "../src/lib/parseResume.ts";
import { resumeToSiteContent } from "../src/lib/resumeToSiteContent.ts";
import { mergeSiteContent } from "../src/lib/mergeSiteContent.ts";
import type { SiteBlockType } from "../src/types/siteContent.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const RESUME_PATH = path.join(ROOT, "简历内容.md");
const CONTENT_PATH = path.join(ROOT, "content", "site.json");

const VALID_SECTIONS: SiteBlockType[] = [
  "hero",
  "about",
  "projects",
  "contact",
  "experience",
  "custom",
];

function parseArgs(argv: string[]) {
  const fresh = argv.includes("--fresh");
  const merge = argv.includes("--merge");
  const replaceIdx = argv.indexOf("--replace-section");
  const replaceSection =
    replaceIdx >= 0 ? (argv[replaceIdx + 1] as SiteBlockType | undefined) : undefined;

  if (replaceSection && !VALID_SECTIONS.includes(replaceSection)) {
    console.error(`Invalid --replace-section: ${replaceSection}`);
    process.exit(1);
  }

  let mode: "fresh" | "merge" = "merge";
  if (fresh) mode = "fresh";
  else if (merge) mode = "merge";

  return { mode, replaceSection };
}

function main() {
  const { mode, replaceSection } = parseArgs(process.argv.slice(2));

  if (!existsSync(RESUME_PATH)) {
    console.error(`Resume not found: ${RESUME_PATH}`);
    process.exit(1);
  }

  const markdown = readFileSync(RESUME_PATH, "utf8");
  const resumeData = parseResume(markdown);
  const imported = resumeToSiteContent(resumeData);

  let output = imported;

  if (existsSync(CONTENT_PATH) && mode !== "fresh" && !replaceSection) {
    const existing = JSON.parse(readFileSync(CONTENT_PATH, "utf8"));
    output = mergeSiteContent(existing, imported, { mode: "merge" });
  } else if (existsSync(CONTENT_PATH) && replaceSection) {
    const existing = JSON.parse(readFileSync(CONTENT_PATH, "utf8"));
    output = mergeSiteContent(existing, imported, {
      mode: "merge",
      replaceSection,
    });
  }

  mkdirSync(path.dirname(CONTENT_PATH), { recursive: true });
  writeFileSync(CONTENT_PATH, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Written ${CONTENT_PATH} (${mode}${replaceSection ? `, section=${replaceSection}` : ""})`);
}

main();
