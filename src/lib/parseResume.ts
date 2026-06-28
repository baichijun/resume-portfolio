/** 将 简历内容.md 解析为 ResumeData / Parse 简历内容.md into structured resume data */
import type {
  ResumeData,
  ResumeEducation,
  ResumeExperience,
  ResumeProject,
  ResumeRole,
} from "@/types/resume";

const SECTION_MARKERS = [
  "个人优势",
  "教育经历",
  "工作经历",
  "项目经历",
] as const;

type SectionKey = (typeof SECTION_MARKERS)[number];

function extractEmail(line: string): string {
  const linkMatch = line.match(/\[([^\]]+)\]\(mailto:([^)]+)\)/);
  if (linkMatch) return linkMatch[2];
  const plain = line.match(/[\w.-]+@[\w.-]+\.\w+/);
  return plain?.[0] ?? "";
}

function extractPhone(line: string): string {
  const match = line.match(/1[3-9]\d{9}/);
  return match?.[0] ?? "";
}

/** 按 ### 标题切分 Markdown 区块 / Split markdown by ### section headings */
function splitSections(raw: string): Record<SectionKey, string> {
  const result = {} as Record<SectionKey, string>;
  const pattern = new RegExp(
    `###\\s*(${SECTION_MARKERS.join("|")})`,
    "g",
  );
  const matches = [...raw.matchAll(pattern)];

  for (let i = 0; i < matches.length; i++) {
    const key = matches[i][1] as SectionKey;
    const start = (matches[i].index ?? 0) + matches[i][0].length;
    const end = matches[i + 1]?.index ?? raw.length;
    result[key] = raw.slice(start, end).trim();
  }

  return result;
}

/** 解析姓名、标语、联系方式 / Parse name, tagline, phone, and email from header */
function parseHeader(raw: string): Pick<
  ResumeData,
  "name" | "tagline" | "phone" | "email"
> {
  const beforeFirstSection = raw.split(/###\s/)[0] ?? "";
  const lines = beforeFirstSection
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const nameLine = lines.find(
    (l) => l.startsWith("# ") && !l.includes("个人简历"),
  );
  const name = nameLine?.replace(/^#\s+/, "").trim() ?? "姓名待补充";

  const tagline =
    lines.find((l) => l.includes("工作经验") || l.includes("|")) ?? "";

  const phoneLine = lines.find((l) => l.includes("联系电话"));
  const emailLine = lines.find((l) => l.includes("电子邮箱"));

  return {
    name,
    tagline,
    phone: phoneLine ? extractPhone(phoneLine) : "",
    email: emailLine ? extractEmail(emailLine) : "",
  };
}

function parseSummaryItems(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("-"))
    .map((l) => l.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);
}

function parseEducation(text: string): ResumeEducation[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const periodMatch = line.match(/(\d{4}\.\d{2}\s*-\s*\d{4}\.\d{2})/);
      const period = periodMatch?.[1] ?? "";
      const withoutPeriod = line.replace(period, "").trim();
      const parts = withoutPeriod.split(/\s+\/\s+/);
      const school = parts[0]?.split(/\s+/)[0]
        ? withoutPeriod.split(/\s+\d/)[0]?.trim() ?? line
        : line;
      return {
        school: school.split(/\s+\d/)[0]?.trim() ?? line,
        degree: withoutPeriod.replace(school.split(/\s+\d/)[0] ?? "", "").trim() || line,
        period,
      };
    });
}

/** 解析工作经历与 nested 职位结构 / Parse work history with nested roles and sections */
function parseExperience(text: string): ResumeExperience[] {
  const blocks = text.split(/(?=生活帮|深圳市)/).filter(Boolean);
  const experiences: ResumeExperience[] = [];

  for (const block of blocks) {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;

    const header = lines[0];
    const companyMatch = header.match(/^(.+?)\s+(\d{4}\.\d{2}\s*-\s*(?:至今|\d{4}\.\d{2}))/);
    const company = companyMatch?.[1]?.trim() ?? header.split(/\d{4}/)[0]?.trim() ?? "";
    const period = companyMatch?.[2]?.trim() ?? "";

    const roles: ResumeRole[] = [];
    let currentRole: ResumeRole | null = null;
    let currentSection: { heading: string; items: string[] } | null = null;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];

      const roleMatch = line.match(/^职位[：:](.+?)(?:\s*[（(](\d{4}\.\d{2}[^）)]*)[）)])?$/);
      if (roleMatch) {
        if (currentRole) roles.push(currentRole);
        currentRole = {
          title: roleMatch[1].trim(),
          period: roleMatch[2]?.trim(),
          sections: [],
          items: [],
        };
        currentSection = null;
        continue;
      }

      const sectionMatch = line.match(/^------【(.+?)】------$/);
      if (sectionMatch && currentRole) {
        currentSection = { heading: sectionMatch[1], items: [] };
        currentRole.sections.push(currentSection);
        continue;
      }

      if (line.startsWith("-") && currentRole) {
        const item = line.replace(/^[-*]\s*/, "").trim();
        if (currentSection) {
          currentSection.items.push(item);
        } else {
          currentRole.items.push(item);
        }
      }
    }

    if (currentRole) roles.push(currentRole);
    experiences.push({ company, period, roles });
  }

  return experiences;
}

