# 🆗vitepress 使用 + 部署

::: info ㊙️文档
[https://vitepress.dev/](https://vitepress.dev/zh/)
:::

## 🔴vitepress 安装

安装

```sh
npm add -D vitepress
```

初始化(会产生额外的 example 文档)

```sh
npx vitepress init
```

项目结构

```md
.
├─ docs
│ ├─ .vitepress
│ │ └─ config.js
│ ├─ api-examples.md
│ ├─ markdown-examples.md
│ └─ index.md
└─ package.json
```

## 🟠 自定义主题方法

在`docs\.vitepress\` 下创建 `theme\index.js` 和 `theme\style.css\`

index.js

```js
import "./style.css";
import DefaultTheme from "vitepress/theme";

export default DefaultTheme;
```

style.css
chrome浏览器`F12`打开查看css路径
```css

#VPContent > div > div.VPHero.VPHomeHero > div > div > p.text {
  font-size: 2rem !important;
  background-image: linear-gradient(to right, orange, purple) !important;
  -webkit-background-clip: text;
  color: transparent !important;
}
```

## 🟡Auto SideBar 插件使用

未完..


