# Sequelize 模型 

::: tip 参考
[sequelize 模型基础](https://www.sequelize.cn/core-concepts/model-basics)
:::
## 使用 `Sequelize.define`
```js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  // 在这里定义模型属性
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull 默认为 true
  }
}, {
  // 这是其他模型参数
});

// `sequelize.define` 会返回模型
console.log(User === sequelize.models.User); // true
```


## 使用扩展方法
::: tip
我比较喜欢这个方法
:::

```js
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class User extends Model {}

User.init({
  // 在这里定义模型属性
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull 默认为 true
  }
}, {
  // 这是其他模型参数
  sequelize, // 我们需要传递连接实例
  modelName: 'User' // 我们需要选择模型名称
  
});

// 定义的模型是类本身
console.log(User === sequelize.models.User); // true
```


## 同步模型到数据库

```js
sequelize.asyc({...option});
```
::: tip Option 参考  
   * [suquelize].sync() - 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
   * [suquelize].sync({ force: true }) - 将创建表,如果表已经存在,则将其首先删除
   * [suquelize].sync({ alter: true }) - 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.       
:::

至此数据库表生成了

## 删除表

删除与模型相关的表：
```js
await [model].drop();
console.log("用户表已删除!");
// 例: User.drop()
```
删除所有表：
```js
await [sequelize].drop();
console.log("所有表已删除!");
// 例: sequelize.drop()
```


