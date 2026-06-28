import { useState } from "react";
import { cn } from "@/lib/utils";
import { siteCopy } from "@/config/siteCopy";
import { getNavigationItems } from "@/config/navigation";
import { formatContentTemplate, getHeroBlock } from "@/lib/siteContentUtils";
import { useSiteContent } from "@/hooks/useSiteContent";

interface SkinHeaderProps {
  className?: string;
  navClassName?: string;
}

/** 皮肤通用顶栏 / Shared sticky header; brand from site content hero */
export function SkinHeader({ className, navClassName }: SkinHeaderProps) {
  const content = useSiteContent();
  const hero = getHeroBlock(content);
  const navItems = getNavigationItems();
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
          href="#hero"
          className="text-lg font-bold"
          style={{ fontFamily: "var(--theme-font-display)" }}
        >
          {hero?.headline ?? siteCopy.missing.fallback}
        </a>
        <nav className={cn("hidden gap-6 md:flex", navClassName)}>
          {navItems.map((item) => (
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
          {navItems.map((item) => (
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

/** 皮肤通用页脚 / Shared footer from site content meta template */
export function SkinFooter() {
  const content = useSiteContent();
  const hero = getHeroBlock(content);
  const name = hero?.headline ?? "";

  return (
    <footer className="border-t border-[var(--theme-border)] px-4 py-10 text-center text-sm text-[var(--theme-text-muted)]">
      {formatContentTemplate(content.meta.footer, { name })}
    </footer>
  );
}
