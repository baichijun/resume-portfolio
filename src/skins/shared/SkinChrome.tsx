import { useState } from "react";
import { cn } from "@/lib/utils";
import { formatFooterText, siteCopy } from "@/config/siteCopy";
import { NAV_ITEMS } from "@/config/navigation";
import { useResumeData } from "@/hooks/useResumeData";

interface SkinHeaderProps {
  className?: string;
  navClassName?: string;
}

/** 皮肤通用顶栏 / Shared sticky header; brand from resume name via site shell */
export function SkinHeader({ className, navClassName }: SkinHeaderProps) {
  const { name } = useResumeData();
  const [open, setOpen] = useState(false);
  const { chrome } = siteCopy;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-[var(--theme-border)] backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a
          href={siteCopy.nav.hero.href}
          className="text-lg font-bold"
          style={{ fontFamily: "var(--theme-font-display)" }}
        >
          {name}
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
          aria-label={chrome.menuAriaLabel}
        >
          {open ? chrome.menuClose : chrome.menuOpen}
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

/** 皮肤通用页脚 / Shared footer from site shell template */
export function SkinFooter() {
  const { name } = useResumeData();

  return (
    <footer className="border-t border-[var(--theme-border)] px-4 py-10 text-center text-sm text-[var(--theme-text-muted)]">
      {formatFooterText(name)}
    </footer>
  );
}
