# NGINX 配置SSL HTTPS

## 443配置
在nginx中使用openssl是一个常见的选择，用于提供安全的数据传输和SSL/TLS加密。以下是在nginx中使用openssl的一些常见配置和使用方法：


1. 安装OpenSSL：
首先，确保你的系统上已经安装了OpenSSL。在大多数Linux发行版中，可以使用包管理器来安装OpenSSL。例如，在Ubuntu上可以使用以下命令安装：


```sql
sudo apt-get update
sudo apt-get install openssl
```
2. 生成SSL证书和私钥：
要使用SSL/TLS加密，你需要生成一个有效的SSL证书和私钥。你可以自己生成自签名的证书，或者从受信任的证书颁发机构（CA）获取证书。以下是使用openssl生成自签名证书的示例：


```bash
openssl req -x509 -newkey rsa:2048 -nodes -keyout ssl.key -out ssl.crt -days 365
```
这将生成一个名为`ssl.key`的私钥文件和一个名为`ssl.crt`的证书文件。
3. 配置Nginx：
在nginx的配置文件中，你需要将HTTPS协议设置为默认的监听协议，并为HTTP请求重定向到HTTPS。打开nginx的配置文件（通常位于`/etc/nginx/nginx.conf`或`/etc/nginx/conf.d/default.conf`），并进行如下修改：


```perl
http {
    # ...其他配置项...

    server {
        listen 80;
        listen [::]:80;
        server_name example.com;  # 替换为你的域名
        return 301 https://$host$request_uri;  # 重定向HTTP到HTTPS
    }

    server {
        listen 443 ssl http2;  # 监听HTTPS请求
        listen [::]:443 ssl http2;  # 监听HTTPS请求（IPv6）
        server_name example.com;  # 替换为你的域名

        ssl_certificate /path/to/ssl.crt;  # 指定SSL证书路径
        ssl_certificate_key /path/to/ssl.key;  # 指定私钥路径
        # ...其他配置项...
    }
}
```
确保将`/path/to/ssl.crt`和`/path/to/ssl.key`替换为你实际生成的证书和私钥文件的路径。此外，还需要将`server_name`替换为你的域名。
4. 检查配置并重启Nginx：
在完成配置更改后，确保检查nginx的配置文件是否正确无误，然后重新启动nginx以使更改生效。在终端中运行以下命令：


```shell
sudo nginx -t  # 检查配置语法是否正确
sudo service nginx restart  # 重新启动nginx服务
```
现在，你的nginx服务器应该已经配置好使用openssl提供安全的HTTPS服务了。

## 8080端口配置
要将Nginx的HTTPS服务修改为使用8080端口，你需要在配置文件中进行相应的更改。找到Nginx配置文件中与HTTPS相关的`server`块，然后进行以下修改：


```perl
server {
    listen 8080 ssl http2;  # 监听8080端口
    listen [::]:8080 ssl http2;  # 监听IPv6的8080端口
    server_name example.com;  # 替换为你的域名

    ssl_certificate /path/to/ssl.crt;  # 指定SSL证书路径
    ssl_certificate_key /path/to/ssl.key;  # 指定私钥路径

    # ...其他配置项...
}
```
将`listen`指令中的端口号`443`修改为`8080`，同时确保将`/path/to/ssl.crt`和`/path/to/ssl.key`替换为你实际的证书和私钥文件路径。保存配置文件后，重新启动Nginx服务：


```shell
sudo nginx -t  # 检查配置语法是否正确
sudo service nginx restart  # 重新启动nginx服务
```
现在，你的Nginx服务器将使用8080端口提供HTTPS服务。