import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

// 构建期将 @alaikis/alaidesign-web 包的 CSS 产物（tokens.css / styles.css）
// 复制到 public，供 index.html 直接引用（独立仓从 npm 安装，非 workspace）
function copyCssPlugin() {
  return {
    name: 'copy-css-to-public',
    apply: 'build' as const,
    buildStart() {
      const pkgDir = path.resolve(__dirname, 'node_modules/@alaikis/alaidesign-web/dist');
      const publicDir = path.resolve(__dirname, 'public');
      fs.mkdirSync(publicDir, { recursive: true });
      for (const f of ['tokens.css', 'styles.css']) {
        const src = path.join(pkgDir, f);
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, path.join(publicDir, f));
        }
      }
    },
  };
}

export default defineConfig({
  base: process.env.PAGES_BASE ?? '/',
  plugins: [copyCssPlugin()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
    },
  },
});
