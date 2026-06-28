/** 站点壳层文案（对比站 UI，非页面内容）/ Site chrome — theme switcher, a11y, UI controls */

export const siteCopy = {
  chrome: {
    menuOpen: "菜单",
    menuClose: "关闭",
    menuAriaLabel: "打开菜单",
    themeSwitcherTitle: "UI 皮肤对比",
    themeSwitcherAriaLabel: "切换 UI 皮肤",
    themeGroupSkill: "Skill 皮肤",
    themeGroupPencil: "Pencil 皮肤",
  },
  projectCard: {
    viewDetail: "查看详情",
    closeDetail: "关闭",
    highlightsHeading: "工作内容",
    modalAriaLabel: "项目详情",
    highlightCount: (count: number) => `${count} 项工作`,
  },
  missing: {
    fallback: "待补充",
  },
} as const;
