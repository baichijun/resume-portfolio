# Git hooks 一次性配置 / One-time git hooks setup

```powershell
git config core.hooksPath .githooks
```

启用后，`pre-push` 会阻止将 `.cursor/plans/` 推送到 GitHub；plans 仍可本地 commit。
