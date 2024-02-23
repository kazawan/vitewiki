# Auto-animation 使用

[Installation 文档](https://auto-animate.formkit.com/#installation)

## :hammer:安装/配置(nuxt)

```sh
npm install @formkit/auto-animate
```

`nuxt.config.ts`添加 modules

```js
modules: ["@formkit/auto-animate/nuxt"];
```

## :rocket:使用

### v-auto-animate 方法

* script
```js
const isopen = ref(false);
```
* template

````html
<UButton @click="isopen = !isopen">Toggle</UButton>
<div v-auto-animate class=" bg-slate-600">
  <div v-if="isopen">
    <span>HOME</span> | <span>ABOUT</span> | <span>CONTACT</span>
  </div>
</div>

````

### 可带参数方法
* script
```js
import { useAutoAnimate } from "@formkit/auto-animate/vue";
//divref =  <div ref="divref"></div>
const [divref] = useAutoAnimate(
    {
        duration:500,
        easing:"ease-in"
    }
)
```
* template
```html
<div ref="divref" class=" bg-slate-600">
  <div v-if="isopen">
    <span>HOME</span> | <span>ABOUT</span> | <span>CONTACT</span>
  </div>
</div>
```




