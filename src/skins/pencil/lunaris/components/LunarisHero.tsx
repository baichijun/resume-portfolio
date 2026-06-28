import { getPrimaryCta, getHeroBlock } from "@/lib/siteContentUtils";
import { useSiteContent } from "@/hooks/useSiteContent";

// LAYOUT: from export/desktop.html (2026-06-28)
// BINDINGS: see layer-map.ts — Hero/Headline, Hero/Tagline, Shell/AccentBar, Hero/CTA

/** Lunaris Hero 区 / Hero section aligned to Pencil export */
export function LunarisHero() {
  const content = useSiteContent();
  const hero = getHeroBlock(content);
  const primaryCta = hero ? getPrimaryCta(hero) : undefined;

  if (!hero) return null;

  return (
    <section
      id={hero.id}
      data-pencil-name="Hero"
      className="scroll-mt-24 px-4 pt-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <h1
          data-pencil-name="Hero/Headline"
          className="text-4xl font-bold text-[var(--theme-text)] sm:text-5xl lg:text-[60px]/[normal]"
          style={{ fontFamily: "var(--theme-font-display)" }}
        >
          {hero.headline}
        </h1>
        <p
          data-pencil-name="Hero/Tagline"
          className="text-base text-[var(--theme-text-muted)] sm:text-lg"
          style={{ fontFamily: "var(--theme-font-body)" }}
        >
          {hero.tagline}
        </p>
        <div
          data-pencil-name="Shell/AccentBar"
          className="h-1 w-[120px] shrink-0 rounded-sm bg-[var(--theme-accent)]"
          aria-hidden
        />
        {primaryCta && (
          <a
            href={primaryCta.href}
            data-pencil-name="Hero/CTA"
            className="box-border inline-flex w-fit shrink-0 rounded-[var(--theme-radius)] bg-[var(--theme-accent)] px-6 py-3 text-sm font-semibold text-[var(--theme-text)] transition hover:opacity-90"
            style={{ fontFamily: "var(--theme-font-body)" }}
          >
            {primaryCta.label}
          </a>
        )}
      </div>
    </section>
  );
}
