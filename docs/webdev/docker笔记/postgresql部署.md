# 🗒️PostgreSql docker 部署

[⚙️拉取镜像](#⚙️拉取镜像)   
[🛠️docker-compose.yml](#🛠️docker-composeyml)    
[🔫启动](#🔫启动)   
[🔭postgresql 备份](#🔭postgresql-备份)   
[🔭postgresql 恢复](#🔭postgresql-恢复)   

## ⚙️拉取镜像
```sh
docker pull postgres
```


## 🛠️docker-compose.yml

::: tip 🔦参考
[知乎 - postgres数据库备份及导入,docker备份导出](https://zhuanlan.zhihu.com/p/97692526)
:::


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

## 🔫启动

```sh
docker-compose up -d
```

## 🔭postgresql 备份

::: tip 🔦参考
[知乎 - postgres数据库备份及导入,docker备份导出](https://zhuanlan.zhihu.com/p/97692526)
:::

### 登入docker容器



```sh
# 查看容器名字 我的容器名称为 compose-postgres-1
docker-compose ps 
```
```sh
# 进入容器 注意u为小写
docker exec -u root -it compose-postgres-1 /bin/bash
```
```sh
# pg_dump 备份 数据库 注意U为大写
# -U 数据库拥有者
# -d 数据库名字
# -h host
# -p ports
# -f 文件
pg_dump -U kazawan -d mydb -h localhost -p 5432 -f backup.sql
```
```sh
# 使用docker cp 复制文件备份出来
docker cp compose-postgres-1:/backup.sql .

```

备份完毕


## 🔭postgresql 恢复

```sh
# 复制备份文件到容器内
docker cp ./backup.sql compose-postgres-1:/
```

```sh
# 执行恢复
psql -U kazawan -d mydb -h localhost -p 5432 -f backup.sql
```

恢复成功
::: tip 🧰注意
prisma 需要重新generate 
```sh
npx prisma db pull
npx prisma generate
```
:::













