# 🎈git-action 自动部署 vitpress 到 ecs服务器


## 🎉脚本

```yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@main # git 克隆到当前机器上
      - name: Use Node.js
        uses: actions/setup-node@v3 # 设置node环境
        with:
          node-version: 16.x # 指定版本
          cache: 'npm'
      - run: ls -a dist
      - name: Deploy
        uses: appleboy/scp-action@master # 使用ssh链接服务器
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USER }}
          password: ${{ secrets.PASSWORD }}
          port: ${{ secrets.PORT }}
          # script: ls -a
          source: 'dist/'
          target: '/home/ecs-user/vpwiki/dist'
    
```


## 🎇git action lib
::: tip scp action
   [scp-action](https://github.com/appleboy/scp-action)
:::
::: tip ssh action
   [ssh-action](https://github.com/appleboy/ssh-action)
:::

## 🎆格式

```yml
name: [workflow name]

on:
  # 监听动作 当push的时候执行action
  push:
    # 对哪个分支进行action
    branch: [分支]
    # 排除文件 
    paths-ignore:
      - '.gitignore'
      - 'package.json'    
  jobs:
    build:
      # 在ubuntu中进行
      runs-on: ubuntu-latest
        steps:
      - uses: actions/checkout@main # git 克隆到当前机器上
      - name: Use Node.js
        uses: actions/setup-node@v3 # 设置node环境
        with:
          node-version: 16.x # 指定版本
          cache: 'npm'
      - run: ls -a dist
      - name: Deploy
        uses: appleboy/scp-action@master # 使用ssh链接服务器
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USER }}
          password: ${{ secrets.PASSWORD }}
          port: ${{ secrets.PORT }}
          # script: ls -a
          source: 'dist/'
          target: '/home/ecs-user/vpwiki/'      

```

## 🎃仓库环境变量

::: tip 参考
[使用 Github Action 将静态页面发布到指定的服务器](https://www.jianshu.com/p/c26524472998)
:::
