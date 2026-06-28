import { useTheme } from "@/context/ThemeContext";
import { PencilSkinPage } from "@/skins/pencil/PencilSkinPage";
import { SkillSkinPage } from "@/skins/skill/SkillSkinPage";

/** 应用根组件 / Root app with skill vs pencil skin routing */
export default function App() {
  const { theme, themeMeta } = useTheme();

  if (themeMeta.source === "pencil") {
    return <PencilSkinPage themeId={theme} />;
  }

  return <SkillSkinPage themeId={theme} />;
}
