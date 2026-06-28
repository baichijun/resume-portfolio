import { useEffect } from "react";
import {
  formatDocumentTitle,
  formatMetaDescription,
} from "@/config/siteCopy";
import { getResumeData } from "@/hooks/useResumeData";

/** 同步 document.title 与 meta / Sync document title and description from site shell */
export function SiteMeta() {
  useEffect(() => {
    const { name } = getResumeData();
    document.title = formatDocumentTitle(name);

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", formatMetaDescription(name));
    }
  }, []);

  return null;
}
