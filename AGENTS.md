# 个人简历网站

## 项目概述
使用 React + TypeScript + Tailwind CSS 开发的个人简历/作品集网站。

## 开发规范
- 使用函数式组件 + Hooks
- 使用 Tailwind CSS 编写样式
- 组件要可复用
- 代码要有中英文各一条注释

## 设计要求
- 项目目标要测试验证对比多个skill的UI设计能力，设计皮肤切换功能，后续实现的不同UI样式点击切换按钮会替换整体UI风格
- 目前规划要使用的skill：Frontend-design Skill/UI UX Pro Max Skill/ taste 后续可能使用更多skill各自单位进行UI风格设计和控制
- 目前考虑使用的组件库：Aceternity UI（炫酷视觉特效）、Magic UI（微交互）、Brutalist UI（粗野主义风格）或 Glass UI（玻璃拟态）
- 
- 确保移动端适配

## 注意事项
- 项目准备同时部署在vercel/GitHub pages/Cloudflare Pages上，写代码时要保证写法满足部署规范要求。
- 性能优化：图片使用懒加载
- 确保所有链接可点击

## Design ↔ Code（Pencil 设计稿与皮肤 Token）

三套 UI 设计稿位于 `design/`，与 React 三套皮肤一一对应，**互不影响**：

| 设计稿 | 皮肤 | Token JSON | 生成 CSS |
|--------|------|------------|----------|
| `design/UI-Dark.pen` | dark | `design/tokens/dark.json` | `src/styles/themes/dark.generated.css` |
| `design/UI-Glass.pen` | glass | `design/tokens/glass.json` | `src/styles/themes/glass.generated.css` |
| `design/UI-Brutalist.pen` | brutalist | `design/tokens/brutalist.json` | `src/styles/themes/brutalist.generated.css` |

### 初始化 / 拆分设计稿（Pencil 中执行一次）

1. 在 Pencil 中**单独打开** `design/UI-Dark.pen`（或 Glass / Brutalist）——每次只打开一个文件，避免 MCP 写入同一内存文档
2. 让 Agent 对**当前打开的文件**执行 `scripts/pen-bootstrap-{theme}.js` 中的 `batch_design` 内容（或运行 `node scripts/export-design-tokens.mjs dark` 查看脚本）
3. **Ctrl+S 保存**到项目路径（MCP 编辑默认只在内存，必须手动保存才写入磁盘）
4. 对三个主题各重复一次

旧版完整稿备份见 `design/_welcome-backup.pen`（与 welcome 模板同内容；像素级完整稿需后续在各自 `.pen` 中继续完善）。

### 修改某套皮肤 Token 后同步到网页

1. 在 Pencil 中编辑对应 `design/UI-{Theme}.pen` 的变量/颜色
2. 保存 `.pen` 文件
3. 让 Agent 调用 Pencil MCP `get_variables({ filePath })`，将结果保存为 JSON 后运行：
   `node scripts/import-pencil-variables.mjs {theme} vars.json`
4. 运行 `npm run design:sync -- {theme}`（或 `npm run design:sync:dark` 等）
5. 刷新站点并切换皮肤验证；仅该 `[data-theme="..."]` 块会变化

`pencil-welcome.pen` 为 Pencil 内置欢迎模板，**不要**写入项目简历设计内容。
