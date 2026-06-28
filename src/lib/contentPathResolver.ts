import type { SiteBlockType, SiteContent } from "@/types/siteContent";
import { getBlockByType } from "./siteContentUtils";

/** 解析 layer-map 中的 content 路径 / Resolve dot-path against site content blocks */
export function resolveContentPath(content: SiteContent, path: string): unknown {
  if (path === "decorative") return undefined;

  const segments = path.split(".");
  if (segments[0] !== "blocks" || segments.length < 2) {
    return undefined;
  }

  const blockType = segments[1] as SiteBlockType;
  const block = getBlockByType(content, blockType);
  if (!block) return undefined;

  let current: unknown = block;
  for (const segment of segments.slice(2)) {
    if (current === undefined || current === null) return undefined;

    const arrayMatch = segment.match(/^(\w+)\[(\d+)\]$/);
    if (arrayMatch) {
      const [, key, index] = arrayMatch;
      const arr = (current as Record<string, unknown>)[key];
      if (!Array.isArray(arr)) return undefined;
      current = arr[Number(index)];
      continue;
    }

    if (segment.endsWith("[]")) {
      const key = segment.slice(0, -2);
      current = (current as Record<string, unknown>)[key];
      continue;
    }

    if (segment.includes("+")) {
      const keys = segment.split("+").map((k) => k.trim());
      const values = keys.map((key) => (current as Record<string, unknown>)[key]);
      return values.filter(Boolean).join(" · ");
    }

    current = (current as Record<string, unknown>)[segment];
  }

  return current;
}

/** 将路径值格式化为 Pencil 文本 / Format resolved value for Pencil text layers */
export function formatContentPathValue(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) {
    if (value.every((item) => typeof item === "string")) {
      return value.join("\n");
    }
    return undefined;
  }
  if (typeof value === "object" && "label" in value && "href" in value) {
    return String((value as { label: string }).label);
  }
  return undefined;
}
