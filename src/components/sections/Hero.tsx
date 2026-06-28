import { motion } from "framer-motion";
import { useResumeData } from "@/hooks/useResumeData";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";

/** 首页英雄区 / Hero section with name, tagline and avatar */
export function Hero() {
  const data = useResumeData();
  const { theme } = useTheme();
  const intro = data.summary.slice(0, 3).join("；");

  const panelClass =
    theme === "brutalist"
      ? "brutalist-panel"
      : theme === "glass"
        ? "glass-panel"
        : "glass-panel";

  return (
    <section
      id="hero"
      className="relative flex min-h-screen scroll-mt-24 items-center px-4 pt-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[var(--theme-text-muted)]">
            Project Manager · PMO
          </p>
          <h1
            className={cn(
              "text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl",
              theme === "brutalist" ? "uppercase" : "",
            )}
            style={{ fontFamily: "var(--theme-font-display)" }}
          >
            {theme === "brutalist" ? (
              <span>{data.name}</span>
            ) : (
              <span className="gradient-text">{data.name}</span>
            )}
          </h1>
          <p className="mt-4 text-lg text-[var(--theme-text-muted)]">{data.tagline}</p>
          <p className="mt-6 max-w-2xl leading-relaxed text-[var(--theme-text)]">{intro}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className={cn(
                "inline-flex items-center rounded-full px-6 py-3 text-sm font-medium transition",
                theme === "brutalist"
                  ? "border-4 border-black bg-[var(--theme-accent)] text-white shadow-[4px_4px_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                  : "bg-[var(--theme-accent)] text-white hover:opacity-90",
              )}
            >
              查看项目
            </a>
            <a
              href="#contact"
              className={cn(
                "inline-flex items-center rounded-full border px-6 py-3 text-sm font-medium transition",
                theme === "brutalist"
                  ? "border-4 border-black bg-white hover:bg-[var(--theme-card-hover)]"
                  : "border-[var(--theme-border)] hover:bg-[var(--theme-card-hover)]",
              )}
            >
              联系我
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={cn("relative p-6", panelClass)}
        >
          <div className="relative mx-auto h-48 w-48 overflow-hidden sm:h-56 sm:w-56">
            <img
              src={`${import.meta.env.BASE_URL}images/placeholders/avatar.svg`}
              alt={`${data.name} 头像占位`}
              loading="lazy"
              className={cn(
                "h-full w-full object-cover",
                theme === "brutalist" ? "border-4 border-black" : "rounded-2xl",
              )}
            />
          </div>
          <div className="mt-4 text-center">
            <PlaceholderBadge label="头像" />
          </div>
          {theme === "dark" && (
            <div className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-60">
              <div className="shimmer-border absolute inset-x-0 top-0 h-px" />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
