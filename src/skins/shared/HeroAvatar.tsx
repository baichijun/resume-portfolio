import { AnimatePresence, motion } from "framer-motion";
import { useHeroAvatar } from "@/context/AvatarContext";
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

/** Hero 头像框：随机图源 + 3D 翻转切换 / Hero avatar with random source and flip transition */
export function HeroAvatar({
  variant,
  alt,
  className,
  pencilName = "Hero/Avatar",
}: HeroAvatarProps) {
  const { src, objectPosition, revision } = useHeroAvatar();

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
    <div
      data-pencil-name={pencilName}
      className={frameClass}
      style={{ perspective: 800 }}
    >
      {variant === "halo" && (
        <div
          className="pointer-events-none absolute -inset-4 rounded-full bg-[var(--theme-accent)] opacity-20 blur-2xl"
          aria-hidden
        />
      )}
      <AnimatePresence mode="wait">
        <motion.img
          key={revision}
          src={src}
          alt={alt}
          loading="lazy"
          initial={{ opacity: 0, rotateY: -90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: 90 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition,
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
          }}
        />
      </AnimatePresence>
    </div>
  );
}
