// 官网入口：注册 AlaiDesign Web Components（@alaikis/alaidesign-ui），构建演示站 UI。
import '@alaikis/alaidesign-ui';
import '../site.css';

// 复制全部组件 demo 到各 demo 容器
const demos = document.querySelectorAll('[data-demo]');
demos.forEach((container) => {
  const type = container.getAttribute('data-demo')!;
  container.innerHTML = DEMOS[type] ?? '<p>暂无 demo</p>';
});

// 三框架代码 tab
const codeTabs = document.querySelectorAll('[data-code-tabs]');
codeTabs.forEach((el) => {
  const tab = el.getAttribute('data-code-tabs')!;
  const code = CODE[tab];
  if (!code) return;
  const tabs = ['Web Components', 'Vue', 'React'];
  const snippets = code as Record<string, string>;
  const html = tabs
    .map(
      (name, i) =>
        `<div class="code-tab" data-tab="${name}" data-active="${i === 0}">
          <button class="code-tab-btn ${i === 0 ? 'active' : ''}" data-tab-btn="${name}">${name}</button>
          <pre class="code-block" data-code-block="${name}"><code>${escapeHtml(snippets[name] ?? '')}</code></pre>
        </div>`,
    )
    .join('');
  el.innerHTML = html;
  el.querySelectorAll('[data-tab-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const active = btn.getAttribute('data-tab-btn')!;
      el.querySelectorAll('[data-tab-btn]').forEach((b) => b.classList.toggle('active', b === btn));
      el.querySelectorAll('[data-code-block]').forEach((b) =>
        b.style.display = b.getAttribute('data-code-block') === active ? 'block' : 'none',
      );
    });
  });
  el.querySelector('[data-code-block=Vue]')!.style.display = 'none';
  el.querySelector('[data-code-block=React]')!.style.display = 'none';
});

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// 物流场景 mock 数据（静态，不依赖任何后端 API）
const mockShipments = [
  { id: 'SH-20261124-001', tracking: '3SABC123456789', carrier: 'UPS', status: 'delivered', date: '2026-11-24', weight: '2.4kg' },
  { id: 'SH-20261124-002', tracking: 'DHL78901234567', carrier: 'DHL', status: 'in-transit', date: '2026-11-23', weight: '5.1kg' },
  { id: 'SH-20261123-003', tracking: 'DPD55667788990', carrier: 'DPD', status: 'pending', date: '2026-11-23', weight: '0.8kg' },
  { id: 'SH-20261122-004', tracking: 'FEDEX112233445', carrier: 'FedEx', status: 'delivered', date: '2026-11-22', weight: '1.2kg' },
];

// 组件 demo 模板（Web Components 原生写法）
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

// 三框架代码片段（同一组件 Web Components / Vue / React 写法）
const CODE: Record<string, Record<string, string>> = {
  button: {
    'Web Components': `<alu-button variant="outline" size="sm">提交运单</alu-button>
// 事件
aluBtn.addEventListener('click', (e) => { /* 处理 */ });`,
    Vue: `<template>
  <AluButton variant="outline" size="sm" @click="onSubmit">提交运单</AluButton>
</template>
<script setup>
import { AluButton } from '@alaikis/alaidesign-vue';
function onSubmit(e) { /* 处理 */ }
<\/script>`,
    React: `import { AluButton } from '@alaikis/alaidesign-react';

function Submit() {
  return <AluButton variant="outline" size="sm" onClick={(e) => { /* 处理 */ }}>提交运单</AluButton>;
}`,
  },
  'data-table': {
    'Web Components': `const columns = [
  { key: 'id', title: '订单号', sortable: true },
  { key: 'tracking', title: '运单号' },
  { key: 'status', title: '状态' },
];
const data = [
  { id: 'SH-001', tracking: '3SABC', status: 'delivered' },
];

<alu-data-table
  columns=\${JSON.stringify(columns)}
  data=\${JSON.stringify(data)}
  pagination=\${JSON.stringify({ total: data.length, pageSize: 10 })}
></alu-data-table>

aluTable.addEventListener('row-click', (e) => console.log(e.detail.row));
aluTable.addEventListener('sort', (e) => console.log(e.detail));`,
    Vue: `<alu-data-table
  :columns="columns"
  :data="data"
  @row-click="(row) => onRowClick(row)"
  @sort="({ key, direction }) => onSort(key, direction)"
/>`,
    React: `<AluDataTable
  columns={columns}
  data={data}
  onRowClick={(row) => onRowClick(row)}
  onSort={({ key, direction }) => onSort(key, direction)}
/>`,
  },
};

