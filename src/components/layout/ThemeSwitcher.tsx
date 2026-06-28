import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import type { ThemeId } from "@/types/resume";

/** 皮肤切换器 / Floating theme skin switcher */
export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex flex-col gap-2 p-2",
        theme === "brutalist"
          ? "border-4 border-black bg-white shadow-[6px_6px_0_#000]"
          : "glass-panel shadow-[var(--theme-shadow)]",
      )}
      role="group"
      aria-label="切换 UI 皮肤"
    >
      <span className="px-2 text-xs font-medium text-[var(--theme-text-muted)]">
        皮肤 Skin
      </span>
      {themes.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => setTheme(t.id as ThemeId)}
          className={cn(
            "rounded px-3 py-2 text-left text-sm transition",
            theme === t.id
              ? theme === "brutalist"
                ? "bg-[var(--theme-accent)] font-bold text-white"
                : "bg-[var(--theme-accent)]/20 text-[var(--theme-text)]"
              : "text-[var(--theme-text-muted)] hover:text-[var(--theme-text)]",
            theme === "brutalist" && theme !== t.id && "border-2 border-black",
          )}
          title={t.description}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
