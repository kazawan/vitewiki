# lvgl 实体按键移植

::: warning 
这个是实体按键使用编码器方式操作
分别要使用3个按键
NEXT,PREV,ENTER
:::

## `lv_port_indev` 文件

复制 `lvgl/examples/porting` 下的 `lv_port_indev_template.c` 和 `lv_port_indev_template.h` 到 `lib` 目录下

## 修改 `lv_port_indev.h` 文件 `#include`
`#if 0` 改为 `#if 1`

```c
#include "lvgl.h"
#include "Arduino.h" // 使用arduino 所以使用这个头文件
#include "driver/gpio.h" // 使用esp32 所以使用这个头文件
#include "button.h" // 使用实体按键所以使用这个头文件
```

把 `#ifdef cplusplus` 所有相关删掉


## 修改 `lv_port_indev.c` 文件

`#if 0` 改为 `#if 1`


修改文件名 `lv_port_indev.c` 为 `lv_port_indev.cpp`

保留编码器相关的部分 其他部分删掉
```cpp
static void encoder_init(void);
static void encoder_read(lv_indev_drv_t *indev_drv, lv_indev_data_t *data);
static void encoder_handler(void);

lv_indev_t *indev_encoder;

static int32_t encoder_diff; // 编码器差值
static lv_indev_state_t encoder_state; // 状态

```

## `encoder_init` 
添加你自己的初始化方法 


## `encoder_read` 部分说明

```cpp

static int16_t encoder_value = 0; // 编码器值
static uint32_t last_encoder_value = 0; // 上次编码器值
static void encoder_read(lv_indev_drv_t *indev_drv, lv_indev_data_t *data)
{
    // gpio_num_t gpio_num = (gpio_num_t)NEXT_BTN;
    // if(gpio_get_level(gpio_num) != 1)
    // {
    //    encoder_value--;
    // }
    // data->enc_diff = encoder_value - last_encoder_value;
    // last_encoder_value = encoder_value;

    button_scan(&NEXT_BTN_OBJ); // 使用实体按键扫描
    int keyState = btn_State(&NEXT_BTN_OBJ); // 获取实体按键状态
    if (keyState == RELEASE ) // 松开
    {
        encoder_value--; // 编码器值减一
        NEXT_BTN_OBJ.BUTTON_STATE = IDLE; // 实体按键状态置为空闲
    }else{
        encoder_value += 0; // 编码器值不变
    }

    // 模拟编码器旋转 1格
    data->enc_diff = encoder_value - last_encoder_value; // 编码器差值
    last_encoder_value = encoder_value; // 编码器值赋值给编码器值
}
```

`data->enc_diff` 是编码器差值 按下按键后模拟的是编码器旋转1格 





