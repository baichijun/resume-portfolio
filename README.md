# Resume Portfolio — 六皮肤个人简历站

Vite + React 19 + TypeScript + Tailwind 个人简历/作品集网站。通过右下角皮肤切换器对比 **3 套 Skill 皮肤** 与 **3 套 Pencil 设计稿皮肤** 的 UI 输出。

## 快速开始

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # 生产构建
npm run preview      # 预览 dist
```

## 内容与数据（三层分离）

| 层 | 文件 | 何时改 |
|----|------|--------|
| **内容层**（线上展示真相源） | [`content/site.json`](content/site.json) | 日常改页面文案、区块、项目卡片 |
| **简历归档** | [`简历内容.md`](简历内容.md) | 低频更新正式简历后手动导入 |
| **站点壳层** | [`src/config/siteCopy.ts`](src/config/siteCopy.ts) | 皮肤切换器、a11y、展开/收起等 UI 文案 |

六皮肤共用同一份 `site.json`，切换皮肤只改变视觉与布局，不改变文案。

### 改页面内容

直接编辑 `content/site.json`，保存后 dev 热更新即可看到变化。字段说明见 [`content/README.md`](content/README.md)。

### 从简历同步

```bash
npm run content:import       # 默认 merge：更新简历字段，保留你手改的标题/润色
npm run content:import:fresh # 全量覆盖为简历映射结果
```

改 `简历内容.md` **不会**自动改站，必须执行上述命令之一。

## 六皮肤

| 皮肤 ID | 类型 | 代码 |
|---------|------|------|
| `skill-frontend-design` | Skill | `src/skins/skill/frontend-design/` |
| `skill-ui-ux-pro-max` | Skill | `src/skins/skill/ui-ux-pro-max/` |
| `skill-design-taste` | Skill | `src/skins/skill/design-taste/` |
| `pencil-shadcn` | Pencil | `src/skins/pencil/shadcn/` + `design/UI-Pencil-Shadcn.pen` |
| `pencil-lunaris` | Pencil | `src/skins/pencil/lunaris/` + `design/UI-Pencil-Lunaris.pen` |
| `pencil-halo` | Pencil | `src/skins/pencil/halo/` + `design/UI-Pencil-Halo.pen` |

主题 CSS：[`src/index.css`](src/index.css) 内 `[data-theme="..."]` 块。

## 常用脚本

| 命令 | 说明 |
|------|------|
| `npm run content:import` | 简历 md → `site.json`（merge） |
| `npm run pen:export:{shadcn\|lunaris\|halo}` | 打印 Pencil export_html 步骤 |
| `npm run pen:hydrate:{shadcn\|lunaris\|halo}` | 打印 content → 设计稿文案对照表 |
| `npm run capture:design-ref` | 六皮肤截图 + `design/refs/layout.json` |

Pencil 设计稿操作与踩坑见 [`design/PENCIL-GUIDE.md`](design/PENCIL-GUIDE.md)。

## 文档索引

| 文档 | 说明 |
|------|------|
| [AGENTS.md](AGENTS.md) | Agent / 协作者总览与架构 |
| [TECH_DESIGN.md](TECH_DESIGN.md) | 技术栈与数据管理 |
| [PRD-resume.md](PRD-resume.md) | 产品功能与内容模型 |
| [DEPLOYMENT.md](DEPLOYMENT.md) | GitHub Pages / Cloudflare / Vercel 部署 |
| [content/README.md](content/README.md) | `site.json` 块结构说明 |
| [design/PENCIL-GUIDE.md](design/PENCIL-GUIDE.md) | Pencil + MCP 工作流 |

## 部署

Push 到 `main` 触发 CI 三端发布，或本地见 [DEPLOYMENT.md](DEPLOYMENT.md)。内容变更需提交 `content/site.json` 后重新构建部署。
