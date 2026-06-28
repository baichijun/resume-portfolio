import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { SkinFooter, SkinHeader } from "@/skins/shared/SkinChrome";
import { ShadcnAbout } from "@/skins/pencil/shadcn/components/ShadcnAbout";
import { ShadcnContact } from "@/skins/pencil/shadcn/components/ShadcnContact";
import { ShadcnHero } from "@/skins/pencil/shadcn/components/ShadcnHero";
import { ShadcnProjects } from "@/skins/pencil/shadcn/components/ShadcnProjects";

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
      <main className="flex flex-col gap-12 lg:gap-[48px]">
        <ShadcnHero />
        <ShadcnAbout />
        <ShadcnProjects />
        <ShadcnContact />
      </main>
      <SkinFooter>Pencil · Shadcn UI Design System</SkinFooter>
      <ThemeSwitcher />
    </>
  );
}
