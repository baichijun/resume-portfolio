# Agent 计划存档 / Agent plan archive

Cursor **Plan 模式**生成的 `*.plan.md` 保存在此目录。

## 策略 / Policy

| 项 | 说明 |
|----|------|
| 保存位置 | 项目内 `.cursor/plans/`（Plan 模式默认写入此处） |
| 本地 Git | 可 `git add .cursor/plans/` 并 commit，作为本地实施记录 |
| 远端 GitHub | **禁止推送**；`.githooks/pre-push` 会拦截含本目录的 push |
| 首次克隆后 | 运行 `git config core.hooksPath .githooks` 启用 hook |

## 本地提交示例 / Local commit example

```powershell
git add .cursor/plans/
git commit -m "docs: add plan archive for <task>"
# 勿 push 含 plans 的 commit；文档与代码变更可单独 commit 后 push
```
