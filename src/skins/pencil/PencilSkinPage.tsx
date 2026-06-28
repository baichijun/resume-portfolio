import type { ComponentType } from "react";
import type { ThemeId } from "@/types/resume";
import { ShadcnPencilPage } from "@/skins/pencil/shadcn/ShadcnPencilPage";
import { LunarisPencilPage } from "@/skins/pencil/lunaris/LunarisPencilPage";
import { HaloPencilPage } from "@/skins/pencil/halo/HaloPencilPage";

const PENCIL_PAGES: Record<
  Extract<ThemeId, "pencil-shadcn" | "pencil-lunaris" | "pencil-halo">,
  ComponentType
> = {
  "pencil-shadcn": ShadcnPencilPage,
  "pencil-lunaris": LunarisPencilPage,
  "pencil-halo": HaloPencilPage,
};

/** Pencil 皮肤路由 / Render pencil design-system skin page */
export function PencilSkinPage({ themeId }: { themeId: ThemeId }) {
  const Page = PENCIL_PAGES[themeId as keyof typeof PENCIL_PAGES];
  if (!Page) return null;
  return <Page />;
}
