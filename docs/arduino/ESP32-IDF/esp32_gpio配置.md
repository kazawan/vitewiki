# ESP32 GPIO 配置

:::tip 参考
[ESP32 学习笔记（2）——GPIO 接口使用](https://blog.csdn.net/qq_36347513/article/details/115691435)
:::

## 头文件
```c
#include "driver/gpio.h"
```


## 结构体

```c
gpio_config_t ioConfig = {
        .pin_bit_mask = 1ULL << 2, // 管脚2
        .mode = GPIO_MODE_OUTPUT, // 输出模式
        .pull_up_en = GPIO_PULLUP_DISABLE,// 取消上拉
        .pull_down_en = GPIO_PULLDOWN_DISABLE,// 取消下拉
        .intr_type = GPIO_INTR_DISABLE, // 禁止中断
};


```

## 初始化
```c
gpio_config(&ioConfig);
```

## 使用
```c
gpio_set_level(pin,1); // 参数 管脚 高低电平
```

