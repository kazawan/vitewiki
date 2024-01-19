# :notebook: cron定时任务

## linux cron 命令
`crontab -e` : 修改定时启动列表
`crontab -l` : 查看定时列表
`service cron start` : 启动
`service cron restart` : 重启
`service cron status` : 检查状态
`service cron` : 查询cron可用的命令


>! :warning: 因为不知到为社么在ubuntu里面用指定版本python启动不了py脚本,所以用了shell脚本启动

>! :warning:建议使用sudo 执行
## 使用脚本启动py脚本
---
### 脚本
`python 脚本`
```python
import time
logtxt = open('./loglist.txt','+a')
time = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())) + '\n'
logtxt.write(time)
```
`启动脚本`
```shell
echo
#!/bin/bash
#dirname $0 为定位到脚本的根目录 其实不用绝对定位也可以
cd `dirname $0` || exit 1 
#绝对定位
/usr/bin/python3.11 /home/ubuntu/myshell/logtest.py
#相对定位
python3.11 ./logtest.py
```

### 执行
`添加到cron list`
执行命令`sudo crontab -e`
```sh
*/1 * * * * /home/ubuntu/myshell/logtest.sh
```

:warning: 在线crontab时间转换
[crontab时间计算](https://tool.lu/crontab/)

`:wq`保全退出

`sudo crobtab -l` 查看是否有在列表

如果定时不执行的话尝试`sudo service cron reload` | ` sudo service cron restart`


现在系统每隔1分钟就会在文件里面写入一个时间!


### 补充
使用git的时候需要把打印的信息保存
避免错误
```sh
/usr/bin/git pull >> ~/wk/gitlog.txt 
```

