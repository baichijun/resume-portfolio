import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { SkinFooter, SkinHeader } from "@/skins/shared/SkinChrome";
import { ContentBlocks } from "@/skins/shared/ContentBlocks";

/** ui-ux-pro-max 背景 / Structured grid background for UX clarity */
function UxBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-[size:48px_48px]"
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--theme-accent)] to-transparent opacity-40" />
    </div>
  );
}

/** ui-ux-pro-max skill 皮肤页 / Full page for ui-ux-pro-max skill */
export function UiUxProMaxPage() {
  return (
    <>
      <UxBackground />
      <SkinHeader className="bg-[rgba(11,18,32,0.92)]" />
      <main>
        <ContentBlocks heroLayout="center" />
      </main>
      <SkinFooter />
      <ThemeSwitcher />
    </>
  );
}
