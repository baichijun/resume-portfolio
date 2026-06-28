import { useEffect, useId, useRef } from "react";
import { siteCopy } from "@/config/siteCopy";
import { cn } from "@/lib/utils";
import type { ProjectItem } from "@/types/siteContent";

export interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

/** 项目详情 Modal / Full project detail in native dialog */
export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const bodyId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      if (!dialog.open) {
        dialog.showModal();
      }
      closeButtonRef.current?.focus();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [project]);

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  const handleDialogClose = () => {
    onClose();
  };

  const highlights = project?.highlights ?? [];
  const tags = project?.tags ?? [];

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={bodyId}
      aria-label={siteCopy.projectCard.modalAriaLabel}
      className={cn(
        "fixed inset-0 z-50 m-auto w-[min(100%-2rem,42rem)] max-w-none",
        "rounded-[var(--theme-radius)] border border-[var(--theme-border)]",
        "bg-[var(--theme-card)] p-0 text-[var(--theme-text)] shadow-[var(--theme-shadow)]",
        "backdrop:bg-black/60",
      )}
      onClose={handleDialogClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          handleClose();
        }
      }}
    >
      {project && (
        <div className="flex max-h-[85vh] flex-col">
          <header className="shrink-0 border-b border-[var(--theme-border)] px-6 py-5">
            <h2
              id={titleId}
              className="text-xl font-bold sm:text-2xl"
              style={{ fontFamily: "var(--theme-font-display)" }}
            >
              {project.title}
            </h2>
            <p className="mt-2 text-sm text-[var(--theme-text-muted)]">
              {project.period}
              {project.company ? ` · ${project.company}` : ""}
            </p>
          </header>

          <div
            id={bodyId}
            className="min-h-0 flex-1 overflow-y-auto px-6 py-5"
          >
            <p className="leading-relaxed text-[var(--theme-text)]">{project.description}</p>

            {highlights.length > 0 && (
              <section className="mt-6">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--theme-text-muted)]">
                  {siteCopy.projectCard.highlightsHeading}
                </h3>
                <ul className="space-y-3 text-sm leading-relaxed text-[var(--theme-text-muted)]">
                  {highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="shrink-0 text-[var(--theme-accent)]">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-bg-secondary)] px-3 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <footer className="flex shrink-0 flex-wrap items-center justify-end gap-3 border-t border-[var(--theme-border)] px-6 py-4">
            {project.linkUrl && (
              <a
                href={project.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[var(--theme-accent)] hover:underline"
              >
                {project.linkUrl}
              </a>
            )}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleClose}
              className="inline-flex items-center rounded-[var(--theme-radius)] border border-[var(--theme-border)] px-4 py-2 text-sm font-medium transition hover:bg-[var(--theme-card-hover)]"
            >
              {siteCopy.projectCard.closeDetail}
            </button>
          </footer>
        </div>
      )}
    </dialog>
  );
}
