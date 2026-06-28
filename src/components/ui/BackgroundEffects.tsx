import { useTheme } from "@/context/ThemeContext";

/** 主题背景动效 / Theme-aware ambient background effects */
export function BackgroundEffects() {
  const { theme } = useTheme();

  if (theme === "brutalist") {
    return (
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #000 0, #000 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #000 0, #000 1px, transparent 1px, transparent 40px)",
        }}
      />
    );
  }

  if (theme === "glass") {
    return (
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.25), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(6,182,212,0.12), transparent)",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
    </div>
  );
}
