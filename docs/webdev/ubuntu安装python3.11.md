# ubuntu 安装python3.11

[🌐如何在Ubuntu22.04中安装python3.11How To Install Python 3.11 on Ubuntu, Debian and LinuxMint](https://www.linuxmi.com/python-3-11.htmlhttps://tecadmin.net/how-to-install-python-3-11-on-ubuntu/)

>! :warning:里面提供两种方法安装python

对于Ubuntu 22.04，Ubuntu20.04，Ubuntu 18.04 及其衍生版本，如 Linux Mint，有一个流行的 Deadsnakes PPA 维护Python 3.11以及其他Python版本的软件包。

注意：PPA 不支持 Ubuntu 22.10。您可以按照底部链接从源码压缩包构建它。
!> :warning:有的系统会提示缺少命令（command not found）
需要先安装软体包
[修復 Ubuntu 和 Debian 上的「add-apt-repository 指令找不到」錯誤](https://itsfoss.com/add-apt-repository-command-not-found/)
```sh
sudo apt-get install software-properties-common
```

```sh
sudo add-apt-repository ppa:deadsnakes/ppa
```

更新包管理器
```bash
sudo apt update
```

安装python3.11
```sh
sudo apt install python3.11 -y
```
`python3.11 -version` 检查是否安装成功

[:book:阮一峰*curl 的用法指南](https://www.ruanyifeng.com/blog/2019/09/curl-reference.html)

安装pip
```sh
curl -sS https://bootstrap.pypa.io/get-pip.py | python3.11 
```

使用pip下载包 检验是否可用
```sh
python3.11 -m pip install rich
#进入python3.11
python3.11 
#导入包
import rich
#如没有错误弹出表示成功
```
添加国内源
```sh
mkdir ~/.pip & vi ~/.pip/pip.conf 
```
:hammer:配置
```sh
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
[install]
trusted-host = https://pypi.tuna.tsinghua.edu.cn
```
最后命令检查
```sh
python3.11 -m pip config list
#global.index-url='https://pypi.tuna.tsinghua.edu.cn/simple'
#install.trusted-host='https://pypi.tuna.tsinghua.edu.cn'
```



## 脚本 一键安装
```sh
#!/bin/bash
clear
echo "INSTALL PYTHON3.11"
echo starting
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.11 -y
clear
echo "INSTALL PIP"
curl -sS https://bootstrap.pypa.io/get-pip.py | python3.11
##todo 添加国内源
clear
echo "PIP换源"
PIPCONF="~/.pip/pip.conf"
mkdir ~/.pip 
touch ~/.pip/pip.conf
echo "[global]" >> $PIPCONF
echo "index-url = https://pypi.tuna.tsinghua.edu.cn/simple" >> $PIPCONF
echo "[install]" >> $PIPCONF
echo "trusted-host = https://pypi.tuna.tsinghua.edu.cn" >> $PIPCONF
clear
echo "PIP源 ==>"
python3.11 -m pip config list

echo done
```

