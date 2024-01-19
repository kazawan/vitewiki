# Ubuntu 安装 nginx

[:link:参考-如何在 Ubuntu 20.04 上安装 Nginx](https://zhuanlan.zhihu.com/p/138007915?utm_id=0)

## 1.准备

在继续之前，保证以 sudo 用户身份登录，并且你不能运行 Apache 或者 其他处理进程在80端口和443端口。

## 2.安装
Nginx 在默认的 Ubuntu 源仓库中可用。想要安装它，运行下面的命令：
```sh
sudo apt update
sudo apt install nginx
```
一旦安装完成，Nginx 将会自动被启动。你可以运行下面的命令来验证它
```sh
sudo systemctl status nginx
```
输出类似下面这样：
```sh
● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
     Active: active (running) since Sat 2020-05-02 20:25:43 UTC; 13s ago
...
```
## 3.配置防火墙(疼讯云,阿里云有外部防火墙)
```sh
sudo ufw allow 'Nginx Full'
```
验证
```sh
sudo ufw status
```
输出将会像下面这样：
```sh
Status: active

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW       Anywhere
Nginx Full                 ALLOW       Anywhere
22/tcp (v6)                ALLOW       Anywhere (v6)
Nginx Full (v6)            ALLOW       Anywhere (v6)
```

## 获取conf路劲
```sh
#注意大写
nginx -V
```
输出
```sh
nginx version: nginx/1.18.0 (Ubuntu)
built with OpenSSL 3.0.2 15 Mar 2022
TLS SNI support enabled
configure arguments: --with-cc-opt='-g -O2 -ffile-prefix-map=/build/nginx-zctdR4/nginx-1.18.0=. -flto=auto -ffat-lto-objects -flto=auto -ffat-lto-objects -fstack-protector-strong -Wformat -Werror=format-security -fPIC -Wdate-time -D_FORTIFY_SOURCE=2' --with-ld-opt='-Wl,-Bsymbolic-functions -flto=auto -ffat-lto-objects -flto=auto -Wl,-z,relro -Wl,-z,now -fPIC' --prefix=/usr/share/nginx --conf-path=/etc/nginx/nginx.conf --http-log-path=/var/log/nginx/access.log --error-log-path=/var/log/nginx/error.log --lock-path=/var/lock/nginx.lock --pid-path=/run/nginx.pid --modules-path=/usr/lib/nginx/modules --http-client-body-temp-path=/var/lib/nginx/body --http-fastcgi-temp-path=/var/lib/nginx/fastcgi --http-proxy-temp-path=/var/lib/nginx/proxy --http-scgi-temp-path=/var/lib/nginx/scgi --http-uwsgi-temp-path=/var/lib/nginx/uwsgi --with-compat --with-debug --with-pcre-jit --with-http_ssl_module --with-http_stub_status_module --with-http_realip_module --with-http_auth_request_module --with-http_v2_module --with-http_dav_module --with-http_slice_module --with-threads --add-dynamic-module=/build/nginx-zctdR4/nginx-1.18.0/debian/modules/http-geoip2 --with-http_addition_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_sub_module
```

## nginx 命令 (补充)
