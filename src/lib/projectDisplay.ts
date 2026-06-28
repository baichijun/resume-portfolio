import type { ProjectItem } from "@/types/siteContent";

/** 预览描述最大字符数 / Max chars for project card preview description */
export const PROJECT_PREVIEW_DESC_MAX = 140;

/** 预览标签最大数量 / Max tags shown on project card preview */
export const PROJECT_PREVIEW_TAG_MAX = 3;

/** 截断结果 / Truncation result for preview text */
export interface TruncatedText {
  text: string;
  isTruncated: boolean;
}

/** 截断项目描述供预览 / Truncate project description for card preview */
export function truncateProjectDescription(
  text: string,
  max = PROJECT_PREVIEW_DESC_MAX,
): TruncatedText {
  if (text.length <= max) {
    return { text, isTruncated: false };
  }
  return { text: `${text.slice(0, max)}…`, isTruncated: true };
}

/** 预览区标签（仅真实 tags）/ Preview tags — real tags only, capped */
export function getProjectPreviewTags(project: ProjectItem): string[] {
  return project.tags.slice(0, PROJECT_PREVIEW_TAG_MAX);
}

/** 是否有详情可展开 / Whether project has expandable detail content */
export function hasProjectDetail(project: ProjectItem): boolean {
  const { isTruncated } = truncateProjectDescription(project.description);
  const hasHighlights = (project.highlights?.length ?? 0) > 0;
  const hasLink = Boolean(project.linkUrl);
  return isTruncated || hasHighlights || hasLink;
}
