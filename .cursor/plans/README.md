# Agent 计划存档 / Agent plan archive

Cursor **Plan 模式**生成的 `*.plan.md` 保存在此目录。

## 策略 / Policy

| 项 | 说明 |
|----|------|
| 保存位置 | 项目内 `.cursor/plans/`（Plan 模式默认写入此处） |
| 本地 Git | `git add -f .cursor/plans/*.plan.md` 后 commit |
| 远端 GitHub | **禁止推送** `*.plan.md`；`.gitignore` + `.githooks/pre-push` |
| 首次克隆后 | `git config core.hooksPath .githooks` 或 `scripts/setup-git-hooks.ps1` |

## 本地提交示例 / Local commit example

```powershell
git add -f .cursor/plans/*.plan.md
git commit -m "docs(local): archive plan for <task>"
# 含 plan 的 commit 不可 push；代码/文档变更单独 push
```
