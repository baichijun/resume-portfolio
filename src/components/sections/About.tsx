import { motion } from "framer-motion";
import { useResumeData } from "@/hooks/useResumeData";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

/** 关于我与技能 / About section with summary, education and skills */
export function About() {
  const data = useResumeData();
  const { theme } = useTheme();

  const cardClass =
    theme === "brutalist" ? "brutalist-panel p-6" : "glass-panel p-6";

  return (
    <Section
      id="about"
      title="关于我"
      subtitle="个人优势、教育背景与核心技能"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cardClass}
        >
          <h3 className="mb-4 text-xl font-semibold">个人优势</h3>
          <ul className="space-y-3 text-[var(--theme-text-muted)]">
            {data.summary.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-[var(--theme-accent)]">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={cardClass}
        >
          <h3 className="mb-4 text-xl font-semibold">教育经历</h3>
          <ul className="space-y-4">
            {data.education.map((edu) => (
              <li
                key={`${edu.school}-${edu.period}`}
                className={cn(
                  "border-l-2 pl-4",
                  theme === "brutalist"
                    ? "border-black"
                    : "border-[var(--theme-accent)]",
                )}
              >
                <p className="font-medium">{edu.school}</p>
                <p className="text-sm text-[var(--theme-text-muted)]">{edu.degree}</p>
                <p className="text-xs text-[var(--theme-text-muted)]">{edu.period}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={cn("mt-8", cardClass)}
      >
        <h3 className="mb-4 text-xl font-semibold">核心技能</h3>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill) => (
            <span
              key={skill}
              className={cn(
                "rounded-full px-3 py-1 text-sm",
                theme === "brutalist"
                  ? "border-2 border-black bg-[var(--theme-card-hover)] font-bold"
                  : "border border-[var(--theme-border)] bg-[var(--theme-card)]",
              )}
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>

      {data.experience.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn("mt-8", cardClass)}
        >
          <h3 className="mb-6 text-xl font-semibold">工作经历</h3>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={`${exp.company}-${exp.period}`}>
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="text-lg font-semibold">{exp.company}</h4>
                  <span className="text-sm text-[var(--theme-text-muted)]">{exp.period}</span>
                </div>
                {exp.roles.map((role) => (
                  <div key={role.title} className="mb-4 ml-2 border-l border-[var(--theme-border)] pl-4">
                    <p className="font-medium">
                      {role.title}
                      {role.period && (
                        <span className="ml-2 text-sm text-[var(--theme-text-muted)]">
                          ({role.period})
                        </span>
                      )}
                    </p>
                    {role.sections.map((sec) => (
                      <div key={sec.heading} className="mt-2">
                        <p className="text-sm font-medium text-[var(--theme-accent)]">
                          {sec.heading}
                        </p>
                        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-[var(--theme-text-muted)]">
                          {sec.items.map((item) => (
                            <li key={item.slice(0, 40)}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {role.items.length > 0 && (
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--theme-text-muted)]">
                        {role.items.map((item) => (
                          <li key={item.slice(0, 40)}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </Section>
  );
}