/** 解析项目经历块 / Parse project blocks from markdown section */
function parseProjects(text: string): ResumeProject[] {
  const chunks = text.split(
    /(?=^[\u4e00-\u9fa5A-Za-z0-9].+\d{4}\.\d{2}\s*-\s*\d{4}\.\d{2})/m,
  ).filter((c) => c.trim().length > 20);

  return chunks.map((chunk) => {
    const lines = chunk.split("\n").map((l) => l.trim());
    const titleLine = lines[0] ?? "";
    const periodMatch = titleLine.match(/(\d{4}\.\d{2}\s*-\s*\d{4}\.\d{2})/);
    const period = periodMatch?.[1] ?? "";
    const title = titleLine.replace(period, "").trim();

    let company = "";
    let description = "";
    let highlights: string[] = [];
    let mode: "meta" | "desc" | "work" = "meta";

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith("所属公司")) {
        company = line.replace(/所属公司[：:]\s*[（(]?/, "").replace(/[）)]$/, "").trim();
        continue;
      }
      if (line === "项目描述：") {
        mode = "desc";
        continue;
      }
      if (line === "工作内容：") {
        mode = "work";
        continue;
      }
      if (mode === "desc" && line && !line.startsWith("-")) {
        description += (description ? " " : "") + line;
      }
      if (mode === "work" && line.startsWith("-")) {
        highlights.push(line.replace(/^[-*]\s*/, "").trim());
      }
    }

    return {
      title,
      period,
      company: company.replace(/[()（）]/g, ""),
      description: description.trim(),
      highlights,
      techStack: [],
      imageUrl: null,
      linkUrl: null,
    };
  });
}

function extractSkills(summary: string[]): string[] {
  const keywords = [
    "PMP",
    "CET4",
    "C1",
    "Project",
    "Visio",
    "Xmind",
    "亿图",
    "Trello",
    "Worktile",
    "Bugfree",
    "CMMI",
    "ISO",
    "BIM",
    "RACI",
    "WBS",
    "PMO",
  ];

  const found = new Set<string>();
  const blob = summary.join(" ");

  for (const kw of keywords) {
    if (blob.toLowerCase().includes(kw.toLowerCase())) {
      found.add(kw);
    }
  }

  return [...found];
}

/** 汇总待补充字段，驱动 PlaceholderBadge / Collect missing fields for placeholder badges */
function collectPlaceholders(data: Omit<ResumeData, "placeholders">): string[] {
  const missing: string[] = [];

  if (!data.email) missing.push("电子邮箱");
  if (!data.phone) missing.push("联系电话");
  missing.push("头像照片（public/images/avatar.jpg 或简历中增加头像字段）");
  missing.push("GitHub 个人主页链接");
  missing.push("社交媒体链接（LinkedIn / 微信等）");

  for (const project of data.projects) {
    if (!project.imageUrl) {
      missing.push(`项目「${project.title}」截图`);
    }
    if (project.techStack.length === 0) {
      missing.push(`项目「${project.title}」技术栈标签`);
    }
    if (!project.linkUrl) {
      missing.push(`项目「${project.title}」外部链接`);
    }
  }

  return missing;
}

/** 将 Markdown 简历解析为结构化数据 / Parse resume markdown into structured data */
export function parseResume(markdown: string): ResumeData {
  const sections = splitSections(markdown);
  const header = parseHeader(markdown);

  const summary = parseSummaryItems(sections["个人优势"] ?? "");
  const education = parseEducation(sections["教育经历"] ?? "");
  const experience = parseExperience(sections["工作经历"] ?? "");
  const projects = parseProjects(sections["项目经历"] ?? "");
  const skills = extractSkills(summary);

  const base = {
    ...header,
    summary,
    skills,
    education,
    experience,
    projects,
  };

  return {
    ...base,
    placeholders: collectPlaceholders(base),
  };
}
