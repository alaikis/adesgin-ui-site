// 官网入口：注册 AlaiDesign Web Components（@alaikis/alaidesign-ui），构建完整产品官网 UI。
// 结构：顶部导航 + 落地页（Hero/能力/快速开始）+ 组件文档站（分类导航 + live demo + 三框架代码 tab）+ 设计 token + 安装。
import '@alaikis/alaidesign-ui';
import './tailwind.css';
import '../site.css';
import { componentDocs } from './docs/components';
import type { ComponentDoc, ApiProp, ApiEvent, ApiSlot } from './docs/types';

// ---------- 物流场景 mock 数据（静态，不依赖任何后端 API） ----------
const mockShipments = [
  { id: 'SH-20261124-001', tracking: '3SABC123456789', carrier: 'UPS', status: 'delivered', date: '2026-11-24', weight: '2.4kg' },
  { id: 'SH-20261124-002', tracking: 'DHL78901234567', carrier: 'DHL', status: 'in-transit', date: '2026-11-23', weight: '5.1kg' },
  { id: 'SH-20261123-003', tracking: 'DPD55667788990', carrier: 'DPD', status: 'pending', date: '2026-11-23', weight: '0.8kg' },
  { id: 'SH-20261122-004', tracking: 'FEDEX112233445', carrier: 'FedEx', status: 'delivered', date: '2026-11-22', weight: '1.2kg' },
];

