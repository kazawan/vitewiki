# LVGL 添加触摸屏

::: tip 参考 LVGL 移植
[LVGL 移植](./lvgl移植esp32S3-ARDUINO.md)
:::

## 添加触摸屏驱动
::: warning 注意
我使用的是waveshare 触摸芯片 `CST328` 
找到提供的驱动文件 `Touch_CST328.h` `Touch_CST328.cpp` 放到 `lib` 文件夹下
:::


## `lv_port_indev` 配置

1. 在 `\lvgl\examples\porting` 下找到 `lv_port_indev_templ.c` 复制到 `lv_driver` 文件夹下 重命名为 `lv_port_indev.cpp`
2. 在 `\lvgl\examples\porting` 下找到 `lv_port_indev_templ.h` 复制到 `lv_driver` 文件夹下 重命名为 `lv_port_indev.h`

::: warning
由于把 `c` 改成 `cpp` ,删除了 `extern "C"` 就会报错
删除的部分
```c
#ifdef __cplusplus
extern "C" {
#endif
```
```c
#ifdef __cplusplus
} /* extern "C" */
```
:::

3. 在 `lv_port_indev.h` 添加头文件
```cpp
#include "lvgl.h"
#include "Touch_CST328.h"
```

4. 在 `lv_port_indev.cpp` 中修改 `#include "lv_port_indev_temp.h"` 为 `#include "lv_port_indev.h"`

5. 在 `touch_init()` 函数中添加 `CST328` 初始方法
```cpp
static void touchpad_init(void)
{
    /*Your code comes here*/
    Touch_Init();
}
```

6. 在 `touchpad_read()` 函数中添加 `CST328` 读取方法
官方的例子
```cpp
static void touchpad_read(lv_indev_drv_t *indev_drv, lv_indev_data_t *data)
{

    uint16_t touchpad_x[5] = {0};
    uint16_t touchpad_y[5] = {0};
    uint16_t strength[5] = {0};
    uint8_t touchpad_cnt = 0;
    Touch_Read_Data();
    uint8_t touchpad_pressed = Touch_Get_XY(touchpad_x, touchpad_y, strength, &touchpad_cnt, CST328_LCD_TOUCH_MAX_POINTS);
    if (touchpad_pressed && touchpad_cnt > 0)
    {
        data->point.x = touchpad_x[0];
        data->point.y = touchpad_y[0];
        data->state = LV_INDEV_STATE_PR;
        printf("LVGL  : X=%u Y=%u num=%d\r\n", touchpad_x[0], touchpad_y[0], touchpad_cnt);
    }
    else
    {
        data->state = LV_INDEV_STATE_REL;
    }
}
```

完成!










