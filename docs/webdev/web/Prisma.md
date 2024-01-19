# 📒Prisma学习笔记


| ⚗️参考   |
| :--- |
[ 🧫 Prisma 中文文档](https://prisma.yoga/)
[🧪 sqlite-使用](#🧪sqlite-使用)
[👾 SQL-使用](#👾sql-使用)





---
##  ⚙️安装/配置

```sh
npm install --save-dev prisma
npm install @prisma/client
```

```sh
npx prisma init
```


---
## 🧪SQLite 使用
---
### 🥼配置文件

`schema.prisma`
```js
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```
---
### 🦠model表


```js
model user {
  id   Int    @id @default(autoincrement())
  name String
}
```
---
### 🧲生成客户端

```js
npx prisma generate
```


---
### 🛰️上传配置

```js
npx prisma db push
```
---
### 🧐在其他项目使用db数据
* 先安装prisma依赖
* [安装](#⚙️安装配置)
* 把`dev.db`文件 复制到项目下的`prisma`文件夹下
* 根目录输入
```sh
npx prisma db pull
```
* 再次生成客户端
```sh
npx prisma generate
```
* 现在可以使用db里面的数据了

---
### 🧬Prisma studio
方便插入删除检查数据
```sh
npx prisma studio
```

---
## 👾SQL 使用

---
### 🌌配置文件
`.env`文件
```js
DATABASE_URL="mysql://[数据库用户名]:[数据密码]@[SERVER..IP]:[端口:默认3306]/[服务器生成的表]"
```
`schema.prisma`文件
```js
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

快速生成sql配置文件
```sh
npx prisma init  --url mysql://[数据库用户名]:[数据密码]@[SERVER..IP]:[端口:默认3306]/[服务器生成的表]
```
---
### 🧪生成表
```js
model user {
  id   Int    @id @default(autoincrement())
  name String
}
```
push!
```sh
npx prisma db push
```

---
### 🧲拉取schema

> 建议先在服务器创建好数据库 ☢️建议使用1panel
```sh
//如何已经有表
npx prisma db pull
```
---
### 🛰️生成客户端

```sh
npx prisma generate
```

---
## 🧠Prisma Client
---
### ☄️引入
```js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
```

### 📡CRUD

懒狗看文档吧
[ 🔎 Prisma CRUD 增删改查](https://prisma.yoga/concepts/components/prisma-client/crud)

















