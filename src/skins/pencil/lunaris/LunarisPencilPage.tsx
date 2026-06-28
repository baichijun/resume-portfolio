import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { SkinFooter, SkinHeader } from "@/skins/shared/SkinChrome";
import { LunarisAbout } from "@/skins/pencil/lunaris/components/LunarisAbout";
import { LunarisContact } from "@/skins/pencil/lunaris/components/LunarisContact";
import { LunarisHero } from "@/skins/pencil/lunaris/components/LunarisHero";
import { LunarisProjects } from "@/skins/pencil/lunaris/components/LunarisProjects";

/** Lunaris 背景装饰 / Lunaris shell background accents */
function LunarisBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-[#7c6bf5]/20 blur-3xl" />
      <div className="absolute bottom-10 left-10 h-64 w-64 rounded-full bg-[#58a6ff]/10 blur-3xl" />
      <div className="absolute inset-0 m-4 rounded-[var(--theme-radius)] border border-[var(--theme-border)] opacity-20" />
    </div>
  );
}

/** Pencil Lunaris 皮肤 / Lunaris design system pencil skin */
export function LunarisPencilPage() {
  return (
    <>
      <LunarisBackground />
      <SkinHeader className="bg-[rgba(13,17,23,0.9)]" brand="Lunaris" />
      <main className="flex flex-col gap-12 lg:gap-[48px]">
        <LunarisHero />
        <LunarisAbout />
        <LunarisProjects />
        <LunarisContact />
      </main>
      <SkinFooter>Pencil · Lunaris Design System</SkinFooter>
      <ThemeSwitcher />
    </>
  );
}
