import type { ResumeProject } from "@/types/resume";
import { useResumeData } from "@/hooks/useResumeData";

// LAYOUT: from export/desktop.html (2026-06-28)
// BINDINGS: see layer-map.ts — Section/Projects, Card/Project

/** 单项目卡片 / Single project card from Card/Project template */
function LunarisProjectCard({ project }: { project: ResumeProject }) {
  const tags =
    project.techStack.length > 0
      ? project.techStack
      : project.highlights.slice(0, 2);

  return (
    <article
      data-pencil-name="Card/Project"
      className="box-border flex h-fit min-w-0 flex-1 flex-col gap-3 rounded-[var(--theme-radius)] border border-[var(--theme-border)] bg-[var(--theme-card)] p-6"
    >
      <div
        data-pencil-name="Shell/AccentBar"
        className="h-[3px] w-12 shrink-0 rounded-sm bg-[var(--theme-accent)]"
        aria-hidden
      />
      <h3
        data-pencil-name="Title"
        className="text-lg font-semibold text-[var(--theme-text)]"
        style={{ fontFamily: "var(--theme-font-display)" }}
      >
        {project.title}
      </h3>
      <p
        data-pencil-name="Meta"
        className="text-xs text-[var(--theme-text-muted)]"
        style={{ fontFamily: "var(--theme-font-body)" }}
      >
        {project.period}
        {project.company ? ` · ${project.company}` : ""}
      </p>
      <p
        data-pencil-name="Description"
        className="text-sm leading-relaxed text-[var(--theme-text-muted)]"
        style={{ fontFamily: "var(--theme-font-body)" }}
      >
        {project.description.length > 180
          ? `${project.description.slice(0, 180)}…`
          : project.description}
      </p>
      {tags.length > 0 && (
        <div
          data-pencil-name="Tags"
          className="box-border flex w-fit shrink-0 flex-row flex-wrap gap-2"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              data-pencil-name="Tag"
              className="text-xs text-[var(--theme-accent-secondary)]"
              style={{ fontFamily: "var(--theme-font-body)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

/** Lunaris 项目经历 / Projects section aligned to Pencil export */
export function LunarisProjects() {
  const data = useResumeData();

  return (
    <section
      id="projects"
      data-pencil-name="Projects"
      className="scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <h2
          data-pencil-name="Section/Projects"
          className="text-2xl font-semibold text-[var(--theme-accent)] sm:text-[28px]/[normal]"
          style={{ fontFamily: "var(--theme-font-display)" }}
        >
          项目经历
        </h2>
        <div
          data-pencil-name="Section/Projects/List"
          className="box-border grid w-full shrink-0 grid-cols-1 gap-6 md:grid-cols-2"
        >
          {data.projects.map((project) => (
            <LunarisProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
