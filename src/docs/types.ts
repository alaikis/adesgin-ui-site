// AlaiDesign 官网组件文档数据结构（独立于渲染层，可被扩展/复用）
// 每个组件族一份文档：描述 + 属性表 + 事件表 + 插槽表 + 四框架代码 + 注意事项。

export interface ApiProp {
  /** 属性名（HTML 属性 / Svelte prop） */
  name: string;
  /** 类型 */
  type: string;
  /** 默认值 */
  default?: string;
  /** 说明 */
  desc: string;
}

export interface ApiEvent {
  /** 事件名 */
  name: string;
  /** payload 类型 */
  payload?: string;
  /** 说明 */
  desc: string;
}

export interface ApiSlot {
  /** 插槽名（default 省略） */
  name: string;
  /** 说明 */
  desc: string;
}

export interface ComponentDoc {
  /** 组件族 key（与官网路由 /components/<key> 对应） */
  key: string;
  /** 展示名（中文） */
  title: string;
  /** 描述段落（markdown 风格纯文本，可含 <code>） */
  description: string;
  /** 注意事项（可选） */
  notes?: string[];
  /** 主组件属性表 */
  props: ApiProp[];
  /** 事件表 */
  events?: ApiEvent[];
  /** 插槽表 */
  slots?: ApiSlot[];
  /** 子元素（复合组件的子元素 tag + 说明） */
  children?: Array<{ tag: string; desc: string }>;
  /** 四框架代码示例 */
  code: {
    svelte?: string;
    web?: string;
    vue?: string;
    react?: string;
  };
}
