# 🌐 React 全局 useContext

## ⚙️ 编写hooks

```js
import { useContext, createContext } from "react";
import { useState, useMemo } from "react";

const FooContext = createContext();


export function useFoo() {
  return useContext(FooContext);
}

export function FooProvider({ children }) {
      const [bar,setBar] = useState('...')

      return (
        <FooProvider.Provider value={
          {
            bar,setBar // 全局的变量
          }
        }>

        </FooProvider.Provider>
      )
}

```

## 🛠️ 全局配置 
在`main.jsx`中添加`Provider`

```js
import { FooProvider } from './hooks/useFoo.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FooProvider>
      <App />
    </FooProvider>

  </StrictMode>,
)
```

## 🧩 组件中调用
```js
import { useFoo } from './hooks/useFoo.jsx'

const {bar,setBar} = useFoo()
```



