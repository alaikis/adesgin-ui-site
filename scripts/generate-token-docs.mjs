// 构建期解析 tokens.css → tokens.json（官网 token 文档页数据源）
// 独立仓：tokens.css 来自 @alaikis/alaidesign-web 包的 dist（npm 安装）
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tokensCssPath = path.resolve(
  __dirname,
  '..',
  'node_modules',
  '@alaikis/alaidesign-web',
  'dist',
  'tokens.css',
);
if (!fs.existsSync(tokensCssPath)) {
  console.error('[generate-token-docs] 未找到 tokens.css，请先 npm install');
  process.exit(1);
}
const tokensCss = fs.readFileSync(tokensCssPath, 'utf8');

// 提取 CSS 自定义属性
function extractVars(block) {
  const vars = {};
  const regex = /--([a-z0-9-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = regex.exec(block)) !== null) {
    vars[`--${m[1]}`] = m[2].trim();
  }
  return vars;
}

const lightMatch = tokensCss.match(/:root\s*\{([\s\S]*?)\}/);
const darkMatch = tokensCss.match(/\.dark\s*\{([\s\S]*?)\}/);

const tokens = {
  light: lightMatch ? extractVars(lightMatch[1]) : {},
  dark: darkMatch ? extractVars(darkMatch[1]) : {},
};

const out = path.join(__dirname, '..', 'src', 'content', 'tokens.json');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(tokens, null, 2));
console.log(`[generate-token-docs] wrote ${out}`);
