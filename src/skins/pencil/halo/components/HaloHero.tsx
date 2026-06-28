import { getPrimaryCta, getHeroBlock } from "@/lib/siteContentUtils";
import { useSiteContent } from "@/hooks/useSiteContent";
import { HeroAvatar } from "@/skins/shared/HeroAvatar";

// LAYOUT: from export/desktop.html (2026-06-28) + Hero/Avatar dual-column
// BINDINGS: see layer-map.ts — Hero/Headline, Hero/Tagline, Hero/Glow, Hero/CTA, Hero/Avatar

/** Halo Hero 区 / Hero section aligned to Pencil export */
export function HaloHero() {
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
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-12">
        <div className="flex flex-col gap-6">
          <h1
            data-pencil-name="Hero/Headline"
            className="text-4xl font-extrabold text-[var(--theme-text)] sm:text-5xl lg:text-[56px]/[normal]"
            style={{ fontFamily: "var(--theme-font-display)" }}
          >
            {hero.headline}
          </h1>
          <HeroAvatar
            variant="halo"
            alt={`${hero.headline} 头像`}
            className="lg:hidden"
          />
          <p
            data-pencil-name="Hero/Tagline"
            className="text-base text-[var(--theme-text-muted)] sm:text-lg"
            style={{ fontFamily: "var(--theme-font-body)" }}
          >
            {hero.tagline}
          </p>
          {primaryCta && (
            <a
              href={primaryCta.href}
              data-pencil-name="Hero/CTA"
              className="relative box-border inline-flex w-fit shrink-0 rounded-full bg-[var(--theme-accent)] px-7 py-3.5 text-sm font-bold text-white shadow-[var(--theme-shadow)] transition hover:opacity-90"
              style={{ fontFamily: "var(--theme-font-body)" }}
            >
              {primaryCta.label}
            </a>
          )}
        </div>
        <div className="relative hidden justify-end lg:flex">
          <div
            data-pencil-name="Hero/Glow"
            className="pointer-events-none absolute -right-4 top-4 h-[200px] w-[200px] shrink-0 rounded-full bg-[var(--theme-accent)] opacity-[0.15] blur-2xl"
            aria-hidden
          />
          <HeroAvatar variant="halo" alt={`${hero.headline} 头像`} />
        </div>
      </div>
    </section>
  );
}
