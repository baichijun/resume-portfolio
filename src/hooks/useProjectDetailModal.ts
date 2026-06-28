import { useCallback, useState } from "react";
import type { ProjectItem } from "@/types/siteContent";

/** 项目详情 Modal 状态 / State for section-level project detail modal */
export function useProjectDetailModal() {
  const [project, setProject] = useState<ProjectItem | null>(null);

  const open = useCallback((item: ProjectItem) => {
    setProject(item);
  }, []);

  const close = useCallback(() => {
    setProject(null);
  }, []);

  return {
    project,
    isOpen: project !== null,
    open,
    close,
  };
}
