# 🈴React 笔记

- [ 目录 ]
  - [🈵React 状态管理 `useState()`](#🈵react-状态管理-usestate)      
  - [🔰 组件 Props 传递 `数据` 和 `方法` ](#🔰组件props-传递-数据-和-方法)     
  - [💱 元素 `"for"` 循环](#💱-元素-for-循环)      



::: warning 📛 注意
本笔记使用的函数式编程
:::

## 🈵React 状态管理 `useState()`

### 使用

在组件内部使用
::: tip ♻️ 配置格式
`const [ [ 数据变量 ],[ set数据变量 (驼峰式...) ] ] = useState([数据]) `
:::

```js
import { useState } from 'react'
export default App(){
    // 配置
    const [count, setCount] = useState(0)
    // 定义方法
    const add = () => {
        setCount = count + 1
    }
    // 渲染到试图
    return (
        <>
            <p> {count} </p>
            <button onClick={add}>Add</button>
        </>
    )

}
```

## 🔰 组件 Props 传递 `数据` `方法`

::: tips ♻️ 个人使用感受
使用结构方式比较明确
:::

### 数据传递

```js
function Child({ msg1, msg2 }) {
  return (
    <>
      <p>
        {" "}
        {msg1} {msg2}{" "}
      </p>
    </>
  );
}
// 如果分文件请import ...
function App() {
  return (
    <>
      <Child msg1="hello" msg2="world" />
    </>
  );
}

// 试图渲染出 hello world
```

### 方法传递

```js
function Child({ count, action }) {
  return (
    <>
      <p> 数据 : {count} </p>
      <button onClick={action}>点击</button>
    </>
  );
}
// 如果分文件请import ...
function App() {
  // 定义响应式数据
  const [count, setCount] = useState(0);
  // 定义方法
  const Add = () => {
    setCount = count + 1;
  };

  return (
    <>
      <Child count={count} action={Add} />
    </>
  );
}
```

::: tip 如果不使用结构方法

```js
function Child(props) {
  const count = props.count;
  const action = props.action;
  return (
    <>
      <p> 数据 : {count} </p>
      <button onClick={action}>点击</button>
    </>
  );
}
```

:::

## 💱 元素 `"for"` 循环

::: tip
类似 vue3 中的 `v-for`
:::

在组件函数里面执行

```js
function App() {
  // 定义数组
  const arr = [
    {
      id: 1,
      text: "hello",
    },
    {
      id: 2,
      text: "world",
    },
  ];
  // 使用map方法
  const arrList  = arr.map((item) => {
    return (
        <>
            <p key={item.id}> {item.text} </p>
        </>
    )
  })
  return (
    <>  
        <div> {arrList} </>
    </>
  )
}
```
