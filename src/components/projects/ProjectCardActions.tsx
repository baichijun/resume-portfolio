import type { KeyboardEvent, MouseEvent } from "react";
import { siteCopy } from "@/config/siteCopy";

export interface ProjectCardDetailButtonProps {
  onOpen: () => void;
  className?: string;
  pencilName?: string;
}

/** 查看详情按钮 / View-detail trigger for project cards */
export function ProjectCardDetailButton({
  onOpen,
  className,
  pencilName,
}: ProjectCardDetailButtonProps) {
  return (
    <button
      type="button"
      data-pencil-name={pencilName}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onOpen();
      }}
      className={className}
    >
      {siteCopy.projectCard.viewDetail}
    </button>
  );
}

/** 卡片键盘打开详情 / Enter/Space handler for clickable project cards */
export function handleProjectCardKeyDown(
  event: KeyboardEvent<HTMLElement>,
  onOpen: () => void,
): void {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    onOpen();
  }
}
