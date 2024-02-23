# win/linux/mac ssh可以生成

## 1.安装git
省略...

## 2.设置git的user.name和user.email
```sh
git config --global user.name "xxx"
git config --global user.email "xx@xx.com"
```

## 3.生成ssh key
```sh
ssh-keygen -t rsa
```

## 4.查看key
```sh
cat ~/.ssh/id_rsa.pub
```
