import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { SkinFooter, SkinHeader } from "@/skins/shared/SkinChrome";
import {
  ResumeAbout,
  ResumeContact,
  ResumeHero,
  ResumeProjects,
} from "@/skins/shared/ResumeSections";

/** frontend-design 背景 / Editorial atmospheric background */
function FdBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -left-1/4 top-0 h-[70vh] w-[70vw] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #e11d48 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 h-[50vh] w-[50vw] opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #fbbf24 0%, transparent 70%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

/** frontend-design skill 皮肤页 / Full page for frontend-design skill */
export function FrontendDesignPage() {
  return (
    <>
      <FdBackground />
      <SkinHeader className="bg-[rgba(12,10,9,0.85)]" brand="Portfolio" />
      <main>
        <ResumeHero layout="editorial" panelClass="skin-panel p-6" />
        <ResumeAbout />
        <ResumeProjects />
        <ResumeContact />
      </main>
      <SkinFooter />
      <ThemeSwitcher />
    </>
  );
}
