import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';

// 构建期将 @alaikis/alaidesign-ui 包的 CSS 产物（tokens.css / styles.css）
// 与构建期生成的 tokens.json 复制到 public，供 index.html / 文档站直接引用
function copyAssetsPlugin() {
  return {
    name: 'copy-assets-to-public',
    apply: 'build' as const,
    buildStart() {
      const candidates = [
        path.resolve(__dirname, 'node_modules/@alaikis/alaidesign-ui/dist'),
        path.resolve(__dirname, 'source/AlaiDesign/packages/core/dist'),
      ];
      const pkgDir = candidates.find((p) => fs.existsSync(path.join(p, 'tokens.css')));
      const publicDir = path.resolve(__dirname, 'public');
      fs.mkdirSync(publicDir, { recursive: true });
      if (pkgDir) {
        for (const f of ['tokens.css', 'styles.css']) {
          const src = path.join(pkgDir, f);
          if (fs.existsSync(src)) {
            fs.copyFileSync(src, path.join(publicDir, f));
          }
        }
      }
      // tokens.json（构建期 generate-token-docs 产物）
      const tokenJson = path.resolve(__dirname, 'src/content/tokens.json');
      if (fs.existsSync(tokenJson)) {
        fs.copyFileSync(tokenJson, path.join(publicDir, 'tokens.json'));
      }
    },
  };
}

export default defineConfig({
  base: process.env.PAGES_BASE ?? '/',
  plugins: [tailwindcss(), copyAssetsPlugin()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
    },
  },
});
