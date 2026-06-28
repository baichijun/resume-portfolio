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

/** 六皮肤元数据，供切换器与路由使用 / Six-skin metadata for switcher and routing */
export const THEMES: ThemeMeta[] = [
  {
    id: "skill-frontend-design",
    label: "FD Design",
    description: "frontend-design · 编辑型深色排版",
    source: "skill",
    toolLabel: "frontend-design",
  },
  {
    id: "skill-ui-ux-pro-max",
    label: "UX Pro Max",
    description: "ui-ux-pro-max · 结构化 SaaS 体验",
    source: "skill",
    toolLabel: "ui-ux-pro-max",
  },
  {
    id: "skill-design-taste",
    label: "Design Taste",
    description: "design-taste-frontend · 反模板 editorial",
    source: "skill",
    toolLabel: "design-taste-frontend",
  },
  {
    id: "pencil-shadcn",
    label: "Pencil Shadcn",
    description: "Pencil · Shadcn UI Design System",
    source: "pencil",
    toolLabel: "Pencil + Shadcn UI",
  },
  {
    id: "pencil-lunaris",
    label: "Pencil Lunaris",
    description: "Pencil · Lunaris Design System",
    source: "pencil",
    toolLabel: "Pencil + Lunaris",
  },
  {
    id: "pencil-halo",
    label: "Pencil Halo",
    description: "Pencil · Halo Design System",
    source: "pencil",
    toolLabel: "Pencil + Halo",
  },
];

const STORAGE_KEY = "resume-theme";

interface ThemeContextValue {
  theme: ThemeId;
  themeMeta: ThemeMeta;
  setTheme: (id: ThemeId) => void;
  themes: ThemeMeta[];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/** 从 localStorage 恢复皮肤，无效时回退默认 / Restore theme from storage with fallback */
function readStoredTheme(): ThemeId {
  if (typeof window === "undefined") return "skill-frontend-design";
  const stored = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
  return THEMES.some((t) => t.id === stored) ? stored! : "skill-frontend-design";
}

/** 全局皮肤上下文 / Global theme context for six-skin comparison */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(readStoredTheme);

  const themeMeta = useMemo(
    () => THEMES.find((t) => t.id === theme) ?? THEMES[0],
    [theme],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
    const lightThemes: ThemeId[] = [
      "skill-design-taste",
      "pencil-shadcn",
      "pencil-halo",
    ];
    document.documentElement.style.colorScheme = lightThemes.includes(theme)
      ? "light"
      : "dark";
  }, [theme]);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id);
  }, []);

  const value = useMemo(
    () => ({ theme, themeMeta, setTheme, themes: THEMES }),
    [theme, themeMeta, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/** 读取皮肤上下文，须在 ThemeProvider 内使用 / Theme context hook; requires ThemeProvider */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
