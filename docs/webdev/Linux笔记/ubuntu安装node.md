# nodejs npm install

## 腾讯云ubuntu22.04 安装node 方法

[NodeSource Node.js Binary Distributions](https://github.com/nodesource/distributions?tab=readme-ov-file#ubuntu-versions)


## apt 添加node仓库源
```sh
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
```

跟新完毕后 `sudo apt update`

## 安装 nodejs npm

```sh
sudo apt install nodejs
```

## 检查
`node --version` | `npm --version`


## 先更改镜像源
!> 更改请使用sudo
```sh
sudo npm config set registry https://registry.npm.taobao.org
```

## 升级npm
```sh
sudo npm install npm@latest -g
```
>! :warning:npm 安装请使用sudo

## 设置全局环境变量

先找到nodejs的位置 和npm modules的位置
```sh
which node
#我的安装位置出现在/usr/bin
npm root -g
#/usr/lib/node_modules
```
在/etc/profile || ~/.bashrc中配置
```sh
export NODE_HOME=/usr/bin
export NODE_PATH=/usr/lib/node_modules
export PATH=$NODE_HOME:$PATH
```
安装编译用包
```bash
apt-get install build-essential
```


## 一键安装脚本
```sh
#!/bin/bash
sudo apt update
sudo apt-get install build-essential -y
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt update
sudo apt install nodejs

sudo npm config set registry https://registry.npm.taobao.org
sudo npm install npm@latest -g
echo 'export NODE_HOME=$(which node)' >> ~/.bashrc
echo 'export NODE_PATH=$(npm root -g)' >> ~/.bashrc
echo 'export PATH=$NODE_HOME:$PATH' >> ~/.bashrc

source ~/.bashrc
```