// ---------- 组件 live demo 模板（Web Components 原生写法，三框架共享渲染） ----------
const DEMOS: Record<string, string> = {
  button: `
    <alu-button>Default</alu-button>
    <alu-button variant="outline">Outline</alu-button>
    <alu-button variant="secondary">Secondary</alu-button>
    <alu-button variant="ghost">Ghost</alu-button>
    <alu-button variant="destructive">Destructive</alu-button>
    <alu-button variant="link">Link</alu-button>
    <alu-button size="sm">Small</alu-button>
    <alu-button size="lg">Large</alu-button>
    <alu-button disabled>Disabled</alu-button>`,
  card: `
    <alu-card>
      <alu-card-header><alu-card-title>Card Title</alu-card-title><alu-card-description>Card Description</alu-card-description></alu-card-header>
      <alu-card-content>Card Content — 运单 SH-20261124-001 已签收。</alu-card-content>
      <alu-card-footer><alu-button size="sm" variant="secondary">Action</alu-button></alu-card-footer>
    </alu-card>`,
  badge: `
    <alu-badge>Default</alu-badge>
    <alu-badge variant="secondary">Secondary</alu-badge>
    <alu-badge variant="destructive">Error</alu-badge>
    <alu-badge variant="success">Success</alu-badge>
    <alu-badge variant="warning">Warning</alu-badge>
    <alu-badge variant="outline">Outline</alu-badge>`,
  input: `
    <alu-form-field label="运单号" required>
      <alu-input placeholder="如 3SABC123456789" helper-text="用于查询物流轨迹" />
    </alu-form-field>`,
  checkbox: `
    <alu-checkbox>默认</alu-checkbox>
    <alu-checkbox checked>已勾选</alu-checkbox>
    <alu-checkbox disabled>禁用</alu-checkbox>
    <alu-checkbox indeterminate>不确定</alu-checkbox>`,
  tabs: `
    <alu-tabs value="overview" orientation="horizontal">
      <alu-tabs-list><alu-tabs-trigger value="overview">概览</alu-tabs-trigger><alu-tabs-trigger value="history">历史</alu-tabs-trigger><alu-tabs-trigger value="settings">设置</alu-tabs-trigger></alu-tabs-list>
      <alu-tabs-content value="overview">概览内容 — 包裹统计</alu-tabs-content>
      <alu-tabs-content value="history">历史内容 — 物流轨迹</alu-tabs-content>
      <alu-tabs-content value="settings">设置内容 — 偏好配置</alu-tabs-content>
    </alu-tabs>`,
  skeleton: `
    <alu-skeleton class="h-4 w-48"></alu-skeleton>
    <alu-skeleton class="h-4 w-32"></alu-skeleton>
    <alu-skeleton class="h-4 w-24"></alu-skeleton>
    <alu-skeleton-card></alu-skeleton-card>`,
  tooltip: `
    <alu-tooltip content="提示：悬停查看" side="top">
      <alu-button variant="outline">悬停我</alu-button>
    </alu-tooltip>`,
  dialog: `
    <alu-dialog>
      <alu-dialog-trigger><alu-button variant="secondary">打开对话框</alu-button></alu-dialog-trigger>
      <alu-dialog-content>
        <alu-dialog-header><alu-dialog-title>运单详情</alu-dialog-title><alu-dialog-description>查看包裹 SH-20261124-001 的完整轨迹。</alu-dialog-description></alu-dialog-header>
        <alu-dialog-footer><alu-button variant="ghost">取消</alu-button><alu-button>确认</alu-button></alu-dialog-footer>
      </alu-dialog-content>
    </alu-dialog>`,
  'data-table': `
    <alu-data-table
      columns='${JSON.stringify([
        { key: 'id', title: '订单号', sortable: true },
        { key: 'tracking', title: '运单号' },
        { key: 'carrier', title: '承运商' },
        { key: 'status', title: '状态' },
        { key: 'weight', title: '重量', align: 'right' },
      ])}'
      data='${JSON.stringify(mockShipments)}'
      pagination='${JSON.stringify({ total: mockShipments.length, pageSize: 4 })}'
      empty-text="暂无运单数据"></alu-data-table>`,
  search: `
    <alu-search-bar placeholder="搜索运单号 / 订单号…" clearable loading="false"></alu-search-bar>`,
  switch: `
    <alu-switch checked></alu-switch>
    <alu-switch></alu-switch>
    <alu-switch disabled></alu-switch>`,
  'radio-group': `
    <alu-radio-group value="a">
      <alu-radio-group-item value="a">选项 A</alu-radio-group-item>
      <alu-radio-group-item value="b">选项 B</alu-radio-group-item>
      <alu-radio-group-item value="c">选项 C</alu-radio-group-item>
    </alu-radio-group>`,
  select: `
    <alu-select placeholder="选择承运商" value="ups">
      <alu-option value="ups">UPS</alu-option>
      <alu-option value="dhl">DHL</alu-option>
      <alu-option value="dpd">DPD</alu-option>
    </alu-select>`,
  textarea: `
    <alu-form-field label="备注">
      <alu-textarea placeholder="填写配送备注…"></alu-textarea>
    </alu-form-field>`,
  separator: `
    <alu-button>Left</alu-button>
    <alu-separator orientation="vertical"></alu-separator>
    <alu-button>Right</alu-button>`,
  'empty-state': `
    <alu-empty-state icon="lucide:inbox" icon-size="lg" title="暂无运单" description="创建第一个运单开始追踪" action-label="新建运单" secondary-action-label="导入 CSV"></alu-empty-state>`,
  'error-state': `
    <alu-error-state title="加载失败" message="无法获取物流轨迹，请重试"></alu-error-state>`,
  'page-header': `
    <alu-page-header title="运单管理" description="创建、查询与管理跨境运单" icon="lucide:package"></alu-page-header>`,
  avatar: `
    <alu-avatar><alu-avatar-image src="https://i.pravatar.cc/80" alt="用户" /><alu-avatar-fallback>张</alu-avatar-fallback></alu-avatar>
    <alu-avatar size="sm"><alu-avatar-fallback>李</alu-avatar-fallback></alu-avatar>
    <alu-avatar size="lg"><alu-avatar-fallback>王</alu-avatar-fallback></alu-avatar>`,
  breadcrumb: `
    <alu-breadcrumb>
      <alu-breadcrumb-item href="#">首页</alu-breadcrumb-item>
      <alu-breadcrumb-separator></alu-breadcrumb-separator>
      <alu-breadcrumb-item href="#">物流</alu-breadcrumb-item>
      <alu-breadcrumb-separator></alu-breadcrumb-separator>
      <alu-breadcrumb-item>运单</alu-breadcrumb-item>
    </alu-breadcrumb>`,
  item: `
    <alu-item-group>
      <alu-item variant="outline" size="sm">
        <alu-item-media variant="icon"></alu-item-media>
        <alu-item-content><alu-item-title>运单 SH-20261124-001</alu-item-title><alu-item-description>UPS · 2.4kg · 已签收</alu-item-description></alu-item-content>
        <alu-item-actions><alu-button size="sm" variant="ghost">查看</alu-button></alu-item-actions>
      </alu-item>
    </alu-item-group>`,
  sheet: `
    <alu-sheet>
      <alu-sheet-trigger><alu-button variant="outline">打开抽屉</alu-button></alu-sheet-trigger>
      <alu-sheet-content side="right">
        <alu-sheet-header><alu-sheet-title>运单详情</alu-sheet-title><alu-sheet-description>SH-20261124-001</alu-sheet-description></alu-sheet-header>
        <alu-sheet-footer><alu-button variant="ghost">关闭</alu-button><alu-button>确认</alu-button></alu-sheet-footer>
      </alu-sheet-content>
    </alu-sheet>`,
  'dropdown-menu': `
    <alu-dropdown-menu>
      <alu-dropdown-menu-trigger><alu-button variant="outline">操作</alu-button></alu-dropdown-menu-trigger>
      <alu-dropdown-menu-content>
        <alu-dropdown-menu-item>查看轨迹</alu-dropdown-menu-item>
        <alu-dropdown-menu-item>打印标签</alu-dropdown-menu-item>
        <alu-dropdown-menu-separator></alu-dropdown-menu-separator>
        <alu-dropdown-menu-item variant="destructive">删除运单</alu-dropdown-menu-item>
      </alu-dropdown-menu-content>
    </alu-dropdown-menu>`,
  pagination: `
    <alu-pagination count="100" per-page="10" page="1" sibling-count="1"></alu-pagination>`,
  'date-picker': `
    <alu-form-field label="提货日期">
      <alu-date-picker placeholder="YYYY-MM-DD" value="2026-11-24"></alu-date-picker>
    </alu-form-field>`,
  'signature-pad': `
    <alu-signature-pad width="300" height="150" placeholder="在此签名"></alu-signature-pad>`,
  sonner: `
    <alu-sonner type="success" description="运单已创建"></alu-sonner>`,
  'error-boundary': `
    <alu-error-boundary><alu-card><alu-card-content>正常内容（无 error 属性时渲染 slot）</alu-card-content></alu-card></alu-error-boundary>`,
  'table-actions': `
    <alu-table-actions align="end">
      <alu-button variant="ghost" size="icon">编辑</alu-button>
      <alu-button variant="ghost" size="icon">复制</alu-button>
      <alu-button variant="ghost" size="icon">删除</alu-button>
    </alu-table-actions>`,
  'table-caption': `
    <alu-table><alu-table-caption>共 4 条运单记录</alu-table-caption></alu-table>`,
  'skeleton-table': `
    <alu-skeleton-table rows="3" cols="5"></alu-skeleton-table>`,
  'skeleton-page': `
    <alu-skeleton class="h-8 w-32"></alu-skeleton>
    <alu-skeleton class="h-4 w-full"></alu-skeleton>
    <alu-skeleton class="h-4 w-3/4"></alu-skeleton>`,
  'table': `
    <alu-table>
      <alu-table-header><alu-table-row><alu-table-head>订单号</alu-table-head><alu-table-head>状态</alu-table-head><alu-table-head>重量</alu-table-head></alu-table-row></alu-table-header>
      <alu-table-body>
        ${mockShipments
          .map(
            (s) =>
              `<alu-table-row><alu-table-cell>${s.id}</alu-table-cell><alu-table-cell><alu-badge variant="${s.status === 'delivered' ? 'success' : 'secondary'}">${s.status}</alu-badge></alu-table-cell><alu-table-cell>${s.weight}</alu-table-cell></alu-table-row>`,
          )
          .join('\n')}
      </alu-table-body>
    </alu-table>`,
};

