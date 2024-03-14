# React 路由 

::: tip ♻️ 参考
注意式v6
[react router v6 中文文档](https://www.reactrouter.cn/)
:::


## Ⓜ️安装

```sh
$ npm install react-router-dom@6
```

## 🈁使用

主要用到 `BrowserRouter`, `Routes`, `Route`,`Outlet`, `Navigate`,`Link`

 - `BrowserRouter` 用于包括路由 但凡要用的页面转换的都要用到
 - `Routes` 相当于vue3 的 `routerView`
 - `Route` 具体路由配置
 - `Outlet` 占位符
 - `Navigate` 相当于返回path的页面
 - `Link`  \<a> 标签
  
## ❇️配置路由

```js
const Main = () => {
    return (
      <>
        
        <BrowserRouter>
          <Navibar  />
          <Routes>
            <Route  path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />}  />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </>
    )
  }
```

## 🔱`Link`配置按钮

```js
import { Outlet, Link } from "react-router-dom";
import { useAuth ,AuthContext} from "../stores/useAuth.jsx";
function Navibar() {

    // 权鉴系列
    const {auth,setAuth} = useAuth()
    const handleLogAction = () =>{
        setAuth(!auth)
    }

    const loginStyle = `
        ${auth ? 'bg-green-500' : 'bg-red-500'}
        col-span-9 
    `

    return (
        <>
            <div className="w-full h-16 bg-gray-200/30 px-2 fixed top-0 left-0  backdrop-blur-sm ">
                <div className=" w-full grid  grid-cols-12 gap-x-2 ">
                    <div className=" col-span-1 ">
                        <Link to='/'>Home</Link>

                    </div>
                    <div className=" col-span-1 ">
                        <Link to='/about'>About</Link>
                    </div>
                    <div className=" col-span-1 ">
                        <button onClick={handleLogAction}>LOGIN??</button>
                    </div>
                    <div className={loginStyle}>
                        <div className=" w-full text-end">{auth ? '登陆了' : '未登陆'}</div>
                    </div>
                </div>

                {/* <div>About</div> */}
            </div>
            <Outlet />
        </>

    );
}

export default Navibar;


```



## 🔰简单的权鉴定
例如 About 页需要登陆才能看
假如没有登陆,就会回到主页

```js
import { Outlet, Navigate } from "react-router-dom";
import { useAuth ,AuthContext} from "../stores/useAuth.jsx";
import AuthProvider from "../components/AuthProvider.jsx";

function AboutPage() {
    const {auth} = useAuth()
    return (
        <AuthProvider auth={auth}>
            <div className=" w-full text-sm ">
                <h1>About...</h1>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas temporibus ea nam saepe nihil expedita distinctio dignissimos, animi tempore placeat ducimus sint reiciendis. Rerum consequatur dolores mollitia reprehenderit veniam? Sunt.
            </div>
            <Outlet />
        </AuthProvider>
    )
    //  ⭕我把下面的打包成 <AuthProvider>
    // if (auth) {
    //     return (
    //         <>
    //             <div className=" w-full text-sm ">
    //                 <h1>About...</h1>
    //                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas temporibus ea nam saepe nihil expedita distinctio dignissimos, animi tempore placeat ducimus sint reiciendis. Rerum consequatur dolores mollitia reprehenderit veniam? Sunt.
    //             </div>
    //             {/* <Outlet /> */}
    //         </>
    //     )
    // } else {
    //     return <Navigate to='/' />
    // }


}


export default AboutPage
```



