import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ThemeId, ThemeMeta } from "@/types/resume";

export const THEMES: ThemeMeta[] = [
  {
    id: "dark",
    label: "Dark",
    description: "深色渐变 · Aceternity 光效风格",
  },
  {
    id: "glass",
    label: "Glass",
    description: "玻璃拟态 · 柔和微交互",
  },
  {
    id: "brutalist",
    label: "Brutalist",
    description: "粗野主义 · 高对比硬边",
  },
];

const STORAGE_KEY = "resume-theme";

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
  themes: ThemeMeta[];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme(): ThemeId {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
  return THEMES.some((t) => t.id === stored) ? stored! : "dark";
}

/** 全局皮肤上下文 / Global theme context for skin switching */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(readStoredTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.style.colorScheme =
      theme === "brutalist" ? "light" : "dark";
  }, [theme]);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id);
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, themes: THEMES }),
    [theme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
