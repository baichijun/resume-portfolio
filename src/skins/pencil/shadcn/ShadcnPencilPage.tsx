import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { SkinFooter, SkinHeader } from "@/skins/shared/SkinChrome";
import {
  ResumeAbout,
  ResumeContact,
  ResumeHero,
  ResumeProjects,
} from "@/skins/shared/ResumeSections";

function ShadcnBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[var(--theme-bg)]">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-zinc-100 to-transparent opacity-80" />
    </div>
  );
}

/** Pencil Shadcn UI 皮肤 / Shadcn-aligned pencil export skin */
export function ShadcnPencilPage() {
  return (
    <>
      <ShadcnBackground />
      <SkinHeader className="bg-white/80" brand="Resume" />
      <main className="[&_.skin-panel]:rounded-lg [&_.skin-panel]:border-zinc-200 [&_.skin-panel]:shadow-sm">
        <ResumeHero layout="split" panelClass="skin-panel p-6" />
        <ResumeAbout />
        <ResumeProjects />
        <ResumeContact />
      </main>
      <SkinFooter>Pencil · Shadcn UI Design System</SkinFooter>
      <ThemeSwitcher />
    </>
  );
}
