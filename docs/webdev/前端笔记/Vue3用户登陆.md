# Vue3 用户登陆前后端

## 客户端配置

- [pinia 配置 Auth.js(登陆配置)](#authjs)
- [pinia 配置 User.js(用户配置)](#userjs)
- [router 路由卫士(before to form next) 中间件](#router路由卫士)

### Pinia 配置

#### `Auth.js`

```js
import { ref, computed } from "vue";
import { defineStore } from "pinia";
//路由..方便跳转
import router from "@/router/index.js";
//用户信息
import { useUser } from "@/stores/user";

export const useAuth = defineStore("auth", () => {
  const info = JSON.parse(localStorage.getItem("user"));
  //返回地址
  const returnUrl = ref("/");

  //登陆
  async function login(username, password) {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    }).then((res) => res.json());

    //后端返回的数据 200成功 401失败
    if (res.code == 200) {
      console.log(res.fakeUser);
      localStorage.setItem("user", JSON.stringify(res.fakeUser));
      router.push(returnUrl.value);
    } else {
      // console.log("login failed");
      alert("login failed");
    }
  }

  //登出
  function logout() {
    //删除本地存储
    localStorage.removeItem("user");
    //清除用户信息
    useUser().clearInfo();
    //跳转到登陆页
    router.push("/login");
  }

  return { info, returnUrl, login, logout };
});
```

#### `User.js`

```js
import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUser = defineStore("user", () => {
  const info = JSON.parse(localStorage.getItem("user"));
  function clearInfo() {
    info.value = null;
  }

  return {
    info,
    clearInfo,
  };
});
```

### router 路由卫士

`~/src/router/index.js/`

```js
//在export 前添加
router.beforeEach((to, from, next) => {
  const isLogin = JSON.parse(localStorage.getItem("user")) ? true : false;
  if (isLogin) {
    // 用户已登录
    if (to.path.toLowerCase() === "/login") {
      // 如果已登录且要前往登录页，重定向到主页
      next("/");
    } else {
      if (to.matched.length !== 0) {
        next();
      } else {
        next("/");
      }
    }
  } else {
    // 用户未登录，重定向到登录页
    if (to.path.toLowerCase() !== "/login") {
      alert("请先登录");
      next("/Login");
    }
    // 已在登录页，正常导航
    next();
  }
});
```

### 后端 prisma 配置获取用户信息验证登陆

#### `db.js`

配置 sqlite

```js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = prisma;
```

#### `findUser.js`

Prisma 查找用户

```js
const prisma = require("./db");
/**
 *
 * @param {用户名} username
 * @param {密码} password
 * @description 通过用户名和密码查找用户
 * @returns
 */
async function findUser(username, password) {
  const user = await prisma.user.findFirst({
    where: {
      name: username,
    },
  });

  if (user.password === password) {
    //虚假的token
    user.token =
      username + "tokenStr123445566123234253453453242jsdjsdfsdlsdjlfjs";
    console.log(user);
    return user;
  } else {
    return;
  }
}

module.exports = findUser;
```

### 后端 jwt 配置

#### 安装

```sh
 npm install jsonwebtoken express-jwt
```

#### 配置express-jwt
```js
const { expressjwt } = require("express-jwt");

app.use(
  expressjwt({ secret: key, algorithms: ["HS256"] }).unless({
    path: ["/login", "/register"],
  })
);
```

#### `jwt.js`

```js
const jwt = require("jsonwebtoken");

const key = "kazawan";

module.exports = {
  jwt,
  key,
};
```


#### 中间件验证是否登陆
```js
app.use((err, req, res, next) => {
  console.log(req.headers.authorization);
  if (err.name === "UnauthorizedError") {
    return res.send({
      code: 401,
      msg: "无效的token",
    });
  }
  res.send({
    code: 500,
    msg: "未知的错误",
  });
  next();
});
```


#### 创建token方法  
```js
const token = jwt.sign({ username }, key, { expiresIn: "1h" });
```



