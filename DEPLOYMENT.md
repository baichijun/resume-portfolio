# 多端 CI/CD 部署指南 / Multi-Platform Deployment

`push` 到 `main`（或手动 **Run workflow**）后，GitHub Actions 会构建静态站点并发布到 **GitHub Pages**、**Cloudflare Pages**、**Vercel** 三端。  
**其他分支的 push 不会触发任何部署。**

---

## 一次性准备

### 1. Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Direct Upload**。
2. **Project name** 须与 [`wrangler.toml`](wrangler.toml) 中 `name` 一致（默认 `resume-portfolio`）。若改名，请同步修改 workflow 里的 `--project-name=`。
3. 创建 **Account API Token**：My Profile → API Tokens → 使用模板 *Edit Cloudflare Workers*（需包含 **Account** → **Cloudflare Pages** → **Edit**）。
4. 在域名概览页复制 **Account ID**。

### 2. Vercel（方案 B：由 GitHub Actions 部署）

1. [vercel.com](https://vercel.com) 创建空项目或导入仓库（Framework: **Vite**，可先不启用 Git 自动部署以免与 Actions 重复）。
2. 本地执行一次（需先 `npm i`）：
   ```bash
   npx vercel link
   ```
   记录 `.vercel/project.json` 中的 `orgId`、`projectId`。
3. Vercel → **Settings → Tokens** 创建 **VERCEL_TOKEN**。

### 3. GitHub Repository Secrets

仓库 **Settings → Secrets and variables → Actions** → **New repository secret**：

| Secret | 说明 |
|--------|------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Account ID |
| `VERCEL_TOKEN` | Vercel 部署 Token |
| `VERCEL_ORG_ID` | `vercel link` 得到的 orgId |
| `VERCEL_PROJECT_ID` | `vercel link` 得到的 projectId |

### 4. GitHub Pages

1. **Settings → Pages → Build and deployment → Source** 选 **GitHub Actions**（不要选 “Deploy from branch”）。
2. 首次 workflow 成功后，站点地址一般为：  
   `https://<username>.github.io/<repository>/`  
   其中 `<repository>` 须与 CI 中 `VITE_BASE_PATH=/<repo>/` 一致（由仓库名自动注入）。

---

## Workflow 行为

文件：[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

| Job | 构建 | 发布目标 |
|-----|------|----------|
| `build` | `VITE_BASE_PATH=/` | Artifact `dist` → Cloudflare + Vercel |
| `build-github-pages` | `VITE_BASE_PATH=/<repo>/` | Artifact `dist-gh` → GitHub Pages |
| `deploy-cloudflare` | 下载 `dist` | `wrangler pages deploy` |
| `deploy-vercel` | 下载 `dist` | `vercel deploy dist --prod` |
| `deploy-github-pages` | 下载 `dist-gh` | `actions/deploy-pages@v4` |

**触发条件**：仅 `push` 到 `main` 分支，或手动 `workflow_dispatch`。  
非 `main` 分支 push **不会**产生预览部署。

---

## 本地命令

```bash
npm run dev          # 本地开发
npm run build        # 生产构建（根路径 /）
npm run preview      # 预览 dist
npm run deploy:cf    # 手动部署 Cloudflare（需 wrangler login）
```

---

## 校验清单

- [ ] Push `main` 后 Actions 全部绿色  
- [ ] GitHub Pages URL 可打开且静态资源无 404  
- [ ] Cloudflare `*.pages.dev` 可打开  
- [ ] Vercel 生产 URL 可打开  
- [ ] 三端页脚 `build` 显示同一 commit 短 hash  

---

## 常见问题

**GitHub Pages 白屏 / 资源 404**  
确认 Pages Source 为 **GitHub Actions**，且仓库名与 `VITE_BASE_PATH` 一致。

**Cloudflare deploy 失败：project not found**  
先在 Dashboard 创建同名 Pages 项目，或修改 `wrangler.toml` 与 workflow 中的 `project-name`。

**Vercel deploy 失败**  
确认三个 `VERCEL_*` Secrets 正确；项目需先 `vercel link` 创建。

**Wrangler 认证失败**  
检查 Token 权限是否包含 Pages；`CLOUDFLARE_ACCOUNT_ID` 是否为当前账号。
