# Vue3使用TAILWINDCSS

## 💻安装

```sh
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

## 💼配置
```sh
npx tailwindcss init -p
```

## 📝创建tailwind.css
在`./src/assets/css/`创建`tailwind.css`
```css
@tailwind base; 
@tailwind components; 
@tailwind utilities;
```

##  🤯引入main.js
```js
// main.js
import "./assets/css/tailwind.css"
```

## 💼tailwind.config.js
```
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## 💯测试
```html
<template>
  <div class="bg-green-600 w-12 h-12">1</div>
</template>
```
出现绿色方框就代表成功啦～
