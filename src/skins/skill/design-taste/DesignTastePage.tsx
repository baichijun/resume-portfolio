import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { SkinFooter, SkinHeader } from "@/skins/shared/SkinChrome";
import {
  ResumeAbout,
  ResumeContact,
  ResumeHero,
  ResumeProjects,
} from "@/skins/shared/ResumeSections";

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
        brand="綦广名"
      />
      <main>
        <ResumeHero layout="split" panelClass="skin-panel-solid p-6" />
        <ResumeAbout />
        <ResumeProjects />
        <ResumeContact />
      </main>
      <SkinFooter>© {new Date().getFullYear()} · design-taste-frontend skin</SkinFooter>
      <ThemeSwitcher />
    </>
  );
}
