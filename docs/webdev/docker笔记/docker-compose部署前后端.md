# docker-compose 部署后端 Express + PostgreSql

## 组成

- express 服务器
- postgresql 数据库

## 项目结构

```tree
./compose #项目
|─server # 服务端
    |─app.js ## 服务器入口文件
    |─prisma ## 数据库orm
    |─Dockerfile ## server build配置文件
    |─.dockerignore ## 忽略不要上传的文件
    |─package.json
    |─.env ## 环境变量
|─db # 数据持久化
   |─pg-data #映射目录
|─docker-compose.yml 配置文件
|─package.json
```

## Express Dockerfile 配置

```docker
# 镜像名称
FROM node:20.11.1-slim
# 容器内部工作文件夹
WORKDIR /app
# 复制package.json
COPY package.json /app/package.json
# 下载依赖
RUN npm install
# 复制整个文件夹
# 已使用 .dockerignore 排除不需要上传的文件
COPY . .
# 安装prisma 提示升级这个
RUN apt-get update -y && apt-get install -y openssl
# 安装prisma
RUN npm i prisma -g
# 暴露 3000端口
EXPOSE 3000
# 容器启动时运行的命令
# !!! 有些命令需要等待数据完成才可以执行
CMD npx prisma generate && npm run start


```

#### `\` 换行符方法

```docker

CMD npm i \
    pm2-runtime start \
    pm2list
```
#### `;` 号方法
```docker
CMD npx prisma generate; npm run start
```

## 配置文件

```yml
# 版本号随意
version: "3.9"

services:
  # 安装postgres
  postgres:
    image: postgres:14-alpine
    # 暴露端口
    ports:
      - 15432:5432
    # 数据持久化
    volumes:
      - C:/Users/a/Documents/js/compose/db/pg-data:/var/lib/postgresql/data
    environment:
      - PGDATA=/var/lib/postgresql/data/pgdata # 实测这个不用也可以
      - POSTGRES_PASSWORD=00189423 # 用户密码
      - POSTGRES_USER=kazawan # 用户名
      - POSTGRES_DB=mydb # 数据库名字
    # 重启策略
    restart: unless-stopped
  server:
    # 容器名字
    container_name: server
    # 创建镜像
    build:
      # 目录
      context: server
      # dockerfile 具体名称
      dockerfile: Dockerfile
    # 暴露端口
    ports:
      - 3000:3000
    # 连接容器
    links:
      - postgres
    # 等待数据库部署完毕
    depends_on:
      - postgres
    # 环境变量
    environment:
      - DATABASE_URL=postgres://kazawan:00189423@postgres:5432/mydb
    # 重启策略
    restart: unless-stopped
```
