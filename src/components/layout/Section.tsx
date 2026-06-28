import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

/** 通用区块容器 / Reusable page section wrapper */
export function Section({ id, title, subtitle, children, className }: SectionProps) {
  const { theme } = useTheme();

  return (
    <section
      id={id}
      className={cn("scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8", className)}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2
            className={cn(
              "text-3xl font-bold tracking-tight sm:text-4xl",
              theme === "brutalist" && "uppercase tracking-widest",
            )}
            style={{ fontFamily: "var(--theme-font-display)" }}
          >
            <span className={theme === "brutalist" ? "text-[var(--theme-accent)]" : "gradient-text"}>
              {title}
            </span>
          </h2>
          {subtitle && (
            <p className="mt-3 max-w-2xl text-[var(--theme-text-muted)]">{subtitle}</p>
          )}
          {theme === "brutalist" && (
            <div className="mt-4 h-1 w-24 bg-[var(--theme-accent)]" />
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
