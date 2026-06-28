import { siteCopy } from "@/config/siteCopy";
import {
  handleProjectCardKeyDown,
  ProjectCardDetailButton,
} from "@/components/projects/ProjectCardActions";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { useProjectDetailModal } from "@/hooks/useProjectDetailModal";
import { useSiteContent } from "@/hooks/useSiteContent";
import { getProjectsBlock } from "@/lib/siteContentUtils";
import {
  getProjectPreviewTags,
  hasProjectDetail,
  truncateProjectDescription,
} from "@/lib/projectDisplay";
import { cn } from "@/lib/utils";
import type { ProjectItem } from "@/types/siteContent";

// LAYOUT: from export/desktop.html (2026-06-28)
// BINDINGS: see layer-map.ts — Section/Projects, Card/Project

/** 单项目卡片 / Single project card from Card/Project template */
function LunarisProjectCard({
  project,
  onOpenDetail,
}: {
  project: ProjectItem;
  onOpenDetail: (project: ProjectItem) => void;
}) {
  const { text: previewDesc } = truncateProjectDescription(project.description);
  const tags = getProjectPreviewTags(project);
  const showDetail = hasProjectDetail(project);
  const highlightCount = project.highlights?.length ?? 0;

  const handleOpen = () => {
    if (showDetail) onOpenDetail(project);
  };

  return (
    <article
      data-pencil-name="Card/Project"
      className={cn(
        "box-border flex h-full min-h-[16rem] min-w-0 flex-1 flex-col gap-3 rounded-[var(--theme-radius)] border border-[var(--theme-border)] bg-[var(--theme-card)] p-7",
        showDetail && "cursor-pointer",
      )}
      role={showDetail ? "button" : undefined}
      tabIndex={showDetail ? 0 : undefined}
      onClick={showDetail ? handleOpen : undefined}
      onKeyDown={showDetail ? (event) => handleProjectCardKeyDown(event, handleOpen) : undefined}
    >
      <div
        data-pencil-name="Shell/AccentBar"
        className="h-1 w-10 shrink-0 rounded-sm bg-[var(--theme-accent)]"
        aria-hidden
      />
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
        {highlightCount > 0 && (
          <span className="ml-1 opacity-80">
            · {siteCopy.projectCard.highlightCount(highlightCount)}
          </span>
        )}
      </p>
      <p
        data-pencil-name="Description"
        className="line-clamp-4 min-h-0 flex-1 text-sm leading-relaxed text-[var(--theme-text-muted)]"
        style={{ fontFamily: "var(--theme-font-body)" }}
      >
        {previewDesc}
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
      {showDetail && (
        <ProjectCardDetailButton
          pencilName="Button/ViewDetail"
          onOpen={handleOpen}
          className="mt-auto text-left text-sm text-[var(--theme-accent)] hover:underline"
        />
      )}
    </article>
  );
}

/** Lunaris 项目经历 / Projects section aligned to Pencil export */
export function LunarisProjects() {
  const content = useSiteContent();
  const projects = getProjectsBlock(content);
  const { project, open, close } = useProjectDetailModal();

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
          className="text-2xl font-bold text-[var(--theme-accent)] sm:text-[32px]/[normal]"
          style={{ fontFamily: "var(--theme-font-display)" }}
        >
          {projects.title}
        </h2>
        <div
          data-pencil-name="Section/Projects/List"
          className="box-border grid w-full shrink-0 grid-cols-1 items-stretch gap-6 md:grid-cols-2"
        >
          {projects.items.map((projectItem) => (
            <LunarisProjectCard key={projectItem.title} project={projectItem} onOpenDetail={open} />
          ))}
        </div>
      </div>
      <ProjectDetailModal project={project} onClose={close} />
    </section>
  );
}
