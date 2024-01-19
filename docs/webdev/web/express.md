# 🈵express 使用技巧
* [🖱️express快速开始](#🖱️快速开始)
* [⚙️express跨域办法 Cors使用](#⚙️跨域办法-cors使用)

## 🖱️快速开始
### ☕安装
```sh
npm install express --save
```

### 📝快速模板
生成app.js
```js
//app.js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
```
### 👨‍🌾启动
```sh
node app.js
```
### 🧲进程守护
安装pm2
```sh
pm2 start app.js --name app --watch
```
----

## ⚙️跨域办法 Cors使用

### 使用Cors
#### 🔨安装
```sh
npm install cors
```

#### ⛓️使用
```js
// const express = require('express')
// const app = express()

var cors = require('cors');
app.use(cors());
```
### 使用express api
```js
// const express = require('express')
// const app = express()
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

  