// ---------- 三框架代码片段（Svelte / Web Components / Vue / React 写法） ----------
// 组件库主包是 Svelte（@alaikis/alaidesign），故 Svelte tab 用原生 Svelte 组件；
// 组件文档代码片段已移至 src/docs/components.ts（componentDocs.code）；
// 此处仅保留 install 安装说明的 snippet（落地页快速开始 + 安装页）。
const CODE: Record<string, Record<string, string>> = {};

function codeFor(_component: string, svelte: string, web: string, vue: string, react: string) {
  return { Svelte: svelte, 'Web Components': web, Vue: vue, React: react };
}

CODE.install = codeFor(
  'install',
  `npm install @alaikis/alaidesign
# Svelte 组件库主包
import { Button } from '@alaikis/alaidesign';
<Button variant="outline">提交</Button>`,
  `npm install @alaikis/alaidesign-vue @alaikis/alaidesign-ui
import '@alaikis/alaidesign-ui/styles.css';
// Vue 3.3+ 需标记自定义元素
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('alu-');
// 使用
<AluButton variant="outline" />`,
  `npm install @alaikis/alaidesign-react @alaikis/alaidesign-ui
import '@alaikis/alaidesign-ui/styles.css';
// 使用
import { AluButton } from '@alaikis/alaidesign-react';
<AluButton variant="outline" />`,
);

