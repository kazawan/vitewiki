# 📝 Md-Editor-rt 学习

::: info  
ℹ️ [md-editor-rt@5.3.0](https://imzbf.github.io/md-editor-rt/zh-CN)  
:::

> 💡 需要配置 `const [text, setText] = useState('# Hello Editor');`

## 🔰 MdEditor 简单示例

```jsx
<MdEditor value={text} onChange={setText} />
```

## 🛠️ 比较有用的 `MdEditor props`

#### 👁️ `preview`

可以不出现预览

#### 🎨 `style`

```jsx
<MdEditor
  value={text}
  onChange={setText}
  style={{
    height: "200px",
    width: "100%",
    borderRadius: ".5rem",
    boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.5)",
    border: "2px solid rgb(104, 103, 103)",
  }}
/>
```

#### 🧰 `toolbars` `footers`
```jsx
<MdEditor value={text} onChange={setText}
    toolbars={[]} //数组空未不显示toolbars
    footers={[]} //数组空未不显示footers
/>
```

#### 🔗 `ref` 
```jsx

const EditorRef = useRef(null);
<MdEditor value={text} onChange={setText}
    ref={EditorRef} // 方便外部调用内部钩子
/>
```


#### 💬 `placeholder`
```jsx
placeholder='type something here...'
```

#### 🔧 自定义工具栏 `NormailToolbar`
```jsx
import { useCallback, useState } from 'react';
import { MdEditor, NormalToolbar, InsertContentGenerator } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

interface MyToolbarProps {
  insert?: (generator: InsertContentGenerator) => void;
}

/**
 * `insert`方法会由编辑器自动向组件的组件注入。
 */
const MyToolbar = ({ insert = () => {} }: MyToolbarProps) => {
  const onClick = useCallback(() => {
    insert((selectedText) => {
      /**
       * targetValue    待插入内容
       * select         插入后是否自动选中内容，默认：true
       * deviationStart 插入后选中内容鼠标开始位置，默认：0
       * deviationEnd   插入后选中内容鼠标结束位置，默认：0
       */
      return {
        targetValue: `==${selectedText}==`,
        select: true,
        deviationStart: 0,
        deviationEnd: 0,
      };
    });
  }, [insert]);

  return (
    <NormalToolbar title="mark" onClick={onClick} key="mark-toolbar">
      <svg className="md-editor-icon" aria-hidden="true">
        <use xlinkHref="#icon-mark"></use>
      </svg>
    </NormalToolbar>
  );
};

export default () => {
  const [value, setValue] = useState('');

  return (
    <MdEditor
      modelValue={value}
      id="md-prev"
      toolbars={['bold', 0, '=', 'github']}
      defToolbars={[<MyToolbar />]}
      onChange={setValue}
    />
  );
};
```

#### 👣 自定义底footer `NormalFooterToolbar`
```jsx
import { MdEditor, NormalFooterToolbar } from 'md-editor-rt';

const FooterTool = (props) => {
  return <NormalFooterToolbar>
    {/* ...
        放入svg 配置点击事件
     */}
  </NormalFooterToolbar>;
};

const footers = [0];
const defFooters = [<FooterTool key="key" />];

export default () => {
  return <MdEditor footers={footers} defFooters={defFooters} />;
};

```

#### 📋 `onGetCatalog` 

> [参考网页 -> onGetCatalog](https://imzbf.github.io/md-editor-rt/zh-CN/api#%F0%9F%97%92%20onGetCatalog) 

#### 📡 MdEditor 绑定事件
💾 保存

```jsx
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

const onSave = (v, h) => {
  console.log(v);

  h.then((html) => {
    console.log(html);
  });
};

export default () => <MdEditor onSave={onSave} />;
```


## 🐛 可能会发生的bug

#### 📋 有序和无序的 css style shixiao

添加 `css` 样式

```css
#md-editor-r1-preview > ul > li {
  list-style-type: disc;
}

#md-editor-r1-preview > ol > li {
  list-style-type: decimal;
}
```


