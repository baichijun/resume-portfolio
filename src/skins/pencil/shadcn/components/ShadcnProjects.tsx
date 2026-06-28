import { getProjectDisplayTags, getProjectsBlock } from "@/lib/siteContentUtils";
import { useSiteContent } from "@/hooks/useSiteContent";
import type { ProjectItem } from "@/types/siteContent";

// LAYOUT: from export/desktop.html (2026-06-28)
// BINDINGS: see layer-map.ts — Section/Projects, Card/Project

/** 单项目卡片 / Single project card from Card/Project template */
function ShadcnProjectCard({ project }: { project: ProjectItem }) {
  const tags = getProjectDisplayTags(project);

  return (
    <article
      data-pencil-name="Card/Project"
      className="box-border flex h-fit min-w-0 flex-1 flex-col gap-3 rounded-[var(--theme-radius)] border border-[var(--theme-border)] bg-[var(--theme-card)] p-7"
    >
      <h3
        data-pencil-name="Title"
        className="text-lg font-bold text-[var(--theme-text)]"
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

/** Shadcn 项目经历 / Projects section aligned to Pencil export */
export function ShadcnProjects() {
  const content = useSiteContent();
  const projects = getProjectsBlock(content);

  if (!projects) return null;

  return (
    <section
      id={projects.id}
      data-pencil-name="Projects"
      className="scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <h2
          data-pencil-name="Section/Projects"
          className="text-2xl font-bold text-[var(--theme-text)] sm:text-[30px]/[normal]"
          style={{ fontFamily: "var(--theme-font-display)" }}
        >
          {projects.title}
        </h2>
        <div
          data-pencil-name="Section/Projects/List"
          className="box-border grid w-full shrink-0 grid-cols-1 gap-6 md:grid-cols-2"
        >
          {projects.items.map((project) => (
            <ShadcnProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
