# 🈁Vue3读取yaml配文件

## 🈂️ 安装配置

::: tip 🔦 参考
[Transforms a YAML file into a JS object.](https://www.npmjs.com/package/@modyfi/vite-plugin-yaml)
:::

安装
```sh
npm i @modyfi/vite-plugin-yaml
```
配置vite.config.js
```js
// vite.config.js / vite.config.ts
import ViteYaml from '@modyfi/vite-plugin-yaml';

export default {
  plugins: [
    ViteYaml(), // you may configure the plugin by passing in an object with the options listed below
  ],
};
```

## 🏎️使用

src目录生成 `config.yaml`
```yaml
AppConfig: 
  title: "kazawan web"
  subtitle: "工具小站"

Service: 
  widget:
    - EmbyServer:
        title: EmbyServer
        hosts: 192.168.3.195
        ports: 8096
    - qbittorrent: 
        title: qbittorrent
        hosts: 192.168.3.195
        ports: 8080
  bookmark: 
    - baidu: 
        title: "百度搜索"
        url: "https://www.baidu.com"
        icon: "https://www.baidu.com/favicon.ico"
    - google: 
        title: "谷歌搜索"
        url: "https://www.Google.com.hk"
        icon: "https://www.Google.com.hk/favicon.ico"
```


`App.vue` 引入
```js 
<script setup>
import { ref, onMounted } from "vue";
import config from "./config.yaml";
const cards = ref(config);
console.log(cards.value);

</script>
```

