import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { SkinFooter, SkinHeader } from "@/skins/shared/SkinChrome";
import { HaloAbout } from "@/skins/pencil/halo/components/HaloAbout";
import { HaloContact } from "@/skins/pencil/halo/components/HaloContact";
import { HaloHero } from "@/skins/pencil/halo/components/HaloHero";
import { HaloProjects } from "@/skins/pencil/halo/components/HaloProjects";

/** Halo 背景光晕 / Soft luminous background for Halo pencil skin */
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
      <SkinHeader className="border-indigo-100 bg-white/70" />
      <main className="flex flex-col gap-12 lg:gap-[48px]">
        <HaloHero />
        <HaloAbout />
        <HaloProjects />
        <HaloContact />
      </main>
      <SkinFooter />
      <ThemeSwitcher />
    </>
  );
}
