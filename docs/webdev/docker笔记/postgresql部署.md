# PostgreSql docker 部署

## 拉取镜像
```sh
docker pull postgres
```

## docker-compose.yml

```yml
version: '3.9'

services:
  postgres:
    image: postgres:14-alpine 
    ports:
      - 5432:5432
    volumes:
      - ~/apps/postgres:/var/lib/postgresql/data
      #windows 需要绝对路径
    environment:
        #密码
      - POSTGRES_PASSWORD=S3cret 
        #用户
      - POSTGRES_USER=citizix_user
        #数据库名字
      - POSTGRES_DB=citizix_db
```

## 启动

```sh
docker-compose up -d
```




