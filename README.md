# AlaiDesign 官网（adesgin-ui-site）

AlaiDesign 组件库的独立官网仓库，部署到 GitHub Pages `https://alaikis.github.io/adesgin-ui-site/`。

## 组件依赖

组件来自 npm 包 `@alaikis/alaidesign-web`（Web Components 核心包，独立仓从 npm 安装，非 monorepo workspace）：

```bash
npm install
```

## 构建

```bash
npm run build
# 产物在 dist/，PAGES_BASE 由 CI 注入
```

## 部署

- 推送 `main` 分支 → `.github/workflows/deploy.yml` 自动构建并部署到 GitHub Pages
- 需在 GitHub 仓库 Settings → Pages 配置为 **GitHub Actions** 部署源
- 构建产物路径 `dist/`（独立仓 `outDir` 默认为 `dist`，无子路径前缀）

## 与 AlaiDesign 主仓关系

- 组件源：`@alaikis/alaidesign`（Svelte）→ `@alaikis/alaidesign-web`（Web Components 核心）→ 本仓消费
- 设计 token 单一来源：`@alaikis/alaidesign-web/dist/tokens.css`（构建期解析为 token 文档页）
