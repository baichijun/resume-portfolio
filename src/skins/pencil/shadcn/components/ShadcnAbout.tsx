import { getAboutBlock } from "@/lib/siteContentUtils";
import { useSiteContent } from "@/hooks/useSiteContent";

// LAYOUT: from export/desktop.html (2026-06-28)
// BINDINGS: see layer-map.ts — Section/About, Card/About

/** Shadcn 关于我 / About section aligned to Pencil export */
export function ShadcnAbout() {
  const content = useSiteContent();
  const about = getAboutBlock(content);

  if (!about) return null;

  return (
    <section
      id={about.id}
      data-pencil-name="About"
      className="scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <h2
          data-pencil-name="Section/About"
          className="text-2xl font-bold text-[var(--theme-text)] sm:text-[30px]/[normal]"
          style={{ fontFamily: "var(--theme-font-display)" }}
        >
          {about.title}
        </h2>
        <div
          data-pencil-name="Card/About"
          className="box-border flex w-full flex-col gap-3 rounded-[var(--theme-radius)] border border-[var(--theme-border)] bg-[var(--theme-card)] p-7"
        >
          <ul className="space-y-2 text-sm leading-relaxed text-[var(--theme-text-muted)]">
            {about.summaryBullets.map((item) => (
              <li key={item} data-pencil-name="Body">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
