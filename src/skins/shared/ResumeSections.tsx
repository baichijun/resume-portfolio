import { useState } from "react";
import { motion } from "framer-motion";
import { siteCopy } from "@/config/siteCopy";
import { useResumeData } from "@/hooks/useResumeData";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { cn } from "@/lib/utils";
import { BASE } from "@/skins/shared/constants";

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

/** 通用区块 / Generic resume section wrapper */
export function ResumeSection({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <h2
            className="text-3xl font-bold sm:text-4xl"
            style={{ fontFamily: "var(--theme-font-display)" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-[var(--theme-text-muted)]">{subtitle}</p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

interface HeroProps {
  layout?: "center" | "split" | "editorial";
  panelClass?: string;
}

/** 英雄区 / Hero with resume data */
export function ResumeHero({ layout = "split", panelClass = "skin-panel" }: HeroProps) {
  const data = useResumeData();
  const intro = data.summary.slice(0, 3).join("；");
  const { hero } = siteCopy;

  return (
    <section
      id={siteCopy.nav.hero.href.slice(1)}
      className="relative flex min-h-screen scroll-mt-24 items-center px-4 pt-24 sm:px-6 lg:px-8"
    >
      <div
        className={cn(
          "mx-auto w-full max-w-6xl",
          layout === "center" && "text-center",
          layout === "split" && "grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center",
          layout === "editorial" && "grid gap-16 lg:grid-cols-[1.2fr_0.8fr]",
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={layout === "center" ? "mx-auto max-w-3xl" : ""}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[var(--theme-text-muted)]">
            {hero.roleLine}
          </p>
          <h1
            className={cn(
              "text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl",
              layout === "editorial" && "tracking-tight",
            )}
            style={{ fontFamily: "var(--theme-font-display)" }}
          >
            <span className="gradient-text">{data.name}</span>
          </h1>
          <p className="mt-4 text-lg text-[var(--theme-text-muted)]">{data.tagline}</p>
          <p className="mt-6 max-w-2xl leading-relaxed text-[var(--theme-text)]">{intro}</p>
          <div
            className={cn(
              "mt-8 flex flex-wrap gap-4",
              layout === "center" && "justify-center",
            )}
          >
            <a
              href={hero.ctaPrimaryHref}
              className="inline-flex items-center rounded-[var(--theme-radius)] bg-[var(--theme-accent)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              {hero.ctaPrimary}
            </a>
            <a
              href={hero.ctaSecondaryHref}
              className="inline-flex items-center rounded-[var(--theme-radius)] border border-[var(--theme-border)] px-6 py-3 text-sm font-medium transition hover:bg-[var(--theme-card-hover)]"
            >
              {hero.ctaSecondary}
            </a>
          </div>
        </motion.div>

        {layout !== "center" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className={cn("relative p-6", panelClass)}
          >
            <div className="relative mx-auto h-48 w-48 overflow-hidden sm:h-56 sm:w-56">
              <img
                src={`${BASE}images/placeholders/avatar.svg`}
                alt={`${data.name} 头像占位`}
                loading="lazy"
                className="h-full w-full rounded-[var(--theme-radius)] object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <PlaceholderBadge label="头像" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/** 关于我 / About section */
export function ResumeAbout() {
  const data = useResumeData();
  const { about } = siteCopy.sections;

  return (
    <ResumeSection id={about.id} title={about.title} subtitle={about.subtitle}>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="skin-panel p-6">
          <h3 className="mb-4 text-xl font-semibold">{about.summaryHeading}</h3>
          <ul className="space-y-3 text-[var(--theme-text-muted)]">
            {data.summary.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-[var(--theme-accent)]">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="skin-panel p-6">
          <h3 className="mb-4 text-xl font-semibold">{about.educationHeading}</h3>
          <ul className="space-y-4">
            {data.education.map((edu) => (
              <li key={`${edu.school}-${edu.period}`} className="border-l-2 border-[var(--theme-accent)] pl-4">
                <p className="font-medium">{edu.school}</p>
                <p className="text-sm text-[var(--theme-text-muted)]">{edu.degree}</p>
                <p className="text-xs text-[var(--theme-text-muted)]">{edu.period}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="skin-panel mt-8 p-6">
        <h3 className="mb-4 text-xl font-semibold">{about.skillsHeading}</h3>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-bg-secondary)] px-3 py-1 text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </ResumeSection>
  );
}

/** 项目经历 / Projects section */
export function ResumeProjects() {
  const data = useResumeData();
  const { projects } = siteCopy.sections;

  return (
    <ResumeSection id={projects.id} title={projects.title} subtitle={projects.subtitle}>
      <div className="grid gap-8 md:grid-cols-2">
        {data.projects.map((project, index) => (
          <ProjectCard key={project.title} index={index} project={project} />
        ))}
      </div>
    </ResumeSection>
  );
}

/** 可展开项目卡片，供 Skill 皮肤复用 / Expandable project card for skill skins */
function ProjectCard({
  project,
  index,
}: {
  project: ReturnType<typeof useResumeData>["projects"][number];
  index: number;
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
      className="skin-panel group flex flex-col overflow-hidden"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-[var(--theme-bg-secondary)]">
        <img
          src={`${BASE}images/placeholders/project.svg`}
          alt={`${project.title} 项目截图占位`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
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
            {expanded ? siteCopy.projectCard.collapse : siteCopy.projectCard.expand}
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
      </div>
    </motion.article>
  );
}

/** 联系方式 / Contact section */
export function ResumeContact() {
  const data = useResumeData();
  const { contact } = siteCopy.sections;
  const missing = siteCopy.missing.fallback;

  return (
    <ResumeSection id={contact.id} title={contact.title} subtitle={contact.subtitle}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <a
          href={`mailto:${data.email}`}
          className="skin-panel block p-6 transition hover:bg-[var(--theme-card-hover)]"
        >
          <p className="text-sm text-[var(--theme-text-muted)]">{contact.emailLabel}</p>
          <p className="mt-2 font-semibold">{data.email || missing}</p>
        </a>
        <div className="skin-panel p-6">
          <p className="text-sm text-[var(--theme-text-muted)]">{contact.phoneLabel}</p>
          <p className="mt-2 font-semibold">{data.phone || missing}</p>
        </div>
        <div className="skin-panel p-6">
          <p className="text-sm text-[var(--theme-text-muted)]">{contact.githubLabel}</p>
          <PlaceholderBadge label="社交媒体链接" />
        </div>
      </div>
    </ResumeSection>
  );
}
