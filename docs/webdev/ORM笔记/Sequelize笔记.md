# Sequelize 笔记

:::tip 🔦 中文文档
[ 🗄️ Sequelize 中文文档](https://www.sequelize.cn/)
:::

## ⚙️安装
Sequelize 的使用可以通过 npm (或 yarn).
```sh
npm install --save sequelize
```
你还必须手动为所选数据库安装驱动程序：

#### 选择以下之一:
```
$ npm install --save pg pg-hstore # Postgres
$ npm install --save mysql2
$ npm install --save mariadb
$ npm install --save sqlite3
$ npm install --save tedious # Microsoft SQL Server
$ npm install --save oracledb # Oracle Database
```

## 🍻连接数据库

要连接到数据库,必须创建一个 Sequelize 实例. 这可以通过将连接参数分别传递到 Sequelize 构造函数或通过传递一个连接 URI 来完成：
```js
const { Sequelize } = require('sequelize');

// 方法 1: 传递一个连接 URI
const sequelize = new Sequelize('sqlite::memory:') // Sqlite 示例
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Postgres 示例

// 方法 2: 分别传递参数 (sqlite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite'
});

// 方法 3: 分别传递参数 (其它数据库)
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});
```
## 🔏测试连接

你可以使用 .authenticate() 函数测试连接是否正常：
```js
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
```


## sqlit连接
```js
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::DataBase.sqlite:");
```

## postgresql连接
```js
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') 
```

## 关闭数据库
```js
sequelize.close()
```


