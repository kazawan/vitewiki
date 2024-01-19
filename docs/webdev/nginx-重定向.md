# :fu:NGINX 重定向

## :rocket: https ssl配置
```sh
	server{

		listen 8080 ssl ;
		listen [::]:8080 ssl ;
		server_name [YOUR DOMAIN];
		root /home/ubuntu/wk/;
		index index.html;
		ssl_certificate		/home/sshkey/ssl.crt;
		ssl_certificate_key /home/sshkey/ssl.key;
	}
```

## :rainbow:http 配置

?> 未学会同一个端口重定向,先使用80端口带url执行

> domain/doc -> domain:8080

```bash
	server{
		listen 80;
		server_name _;
		location /doc {
			return 301 https://[YOUR DOMAIN]:8080;

		}
	}
```

!> 如何测试中不正常,建议清空浏览器缓存再测试!!!
