# react vite mdx 学习笔记

> 主要使用版本

- react18
- tailwind v3
- vite 没有要求

[tailwind v3 安装](../vue3使用tailwindcss.md)

## 开始

```sh
npm install --save @mdxeditor/editor
```

```jsx
import { MDXEditor } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
```

> [getting-started#create-react-app](https://mdxeditor.dev/editor/docs/getting-started#create-react-app)

```jsx
import "@mdxeditor/editor/style.css";
import { MDXEditor, headingsPlugin } from "@mdxeditor/editor";

function App() {
  return <MDXEditor markdown={"# Hello World"} plugins={[headingsPlugin()]} />;
}

export default App;
```

## 配置工具

```jsx
/**
 * 主应用组件，实现带有多个插件的MDX编辑器
 *
 * 使用的插件包括：
 * - codeBlockPlugin: 启用代码块功能，默认使用JavaScript语言
 * - codeMirrorPlugin: 为代码块提供语法高亮支持(JS、CSS、Python和C语言)
 * - linkPlugin: 启用链接的创建和编辑功能
 * - linkDialogPlugin: 提供链接编辑的对话框界面
 * - headingsPlugin: 启用标题格式化
 * - quotePlugin: 启用块引用格式化
 * - listsPlugin: 启用有序和无序列表
 * - thematicBreakPlugin: 启用水平分割线插入
 * - tablePlugin: 启用表格的创建和编辑
 * - markdownShortcutPlugin: 启用markdown快捷方式（配置*号为斜体）
 * - frontmatterPlugin: 启用frontmatter元数据支持
 * - imagePlugin: 启用图片上传和插入，包含自定义上传处理
 * - toolbarPlugin: 提供工具栏，包含以下功能：
 *   - UndoRedo: 撤销/重做功能
 *   - BoldItalicUnderlineToggles: 文本格式化选项
 *   - CreateLink: 创建链接
 *   - InsertCodeBlock: 插入代码块
 *   - InsertTable: 插入表格
 *   - InsertImage: 插入图片
 *   - InsertThematicBreak: 插入水平分割线
 *   - InsertFrontmatter: 插入frontmatter
 *   - CopyButton: 自定义按钮用于复制编辑器内容
 *
 * @component
 * @returns {JSX.Element} 配置了插件和工具栏的MDX编辑器界面
 */
import {
  MDXEditor,
  ChangeCodeMirrorLanguage,
  ConditionalContents,
  InsertCodeBlock,
  codeBlockPlugin,
  codeMirrorPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  linkPlugin,
  linkDialogPlugin,
  headingsPlugin,
  quotePlugin,
  listsPlugin,
  thematicBreakPlugin,
  tablePlugin,
  InsertTable,
  markdownShortcutPlugin,
  InsertImage,
  InsertThematicBreak,
  InsertFrontmatter,
  frontmatterPlugin,
  imagePlugin,
  ButtonWithTooltip,
  CreateLink,
} from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";
```

## 编辑器配置

````jsx
<div className="p-4">
  <MDXEditor
    markdown={data}
    plugins={[
      codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
      codeMirrorPlugin({
        codeBlockLanguages: {
          js: "JavaScript",
          css: "CSS",
          python: "Python",
          c: "c",
        },
      }),
      linkPlugin(),
      linkDialogPlugin(),
      headingsPlugin(),
      quotePlugin(),
      listsPlugin(),
      thematicBreakPlugin(),
      tablePlugin(),
      markdownShortcutPlugin({
        shortcuts: {
          italic: { pattern: "*", replacement: "*" },
          codeBlock: { pattern: "```", replacement: "```" },
        },
      }),
      frontmatterPlugin(),
      imagePlugin({ imageUploadHandler }),

      toolbarPlugin({
        toolbarContents: () => (
          <>
            <UndoRedo />
            <BoldItalicUnderlineToggles />
            <CreateLink />
            <InsertCodeBlock />
            <InsertTable />
            <InsertImage />
            <InsertThematicBreak />
            <InsertFrontmatter />
            <CopyButton />
          </>
        ),
      }),
    ]}
  />
</div>
````
