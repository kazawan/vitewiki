# 创建docker镜像



::: tip
在本地测试好的项目，需要将项目打包成镜像，然后上传到docker仓库。
在服务器下载镜像
挂载好数据库实现持久化
使用 `1panel` 升级镜像 达到一键升级 方便修改
:::


## 创建镜像
```sh
docker build -t 镜像名称:版本号.
```

## 上传镜像
```sh
docker push 镜像名称:版本号.
```



## 下载镜像
```sh
docker pull 镜像名称:版本号.
```


## 其他命令
 查看镜像
```sh
docker images
```

 删除镜像
```sh
docker rmi 镜像名称:版本号.
```