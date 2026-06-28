import {
  AVATAR_OBJECT_POSITION,
  AVATAR_SRC,
} from "@/skins/shared/constants";
import { cn } from "@/lib/utils";

/** 头像框变体 / Avatar frame variants per skin */
export type HeroAvatarVariant =
  | "panel"
  | "panelSolid"
  | "circle"
  | "shadcn"
  | "lunaris"
  | "halo";

export interface HeroAvatarProps {
  variant: HeroAvatarVariant;
  alt: string;
  className?: string;
  /** Pencil layer 绑定 / Optional data-pencil-name for export sync */
  pencilName?: string;
}

/** Hero 头像框：外框即裁剪区，img 绝对铺满 / Hero avatar frame with edge-to-edge cover */
export function HeroAvatar({
  variant,
  alt,
  className,
  pencilName = "Hero/Avatar",
}: HeroAvatarProps) {
  const frameClass = cn(
    "relative shrink-0 overflow-hidden",
    variant === "panel" && "skin-panel h-56 w-56 rounded-[var(--theme-radius)]",
    variant === "panelSolid" &&
      "skin-panel-solid h-56 w-56 rounded-[var(--theme-radius)]",
    variant === "circle" &&
      "mx-auto h-24 w-24 rounded-full ring-2 ring-[var(--theme-border)] ring-offset-2 ring-offset-[var(--theme-bg)] sm:h-28 sm:w-28",
    variant === "shadcn" &&
      "mx-auto h-48 w-48 rounded-[var(--theme-radius)] border border-[var(--theme-border)] bg-[var(--theme-card)] sm:mx-0 sm:h-60 sm:w-60",
    variant === "lunaris" &&
      "mx-auto h-48 w-48 rounded-[var(--theme-radius)] border border-[var(--theme-border)] bg-[var(--theme-bg-secondary)] sm:mx-0 sm:h-60 sm:w-60",
    variant === "halo" &&
      "relative mx-auto h-48 w-48 rounded-full sm:mx-0 sm:h-52 sm:w-52",
    className,
  );

  return (
    <div data-pencil-name={pencilName} className={frameClass}>
      {variant === "halo" && (
        <div
          className="pointer-events-none absolute -inset-4 rounded-full bg-[var(--theme-accent)] opacity-20 blur-2xl"
          aria-hidden
        />
      )}
      <img
        src={AVATAR_SRC}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: AVATAR_OBJECT_POSITION }}
      />
    </div>
  );
}
