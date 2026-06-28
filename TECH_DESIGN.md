# 技术设计

## 技术栈
- React + TypeScript + Vite
- Tailwind CSS
- React Router（如果需要多页面）
- Framer Motion（动画效果）

## 项目结构


## 数据管理
- 简历内容.md中的内容不可以在编码时直接修改，如需修改需要agent和我对话时我明确授权
- 网站内有内容空白时生成简易占位图文，并告诉我需要补充的部分
- 简历内容与 UI 组件分离，方便我后续在 Cursor 中手动更新内容而无需修改代码逻辑。

## 部署事项

- 可以考虑使用github hooks 处理多端部署的工作，当github有push事件时，自动触发CI/CD流程，生成新的版本并发布到多个平台。

