import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { SkinFooter, SkinHeader } from "@/skins/shared/SkinChrome";
import { ContentBlocks } from "@/skins/shared/ContentBlocks";

/** design-taste 背景 / Editorial rule-line background */
function TasteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-x-8 top-32 hidden h-px bg-[var(--theme-border)] lg:block" />
      <div className="absolute inset-x-0 bottom-32 hidden h-px bg-[var(--theme-border)] lg:block" />
      <div className="absolute left-8 top-0 hidden h-full w-px bg-[var(--theme-border)] lg:block" />
    </div>
  );
}

/** design-taste-frontend skill 皮肤页 / Anti-slop editorial portfolio page */
export function DesignTastePage() {
  return (
    <>
      <TasteBackground />
      <SkinHeader
        className="border-b-2 border-[var(--theme-border)] bg-[var(--theme-bg)]"
      />
      <main>
        <ContentBlocks heroLayout="split" />
      </main>
      <SkinFooter />
      <ThemeSwitcher />
    </>
  );
}
