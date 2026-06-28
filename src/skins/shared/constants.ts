/** 锚点导航 re-export / Nav items sourced from site shell config */
export { NAV_ITEMS } from "@/config/navigation";

/** 部署 base path，兼容 GitHub Pages 等子路径 / Deploy base URL for GH Pages subpaths */
export const BASE = import.meta.env.BASE_URL;

/** 个人头像（public/images/） / Profile photo served from public/images/ */
export const AVATAR_SRC = `${BASE}images/itboy-left.jpeg`;

/** 头像构图焦点（主体偏左） / Object-position for left-weighted portrait crop */
export const AVATAR_OBJECT_POSITION = "20% center";
