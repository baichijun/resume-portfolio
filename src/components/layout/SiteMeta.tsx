import { useEffect } from "react";
import { formatContentTemplate, getHeroBlock } from "@/lib/siteContentUtils";
import { getSiteContent } from "@/hooks/useSiteContent";

/** 同步 document.title 与 meta / Sync document title and description from site content */
export function SiteMeta() {
  useEffect(() => {
    const content = getSiteContent();
    const hero = getHeroBlock(content);
    const name = hero?.headline ?? "";

    document.title = formatContentTemplate(content.meta.documentTitle, { name });

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        formatContentTemplate(content.meta.metaDescription, { name }),
      );
    }
  }, []);

  return null;
}
