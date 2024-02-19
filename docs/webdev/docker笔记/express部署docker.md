# 🔮Express node应用 部署Docker Docker-compose

[🔨部署简单express-应用](#🔨部署简单express-应用)    
[✂️ .dockerignore 忽略文件](#✂️-dockerignore-忽略文件)     
[✂️Dockerfile](#✂️dockerfile)    
[⚙️docker-compose.yml](#⚙️docker-composeyml)  
[🔧启动](#🔧启动)



## 🔨部署简单express 应用

```js
const app = require('express')();

app.get('/',(req,res)=>{
    res.send({
        msg:"hello world"
    })
})

app.listen(3000, () => {    
    console.log('Server is running on http://localhost:3000');
});
```

## ✂️ .dockerignore 忽略文件
```sh
.git
.gitignore
node_modules/
.env
```

## ✂️Dockerfile
在项目 根 目录生成 `Dockerfile`
```Dockerfile
# 拉取镜像 node:20.11.1-slim 这个比较小 而且用apt 包管理
FROM node:20.11.1-slim
# 工作文件夹  根目录下 生成/app
WORKDIR /app
# 复制package
COPY package.json /app/package.json
# 下载依赖
RUN npm install
# 复制 整体文件夹
COPY . .

EXPOSE 3000

CMD npm start
```

## ⚙️docker-compose.yml
在项目 根 目录生成 `docker-compose.yml`
```yml
version: '1.1'
services:
  #容器
  server:
    #容器名称
    container_name: server
    build: .
    # 暴露 端口
    ports:
      - 3000:3000
    restart: unless-stopped
    # 环境变量
    # environment:
    #   - PORTS: 3000
    #   - JWT: ....
    # 依赖其他项目 例如数据库要先运行
    # depends_on:
    #   - postgres
    # 连接其他容器
    # links:
    #   - postgres
```

## 🔧启动
```sh
docker-compose up -d
```





