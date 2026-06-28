import { cn } from "@/lib/utils";

interface PlaceholderBadgeProps {
  label: string;
  className?: string;
}

/** 待补充内容标记 / Badge for missing content placeholders */
export function PlaceholderBadge({ label, className }: PlaceholderBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-dashed border-[var(--theme-accent)] px-2 py-0.5 text-xs text-[var(--theme-accent)]",
        className,
      )}
    >
      待补充 · {label}
    </span>
  );
}