// ---------- 组件分类与元数据（文档站导航 + 描述） ----------
const categories = [
  {
    name: '基础',
    desc: '按钮、徽章、卡片等原子组件',
    items: ['button', 'badge', 'card', 'input', 'checkbox', 'select', 'switch', 'textarea', 'separator', 'avatar'],
  },
  {
    name: '导航',
    desc: '选项卡、面包屑、分页、下拉菜单',
    items: ['tabs', 'breadcrumb', 'pagination', 'dropdown-menu'],
  },
  {
    name: '反馈',
    desc: '对话框、抽屉、提示、空状态',
    items: ['dialog', 'sheet', 'tooltip', 'sonner', 'empty-state', 'error-state', 'error-boundary'],
  },
  {
    name: '数据',
    desc: '表格、数据列表、骨架屏、搜索',
    items: ['table', 'data-table', 'item', 'skeleton', 'skeleton-table', 'skeleton-card', 'skeleton-page', 'search'],
  },
  {
    name: '高级',
    desc: '日期选择、签名板、表单、页头',
    items: ['date-picker', 'signature-pad', 'page-header', 'form-field', 'table-actions', 'table-caption'],
  },
];

// ---------- 路由（history API）：/components/<name> 与 /tokens、/install ----------
// GitHub Pages 静态站：history 路由由前端 SPA 接管，直接访问深链需服务端 fallback（Pages 不支持），
// 故深链仅作客户端跳转用；刷新深链会 404，需配合 Pages 的 404.html 或保持根路径访问。
const ROUTES = {
  home: '/',
  components: '/components',
  tokens: '/tokens',
  install: '/install',
} as const;

function routePath(component?: string): string {
  if (!component) return ROUTES.components;
  return `${ROUTES.components}/${component}`;
}

function currentRoute(): string {
  const p = window.location.pathname;
  // 去掉 base（PAGES_BASE）
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return p.startsWith(base) ? p.slice(base.length) || '/' : p;
}

function navigate(path: string, replace = false) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const full = base + (path.startsWith('/') ? path : '/' + path);
  if (replace) window.history.replaceState(null, '', full);
  else window.history.pushState(null, '', full);
  renderRoute();
}

