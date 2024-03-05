# vue3-useStore 全局变量

## 配置 useStore

```js
import { ref } from "vue";
//放在useCount外面全局都能响应
const count = ref(0);

const useCount = () => {
  const countAdd = () => {
    count.value++;
  };
  const countSub = () => {
    count.value--;
  };

  return {
    count,
    countAdd,
    countSub,
  };
};

export default useCount;
```

## 使用

```js
<template>
  <div>
    {{ store.count }}
  </div>
</template>
import useStore from "./store/index.js";
const store = useStore();
store.countAdd();

```
