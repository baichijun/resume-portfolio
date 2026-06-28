import { useState } from "react";
import { motion } from "framer-motion";
import { useResumeData } from "@/hooks/useResumeData";
import { Section } from "@/components/layout/Section";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import type { ThemeId } from "@/types/resume";

/** 项目展示卡片 / Project showcase cards */
export function Projects() {
  const data = useResumeData();
  const { theme } = useTheme();

  const cardClass =
    theme === "brutalist" ? "brutalist-panel overflow-hidden" : "glass-panel overflow-hidden";

  return (
    <Section
      id="projects"
      title="项目经历"
      subtitle="智慧建筑、物联网与交通领域代表性项目"
    >
      <div className="grid gap-8 md:grid-cols-2">
        {data.projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            cardClass={cardClass}
            theme={theme}
          />
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({
  project,
  index,
  cardClass,
  theme,
}: {
  project: ReturnType<typeof useResumeData>["projects"][number];
  index: number;
  cardClass: string;
  theme: ThemeId;
}) {
  const [expanded, setExpanded] = useState(false);
  const shortDesc =
    project.description.length > 160 && !expanded
      ? `${project.description.slice(0, 160)}…`
      : project.description;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={cn(cardClass, "group flex flex-col")}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-[var(--theme-bg-secondary)]">
        <img
          src={`${import.meta.env.BASE_URL}images/placeholders/project.svg`}
          alt={`${project.title} 项目截图占位`}
          loading="lazy"
          className={cn(
            "h-full w-full object-cover transition duration-500 group-hover:scale-105",
            theme === "brutalist" && "border-b-4 border-black",
          )}
        />
        <div className="absolute right-3 top-3">
          <PlaceholderBadge label="截图" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-lg font-bold">{project.title}</h3>
          <span className="text-xs text-[var(--theme-text-muted)]">{project.period}</span>
        </div>
        <p className="text-sm text-[var(--theme-text-muted)]">{project.company}</p>

        <p className="mt-3 flex-1 text-sm leading-relaxed">{shortDesc}</p>
        {project.description.length > 160 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-2 text-left text-sm text-[var(--theme-accent)] hover:underline"
          >
            {expanded ? "收起" : "展开全文"}
          </button>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.length > 0 ? (
            project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[var(--theme-border)] px-2 py-0.5 text-xs"
              >
                {tech}
              </span>
            ))
          ) : (
            <PlaceholderBadge label="技术栈" />
          )}
        </div>

        <ul className="mt-4 space-y-1 text-xs text-[var(--theme-text-muted)]">
          {project.highlights.slice(0, 2).map((h) => (
            <li key={h.slice(0, 50)}>· {h}</li>
          ))}
        </ul>

        <div className="mt-6">
          {project.linkUrl ? (
            <a
              href={project.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex text-sm font-medium text-[var(--theme-accent)] hover:underline",
              )}
            >
              查看项目 →
            </a>
          ) : (
            <span
              className={cn(
                "inline-flex cursor-not-allowed rounded px-4 py-2 text-sm opacity-50",
                theme === "brutalist"
                  ? "border-2 border-black bg-gray-200"
                  : "border border-[var(--theme-border)]",
              )}
              title="请在简历内容中补充项目链接"
            >
              项目链接待补充
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
