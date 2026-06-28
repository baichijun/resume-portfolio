import type { ComponentType } from "react";
import type { ThemeId } from "@/types/resume";
import { FrontendDesignPage } from "@/skins/skill/frontend-design/FrontendDesignPage";
import { UiUxProMaxPage } from "@/skins/skill/ui-ux-pro-max/UiUxProMaxPage";
import { DesignTastePage } from "@/skins/skill/design-taste/DesignTastePage";

const SKILL_PAGES: Record<
  Extract<
    ThemeId,
    "skill-frontend-design" | "skill-ui-ux-pro-max" | "skill-design-taste"
  >,
  ComponentType
> = {
  "skill-frontend-design": FrontendDesignPage,
  "skill-ui-ux-pro-max": UiUxProMaxPage,
  "skill-design-taste": DesignTastePage,
};

/** Skill 皮肤路由 / Render skill-based skin page by theme id */
export function SkillSkinPage({ themeId }: { themeId: ThemeId }) {
  const Page = SKILL_PAGES[themeId as keyof typeof SKILL_PAGES];
  if (!Page) return null;
  return <Page />;
}
