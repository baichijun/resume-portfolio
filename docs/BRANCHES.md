# 分支说明 / Branches

| 分支 | 说明 | 部署 |
|------|------|------|
| `main` | 生产分支；六皮肤站点 + 三端 CI | push 触发 GitHub Pages / Cloudflare / Vercel |
| `feature01` | 历史开发分支 | 不部署 |
| `feature02` | 项目经历卡片等功能 | 已合并进 `main` |
| `feature03` | **框架和展现内容调优版本** | 不部署；合并 `main` 后由 CI 发布 |

开发流程：从 `main` 切出 `feature/*` → 本地开发与 commit → PR 或 merge 到 `main` → 自动三端部署。

Plan 存档见 [`.cursor/plans/`](.cursor/plans/)（本地 git，不 push 远端）。
