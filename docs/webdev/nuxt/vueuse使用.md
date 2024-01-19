# NUXT VUEUSE 使用

[:book:nuxt模组文档](https://nuxt.com/modules/vueuse)

## ⌨️安装
```sh
npm i @vueuse/nuxt
```
```js
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
  ],
})
```

## 💡测试

```js
//直接使用不用引入
//script
const { x , y } = useMouse()
//temlate
<p>{{ x }} : {{ y }}</p>
```
or...
```js
//template
<UseMouse v-slot="{ x, y }">
  x: {{ x }}
  y: {{ y }}
</UseMouse>
```
