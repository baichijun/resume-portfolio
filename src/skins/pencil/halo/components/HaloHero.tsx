import { useResumeData } from "@/hooks/useResumeData";

// LAYOUT: from export/desktop.html (2026-06-28)
// BINDINGS: see layer-map.ts — Hero/Headline, Hero/Tagline, Hero/Glow, Hero/CTA

/** Halo Hero 区 / Hero section aligned to Pencil export */
export function HaloHero() {
  const data = useResumeData();

  return (
    <section
      id="hero"
      data-pencil-name="Hero"
      className="scroll-mt-24 px-4 pt-24 sm:px-6 lg:px-8"
    >
      <div className="relative mx-auto flex max-w-6xl flex-col gap-6">
        <h1
          data-pencil-name="Hero/Headline"
          className="text-4xl font-extrabold text-[var(--theme-text)] sm:text-5xl lg:text-[56px]/[normal]"
          style={{ fontFamily: "var(--theme-font-display)" }}
        >
          {data.name}
        </h1>
        <p
          data-pencil-name="Hero/Tagline"
          className="text-base text-[var(--theme-text-muted)] sm:text-lg"
          style={{ fontFamily: "var(--theme-font-body)" }}
        >
          {data.tagline}
        </p>
        <div
          data-pencil-name="Hero/Glow"
          className="pointer-events-none absolute -left-8 top-8 h-[200px] w-[200px] shrink-0 rounded-full bg-[var(--theme-accent)] opacity-[0.15] blur-2xl"
          aria-hidden
        />
        <a
          href="#projects"
          data-pencil-name="Hero/CTA"
          className="relative box-border inline-flex w-fit shrink-0 rounded-full bg-[var(--theme-accent)] px-7 py-3.5 text-sm font-bold text-white shadow-[var(--theme-shadow)] transition hover:opacity-90"
          style={{ fontFamily: "var(--theme-font-body)" }}
        >
          查看项目
        </a>
      </div>
    </section>
  );
}
