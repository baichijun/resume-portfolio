# 站点内容层 / Site content layer

[`site.json`](site.json) 是六皮肤共用的**页面展示真相源**。运行时通过 `useSiteContent()` 读取；构建时打包进静态站点。

## 块类型 `blocks[]`

页面按 `blocks` 数组顺序渲染。每个块共有字段：

| 字段 | 说明 |
|------|------|
| `id` | 锚点 ID（如 `hero` → `#hero`） |
| `nav.show` | 是否出现在顶栏导航 |
| `nav.label` | 顶栏显示文案 |
| `source` | `resume`（import 可合并更新数据）或 `manual`（import 不覆盖数据字段） |

### `hero`

姓名、标语、引言、CTA。`headline` 同时用于浏览器标题模板中的 `{name}`。

### `about`

区块标题、个人优势列表、教育、技能。Pencil 三皮肤通常只展示 `summaryBullets`。

### `projects`

`items[]`：项目标题、周期、公司、描述、`tags`、可选 `imageUrl` / `linkUrl`。

### `contact`

邮箱、电话、标签文案；可选 `githubUrl`。

### `experience`

工作经历结构化数据；**当前 UI 暂不渲染**，import 时写入以备扩展。

### `custom`

自由段落：`title` + `body` 纯文本。

## `meta` 模板

| 字段 | 占位符 |
|------|--------|
| `documentTitle` | `{name}` → hero.headline |
| `metaDescription` | `{name}` |
| `footer` | `{name}`、`{year}` |

## 与简历归档的关系

- **日常改站**：直接编辑本文件。
- **从简历导入**：`npm run content:import`（merge，默认）或 `npm run content:import:fresh`（全量覆盖）。
- Merge 会更新 `source: "resume"` 块的数据字段（如项目列表、联系方式），**保留**区块标题、subtitle 等展示向字段及 `manual` / `custom` 块。
- 单块覆盖：`npx tsx scripts/content-import-resume.ts --replace-section projects`

类型定义：[`src/types/siteContent.ts`](../src/types/siteContent.ts)。

## Pencil 设计稿同步

```bash
npm run pen:hydrate:halo   # 打印 layer ↔ content 对照表
```

在 Pencil 中改字后回写：Agent `batch_get` → `design/pen-extract-*.json` → `npx tsx scripts/pen-extract-content.ts halo design/pen-extract-halo.json`

详见 [`design/PENCIL-GUIDE.md`](../design/PENCIL-GUIDE.md)。
