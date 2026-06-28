import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

const NAV_ITEMS = [
  { href: "#hero", label: "首页" },
  { href: "#about", label: "关于" },
  { href: "#projects", label: "项目" },
  { href: "#contact", label: "联系" },
];

/** 顶部导航 / Sticky header with anchor navigation */
export function Header() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md",
        theme === "glass" && "border-[var(--theme-border)] bg-[rgba(15,23,42,0.7)]",
        theme === "dark" && "border-[var(--theme-border)] bg-[rgba(10,10,10,0.8)]",
        theme === "brutalist" && "border-b-4 border-black bg-[var(--theme-bg)]",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a
          href="#hero"
          className="text-lg font-bold"
          style={{ fontFamily: "var(--theme-font-display)" }}
        >
          Resume
        </a>

        <nav className="hidden gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--theme-text-muted)] transition hover:text-[var(--theme-text)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={cn(
            "md:hidden rounded px-3 py-2 text-sm",
            theme === "brutalist"
              ? "border-2 border-black bg-white font-bold"
              : "border border-[var(--theme-border)]",
          )}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="打开菜单"
        >
          {open ? "关闭" : "菜单"}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-2 border-t border-[var(--theme-border)] px-4 py-4 md:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-2 text-[var(--theme-text-muted)]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
