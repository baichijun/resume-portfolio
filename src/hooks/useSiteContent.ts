import siteContentJson from "../../content/site.json";
import type { SiteContent } from "@/types/siteContent";

let cached: SiteContent | null = null;

function loadSiteContent(): SiteContent {
  return siteContentJson as SiteContent;
}

/** 站点内容 Hook / Site content from content/site.json */
export function useSiteContent(): SiteContent {
  if (!cached) {
    cached = loadSiteContent();
  }
  return cached;
}

/** 非 Hook 场景同步读取 / Sync site content outside React */
export function getSiteContent(): SiteContent {
  return useSiteContent();
}