// 左侧组件列表（按分类）
const categories = [
  { name: '基础', items: ['button', 'badge', 'card', 'input', 'checkbox', 'select', 'switch', 'textarea', 'separator', 'avatar'] },
  { name: '导航', items: ['tabs', 'breadcrumb', 'pagination', 'dropdown-menu'] },
  { name: '反馈', items: ['dialog', 'sheet', 'tooltip', 'sonner', 'empty-state', 'error-state', 'error-boundary'] },
  { name: '数据', items: ['table', 'data-table', 'item', 'skeleton', 'skeleton-table', 'skeleton-card', 'skeleton-page', 'search'] },
  { name: '高级', items: ['date-picker', 'signature-pad', 'page-header', 'form-field', 'table-actions', 'table-caption'] },
];

const sidebar = document.createElement('nav');
sidebar.className = 'sidebar';
sidebar.innerHTML =
  `<div class="sidebar-title">AlaiDesign<br><span class="subtitle">TDesign 高能量组件库</span></div>` +
  categories
    .map(
      (c) =>
        `<div class="cat"><div class="cat-name">${c.name}</div>${c.items
          .map((i) => `<a href="#${i}" data-nav="${i}" class="nav-item">${i}</a>`)
          .join('')}</div>`,
    )
    .join('');
document.getElementById('app')!.appendChild(sidebar);

// 主内容区：组件详情页
const main = document.createElement('main');
main.className = 'main';
const allItems = categories.flatMap((c) => c.items);
main.innerHTML = allItems
  .map(
    (i) =>
      `<section class="demo-section" id="${i}" data-component="${i}">
        <h2>${i}</h2>
        <div class="demo-box" data-demo="${i}"></div>
        <div class="code-tabs" data-code-tabs="${i}"></div>
      </section>`,
  )
  .join('');
document.getElementById('app')!.appendChild(main);

// 导航点击高亮
sidebar.querySelectorAll('[data-nav]').forEach((a) => {
  a.addEventListener('click', () => {
    sidebar.querySelectorAll('.nav-item').forEach((x) => x.classList.remove('active'));
    a.classList.add('active');
  });
});

// token 文档页（构建期由 scripts/generate-token-docs.mjs 生成 tokens.json，此处占位）
const tokenSection = document.createElement('section');
tokenSection.className = 'demo-section';
tokenSection.id = 'tokens';
tokenSection.innerHTML =
  '<h2>设计 Token</h2><p>色板 / 字体 / 圆角 / 间距 — 由 <code>tokens.css</code> 单一来源生成，构建期解析为表格。</p>';
main.appendChild(tokenSection);

// 安装说明页
const installSection = document.createElement('section');
installSection.className = 'demo-section';
installSection.id = 'install';
installSection.innerHTML =
  '<h2>安装</h2>' +
  '<div class="code-tabs" data-code-tabs="install"></div>';
main.appendChild(installSection);

CODE['install'] = {
  'Web Components': `npm install @alaikis/alaidesign-web
// CSS 注入（一次）
import '@alaikis/alaidesign-web/styles.css';
import '@alaikis/alaidesign-web/tokens.css';
// 使用
<alu-button variant="outline">提交</alu-button>`,
  Vue: `npm install @alaikis/alaidesign-vue @alaikis/alaidesign-web
import '@alaikis/alaidesign-web/styles.css';
// Vue 3.3+ 需标记自定义元素
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('alu-');
// 使用
<AluButton variant="outline" />`,
  React: `npm install @alaikis/alaidesign-react @alaikis/alaidesign-web
import '@alaikis/alaidesign-web/styles.css';
// 使用
import { AluButton } from '@alaikis/alaidesign-react';
<AluButton variant="outline" />`,
};
