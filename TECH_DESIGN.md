# 技术设计

## 技术栈
- React + TypeScript + Vite
- Tailwind CSS
- React Router（如果需要多页面）
- Framer Motion（动画效果）

## 项目结构（概要）

```
content/site.json          # 页面内容真相源
简历内容.md                # 简历归档（手动 import）
src/
  hooks/useSiteContent.ts  # 内容 Hook
  types/siteContent.ts     # 块类型
  lib/parseResume.ts       # 简历解析（import 用）
  lib/resumeToSiteContent.ts
  config/siteCopy.ts       # 壳层 UI 文案
  skins/
    shared/ContentBlocks.tsx   # Skill 皮肤块渲染
    skill/                     # 三 Skill 皮肤
    pencil/                    # 三 Pencil 皮肤 + layer-map
  index.css                    # 六皮肤主题变量
design/UI-Pencil-*.pen       # Pencil 设计稿
scripts/content-import-resume.ts
scripts/pen-hydrate-content.ts
```

## 数据管理

三层分离：

1. **内容层** [`content/site.json`](content/site.json) — 站点运行时展示真相源；日常改文案、调区块在此编辑；六皮肤共用 `useSiteContent()`。
2. **简历归档** [`简历内容.md`](简历内容.md) — 低频更新；`npm run content:import`（默认 merge）手动同步到内容层；改 md 不会自动改站。
3. **站点壳层** [`src/config/siteCopy.ts`](src/config/siteCopy.ts) — 皮肤切换器、a11y、展开/收起等 UI 控件文案。

- `简历内容.md` 中的内容不可以在编码时直接修改，如需修改需要 agent 和我对话时我明确授权
- 网站内有内容空白时生成简易占位图文，并告诉我需要补充的部分
- 内容与 UI 组件分离，方便在 Cursor 中手动更新 `site.json` 而无需修改皮肤逻辑

## 部署事项

- 可以考虑使用github hooks 处理多端部署的工作，当github有push事件时，自动触发CI/CD流程，生成新的版本并发布到多个平台。
