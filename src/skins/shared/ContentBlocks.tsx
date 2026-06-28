import { useState } from "react";
import { motion } from "framer-motion";
import { siteCopy } from "@/config/siteCopy";
import { useSiteContent } from "@/hooks/useSiteContent";
import {
  getPrimaryCta,
  getProjectDisplayTags,
} from "@/lib/siteContentUtils";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { cn } from "@/lib/utils";
import { AVATAR_SRC, BASE } from "@/skins/shared/constants";
import type {
  AboutBlock,
  ContactBlock,
  CustomBlock,
  HeroBlock,
  ProjectItem,
  ProjectsBlock,
  SiteBlock,
} from "@/types/siteContent";

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

/** 通用区块包装 / Generic section wrapper */
function ContentSection({ id, title, subtitle, children }: SectionProps) {
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

interface HeroRendererProps {
  block: HeroBlock;
  layout?: "center" | "split" | "editorial";
  panelClass?: string;
}

/** Hero 块渲染 / Hero block renderer */
function HeroBlockRenderer({
  block,
  layout = "split",
  panelClass = "skin-panel",
}: HeroRendererProps) {
  const primaryCta = getPrimaryCta(block);
  const secondaryCta = block.ctas.find((cta) => cta.variant === "secondary");

  return (
    <section
      id={block.id}
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
          {block.roleLine && (
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[var(--theme-text-muted)]">
              {block.roleLine}
            </p>
          )}
          <h1
            className={cn(
              "text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl",
              layout === "editorial" && "tracking-tight",
            )}
            style={{ fontFamily: "var(--theme-font-display)" }}
          >
            <span className="gradient-text">{block.headline}</span>
          </h1>
          <p className="mt-4 text-lg text-[var(--theme-text-muted)]">{block.tagline}</p>
          {block.intro && (
            <p className="mt-6 max-w-2xl leading-relaxed text-[var(--theme-text)]">
              {block.intro}
            </p>
          )}
          <div
            className={cn(
              "mt-8 flex flex-wrap gap-4",
              layout === "center" && "justify-center",
            )}
          >
            {primaryCta && (
              <a
                href={primaryCta.href}
                className="inline-flex items-center rounded-[var(--theme-radius)] bg-[var(--theme-accent)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                {primaryCta.label}
              </a>
            )}
            {secondaryCta && (
              <a
                href={secondaryCta.href}
                className="inline-flex items-center rounded-[var(--theme-radius)] border border-[var(--theme-border)] px-6 py-3 text-sm font-medium transition hover:bg-[var(--theme-card-hover)]"
              >
                {secondaryCta.label}
              </a>
            )}
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
                src={AVATAR_SRC}
                alt={`${block.headline} 头像`}
                loading="lazy"
                className="h-full w-full rounded-[var(--theme-radius)] object-cover"
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/** About 块渲染 / About block renderer */
function AboutBlockRenderer({ block }: { block: AboutBlock }) {
  return (
    <ContentSection id={block.id} title={block.title} subtitle={block.subtitle}>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="skin-panel p-6">
          <h3 className="mb-4 text-xl font-semibold">{block.summaryHeading}</h3>
          <ul className="space-y-3 text-[var(--theme-text-muted)]">
            {block.summaryBullets.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-[var(--theme-accent)]">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="skin-panel p-6">
          <h3 className="mb-4 text-xl font-semibold">{block.educationHeading}</h3>
          <ul className="space-y-4">
            {block.education.map((edu) => (
              <li
                key={`${edu.school}-${edu.period}`}
                className="border-l-2 border-[var(--theme-accent)] pl-4"
              >
                <p className="font-medium">{edu.school}</p>
                <p className="text-sm text-[var(--theme-text-muted)]">{edu.degree}</p>
                <p className="text-xs text-[var(--theme-text-muted)]">{edu.period}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="skin-panel mt-8 p-6">
        <h3 className="mb-4 text-xl font-semibold">{block.skillsHeading}</h3>
        <div className="flex flex-wrap gap-2">
          {block.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-bg-secondary)] px-3 py-1 text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </ContentSection>
  );
}

/** 可展开项目卡 / Expandable project card for skill skins */
function SkillProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const shortDesc =
    project.description.length > 160 && !expanded
      ? `${project.description.slice(0, 160)}…`
      : project.description;
  const tags = getProjectDisplayTags(project);

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
          {tags.length > 0 ? (
            tags.map((tech) => (
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

/** Projects 块渲染 / Projects block renderer */
function ProjectsBlockRenderer({ block }: { block: ProjectsBlock }) {
  return (
    <ContentSection id={block.id} title={block.title} subtitle={block.subtitle}>
      <div className="grid gap-8 md:grid-cols-2">
        {block.items.map((project, index) => (
          <SkillProjectCard key={project.title} index={index} project={project} />
        ))}
      </div>
    </ContentSection>
  );
}

/** Contact 块渲染 / Contact block renderer */
function ContactBlockRenderer({ block }: { block: ContactBlock }) {
  const missing = siteCopy.missing.fallback;

  return (
    <ContentSection id={block.id} title={block.title} subtitle={block.subtitle}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <a
          href={block.email ? `mailto:${block.email}` : undefined}
          className="skin-panel block p-6 transition hover:bg-[var(--theme-card-hover)]"
        >
          <p className="text-sm text-[var(--theme-text-muted)]">{block.emailLabel}</p>
          <p className="mt-2 font-semibold">{block.email || missing}</p>
        </a>
        <div className="skin-panel p-6">
          <p className="text-sm text-[var(--theme-text-muted)]">{block.phoneLabel}</p>
          <p className="mt-2 font-semibold">{block.phone || missing}</p>
        </div>
        <div className="skin-panel p-6">
          <p className="text-sm text-[var(--theme-text-muted)]">{block.githubLabel}</p>
          {block.githubUrl ? (
            <a
              href={block.githubUrl}
              className="mt-2 block font-semibold text-[var(--theme-accent)] hover:underline"
            >
              {block.githubUrl}
            </a>
          ) : (
            <PlaceholderBadge label="社交媒体链接" />
          )}
        </div>
      </div>
    </ContentSection>
  );
}

/** Custom 块渲染 / Custom freeform block renderer */
function CustomBlockRenderer({ block }: { block: CustomBlock }) {
  return (
    <ContentSection id={block.id} title={block.title}>
      <div className="skin-panel p-6 text-[var(--theme-text-muted)] leading-relaxed">
        {block.body}
      </div>
    </ContentSection>
  );
}

interface ContentBlockRendererProps {
  block: SiteBlock;
  heroLayout?: "center" | "split" | "editorial";
  heroPanelClass?: string;
}

/** 单块渲染 / Render one content block by type */
export function ContentBlockRenderer({
  block,
  heroLayout,
  heroPanelClass,
}: ContentBlockRendererProps) {
  switch (block.type) {
    case "hero":
      return (
        <HeroBlockRenderer
          block={block}
          layout={heroLayout}
          panelClass={heroPanelClass}
        />
      );
    case "about":
      return <AboutBlockRenderer block={block} />;
    case "projects":
      return <ProjectsBlockRenderer block={block} />;
    case "contact":
      return <ContactBlockRenderer block={block} />;
    case "experience":
      return null;
    case "custom":
      return <CustomBlockRenderer block={block} />;
    default:
      return null;
  }
}

export interface ContentBlocksProps {
  heroLayout?: "center" | "split" | "editorial";
  heroPanelClass?: string;
}

/** 按 blocks 顺序渲染站点内容 / Render all site content blocks in order */
export function ContentBlocks({ heroLayout, heroPanelClass }: ContentBlocksProps) {
  const content = useSiteContent();

  return (
    <>
      {content.blocks.map((block) => (
        <ContentBlockRenderer
          key={block.id}
          block={block}
          heroLayout={heroLayout}
          heroPanelClass={heroPanelClass}
        />
      ))}
    </>
  );
}