// 解析当前路由 → { page, component? }
function parseRoute(): { page: string; component?: string } {
  const p = currentRoute();
  if (p === '/' || p === '') return { page: 'home' };
  if (p === ROUTES.components) return { page: 'components' };
  if (p.startsWith(ROUTES.components + '/')) {
    const comp = p.slice(ROUTES.components.length + 1);
    return { page: 'components', component: comp };
  }
  if (p === ROUTES.tokens) return { page: 'tokens' };
  if (p === ROUTES.install) return { page: 'install' };
  return { page: 'home' };
}

function renderRoute() {
  const { page, component } = parseRoute();
  // 显示对应视图：落地页 / 组件文档 / token / 安装
  const home = document.getElementById('home')!;
  const docs = document.getElementById('components')!;
  const tokens = document.getElementById('tokens')!;
  const install = document.getElementById('install')!;
  home.style.display = page === 'home' ? '' : 'none';
  docs.style.display = page === 'components' ? '' : 'none';
  tokens.style.display = page === 'tokens' ? '' : 'none';
  install.style.display = page === 'install' ? '' : 'none';

  if (page === 'components' && component) {
    // 滚动到具体组件 + 高亮导航
    const section = document.getElementById('c-' + component);
    if (section) {
      // 高亮对应 nav
      document.querySelectorAll('.docs-nav [data-nav]').forEach((a) => {
        a.classList.toggle('active', a.getAttribute('data-nav') === component);
      });
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  if (page === 'components' && !component) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ---------- 渲染：顶部导航 ----------
function renderTopNav() {
  const nav = document.createElement('header');
  nav.className = 'topnav';
  nav.innerHTML = `
    <a class="topnav-brand" data-route="${ROUTES.home}" href="#">AlaiDesign</a>
    <nav class="topnav-links">
      <a data-route="${ROUTES.home}" href="#">概览</a>
      <a data-route="${ROUTES.components}" data-goto-docs href="#">组件</a>
      <a data-route="${ROUTES.tokens}" href="#">设计 Token</a>
      <a data-route="${ROUTES.install}" href="#">安装</a>
    </nav>
    <a class="topnav-cta" data-route="${ROUTES.install}" href="#">快速开始</a>`;
  document.getElementById('app')!.prepend(nav);

  // 导航点击 → history 路由
  nav.querySelectorAll('[data-route]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const r = a.getAttribute('data-route')!;
      navigate(r);
    });
  });
}

// ---------- 渲染：落地页（Hero + 能力亮点 + 快速开始） ----------
function renderLanding() {
  const el = document.createElement('section');
  el.className = 'landing';
  el.id = 'home';
  el.innerHTML = `
    <div class="hero">
      <div class="hero-inner">
        <span class="hero-tag">Headless Supply Chain UI</span>
        <h1 class="hero-title">AlaiDesign</h1>
        <p class="hero-sub">高能量设计体系与组件库 — 一次集成，Svelte / Vue / React 三端通用。
        数据密集的中后台场景，既有克制的专业，也有强烈的视觉冲击。</p>
        <div class="hero-actions">
          <alu-button size="lg" data-route="${ROUTES.install}">开始使用</alu-button>
          <alu-button size="lg" variant="outline" data-route="${ROUTES.components}">查看组件</alu-button>
        </div>
        <div class="hero-stats">
          <div><strong>114</strong><span>组件</span></div>
          <div><strong>3</strong><span>框架</span></div>
          <div><strong>2</strong><span>主题</span></div>
          <div><strong>0</strong><span>运行时依赖</span></div>
        </div>
      </div>
      <div class="hero-demo" data-demo="data-table"></div>
    </div>
    <div class="features">
      ${[
        ['统一 Web Components 核心', '一套组件实现，Svelte / Vue / React 薄 wrapper 消费，视觉零漂移。'],
        ['高能量设计 token', '品牌蓝 + 中性骨架 + 高能量强化，light / dark 双主题，全部走 --* 变量。'],
        ['数据密集场景优化', '表格、列表、分页、骨架屏，为物流 SaaS 中后台而生。'],
        ['零框架锁定', '自定义元素 + slot + 事件，任何技术栈皆可集成，无运行时绑定。'],
      ]
        .map(([t, d]) => `<div class="feature"><h3>${t}</h3><p>${d}</p></div>`)
        .join('')}
    </div>
    <div class="quickstart" id="quickstart">
      <h2>快速开始</h2>
      <p>一行命令安装，三框架任选。</p>
      <div class="code-tabs" data-code-tabs="install"></div>
    </div>`;
  document.getElementById('app')!.appendChild(el);

  // Hero CTA → history 路由
  el.querySelectorAll('[data-route]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(a.getAttribute('data-route')!);
    });
  });
}

