import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import type { ThemeId, ThemeSource } from "@/types/resume";

/** 皮肤切换器 / Six-skin switcher grouped by Skill vs Pencil */
export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();

  const groups: { source: ThemeSource; label: string }[] = [
    { source: "skill", label: "Skill 皮肤" },
    { source: "pencil", label: "Pencil 皮肤" },
  ];

  return (
    <div
      className="fixed bottom-6 right-6 z-50 max-h-[85vh] overflow-y-auto rounded-[var(--theme-radius)] border border-[var(--theme-border)] bg-[var(--theme-card)] p-2 shadow-[var(--theme-shadow)] backdrop-blur-md"
      role="group"
      aria-label="切换 UI 皮肤"
    >
      <p className="border-b border-[var(--theme-border)] px-2 pb-2 pt-1 text-xs font-semibold text-[var(--theme-text)]">
        UI 皮肤对比
      </p>
      {groups.map((group) => (
        <div key={group.source} className="mb-2 last:mb-0">
          <span className="block px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">
            {group.label}
          </span>
          {themes
            .filter((t) => t.source === group.source)
            .map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id as ThemeId)}
                className={cn(
                  "mb-1 w-full rounded px-3 py-2 text-left text-sm transition last:mb-0",
                  theme === t.id
                    ? "bg-[var(--theme-accent)] font-medium text-white"
                    : "text-[var(--theme-text-muted)] hover:bg-[var(--theme-card-hover)] hover:text-[var(--theme-text)]",
                )}
                title={t.description}
              >
                <span className="block font-medium">{t.label}</span>
                <span className="block text-[10px] opacity-80">{t.toolLabel}</span>
              </button>
            ))}
        </div>
      ))}
    </div>
  );
}
