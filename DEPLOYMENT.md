# 多端 CI/CD 部署指南 / Multi-Platform Deployment

`push` 到 `main`（或手动 **Run workflow**）后，GitHub Actions 会构建静态站点并发布到 **GitHub Pages**、**Cloudflare Pages**、**Vercel** 三端。  
**其他分支的 push 不会触发任何部署。**

---

## 当前生产环境（2026-06-28）

| 平台 | URL | 备注 |
|------|-----|------|
| GitHub 仓库 | https://github.com/baichijun/resume-portfolio | 默认分支 `main` |
| GitHub Pages | https://baichijun.github.io/resume-portfolio/ | 子路径 `/<repo>/` |
| Cloudflare Pages | https://resume-portfolio-93i.pages.dev/ | 项目名 `resume-portfolio` |
| Vercel | https://resume-portfolio-powerdas-projects.vercel.app/ | Team: powerdas-projects |

**Secrets**（Settings → Secrets and variables → Actions）：`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`、`VERCEL_TOKEN`、`VERCEL_ORG_ID`、`VERCEL_PROJECT_ID` — 请使用 Dashboard 创建的**长期 Token**（勿用 CLI OAuth 临时凭据）。

**Vercel**：已通过 `vercel git disconnect` 关闭 Git 自动部署，仅由 Actions 发布，避免重复构建。

---

## 一次性准备

### 1. Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Direct Upload**（或 CLI `wrangler pages project create resume-portfolio`）。
2. **Project name** 须与 [`wrangler.toml`](wrangler.toml) 中 `name` 一致（默认 `resume-portfolio`）。若改名，请同步修改 workflow 里的 `--project-name=`。
3. 创建 **Account API Token**：My Profile → API Tokens → 使用模板 *Edit Cloudflare Workers*（需包含 **Account** → **Cloudflare Pages** → **Edit**）。
4. 在域名概览页复制 **Account ID**。

### 2. Vercel（方案 B：由 GitHub Actions 部署）

1. [vercel.com](https://vercel.com) 创建项目或 `npx vercel link --yes --project resume-portfolio`。
2. 记录 `.vercel/project.json` 中的 `orgId`、`projectId`（勿提交；已在 `.gitignore`）。
3. [Account → Tokens](https://vercel.com/account/tokens) 创建 **Classic Token** → `VERCEL_TOKEN`（OAuth 登录无法 `vercel tokens add`）。

### 3. GitHub Repository Secrets

```powershell
gh secret set CLOUDFLARE_API_TOKEN
gh secret set CLOUDFLARE_ACCOUNT_ID
gh secret set VERCEL_TOKEN
gh secret set VERCEL_ORG_ID
gh secret set VERCEL_PROJECT_ID
```

| Secret | 说明 |
|--------|------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Account ID |
| `VERCEL_TOKEN` | Vercel Classic 部署 Token |
| `VERCEL_ORG_ID` | `vercel link` 得到的 orgId |
| `VERCEL_PROJECT_ID` | `vercel link` 得到的 projectId |

### 4. GitHub Pages

1. **Settings → Pages → Build and deployment → Source** 选 **GitHub Actions**（或 API `build_type: workflow`）。
2. 站点地址：`https://<username>.github.io/<repository>/`，`<repository>` 与 CI 中 `VITE_BASE_PATH=/<repo>/` 一致。

### 5. 本地 CLI（可选）

- **GitHub CLI**：`gh` 已安装于 `%LOCALAPPDATA%\Programs\GitHub CLI\bin`（用户 PATH）。
- **Wrangler / Vercel**：项目内 `npx wrangler`、`npx vercel`。

---

## Workflow 行为

文件：[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

| Job | 构建 | 发布目标 |
|-----|------|----------|
| `build` | `VITE_BASE_PATH=/` | Artifact `dist` → Cloudflare |
| `build-github-pages` | `VITE_BASE_PATH=/<repo>/` | `upload-pages-artifact` → GitHub Pages |
| `deploy-cloudflare` | 下载 `dist` | `wrangler pages deploy` |
| `deploy-vercel` | `vercel build` + `deploy --prebuilt` | Vercel Production |
| `deploy-github-pages` | Pages artifact | `actions/deploy-pages@v4` |

**触发条件**：仅 `push` 到 `main` 分支，或手动 `workflow_dispatch`。

**已知实现要点**（首次部署已验证）：

- GitHub Pages 须用 `actions/upload-pages-artifact@v3`，不能用普通 `upload-artifact` 代替。
- Vercel 须 `vercel build` + `deploy --prebuilt`，`vercel deploy dist` 会在 Vercel 侧重跑 build 导致失败。

---

## 本地命令

```bash
npm run dev              # 本地开发
npm run build            # 生产构建（根路径 /）
npm run preview          # 预览 dist
npm run content:import   # 简历 md → content/site.json（改内容后需 commit 再部署）
npm run deploy:cf        # 手动部署 Cloudflare（需 wrangler login）
gh workflow run "Deploy Multi-Platform"   # 手动触发 CI
```

---

## 校验清单

- [x] Push `main` 后 Actions 全部绿色（2026-06-28 首次三端成功）
- [x] GitHub Pages URL 可打开且静态资源无 404
- [x] Cloudflare `*.pages.dev` 可打开
- [x] Vercel 生产 URL 可打开

---

## 常见问题

**GitHub Pages 白屏 / 资源 404**  
确认 Pages Source 为 **GitHub Actions**，且仓库名与 `VITE_BASE_PATH` 一致。

**GitHub Pages：`No artifacts named "github-pages"`**  
构建 job 须使用 `actions/upload-pages-artifact@v3`。

**Cloudflare deploy 失败：project not found**  
先在 Dashboard 或 `wrangler pages project create` 创建同名项目。

**Vercel deploy 失败**  
确认三个 `VERCEL_*` Secrets 为 Classic Token；项目已 `vercel link`；使用 `build` + `deploy --prebuilt`。

**Wrangler 认证失败**  
检查 Token 权限是否包含 Pages；`CLOUDFLARE_ACCOUNT_ID` 是否为当前账号。