// ---------- 渲染：组件文档站（分类导航 + live demo + 三框架代码 tab + 复制） ----------
function renderDocs() {
  const wrap = document.createElement('div');
  wrap.className = 'docs-layout';
  wrap.id = 'components';

  const aside = document.createElement('aside');
  aside.className = 'docs-nav';
  aside.innerHTML =
    `<div class="docs-nav-title">组件</div>` +
    categories
      .map(
        (c) =>
          `<div class="cat"><div class="cat-name">${c.name}</div><div class="cat-desc">${c.desc}</div>${c.items
            .map((i) => `<a href="#" data-nav="${i}" data-route="${routePath(i)}" class="nav-item">${i}</a>`)
            .join('')}</div>`,
      )
      .join('');

  const main = document.createElement('div');
  main.className = 'docs-main';
  main.innerHTML = categories
    .map((c) =>
      c.items
        .map((i) => {
          const doc = componentDocs.find((d) => d.key === i);
          return doc ? renderComponentSection(doc) : `<section class="demo-section" id="c-${i}"><h2>${i}</h2><div class="demo-box" data-demo="${i}"></div></section>`;
        })
        .join(''),
    )
    .join('');

  wrap.appendChild(aside);
  wrap.appendChild(main);
  document.getElementById('app')!.appendChild(wrap);

  // 填充 live demo（组件 section 内的 demo-box + 落地页 hero-demo）
  wrap.querySelectorAll('[data-demo]').forEach((box) => {
    const type = box.getAttribute('data-demo')!;
    box.innerHTML = DEMOS[type] ?? '<p>暂无 demo</p>';
  });
  // 填充代码 tab（四框架：Svelte / Web Components / Vue / React）
  renderCodeTabs(wrap);
  // 填充参数表（alu-data-table）
  fillParamTables(wrap);
  // 导航点击 → history 路由
  aside.querySelectorAll('[data-nav]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(a.getAttribute('data-route')!);
    });
  });
}

// 渲染单个组件文档 section（描述 + demo + 参数表 + 代码 + 注意事项）
function renderComponentSection(doc: ComponentDoc): string {
  const hasCode = Object.values(doc.code).some((c) => c);
  return `<section class="demo-section" id="c-${doc.key}" data-component="${doc.key}">
    <h2>${doc.title}</h2>
    <p class="comp-desc">${doc.description}</p>
    <div class="demo-box" data-demo="${doc.key}"></div>
    ${doc.props.length ? `<div class="api-block"><h3>属性</h3><div class="param-table" data-param-table="${doc.key}"></div></div>` : ''}
    ${doc.events && doc.events.length ? `<div class="api-block"><h3>事件</h3><div class="param-table" data-event-table="${doc.key}"></div></div>` : ''}
    ${doc.slots && doc.slots.length ? `<div class="api-block"><h3>插槽</h3><div class="param-table" data-slot-table="${doc.key}"></div></div>` : ''}
    ${doc.children && doc.children.length ? `<div class="api-block"><h3>子元素</h3><div class="param-table" data-child-table="${doc.key}"></div></div>` : ''}
    ${hasCode ? `<div class="code-tabs" data-code-tabs="${doc.key}"></div>` : ''}
    ${doc.notes && doc.notes.length ? `<div class="api-block"><h3>注意事项</h3><ul class="notes-list">${doc.notes.map((n) => `<li>${n}</li>`).join('')}</ul></div>` : ''}
  </section>`;
}

