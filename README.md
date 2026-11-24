# AlaiDesign 官网（adesgin-ui-site）

AlaiDesign 组件库的独立官网仓库。

## 部署地址

- GitHub Pages 默认：`https://alaikis.github.io/adesgin-ui-site/`（或组织首页 `https://alaikis.github.io/`，需在 Settings → Pages 勾选 "Create a github.io repository"）
- 自定义域：`https://adesgin.alaikis.com/`（推荐，需在仓库 Settings → Pages → Custom domain 配置 + DNS CNAME）

## 组件依赖

组件来自 npm 包 `@alaikis/alaidesign-web`（Web Components 核心包，独立仓从 npm 安装，非 monorepo workspace）：

```bash
npm install
```

> 当前 `package.json` 暂用 `file:../AlaiDesign/packages/core`（npm 包未发布），发布后改回 version 范围依赖。

## 构建

```bash
npm run build
# 产物在 dist/，PAGES_BASE 由 CI 注入（默认 /，自定义域用根路径）
```

## 自定义域配置（adesgin.alaikis.com）

1. **DNS（域名服务商侧）**：CNAME 记录 `adesgin` → `alaikis.github.io`
2. **GitHub 仓库 Settings → Pages → Custom domain**：填 `adesgin.alaikis.com`
3. **勾选 Enforce HTTPS**（DNS 生效后 24h 内证书自动签发）
4. 本仓 `PAGES_BASE` 已设为 `/`（自定义域根路径），无需再改

## 与 AlaiDesign 主仓关系

- 组件源：`@alaikis/alaidesign`（Svelte）→ `@alaikis/alaidesign-web`（Web Components 核心）→ 本仓消费
- 设计 token 单一来源：`@alaikis/alaidesign-web/dist/tokens.css`（构建期解析为 token 文档页）
