import resumeMarkdown from "../../简历内容.md?raw";
import { parseResume } from "@/lib/parseResume";
import type { ResumeData } from "@/types/resume";

let cached: ResumeData | null = null;

/** 构建时解析简历 Markdown / Parse resume markdown at build time */
export function useResumeData(): ResumeData {
  if (!cached) {
    cached = parseResume(resumeMarkdown);
  }
  return cached;
}

export function getResumeData(): ResumeData {
  return useResumeData();
}
