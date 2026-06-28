# 个人简历网站

## 项目概述
Vite + React 19 + TypeScript + Tailwind CSS 个人简历/作品集网站；六皮肤对比展示不同设计工具输出。

## 开发规范

Cursor 规则（`.cursor/rules/`）：

| 规则 | 说明 |
|------|------|
| [bilingual-comments.mdc](.cursor/rules/bilingual-comments.mdc) | 双语注释格式与「why not what」 |
| [typescript-react.mdc](.cursor/rules/typescript-react.mdc) | TS/React 命名、原则、导入顺序、错误处理 |
| [agent-workflow.mdc](.cursor/rules/agent-workflow.mdc) | Agent 回答与最小 diff 改动 |

要点：函数式组件 + Hooks · Tailwind 样式 · 组件可复用 · 新代码遵循上述规则，存量逐步对齐

## 设计要求
- 项目目标：**对比多种 UI 设计工具/Skill 的输出**，通过皮肤切换直观看到差异
- Skill 皮肤：`frontend-design` / `ui-ux-pro-max` / `design-taste-frontend`
- Pencil 皮肤：Design Goodies → Design Systems → **Shadcn UI / Lunaris / Halo**
- 确保移动端适配

## 注意事项
- 项目准备同时部署在 vercel/GitHub pages/Cloudflare Pages 上
- 性能优化：图片使用懒加载
- 确保所有链接可点击

## 六皮肤对比架构

| 皮肤 ID | 来源 | 代码入口 | Pencil 设计稿 |
|---------|------|----------|---------------|
| `skill-frontend-design` | frontend-design skill | [`src/skins/skill/frontend-design/`](src/skins/skill/frontend-design/) | — |
| `skill-ui-ux-pro-max` | ui-ux-pro-max skill | [`src/skins/skill/ui-ux-pro-max/`](src/skins/skill/ui-ux-pro-max/) | — |
| `skill-design-taste` | design-taste-frontend skill | [`src/skins/skill/design-taste/`](src/skins/skill/design-taste/) | — |
| `pencil-shadcn` | Pencil + Shadcn UI | [`src/skins/pencil/shadcn/`](src/skins/pencil/shadcn/) | [`design/UI-Pencil-Shadcn.pen`](design/UI-Pencil-Shadcn.pen) |
| `pencil-lunaris` | Pencil + Lunaris | [`src/skins/pencil/lunaris/`](src/skins/pencil/lunaris/) | [`design/UI-Pencil-Lunaris.pen`](design/UI-Pencil-Lunaris.pen) |
| `pencil-halo` | Pencil + Halo | [`src/skins/pencil/halo/`](src/skins/pencil/halo/) | [`design/UI-Pencil-Halo.pen`](design/UI-Pencil-Halo.pen) |

- 主题 CSS：[`src/index.css`](src/index.css) 内联 `[data-theme="..."]`
- 切换器：右下角分组 **Skill 皮肤 / Pencil 皮肤**
- 旧稿归档：[`design/archive/`](design/archive/)（UI-Dark/Glass/Brutalist legacy）

### Pencil 新皮肤工作流

1. 在 Pencil 中**单独打开** `design/UI-Pencil-{Shadcn|Lunaris|Halo}.pen`
2. Design Goodies → Design Systems → 选择对应套件
3. 若为空：Agent 执行 `scripts/pen-bootstrap-{shadcn|lunaris|halo}.js` → **Ctrl+S**
4. `npm run pen:export:{shadcn|lunaris|halo}` 查看 export_html 步骤
5. export 后 Agent 将 HTML 转为 React，替换 `src/skins/pencil/*/`

### 截图对比

```bash
npm run dev
npm run capture:design-ref   # 输出 design/refs/*.png + layout.json
```

详细踩坑与操作规范见 [`design/PENCIL-GUIDE.md`](design/PENCIL-GUIDE.md)。
