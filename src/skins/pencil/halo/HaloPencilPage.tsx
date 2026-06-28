import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { SkinFooter, SkinHeader } from "@/skins/shared/SkinChrome";
import {
  ResumeAbout,
  ResumeContact,
  ResumeHero,
  ResumeProjects,
} from "@/skins/shared/ResumeSections";

function HaloBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-200/50 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-200/40 blur-3xl" />
    </div>
  );
}

/** Pencil Halo 皮肤 / Halo design system pencil skin */
export function HaloPencilPage() {
  return (
    <>
      <HaloBackground />
      <SkinHeader className="border-indigo-100 bg-white/70" brand="Halo" />
      <main className="[&_.skin-panel]:rounded-2xl [&_.skin-panel]:border-indigo-100 [&_.skin-panel]:backdrop-blur-sm">
        <ResumeHero layout="center" />
        <ResumeAbout />
        <ResumeProjects />
        <ResumeContact />
      </main>
      <SkinFooter>Pencil · Halo Design System</SkinFooter>
      <ThemeSwitcher />
    </>
  );
}
