import type { ComponentDoc } from './types';

// AlaiDesign 组件文档数据 — 全量组件族（与 Svelte 包 114 导出对齐，按族组织）
// 参数表覆盖全量；高频组件描述详，子元素组件归并入父族。
export const componentDocs: ComponentDoc[] = [
  // ==================== 基础 ====================
  {
    key: 'button',
    title: 'Button 按钮',
    description:
      '用于触发操作或提交表单。支持多种视觉变体（default/outline/secondary/ghost/destructive/link）与尺寸（xs/sm/default/lg/icon），可携带图标与禁用态。',
    props: [
      { name: 'variant', type: "'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link'", default: "'default'", desc: '视觉变体' },
      { name: 'size', type: "'xs' | 'sm' | 'default' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg'", default: "'default'", desc: '尺寸' },
      { name: 'href', type: 'string', desc: '传值时渲染为 <a> 跳转而非 <button>' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
      { name: 'class', type: 'string', desc: '追加类名（与变体类合并）' },
      { name: 'children', type: 'Snippet', desc: '按钮内容（文本 / 图标）' },
    ],
    events: [],
    slots: [{ name: 'default', desc: '按钮内容（图标 + 文本）' }],
    notes: ['携带 href 时 disabled 通过 aria-disabled + tabindex=-1 实现，不阻塞原生链接语义'],
    code: {
      svelte: `<script>\n  import { Button } from '@alaikis/alaidesign';\n</script>\n<Button variant="outline" size="sm">提交</Button>`,
      web: `<alu-button variant="outline" size="sm">提交</alu-button>
aluBtn.addEventListener('click', (e) => { /* 处理 */ });`,
      vue: `<AluButton variant="outline" size="sm" @click="onSubmit">提交</AluButton>`,
      react: `<AluButton variant="outline" size="sm" onClick={(e) => onSubmit(e)}>提交</AluButton>`,
    },
  },
  {
    key: 'badge',
    title: 'Badge 徽章',
    description: '小型标签，用于标记状态或分类。支持 success/warning/destructive/outline 等语义变体。',
    props: [
      { name: 'variant', type: "'default' | 'secondary' | 'destructive' | 'success' | 'warning' | 'outline'", default: "'default'", desc: '语义变体' },
      { name: 'class', type: 'string', desc: '追加类名' },
      { name: 'children', type: 'Snippet', desc: '徽章文本' },
    ],
    slots: [{ name: 'default', desc: '徽章文本' }],
    code: {
      svelte: `<Badge variant="success">已签收</Badge>`,
      web: `<alu-badge variant="success">已签收</alu-badge>`,
      vue: `<AluBadge variant="success">已签收</AluBadge>`,
      react: `<AluBadge variant="success">已签收</AluBadge>`,
    },
  },
  {
    key: 'card',
    title: 'Card 卡片',
    description: '容器组件，承载一组相关信息。由 Card + Header/Title/Description/Content/Footer 组合。',
    props: [{ name: 'class', type: 'string', desc: '追加类名' }],
    slots: [{ name: 'default', desc: '卡片内容（含 header/content/footer 子元素）' }],
    children: [
      { tag: 'alu-card-header', desc: '卡片头部容器' },
      { tag: 'alu-card-title', desc: '卡片标题（h3）' },
      { tag: 'alu-card-description', desc: '卡片描述（p）' },
      { tag: 'alu-card-content', desc: '卡片主体内容' },
      { tag: 'alu-card-footer', desc: '卡片底部操作区' },
    ],
    code: {
      svelte: `<Card>\n  <CardHeader><CardTitle>标题</CardTitle><CardDescription>描述</CardDescription></CardHeader>\n  <CardContent>内容</CardContent>\n</Card>`,
      web: `<alu-card>
  <alu-card-header><alu-card-title>标题</alu-card-title></alu-card-header>
  <alu-card-content>内容</alu-card-content>
</alu-card>`,
      vue: `<AluCard><AluCardHeader><AluCardTitle>标题</AluCardTitle></AluCardHeader><AluCardContent>内容</AluCardContent></AluCard>`,
      react: `<AluCard><AluCardHeader><AluCardTitle>标题</AluCardTitle></AluCardHeader><AluCardContent>内容</AluCardContent></AluCard>`,
    },
  },
  {
    key: 'input',
    title: 'Input 输入框',
    description: '单行文本输入。支持 placeholder、禁用、只读、必填，配合 FormField 使用。',
    props: [
      { name: 'type', type: "'text' | 'email' | 'password' | 'number' | ...", default: "'text'", desc: 'input type' },
      { name: 'value', type: 'string', desc: '双向绑定值（Svelte bind:value）' },
      { name: 'placeholder', type: 'string', desc: '占位文本' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
      { name: 'readonly', type: 'boolean', default: 'false', desc: '只读' },
      { name: 'required', type: 'boolean', default: 'false', desc: '必填' },
      { name: 'class', type: 'string', desc: '追加类名' },
    ],
    events: [{ name: 'input', payload: 'event.target.value（原生 input 事件）', desc: '输入时触发' }],
    code: {
      svelte: `<script>\n  import { Input } from '@alaikis/alaidesign';\n  let value = '';\n</script>\n<Input bind:value placeholder="运单号" />`,
      web: `<alu-input placeholder="运单号" value=""></alu-input>
aluInput.addEventListener('input', (e) => e.detail.value);`,
      vue: `<AluInput v-model="value" placeholder="运单号" />`,
      react: `<AluInput value={value} onChange={(v) => setValue(v)} placeholder="运单号" />`,
    },
  },
  {
    key: 'checkbox',
    title: 'Checkbox 复选框',
    description: '多选选择器，支持 checked / indeterminate / disabled 三态。',
    props: [
      { name: 'checked', type: 'boolean', default: 'false', desc: '勾选态（Svelte bind:checked）' },
      { name: 'indeterminate', type: 'boolean', default: 'false', desc: '不确定态' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
      { name: 'name', type: 'string', desc: '表单 name' },
      { name: 'value', type: 'string', desc: '表单 value' },
      { name: 'children', type: 'Snippet', desc: '标签文本' },
    ],
    events: [{ name: 'change', payload: '{ checked: boolean }', desc: '勾选变化' }],
    code: {
      svelte: `<script>\n  import { Checkbox } from '@alaikis/alaidesign';\n  let checked = false;\n</script>\n<Checkbox bind:checked>同意条款</Checkbox>`,
      web: `<alu-checkbox>同意条款</alu-checkbox>
aluCheckbox.addEventListener('change', (e) => e.detail.checked);`,
      vue: `<AluCheckbox v-model="checked">同意条款</AluCheckbox>`,
      react: `<AluCheckbox checked={checked} onChange={(c) => setChecked(c)}>同意条款</AluCheckbox>`,
    },
  },
  {
    key: 'select',
    title: 'Select 下拉选择',
    description: '原生 select 封装，支持 placeholder、禁用。选项通过原生 <option> 子元素提供。',
    props: [
      { name: 'value', type: 'string', desc: '选中值（双向）' },
      { name: 'placeholder', type: 'string', desc: '未选中时占位文本' },
      { name: 'options', type: 'Array<{ value: string; label: string; disabled?: boolean }>', desc: '选项（property 赋值；Web Components 推荐）' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
      { name: 'class', type: 'string', desc: '追加类名' },
    ],
    events: [{ name: 'change', payload: 'event.target.value（原生 change 事件）', desc: '选项变化' }],
    slots: [{ name: 'default', desc: '（Svelte 用法）原生 <option> 子元素；Web Components 请改用 options 属性' }],
    code: {
      svelte: `<script>\n  import { Select } from '@alaikis/alaidesign';\n  let value = 'ups';\n</script>\n<Select bind:value placeholder="选择承运商">\n  <option value="ups">UPS</option>\n  <option value="dhl">DHL</option>\n</Select>`,
      web: `<alu-select id="sel" placeholder="选择承运商" value="ups"></alu-select>
<script>
  document.querySelector('#sel').options = [
    { value: 'ups', label: 'UPS' },
    { value: 'dhl', label: 'DHL' },
  ];
</script>`,
      vue: `<AluSelect v-model="value" placeholder="选择承运商" :options="options" />`,
      react: `<AluSelect value={value} options={options} placeholder="选择承运商" onChange={(e) => setValue(e.target.value)} />`,
    },
  },
  {
    key: 'switch',
    title: 'Switch 开关',
    description: '二元状态切换（开/关），支持 checked / disabled。键盘 Space/Enter 可切换。',
    props: [
      { name: 'checked', type: 'boolean', default: 'false', desc: '开态（双向）' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
      { name: 'class', type: 'string', desc: '追加类名' },
    ],
    events: [{ name: 'change', payload: '{ checked: boolean }', desc: '状态切换' }],
    code: {
      svelte: `<script>\n  import { Switch } from '@alaikis/alaidesign';\n  let on = true;\n</script>\n<Switch bind:aria-checked={on} />`,
      web: `<alu-switch checked></alu-switch>
aluSwitch.addEventListener('change', (e) => e.detail.checked);`,
      vue: `<AluSwitch :checked="on" @change="(v) => on = v" />`,
      react: `<AluSwitch checked={on} onChange={(v) => setOn(v)} />`,
    },
  },
  {
    key: 'textarea',
    title: 'Textarea 多行输入',
    description: '多行文本输入，支持 placeholder、禁用、必填。',
    props: [
      { name: 'value', type: 'string', desc: '双向绑定值' },
      { name: 'placeholder', type: 'string', desc: '占位文本' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
      { name: 'required', type: 'boolean', default: 'false', desc: '必填' },
      { name: 'class', type: 'string', desc: '追加类名' },
    ],
    events: [{ name: 'input', payload: 'event.target.value（原生 input 事件）', desc: '输入' }],
    code: {
      svelte: `<script>\n  import { Textarea } from '@alaikis/alaidesign';\n  let value = '';\n</script>\n<Textarea bind:value placeholder="填写备注…" />`,
      web: `<alu-textarea placeholder="填写备注…" value=""></alu-textarea>`,
      vue: `<AluTextarea v-model="value" placeholder="填写备注…" />`,
      react: `<AluTextarea value={value} onChange={(v) => setValue(v)} placeholder="填写备注…" />`,
    },
  },
  {
    key: 'separator',
    title: 'Separator 分隔线',
    description: '视觉分隔线，水平 / 垂直两种方向。',
    props: [
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", desc: '方向' },
      { name: 'class', type: 'string', desc: '追加类名' },
    ],
    code: {
      svelte: `<Separator orientation="vertical" />`,
      web: `<alu-separator orientation="vertical"></alu-separator>`,
      vue: `<AluSeparator orientation="vertical" />`,
      react: `<AluSeparator orientation="vertical" />`,
    },
  },
  {
    key: 'avatar',
    title: 'Avatar 头像',
    description: '用户头像，图片加载失败或无 src 时降级为 fallback 文本。单元素 API：src / alt / fallback / size（sm/default/lg）。',
    props: [
      { name: 'src', type: 'string', desc: '头像图片地址' },
      { name: 'alt', type: 'string', desc: '图片替代文本' },
      { name: 'fallback', type: 'string', desc: '图片失败 / 无 src 时显示的回退文本' },
      { name: 'size', type: "'default' | 'sm' | 'lg'", default: "'default'", desc: '尺寸' },
      { name: 'class', type: 'string', desc: '追加类名' },
    ],
    code: {
      svelte: `<Avatar>\n  <AvatarImage src="https://i.pravatar.cc/80" alt="用户" />\n  <AvatarFallback>张</AvatarFallback>\n</Avatar>`,
      web: `<alu-avatar src="https://i.pravatar.cc/80" alt="用户" fallback="张"></alu-avatar>
<alu-avatar size="lg" fallback="王"></alu-avatar>`,
      vue: `<AluAvatar src="https://i.pravatar.cc/80" alt="用户" fallback="张" />`,
      react: `<AluAvatar src="https://i.pravatar.cc/80" alt="用户" fallback="张" />`,
    },
  },

  // ==================== 导航 ====================
  {
    key: 'tabs',
    title: 'Tabs 选项卡',
    description: '在多个平级面板间切换（键盘可切换）。Web Components 为单元素 API：通过 tabs 属性传入 [{ value, label, html }] 数组。',
    props: [
      { name: 'tabs', type: 'Array<{ value: string; label: string; html?: string }>', desc: '页签定义（通过 property 赋值，非 attribute）' },
      { name: 'value', type: 'string', desc: '当前激活 tab 值（双向）' },
      { name: 'variant', type: "'default' | 'line'", default: "'default'", desc: '列表样式' },
      { name: 'class', type: 'string', desc: '追加类名' },
    ],
    events: [{ name: 'tab-change', payload: '{ value: string }', desc: '切换 tab 时触发' }],
    code: {
      svelte: `<script>\n  import { Tabs, TabsList, TabsTrigger, TabsContent } from '@alaikis/alaidesign';\n  let active = 'overview';\n</script>\n<Tabs bind:active>\n  <TabsList>\n    <TabsTrigger value="overview">概览</TabsTrigger>\n    <TabsTrigger value="history">历史</TabsTrigger>\n  </TabsList>\n  <TabsContent value="overview">…</TabsContent>\n</Tabs>`,
      web: `<!-- 复杂数据用 property 赋值 -->
<alu-tabs id="my-tabs" value="overview"></alu-tabs>
<script>
  const el = document.querySelector('#my-tabs');
  el.tabs = [
    { value: 'overview', label: '概览', html: '概览内容' },
    { value: 'history', label: '历史', html: '历史内容' },
  ];
  el.addEventListener('tab-change', (e) => console.log(e.detail.value));
</script>`,
      vue: `<AluTabs v-model="active" :tabs="tabs" />`,
      react: `<AluTabs value={active} tabs={tabs} onTabChange={(e) => setActive(e.detail.value)} />`,
    },
  },
  {
    key: 'breadcrumb',
    title: 'Breadcrumb 面包屑',
    description: '层级导航，展示当前位置。由 Breadcrumb + Item/Separator 组成，末项 aria-current。',
    props: [{ name: 'class', type: 'string', desc: '追加类名' }],
    children: [
      { tag: 'alu-breadcrumb-item', desc: '面包屑项（href 属性；末项渲染为 link 角色）' },
      { tag: 'alu-breadcrumb-separator', desc: '分隔符（separator 属性指定 lucide 图标，默认 chevron-right）' },
    ],
    code: {
      svelte: `<Breadcrumb>\n  <BreadcrumbItem href="/">首页</BreadcrumbItem>\n  <BreadcrumbSeparator />\n  <BreadcrumbItem>运单</BreadcrumbItem>\n</Breadcrumb>`,
      web: `<alu-breadcrumb>
  <alu-breadcrumb-item href="#">首页</alu-breadcrumb-item>
  <alu-breadcrumb-separator></alu-breadcrumb-separator>
  <alu-breadcrumb-item>运单</alu-breadcrumb-item>
</alu-breadcrumb>`,
      vue: `<AluBreadcrumb>…</AluBreadcrumb>`,
      react: `<AluBreadcrumb>…</AluBreadcrumb>`,
    },
  },
  {
    key: 'pagination',
    title: 'Pagination 分页',
    description: '数据分页导航。支持页码窗口（sibling-count）、上下翻页、省略号。自包含单元素（内部渲染页码/上一页/下一页/省略号）。',
    props: [
      { name: 'count', type: 'number', desc: '总记录数' },
      { name: 'per-page', type: 'number', default: '10', desc: '每页条数' },
      { name: 'page', type: 'number', default: '1', desc: '当前页（双向）' },
      { name: 'sibling-count', type: 'number', default: '1', desc: '当前页两侧显示的兄弟页数' },
      { name: 'class', type: 'string', desc: '追加类名' },
    ],
    events: [{ name: 'page-change', payload: '{ page: number }', desc: '翻页时触发' }],
    code: {
      svelte: `<script>\n  import { Pagination } from '@alaikis/alaidesign';\n  let page = 1;\n</script>\n<Pagination :total="100" :page-size="10" bind:page />`,
      web: `<alu-pagination count="100" per-page="10" page="1" sibling-count="1"></alu-pagination>
aluPagination.addEventListener('page-change', (e) => e.detail.page);`,
      vue: `<AluPagination :count="100" :per-page="10" v-model="page" />`,
      react: `<AluPagination count={100} perPage={10} page={page} onPageChange={(p) => setPage(p)} />`,
    },
  },
  {
    key: 'dropdown-menu',
    title: 'DropdownMenu 下拉菜单',
    description: '触发按钮下方展开的操作菜单。Web Components 为单元素 API：trigger 属性为按钮文案，items 属性为菜单项数组（支持 separator / destructive）。',
    props: [
      { name: 'trigger', type: 'string', default: "'Menu'", desc: '触发按钮文案' },
      { name: 'items', type: 'Array<{ label: string; value: string; separator?: boolean; destructive?: boolean }>', desc: '菜单项（通过 property 赋值）' },
      { name: 'open', type: 'boolean', default: 'false', desc: '打开态（双向）' },
      { name: 'align', type: "'start' | 'center' | 'end'", default: "'start'", desc: '对齐' },
      { name: 'class', type: 'string', desc: '追加类名' },
    ],
    events: [{ name: 'open', desc: '打开菜单' }, { name: 'close', desc: '关闭菜单' }, { name: 'select', payload: '{ value: string }', desc: '选择菜单项' }],
    code: {
      svelte: `<DropdownMenu>\n  <DropdownMenuTrigger><Button variant="outline">操作</Button></DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuItem>查看</DropdownMenuItem>\n    <DropdownMenuItem variant="destructive">删除</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`,
      web: `<alu-dropdown-menu id="menu" trigger="操作"></alu-dropdown-menu>
<script>
  const el = document.querySelector('#menu');
  el.items = [
    { label: '查看轨迹', value: 'view' },
    { separator: true },
    { label: '删除', value: 'delete', destructive: true },
  ];
  el.addEventListener('select', (e) => console.log(e.detail.value));
</script>`,
      vue: `<AluDropdownMenu trigger="操作" :items="items" @select="onSelect" />`,
      react: `<AluDropdownMenu trigger="操作" items={items} onSelect={(e) => onSelect(e.detail.value)} />`,
    },
  },

  // ==================== 反馈 ====================
  {
    key: 'dialog',
    title: 'Dialog 对话框',
    description: '模态对话框，阻断底层交互。打开时锁定 body 滚动，支持遮罩点击 / Escape 关闭。Web Components 为单元素 API：trigger/title/description 属性 + 默认 slot 作为正文。',
    props: [
      { name: 'trigger', type: 'string', default: "'Open'", desc: '触发按钮文案' },
      { name: 'title', type: 'string', desc: '标题' },
      { name: 'description', type: 'string', desc: '描述' },
      { name: 'open', type: 'boolean', default: 'false', desc: '打开态（双向）' },
      { name: 'close-label', type: 'string', default: "'Close'", desc: '底部关闭按钮文案' },
      { name: 'class', type: 'string', desc: '追加类名（透传 content）' },
    ],
    events: [{ name: 'open', payload: '{ open: boolean }', desc: '打开' }, { name: 'close', payload: '{ open: boolean }', desc: '关闭' }],
    code: {
      svelte: `<Dialog>\n  <DialogTrigger><Button variant="secondary">打开</Button></DialogTrigger>\n  <DialogContent>\n    <DialogHeader><DialogTitle>运单详情</DialogTitle></DialogHeader>\n    <DialogFooter><Button>确认</Button></DialogFooter>\n  </DialogContent>\n</Dialog>`,
      web: `<alu-dialog trigger="打开对话框" title="运单详情" description="查看包裹的完整轨迹。">
  <p>对话框正文（默认 slot）</p>
</alu-dialog>`,
      vue: `<AluDialog trigger="打开" title="运单详情" description="详情说明">正文内容</AluDialog>`,
      react: `<AluDialog trigger="打开" title="运单详情" description="详情说明">正文内容</AluDialog>`,
    },
  },
  {
    key: 'sheet',
    title: 'Sheet 抽屉',
    description: '从屏幕边缘滑出的侧边面板，适合二级操作。支持 top/bottom/left/right 方向。Web Components 为单元素 API：trigger/title/description/side 属性 + 默认 slot 作为正文。',
    props: [
      { name: 'trigger', type: 'string', default: "'Open'", desc: '触发按钮文案' },
      { name: 'title', type: 'string', desc: '标题' },
      { name: 'description', type: 'string', desc: '描述' },
      { name: 'open', type: 'boolean', default: 'false', desc: '打开态（双向）' },
      { name: 'side', type: "'top' | 'bottom' | 'left' | 'right'", default: "'right'", desc: '滑出方向' },
      { name: 'close-label', type: 'string', default: "'Close'", desc: '底部关闭按钮文案' },
      { name: 'class', type: 'string', desc: '追加类名' },
    ],
    events: [{ name: 'open', payload: '{ open: boolean }', desc: '打开' }, { name: 'close', payload: '{ open: boolean }', desc: '关闭' }],
    code: {
      svelte: `<Sheet>\n  <SheetTrigger><Button variant="outline">打开</Button></SheetTrigger>\n  <SheetContent side="right">\n    <SheetHeader><SheetTitle>详情</SheetTitle></SheetHeader>\n  </SheetContent>\n</Sheet>`,
      web: `<alu-sheet trigger="打开抽屉" title="运单详情" description="SH-20261124-001" side="right">
  <p>抽屉正文（默认 slot）</p>
</alu-sheet>`,
      vue: `<AluSheet trigger="打开" title="运单详情" side="right">正文内容</AluSheet>`,
      react: `<AluSheet trigger="打开" title="运单详情" side="right">正文内容</AluSheet>`,
    },
  },
  {
    key: 'tooltip',
    title: 'Tooltip 提示',
    description: '悬停 / 聚焦时显示简短说明浮层。Web Components 为单元素 API：content 属性为提示文本，默认 slot 为触发元素。',
    props: [
      { name: 'content', type: 'string', desc: '提示文本（Web Components 模式）' },
      { name: 'side', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", desc: '方位' },
      { name: 'side-offset', type: 'number', default: '0', desc: '与触发的偏移像素' },
      { name: 'class', type: 'string', desc: '追加类名（透传气泡）' },
      { name: 'children', type: 'slot', desc: '触发内容（默认 slot）' },
    ],
    events: [{ name: 'show', desc: '显示' }, { name: 'hide', desc: '隐藏' }],
    code: {
      svelte: `<Tooltip>\n  <TooltipTrigger><Button variant="outline">悬停我</Button></TooltipTrigger>\n  <TooltipContent>提示文字</TooltipContent>\n</Tooltip>`,
      web: `<alu-tooltip content="提示文字" side="top">
  <alu-button variant="outline">悬停我</alu-button>
</alu-tooltip>`,
      vue: `<AluTooltip content="提示文字"><AluButton>悬停我</AluButton></AluTooltip>`,
      react: `<AluTooltip content="提示文字"><AluButton>悬停我</AluButton></AluTooltip>`,
    },
  },
  {
    key: 'sonner',
    title: 'Sonner 提示条',
    description: '轻提示（toast），自动消失。支持 success/error/warning/info 类型，duration 控制持续时间。',
    props: [
      { name: 'type', type: "'success' | 'error' | 'warning' | 'info'", default: "'info'", desc: '类型（决定图标与配色）' },
      { name: 'description', type: 'string', desc: '提示内容' },
      { name: 'duration', type: 'number', default: '3000', desc: '自动消失毫秒数（0 为不自动消失）' },
    ],
    events: [{ name: 'dismiss', desc: '关闭（自动或手动）' }],
    code: {
      svelte: `<Sonner type="success" description="操作成功" />`,
      web: `<alu-sonner type="success" description="操作成功" duration="3000"></alu-sonner>`,
      vue: `<AluSonner type="success" description="操作成功" />`,
      react: `<AluSonner type="success" description="操作成功" />`,
    },
  },
  {
    key: 'empty-state',
    title: 'EmptyState 空状态',
    description: '数据为空时的占位展示。图标 + 标题 + 描述 + 主/次操作按钮。',
    props: [
      { name: 'icon', type: 'string', default: "'lucide:inbox'", desc: '图标名（内置 lucide 集合，如 lucide:inbox）' },
      { name: 'icon-size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: '图标尺寸' },
      { name: 'title', type: 'string', desc: '标题' },
      { name: 'description', type: 'string', desc: '描述' },
      { name: 'action-label', type: 'string', desc: '主操作按钮文本' },
      { name: 'secondary-action-label', type: 'string', desc: '次操作按钮文本' },
      { name: 'class', type: 'string', desc: '追加类名' },
    ],
    events: [{ name: 'action', desc: '主操作点击' }, { name: 'secondary-action', desc: '次操作点击' }],
    code: {
      svelte: `<EmptyState icon="lucide:inbox" icon-size="lg" title="暂无数据" action-label="新建" secondary-action-label="导入" />`,
      web: `<alu-empty-state icon="lucide:inbox" icon-size="lg" title="暂无运单" description="创建第一个运单" action-label="新建运单" secondary-action-label="导入 CSV"></alu-empty-state>`,
      vue: `<AluEmptyState icon="lucide:inbox" title="暂无数据" action-label="新建" />`,
      react: `<AluEmptyState icon="lucide:inbox" title="暂无数据" actionLabel="新建" />`,
    },
  },
  {
    key: 'error-state',
    title: 'ErrorState 错误状态',
    description: '数据加载失败时的占位展示，带重试按钮。',
    props: [
      { name: 'title', type: 'string', default: "'Something went wrong'", desc: '标题' },
      { name: 'message', type: 'string', desc: '错误信息' },
      { name: 'class', type: 'string', desc: '追加类名' },
    ],
    events: [{ name: 'retry', desc: '点击重试' }],
    code: {
      svelte: `<ErrorState title="加载失败" message="无法获取数据" onretry="load" />`,
      web: `<alu-error-state title="加载失败" message="无法获取物流轨迹，请重试"></alu-error-state>
aluErrorState.addEventListener('retry', load);`,
      vue: `<AluErrorState title="加载失败" message="无法获取数据" @retry="load" />`,
      react: `<AluErrorState title="加载失败" message="无法获取数据" onRetry={load} />`,
    },
  },
  {
    key: 'error-boundary',
    title: 'ErrorBoundary 错误边界',
    description: '捕获子树渲染错误并展示 fallback。Svelte 用 svelte:boundary，Web Components 降级为 error 属性驱动的错误 UI + reset。',
    props: [
      { name: 'error', type: 'string', desc: '错误信息（存在时渲染错误 UI，否则渲染 slot）' },
      { name: 'class', type: 'string', desc: '追加类名' },
    ],
    events: [{ name: 'error', payload: '{ error: Error }', desc: '捕获到错误时触发' }],
    code: {
      svelte: `<svelte:boundary fallback={<ErrorState />}><Children /></svelte:boundary>`,
      web: `<alu-error-boundary>正常内容</alu-error-boundary>
// 出错时
aluBoundary.setAttribute('error', '渲染失败');`,
      vue: `<AluErrorBoundary @reset="reset"><Children /></AluErrorBoundary>`,
      react: `<AluErrorBoundary onReset={reset}>{children}</AluErrorBoundary>`,
    },
  },

  // ==================== 数据 ====================
  {
    key: 'table',
    title: 'Table 表格',
    description: '基础表格，带横向滚动容器。由 Table + Header/Body/Row/Head/Cell/Caption/Footer 组合。',
    props: [{ name: 'class', type: 'string', desc: '追加类名' }],
    children: [
      { tag: 'alu-table-header', desc: '表头组（thead）' },
      { tag: 'alu-table-body', desc: '表体（tbody）' },
      { tag: 'alu-table-footer', desc: '表尾（tfoot）' },
      { tag: 'alu-table-row', desc: '行（tr，hover 高亮）' },
      { tag: 'alu-table-head', desc: '表头单元格（th）' },
      { tag: 'alu-table-cell', desc: '数据单元格（td）' },
      { tag: 'alu-table-caption', desc: '表格说明（caption）' },
      { tag: 'alu-table-actions', desc: '工具栏操作按钮组（align 属性）' },
    ],
    code: {
      svelte: `<Table>\n  <TableHeader><TableRow><TableHead>订单号</TableHead></TableRow></TableHeader>\n  <TableBody>{rows.map((r) => <TableRow><TableCell>{r.id}</TableCell></TableRow>)}</TableBody>\n</Table>`,
      web: `<alu-table>
  <alu-table-header><alu-table-row><alu-table-head>订单号</alu-table-head></alu-table-row></alu-table-header>
  <alu-table-body>…</alu-table-body>
</alu-table>`,
      vue: `<AluTable>…</AluTable>`,
      react: `<AluTable>…</AluTable>`,
    },
  },
  {
    key: 'data-table',
    title: 'DataTable 数据表格',
    description: '增强表格：列配置、排序、分页、行点击、加载骨架、空态。columns/data/pagination 通过 property 赋值（数组/对象），row-key/empty-text/empty-icon 为属性。',
    props: [
      { name: 'columns', type: 'DataTableColumn[]', desc: '列定义：key/title/sortable/align/width/fixed/render（property）' },
      { name: 'data', type: 'Record<string, unknown>[]', desc: '行数据（property）' },
      { name: 'pagination', type: 'DataTablePagination', desc: '分页：total/page/pageSize/…（property）' },
      { name: 'row-key', type: 'string', default: "'id'", desc: '行唯一键' },
      { name: 'loading', type: 'boolean', default: 'false', desc: '加载态（渲染骨架行）' },
      { name: 'empty-text', type: 'string', default: "'No data'", desc: '空态文本' },
      { name: 'empty-icon', type: 'string', default: "'lucide:inbox'", desc: '空态图标（内置 lucide 名，默认 lucide:inbox）' },
      { name: 'class', type: 'string', desc: '追加类名' },
    ],
    events: [
      { name: 'row-click', payload: '{ row }', desc: '行点击' },
      { name: 'page-change', payload: '{ page, pageSize }', desc: '翻页' },
      { name: 'sort', payload: '{ column, direction }', desc: '列排序' },
    ],
    code: {
      svelte: `<script>\n  import { DataTable } from '@alaikis/alaidesign';\n  const columns = [{ key: 'id', title: '订单号', sortable: true }];\n  const data = [{ id: 'SH-001' }];\n</script>\n<DataTable {columns} {data} onrow-click={onRowClick} />`,
      web: `<!-- columns/data/pagination 通过 property 赋值 -->
<alu-data-table id="dt" empty-text="暂无数据"></alu-data-table>
<script>
  const el = document.querySelector('#dt');
  el.columns = [{ key: 'id', title: '订单号', sortable: true }];
  el.data = [{ id: 'SH-001' }, { id: 'SH-002' }];
  el.pagination = { total: 2, pageSize: 10 };
  el.addEventListener('row-click', (e) => console.log(e.detail.row));
</script>`,
      vue: `<AluDataTable :columns="columns" :data="data" @row-click="onRowClick" @sort="onSort" />`,
      react: `<AluDataTable columns={columns} data={data} onRowClick={onRowClick} onSort={onSort} />`,
    },
  },
  {
    key: 'item',
    title: 'Item 列表项',
    description: '信息列表行，可携带媒体、标题、描述、操作。支持 outline 变体与 sm/lg 尺寸。由 Item + Group/Media/Header/Content/Title/Description/Footer/Actions/Separator 组合。',
    props: [
      { name: 'variant', type: "'default' | 'outline'", default: "'default'", desc: '变体' },
      { name: 'size', type: "'sm' | 'default' | 'lg'", default: "'default'", desc: '尺寸' },
      { name: 'class', type: 'string', desc: '追加类名' },
      { name: 'children', type: 'Snippet', desc: '列表项内容' },
    ],
    children: [
      { tag: 'alu-item-group', desc: '列表项容器' },
      { tag: 'alu-item-media', desc: '媒体（variant=default/icon/image）' },
      { tag: 'alu-item-header', desc: '头部' },
      { tag: 'alu-item-content', desc: '内容' },
      { tag: 'alu-item-title', desc: '标题' },
      { tag: 'alu-item-description', desc: '描述' },
      { tag: 'alu-item-footer', desc: '底部' },
      { tag: 'alu-item-actions', desc: '操作区' },
      { tag: 'alu-item-separator', desc: '分隔线' },
    ],
    code: {
      svelte: `<ItemGroup>\n  <Item variant="outline" size="sm">\n    <ItemMedia variant="icon" />\n    <ItemContent><ItemTitle>运单</ItemTitle><ItemDescription>UPS · 2.4kg</ItemDescription></ItemContent>\n    <ItemActions><Button size="sm" variant="ghost">查看</Button></ItemActions>\n  </Item>\n</ItemGroup>`,
      web: `<alu-item-group>
  <alu-item variant="outline" size="sm">
    <alu-item-media variant="icon"></alu-item-media>
    <alu-item-content><alu-item-title>运单</alu-item-title><alu-item-description>UPS · 2.4kg</alu-item-description></alu-item-content>
    <alu-item-actions><alu-button size="sm" variant="ghost">查看</alu-button></alu-item-actions>
  </alu-item>
</alu-item-group>`,
      vue: `<AluItemGroup>…</AluItemGroup>`,
      react: `<AluItemGroup>…</AluItemGroup>`,
    },
  },
  {
    key: 'skeleton',
    title: 'Skeleton 骨架屏',
    description: '加载占位，脉动动画。Skeleton 基础块 + SkeletonCard/SkeletonTable/SkeletonPage 组合形态。',
    props: [{ name: 'class', type: 'string', desc: '追加类名（控制宽高）' }],
    children: [
      { tag: 'alu-skeleton-card', desc: '卡片骨架（内部多 alu-skeleton）' },
      { tag: 'alu-skeleton-table', desc: '表格骨架（rows/cols 属性）' },
      { tag: 'alu-skeleton-page', desc: '页级骨架' },
    ],
    code: {
      svelte: `<Skeleton class="h-4 w-48" />`,
      web: `<alu-skeleton class="h-4 w-48"></alu-skeleton>`,
      vue: `<AluSkeleton class="h-4 w-48" />`,
      react: `<AluSkeleton className="h-4 w-48" />`,
    },
  },
  {
    key: 'search',
    title: 'SearchBar 搜索栏',
    description: '带清除与 350ms 防抖的搜索输入，支持 loading 态与回车触发。',
    props: [
      { name: 'value', type: 'string', desc: '搜索值（双向）' },
      { name: 'placeholder', type: 'string', default: "'Search...'", desc: '占位文本' },
      { name: 'clearable', type: 'boolean', default: 'true', desc: '是否显示清除按钮' },
      { name: 'loading', type: 'boolean', default: 'false', desc: '加载态（图标变 spinner）' },
      { name: 'class', type: 'string', desc: '追加类名' },
    ],
    events: [{ name: 'search', payload: '{ value: string }', desc: '输入（350ms 防抖）/ 回车 / 清除时触发' }],
    code: {
      svelte: `<script>\n  import { SearchBar } from '@alaikis/alaidesign';\n  let value = '';\n</script>\n<SearchBar bind:value placeholder="搜索运单号…" clearable />`,
      web: `<alu-search-bar placeholder="搜索运单号…" clearable loading="false"></alu-search-bar>
aluSearchBar.addEventListener('search', (e) => e.detail.value);`,
      vue: `<AluSearchBar v-model="value" placeholder="搜索运单号…" @search="onSearch" />`,
      react: `<AluSearchBar value={value} onChange={(v) => setValue(v)} placeholder="搜索运单号…" onSearch={onSearch} />`,
    },
  },

  // ==================== 高级 ====================
  {
    key: 'date-picker',
    title: 'DatePicker 日期选择',
    description: '日期输入 + 日历网格浮层。value 格式 YYYY-MM-DD，点击格子或修改输入更新，支持月份前后翻页。',
    props: [
      { name: 'value', type: 'string', desc: '日期值 YYYY-MM-DD（双向）' },
      { name: 'placeholder', type: 'string', default: "'YYYY-MM-DD'", desc: '占位文本' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
      { name: 'class', type: 'string', desc: '追加类名' },
    ],
    events: [{ name: 'value-change', payload: '{ value: DateValue }', desc: '日期变化' }],
    code: {
      svelte: `<script>\n  import { DatePicker } from '@alaikis/alaidesign';\n  let date = '2026-11-24';\n</script>\n<DatePicker bind:value placeholder="YYYY-MM-DD" />`,
      web: `<alu-date-picker placeholder="YYYY-MM-DD" value="2026-11-24"></alu-date-picker>
aluDatePicker.addEventListener('value-change', (e) => e.detail.value);`,
      vue: `<AluDatePicker v-model="date" placeholder="YYYY-MM-DD" />`,
      react: `<AluDatePicker value={date} onChange={(v) => setDate(v)} placeholder="YYYY-MM-DD" />`,
    },
  },
  {
    key: 'signature-pad',
    title: 'SignaturePad 签名板',
    description: 'canvas 手写签名，高 DPI 适配，支持鼠标/触控。暴露 getSignatureData()/clear()/isEmpty()。',
    props: [
      { name: 'width', type: 'number', default: '400', desc: '画布宽' },
      { name: 'height', type: 'number', default: '200', desc: '画布高' },
      { name: 'stroke-color', type: 'string', default: "'#000000'", desc: '笔迹颜色' },
      { name: 'stroke-width', type: 'number', default: '2', desc: '笔迹宽度' },
      { name: 'background-color', type: 'string', default: "'#ffffff'", desc: '背景色' },
      { name: 'placeholder', type: 'string', default: "'Sign here'", desc: '占位文本' },
    ],
    events: [{ name: 'change', payload: '{ dataUrl: string }', desc: '完成一次签名时触发' }],
    code: {
      svelte: `<script>\n  import SignaturePad from '@alaikis/alaidesign/SignaturePad.svelte';\n</script>\n<SignaturePad width={300} height={150} on:change={onSign} />`,
      web: `<alu-signature-pad width="300" height="150" placeholder="在此签名"></alu-signature-pad>
// 取值
signaturePad.getSignatureData(); // dataURL
signaturePad.clear();`,
      vue: `<AluSignaturePad :width="300" :height="150" @change="onSign" />`,
      react: `<AluSignaturePad width={300} height={150} onChange={onSign} />`,
    },
  },
  {
    key: 'page-header',
    title: 'PageHeader 页头',
    description: '页面标题区：图标 + 标题 + 描述 + 右侧操作 slot。',
    props: [
      { name: 'title', type: 'string', desc: '页面标题' },
      { name: 'description', type: 'string', desc: '描述' },
      { name: 'icon', type: 'string', desc: '图标名（内置 lucide 集合，如 lucide:package）' },
      { name: 'class', type: 'string', desc: '追加类名' },
    ],
    slots: [{ name: 'actions', desc: '右侧操作区（放 alu-button）' }],
    code: {
      svelte: `<PageHeader title="运单管理" description="创建、查询与管理" icon="lucide:package" />`,
      web: `<alu-page-header title="运单管理" description="创建、查询与管理" icon="lucide:package">
  <slot name="actions"><alu-button>新建</alu-button></slot>
</alu-page-header>`,
      vue: `<AluPageHeader title="运单管理" description="创建、查询与管理" icon="lucide:package" />`,
      react: `<AluPageHeader title="运单管理" description="创建、查询与管理" icon="lucide:package" />`,
    },
  },
  {
    key: 'form-field',
    title: 'FormField 表单项',
    description: '表单字段容器：label + 控件 slot + 辅助文本 / 错误文本。支持 required 星号、error 态。',
    props: [
      { name: 'label', type: 'string', desc: '标签文本' },
      { name: 'required', type: 'boolean', default: 'false', desc: '必填（label 加 * 号）' },
      { name: 'for', type: 'string', desc: 'label 关联的控件 id' },
      { name: 'helper-text', type: 'string', desc: '辅助说明（无 error 时显示）' },
      { name: 'error', type: 'string', desc: '错误信息（覆盖 helper-text）' },
      { name: 'class', type: 'string', desc: '追加类名' },
    ],
    slots: [{ name: 'default', desc: '控件（alu-input / alu-select 等）' }],
    code: {
      svelte: `<FormField label="运单号" required helper-text="用于查询轨迹">\n  <Input />\n</FormField>`,
      web: `<alu-form-field label="运单号" required for="tracking">
  <alu-input id="tracking" placeholder="如 3SABC123456789"></alu-input>
</alu-form-field>`,
      vue: `<AluFormField label="运单号" required><AluInput /></AluFormField>`,
      react: `<AluFormField label="运单号" required><AluInput /></AluFormField>`,
    },
  },
  {
    key: 'radio-group',
    title: 'RadioGroup 单选组',
    description: '单选按钮组。Web Components 用 options 属性传入 [{ value, label, disabled? }]。',
    props: [
      { name: 'options', type: 'Array<{ value: string; label: string; disabled?: boolean }>', desc: '选项（property 赋值）' },
      { name: 'value', type: 'string', desc: '当前选中值（双向）' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
      { name: 'class', type: 'string', desc: '追加类名' },
    ],
    events: [{ name: 'change', payload: '{ value: string }', desc: '选中值变化' }],
    code: {
      svelte: `<script>\n  import { RadioGroup, RadioGroupItem } from '@alaikis/alaidesign';\n  let v = 'a';\n</script>\n<RadioGroup bind:value={v}>\n  <RadioGroupItem value="a">A</RadioGroupItem>\n</RadioGroup>`,
      web: `<alu-radio-group id="rg" value="a"></alu-radio-group>
<script>
  const el = document.querySelector('#rg');
  el.options = [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }];
</script>`,
      vue: `<AluRadioGroup v-model="v" :options="options" />`,
      react: `<AluRadioGroup value={v} options={options} onChange={(e) => setV(e.detail.value)} />`,
    },
  },
  {
    key: 'skeleton-card',
    title: 'SkeletonCard 卡片骨架',
    description: '卡片形态的加载占位骨架。',
    props: [{ name: 'class', type: 'string', desc: '追加类名' }],
    code: {
      svelte: `<SkeletonCard />`,
      web: `<alu-skeleton-card></alu-skeleton-card>`,
      vue: `<AluSkeletonCard />`,
      react: `<AluSkeletonCard />`,
    },
  },
  {
    key: 'skeleton-table',
    title: 'SkeletonTable 表格骨架',
    description: '表格形态加载骨架，rows/cols 控制行数与列数。',
    props: [
      { name: 'rows', type: 'number', default: '5', desc: '行数' },
      { name: 'cols', type: 'number', default: '4', desc: '列数' },
      { name: 'class', type: 'string', desc: '追加类名' },
    ],
    code: {
      svelte: `<SkeletonTable rows={3} cols={5} />`,
      web: `<alu-skeleton-table rows="3" cols="5"></alu-skeleton-table>`,
      vue: `<AluSkeletonTable :rows="3" :cols="5" />`,
      react: `<AluSkeletonTable rows={3} cols={5} />`,
    },
  },
  {
    key: 'skeleton-page',
    title: 'SkeletonPage 页面骨架',
    description: '整页加载骨架：标题 + 段落行占位。',
    props: [{ name: 'class', type: 'string', desc: '追加类名' }],
    code: {
      svelte: `<SkeletonPage />`,
      web: `<alu-skeleton-page></alu-skeleton-page>`,
      vue: `<AluSkeletonPage />`,
      react: `<AluSkeletonPage />`,
    },
  },
  {
    key: 'table-actions',
    title: 'TableActions 表格操作区',
    description: '表格行内操作按钮容器，支持 align 对齐。',
    props: [{ name: 'align', type: "'start' | 'center' | 'end'", default: "'end'", desc: '对齐' }],
    code: {
      svelte: `<TableActions align="end"><Button size="icon" variant="ghost">…</Button></TableActions>`,
      web: `<alu-table-actions align="end"><alu-button variant="ghost">编辑</alu-button></alu-table-actions>`,
      vue: `<AluTableActions align="end">…</AluTableActions>`,
      react: `<AluTableActions align="end">…</AluTableActions>`,
    },
  },
  {
    key: 'table-caption',
    title: 'TableCaption 表格标题',
    description: '表格说明/标题（置于 table 内）。',
    props: [{ name: 'class', type: 'string', desc: '追加类名' }],
    code: {
      svelte: `<Table><TableCaption>共 4 条记录</TableCaption></Table>`,
      web: `<alu-table><alu-table-caption>共 4 条记录</alu-table-caption></alu-table>`,
      vue: `<AluTable><AluTableCaption>共 4 条记录</AluTableCaption></AluTable>`,
      react: `<AluTable><AluTableCaption>共 4 条记录</AluTableCaption></AluTable>`,
    },
  },
];
