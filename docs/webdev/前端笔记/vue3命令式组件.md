# Vue3命令式组件 -- 通知组件

# 组件结构

```text
@components
├─Message 
|    ├─index.js
|    ├─MesContainer.vue
|    └Message.vue
```


`MesContainer.vue` 制作一个组件可以包裹 `通知` 组件
```js
<template>
    <TransitionGroup name="list">
        <div id="MessageContainer" class="absolute top-0 left-0 m-4"></div>
    </TransitionGroup>
  
</template>
```


`Message.vue` 通知组件...
```js
<template>
  <div
    class="w-64 h-fit text-black text-sm bg-slate-200 p-2 mb-2 rounded-md shadow-md transition-all duration-500 ease"
    :class="[Animation]"
  >
    <p>通知...</p>
    <h1>{{ msg }}....</h1>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
const Animation = ref("animate-fade-in"); // 变量定义进入动画

const props = defineProps({
  msg: String,// 接收通知信息
  removeMessage: Function, //在 index.js 中 定义unmount方式
  duration: Number, // 消失时间
});

onMounted(() => {
  setTimeout(() => {
    Animation.value = "opacity-0 translate-y-2 scale-95";// 消息效果
  }, props.duration);
});


</script>

```

`index.js` 引用文件
```js

import MesContainer from "./MesContainer.vue";
import Message from "./Message.vue";
import { createApp ,ref} from "vue";

const count = ref(0) // 这个可以控制通知出现最大数


// 返回组件 和 组件包含的 open 方法
export default function MessagePlugin(option = {}) {
    console.log(option);
    
    const defaultOption = {
        position: 'top-right',
        duration: 2500,
        max: 3,
    }

    // 通知组件 命令式 
    Message.open = function (msg) {
        // 限制出现次数
        if(count.value > 3){
            return 
        }
        count.value++
        // 生成一个空的div给 通知组件 挂载
        const div = document.createElement('div');
        //找到 app.vue 中 个通知组件挂载的地方
        const container = document.querySelector('#MessageContainer');

        // createApp(components,props)
        const message = createApp(Message, {
            // 通知组件的props...
            msg,
            duration: option.duration - 500 || defaultOption.duration - 500,
            // 通知组件销毁方法 
            removeMessage: () => {
                container.removeChild(div);
                message.unmount(div);
            }
        });

        // app.vue中的 MesContainer.vue 添加 空的div
        container.appendChild(div);
        // 通知组件挂载到空的div上
        message.mount(div);
        // 定时销毁通知组件
        setTimeout(() => {
            container.removeChild(div);
            message.unmount(div);
            count.value--
        }, option.duration || defaultOption.duration);
    }
    //返回组件
    return {
        Message,
        MesContainer,
    }
}
```


## 使用方法
App.vue -> script
```js
<template>
  <MesContainer />
</template>
import MessagePlugin from "./components/Message/index.js";
const show = (msg) => {
  const msg = "hello world"
  Message.open(msg);
};
```
在其他组件应用也可以触发
只要把MesContainer放到`App.vue`就可以了
```js
<template>
    <div class=" border-t-2 border-gray-300">
    {{ store.count }}

    </div>
    <button @click="action"  >sub</button>
</template>

<script setup>
import useStore from "../store/index.js";
import MessagePlugin from "./Message/index.js";
const { Message, MesContainer } = MessagePlugin();
const store = useStore()

const action = () =>{
    store.countSub()
    const msg = `count: ${store.count.value}`
    Message.open(msg)
    
}

</script>
```



