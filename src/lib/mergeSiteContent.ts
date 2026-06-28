import type { SiteBlock, SiteBlockType, SiteContent } from "@/types/siteContent";

export type ContentImportMode = "fresh" | "merge";

export interface MergeSiteContentOptions {
  mode: ContentImportMode;
  replaceSection?: SiteBlockType;
}

/** 合并 resume 数据字段，保留展示向标题与 manual 块 / Merge imported resume data into existing content */
function mergeHeroBlock(
  existing: SiteBlock & { type: "hero" },
  imported: SiteBlock & { type: "hero" },
): SiteBlock {
  return {
    ...existing,
    roleLine: imported.roleLine,
    headline: imported.headline,
    tagline: imported.tagline,
    intro: imported.intro,
    ctas: existing.source === "manual" ? existing.ctas : imported.ctas,
  };
}

function mergeAboutBlock(
  existing: SiteBlock & { type: "about" },
  imported: SiteBlock & { type: "about" },
): SiteBlock {
  return {
    ...existing,
    summaryBullets: imported.summaryBullets,
    education: imported.education,
    skills: imported.skills,
  };
}

function mergeProjectsBlock(
  existing: SiteBlock & { type: "projects" },
  imported: SiteBlock & { type: "projects" },
): SiteBlock {
  return {
    ...existing,
    items: imported.items,
  };
}

function mergeContactBlock(
  existing: SiteBlock & { type: "contact" },
  imported: SiteBlock & { type: "contact" },
): SiteBlock {
  return {
    ...existing,
    email: imported.email,
    phone: imported.phone,
    githubUrl: imported.githubUrl,
  };
}

function mergeExperienceBlock(
  existing: SiteBlock & { type: "experience" },
  imported: SiteBlock & { type: "experience" },
): SiteBlock {
  return {
    ...existing,
    items: imported.items,
  };
}

function mergeBlockPair(existing: SiteBlock, imported: SiteBlock): SiteBlock {
  if (existing.type !== imported.type) return existing;
  if (existing.source === "manual" || existing.type === "custom") return existing;

  switch (existing.type) {
    case "hero":
      return mergeHeroBlock(existing, imported as SiteBlock & { type: "hero" });
    case "about":
      return mergeAboutBlock(existing, imported as SiteBlock & { type: "about" });
    case "projects":
      return mergeProjectsBlock(existing, imported as SiteBlock & { type: "projects" });
    case "contact":
      return mergeContactBlock(existing, imported as SiteBlock & { type: "contact" });
    case "experience":
      return mergeExperienceBlock(
        existing,
        imported as SiteBlock & { type: "experience" },
      );
    default:
      return existing;
  }
}

/** 应用 import 策略 / Apply fresh, merge, or section-replace import */
export function mergeSiteContent(
  existing: SiteContent,
  imported: SiteContent,
  options: MergeSiteContentOptions,
): SiteContent {
  if (options.mode === "fresh") {
    return imported;
  }

  if (options.replaceSection) {
    const importedBlock = imported.blocks.find(
      (block) => block.type === options.replaceSection,
    );
    if (!importedBlock) return existing;

    const hasSection = existing.blocks.some(
      (block) => block.type === options.replaceSection,
    );
    const blocks = hasSection
      ? existing.blocks.map((block) =>
          block.type === options.replaceSection ? importedBlock : block,
        )
      : [...existing.blocks, importedBlock];

    return {
      ...existing,
      meta: {
        ...existing.meta,
        documentTitle: imported.meta.documentTitle,
        metaDescription: imported.meta.metaDescription,
      },
      blocks,
    };
  }

  const importedByType = new Map(
    imported.blocks.map((block) => [block.type, block]),
  );

  const mergedBlocks = existing.blocks.map((block) => {
    const importedBlock = importedByType.get(block.type);
    if (!importedBlock) return block;
    return mergeBlockPair(block, importedBlock);
  });

  for (const importedBlock of imported.blocks) {
    if (!mergedBlocks.some((block) => block.type === importedBlock.type)) {
      mergedBlocks.push(importedBlock);
    }
  }

  return {
    version: existing.version,
    meta: {
      ...existing.meta,
      documentTitle: imported.meta.documentTitle,
      metaDescription: imported.meta.metaDescription,
    },
    blocks: mergedBlocks,
  };
}
