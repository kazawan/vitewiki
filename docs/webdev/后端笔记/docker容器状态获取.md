# Docker容器状态获取

::: tip dockerode github 参考
[dockerode 参考](https://github.com/apocas/dockerode)
[Docker api参考](https://docs.docker.com/engine/api/latest/)
:::

## 安装
```sh
npm install dockerode
```

## 使用

::: warning
先开启 docker 远程连接 端口是 `2375`
:::
```js
var Docker = require('dockerode');
var docker = new Docker({ host: 'http://localhost', port: '2375' });

/**
 * docker.getContainer('container_id');
 */
var compose = docker.getContainer('460c9625e663d1bffa16c15c049aaeea83371762eaff08c3a505975b66bc4927');

compose.stats({ stream: true }, function (err, stream) {
    if (err) {
        console.log(err);
    } else {
        stream.on('data', function (chunk) {
            // console.log(JSON.parse(chunk.toString('utf8'),null,2));
            const data = JSON.parse(chunk.toString());
            const cpu_delta = data.cpu_stats.cpu_usage.total_usage - data.precpu_stats.cpu_usage.total_usage;
            const system_cpu_delta = data.cpu_stats.system_cpu_usage - data.precpu_stats.system_cpu_usage;
            const number_cpus = data.cpu_stats.online_cpus;
            const cpu_usage = (cpu_delta / system_cpu_delta) * number_cpus * 100;
            const used_memory = data.memory_stats.stats.cache / 1024 / 1024;
            const mem_limit = data.memory_stats.limit / 1024 / 1024/1024;
            const mem_usage_percent = (used_memory / mem_limit) * 100 + '%';

            console.log('CPU Usage: ' + cpu_usage.toFixed(2) + '%'  );
            console.log('Memory Usage: ' +  used_memory.toFixed(2) + 'MB' + '/'   + mem_limit.toFixed(2) + 'GB' + ' (' + mem_usage_percent + ')' );
            
           //可以用变量不断接收数据
           //非阻塞
            
        });
    }
});
```

