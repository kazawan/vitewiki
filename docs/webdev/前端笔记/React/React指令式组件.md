# 🎷React指令式组件


::: tip 🎺参考
[🎛️createRoot(domNode, options?)](https://zh-hans.react.dev/reference/react-dom/client/createRoot#createroot)
:::

```js
import React from 'react'
import { createRoot } from 'react-dom/client';


// 会出现的页面 一般式绝对定位 全屏
// 组件接收 `closeAction` 和 `msg` 参数 
function NoticeBox({closeAction,msg}) {
    return (
        <>
            <div className='
                w-full
                h-full
                fixed
                top-0
                left-0
                flex
                justify-center
                items-center
                bg-black
                bg-opacity-50
                text-white
                text-2xl
                animate-fade-in 
            '
            onClick={closeAction}
            >
                NoticeBox....
                {msg}
            </div>
        </>

    )
}



导出的方法
export default function Notice() {
    // 生成div接住通知组件
    let div = document.createElement('div')

    // 定义删除的方法
    function close() {
        console.log('close')
        div.remove()

    }

    // 定义在页面可以用到的指令 Notice.show([string...])
    function show(msg) {
        document.body.appendChild(div)
        // 渲染组件到页面
        createRoot(div).render(<NoticeBox closeAction={close} msg={msg} />)
        // 定时关闭
        // setTimeout(() => {
        //     div.remove()
        // }, 2000)

    }



    return {
        show
    }
}
```
