# Agent 计划存档 / Agent plan archive

Cursor **Plan 模式**生成的 `*.plan.md` 保存在此目录。

## 策略 / Policy

| 项 | 说明 |
|----|------|
| 保存位置 | 项目内 `.cursor/plans/`（Plan 模式默认写入此处） |
| 本地 Git | 在 **`local/plans`** 分支 commit（`git add -f`），勿在 `feature03` / `main` 上 commit plan |
| 远端 GitHub | **禁止推送** `*.plan.md`；`.gitignore` + `.githooks/pre-push` |
| 首次克隆后 | `git config core.hooksPath .githooks` 或 `scripts/setup-git-hooks.ps1` |

## 推荐工作流 / Recommended workflow

日常在 `feature03`（或其他功能分支）改代码，**正常 push**。

Plan 存档到本地 git 时：

```powershell
git checkout local/plans
git add -f .cursor/plans/*.plan.md
git commit -m "docs(local): archive plan for <task>"
git checkout feature03
```

- `local/plans` **不要** `git push`（hook 同样会拦截）
- 切回 `feature03` 后，plan 文件仍在磁盘上（`.gitignore`），Cursor 可继续读写
