import { useTheme } from "@/context/ThemeContext";

const version = import.meta.env.VITE_APP_VERSION as string | undefined;

/** 页脚 / Site footer with optional build version */
export function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className="border-t border-[var(--theme-border)] px-4 py-8 text-center text-sm text-[var(--theme-text-muted)]"
      style={
        theme === "brutalist"
          ? { borderTopWidth: "4px", borderColor: "#000" }
          : undefined
      }
    >
      <p>© {new Date().getFullYear()} 个人简历 · Personal Resume</p>
      {version && (
        <p className="mt-2 font-mono text-xs opacity-60">build {version.slice(0, 7)}</p>
      )}
    </footer>
  );
}
