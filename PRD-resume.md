# 个人作品集网站 PRD

## 核心功能

1. **首页（hero）**：大标题、标语、简介、CTA、头像占位
2. **关于我（about）**：个人优势、教育经历、核心技能
3. **项目展示（projects）**：项目卡片（名称、截图占位、描述、技术栈、链接占位）
4. **联系方式（contact）**：邮箱、电话、社交媒体占位
5. **皮肤对比**：六套 UI 皮肤切换，**共用同一份内容**

## 内容模型

页面内容由 [`content/site.json`](content/site.json) 驱动（块数组 `blocks[]`），不按皮肤拆分文案。

| 块 `type` | 产品能力 |
|-----------|----------|
| `hero` | 首页英雄区 |
| `about` | 关于我 |
| `projects` | 项目列表 |
| `contact` | 联系方式 |
| `experience` | 工作经历（数据已导入，UI 待扩展） |
| `custom` | 自定义段落 |

正式简历归档在 [`简历内容.md`](简历内容.md)，通过 `npm run content:import` 手动同步到内容层，支持 merge 保护展示向润色。

站点壳层（皮肤切换器、a11y）在 [`src/config/siteCopy.ts`](src/config/siteCopy.ts)，与页面内容分离。

## 设计要求

- 对比多种 UI 设计工具 / Skill 的输出差异
- Skill 皮肤：`frontend-design`、`ui-ux-pro-max`、`design-taste-frontend`
- Pencil 皮肤：Shadcn UI、Lunaris、Halo（对应 `.pen` 设计稿）
- 移动端适配；图片懒加载；链接可点击

## 相关文档

- 内容编辑：[`content/README.md`](content/README.md)
- 技术实现：[`TECH_DESIGN.md`](TECH_DESIGN.md)
- 部署：[`DEPLOYMENT.md`](DEPLOYMENT.md)
