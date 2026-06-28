import { getNavItems } from "@/lib/siteContentUtils";
import { getSiteContent } from "@/hooks/useSiteContent";

/** 顶栏导航项，由 content 块 nav 驱动 / Header nav from site content blocks */
export function getNavigationItems() {
  return getNavItems(getSiteContent());
}

/** 顶栏导航常量（构建时快照）/ Nav snapshot for modules that need a stable array */
export const NAV_ITEMS = getNavigationItems();