// 用 alu-data-table 渲染参数/事件/插槽/子元素表（columns+data JSON 字符串）
function fillParamTables(scope: ParentNode) {
  scope.querySelectorAll('[data-param-table]').forEach((box) => {
    const key = box.getAttribute('data-param-table')!;
    const doc = componentDocs.find((d) => d.key === key);
    if (!doc) return;
    box.innerHTML = renderApiTable(
      [
        { key: 'name', title: '属性' },
        { key: 'type', title: '类型' },
        { key: 'default', title: '默认值' },
        { key: 'desc', title: '说明' },
      ],
      doc.props.map((p: ApiProp) => ({ name: p.name, type: p.type, default: p.default ?? '—', desc: p.desc })),
    );
  });
  scope.querySelectorAll('[data-event-table]').forEach((box) => {
    const key = box.getAttribute('data-event-table')!;
    const doc = componentDocs.find((d) => d.key === key);
    if (!doc?.events) return;
    box.innerHTML = renderApiTable(
      [
        { key: 'name', title: '事件' },
        { key: 'payload', title: 'payload' },
        { key: 'desc', title: '说明' },
      ],
      doc.events.map((e: ApiEvent) => ({ name: e.name, payload: e.payload ?? '—', desc: e.desc })),
    );
  });
  scope.querySelectorAll('[data-slot-table]').forEach((box) => {
    const key = box.getAttribute('data-slot-table')!;
    const doc = componentDocs.find((d) => d.key === key);
    if (!doc?.slots) return;
    box.innerHTML = renderApiTable(
      [
        { key: 'name', title: '插槽' },
        { key: 'desc', title: '说明' },
      ],
      doc.slots.map((s: ApiSlot) => ({ name: s.name, desc: s.desc })),
    );
  });
  scope.querySelectorAll('[data-child-table]').forEach((box) => {
    const key = box.getAttribute('data-child-table')!;
    const doc = componentDocs.find((d) => d.key === key);
    if (!doc?.children) return;
    box.innerHTML = renderApiTable(
      [
        { key: 'tag', title: '子元素' },
        { key: 'desc', title: '说明' },
      ],
      doc.children.map((c) => ({ tag: c.tag, desc: c.desc })),
    );
  });
}

// alu-data-table 渲染（columns/data 以 JSON 字符串传入 — Web Components 属性限制）
function renderApiTable(columns: Array<{ key: string; title: string }>, data: Array<Record<string, string>>): string {
  return `<alu-data-table
    columns='${JSON.stringify(columns)}'
    data='${JSON.stringify(data)}'
    empty-text="无"
  ></alu-data-table>`;
}

// history popstate（浏览器前进/后退）
window.addEventListener('popstate', () => {
  renderRoute();
});

