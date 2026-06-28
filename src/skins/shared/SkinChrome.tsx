import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/skins/shared/constants";

interface SkinHeaderProps {
  brand?: string;
  className?: string;
  navClassName?: string;
}

/** 皮肤通用顶栏 / Shared sticky header for skin pages */
export function SkinHeader({
  brand = "Resume",
  className,
  navClassName,
}: SkinHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-[var(--theme-border)] backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a
          href="#hero"
          className="text-lg font-bold"
          style={{ fontFamily: "var(--theme-font-display)" }}
        >
          {brand}
        </a>
        <nav className={cn("hidden gap-6 md:flex", navClassName)}>
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
          className="rounded border border-[var(--theme-border)] px-3 py-2 text-sm md:hidden"
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

/** 皮肤通用页脚 / Shared footer for skin pages */
export function SkinFooter({ children }: { children?: ReactNode }) {
  return (
    <footer className="border-t border-[var(--theme-border)] px-4 py-10 text-center text-sm text-[var(--theme-text-muted)]">
      {children ?? `© ${new Date().getFullYear()} Resume Portfolio`}
    </footer>
  );
}
