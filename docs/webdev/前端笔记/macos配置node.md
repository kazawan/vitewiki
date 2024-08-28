# MACOS配置nodejs

## 安装home brew
::: tip 参考
[M1 芯片 Mac 上 Homebrew 安装](https://brew.idayer.com/guide/m1/)
:::

## 安装git
::: tip
```sh
brew install git
```
:::

## 安装vscode

在vscode里面配置git
安装各种插件。。。

## 安装nodejs

::: tip 官网
[nodejs](https://nodejs.org/zh-cn)
:::

## 添加环境变量

```sh
vi .zprofile
```

添加
```
export PATH=$PATH:/usr/local/bin/
```


## npm 换源

```sh
npm config set registry https://registry.npmmirror.com/
```

其他镜像
直接设置淘宝镜像：npm config set registry https://registry.npmmirror.com
还原npm源：npm config set registry https://registry.npmjs.org/
cnpm别名设置：npm install -g cnpm --registry=https://registry.npmmirror.com