function renderCodeTabs(scope: ParentNode) {
  const codeTabs = scope.querySelectorAll('[data-code-tabs]');
  codeTabs.forEach((el) => {
    const key = el.getAttribute('data-code-tabs')!;
    // 代码片段来源：componentDocs.code（组件族）或 CODE 表（install）
    const doc = componentDocs.find((d) => d.key === key);
    let snippets: Record<string, string> | undefined;
    let tabNames: string[];
    if (doc) {
      snippets = {
        Svelte: doc.code.svelte,
        'Web Components': doc.code.web,
        Vue: doc.code.vue,
        React: doc.code.react,
      };
      tabNames = ['Svelte', 'Web Components', 'Vue', 'React'].filter((n) => snippets![n]);
    } else {
      snippets = CODE[key];
      tabNames = snippets ? ['Svelte', 'Web Components', 'Vue', 'React'].filter((n) => snippets![n]) : [];
    }
    if (!snippets || !tabNames.length) return;
    el.innerHTML =
      `<div class="code-tabs-head">` +
      tabNames
        .map((n, i) => `<button class="code-tab-btn ${i === 0 ? 'active' : ''}" data-tab-btn="${n}">${n}</button>`)
        .join('') +
      ` <button class="code-copy" data-copy>复制</button></div>` +
      tabNames
        .map(
          (n, i) =>
            `<pre class="code-block" data-code-block="${n}" style="${i === 0 ? '' : 'display:none'}"><code>${escapeHtml(snippets![n] ?? '')}</code></pre>`,
        )
        .join('');
    el.querySelectorAll('[data-tab-btn]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const active = btn.getAttribute('data-tab-btn')!;
        el.querySelectorAll('[data-tab-btn]').forEach((b) => b.classList.toggle('active', b === btn));
        el.querySelectorAll('[data-code-block]').forEach((b) =>
          (b as HTMLElement).style.display = b.getAttribute('data-code-block') === active ? 'block' : 'none',
        );
      });
    });
    const copyBtn = el.querySelector('[data-copy]') as HTMLElement | null;
    copyBtn?.addEventListener('click', async () => {
      const visible = el.querySelector('[data-code-block]:not([style*="display: none"])') as HTMLElement | null;
      const text = visible?.querySelector('code')?.textContent ?? '';
      try {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = '已复制';
        setTimeout(() => (copyBtn.textContent = '复制'), 1500);
      } catch {
        /* 忽略 */
      }
    });
  });
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ---------- 渲染：设计 token 文档页 + 安装页 ----------
function renderTokenAndInstall() {
  const app = document.getElementById('app')!;
  const tokenSection = document.createElement('section');
  tokenSection.className = 'docs-page';
  tokenSection.id = 'tokens';
  tokenSection.innerHTML =
    '<h2>设计 Token</h2><p>色板 / 字体 / 圆角 / 间距 — 全部走 <code>--*</code> 变量，light / dark 双主题。构建期从 <code>tokens.css</code> 单一来源解析生成下表。</p>' +
    '<div class="token-table" id="token-table"><p>加载中…</p></div>';
  app.appendChild(tokenSection);

  // 拉取构建期生成的 tokens.json 渲染
  fetch(import.meta.env.BASE_URL + 'tokens.json')
    .then((r) => r.json())
    .then((data: { light: Record<string, string>; dark: Record<string, string> }) => {
      const keys = Object.keys(data.light);
      const rows = keys
        .map(
          (k) =>
            `<tr><td class="tk-name">${k}</td><td><span class="swatch" style="background:${data.light[k]}"></span></td><td><span class="swatch" style="background:${data.dark[k]}"></span></td></tr>`,
        )
        .join('');
      document.getElementById('token-table')!.innerHTML =
        '<table class="token-grid"><thead><tr><th>Token</th><th>Light</th><th>Dark</th></tr></thead><tbody>' + rows + '</tbody></table>';
    })
    .catch(() => {
      document.getElementById('token-table')!.innerHTML = '<p>token 数据未生成（构建期产物）</p>';
    });

  const installSection = document.createElement('section');
  installSection.className = 'docs-page';
  installSection.id = 'install';
  installSection.innerHTML =
    '<h2>安装</h2><p>npm 安装三框架 wrapper，CSS 注入一次即可。Web Components 核心包 <code>@alaikis/alaidesign-ui</code> 提供统一渲染。</p>' +
    '<div class="code-tabs" data-code-tabs="install"></div>';
  app.appendChild(installSection);
  renderCodeTabs(installSection);
}

// ---------- 入口 ----------
function init() {
  renderTopNav();
  renderLanding();
  renderDocs();
  renderTokenAndInstall();

  // 落地页 CTA 跳转
  document.querySelector('.hero-actions alu-button')?.addEventListener('click', () => {
    document.getElementById('install')?.scrollIntoView({ behavior: 'smooth' });
  });
  document.querySelectorAll('.topnav-links a[data-goto-docs], .hero-actions alu-button[variant="outline"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('components')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

init();
