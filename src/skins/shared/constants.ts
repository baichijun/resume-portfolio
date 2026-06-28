/** 锚点导航项 / Section anchor links shared by skin headers */
export const NAV_ITEMS = [
  { href: "#hero", label: "首页" },
  { href: "#about", label: "关于" },
  { href: "#projects", label: "项目" },
  { href: "#contact", label: "联系" },
] as const;

/** 部署 base path，兼容 GitHub Pages 等子路径 / Deploy base URL for GH Pages subpaths */
export const BASE = import.meta.env.BASE_URL;
