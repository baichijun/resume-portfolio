/** 锚点导航 re-export / Nav items sourced from site shell config */
export { NAV_ITEMS } from "@/config/navigation";

/** 部署 base path，兼容 GitHub Pages 等子路径 / Deploy base URL for GH Pages subpaths */
export const BASE = import.meta.env.BASE_URL;

/** 头像池条目 / Single avatar asset with crop hint */
export interface AvatarPoolItem {
  id: "left" | "right";
  src: string;
  objectPosition: string;
}

/** 可选头像池（刷新/切肤时随机） / Avatar pool for random pick on refresh or theme change */
export const AVATAR_POOL: readonly AvatarPoolItem[] = [
  {
    id: "left",
    src: `${BASE}images/itboy-left.jpeg`,
    objectPosition: "20% center",
  },
  {
    id: "right",
    src: `${BASE}images/itboy-right.jpeg`,
    objectPosition: "80% center",
  },
] as const;
