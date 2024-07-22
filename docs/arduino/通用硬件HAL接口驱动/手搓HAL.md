# 手搓通用MCU硬件接口

::: tip 提示
以按钮驱动作为演示
:::

## #1 硬件抽象层 结构体

`HAL_BTN.h`
```c
#ifndef HAL_BTN_H
#define HAL_BTN_H

enum
{
    IDLE = 0,
    PRESS,
    RELEASE
}KEY_STATE;

typedef struct 
{
    void (*init)(int pin); // 初始化方法
    int (*read)(int pin); // 读取管脚状态的方法
    unsigned long (*Get_millis)(void); // 获取定时器方法 以提供 不带阻塞的延时
    int pin; // 定义管脚
    int current_time; // 定时器
    int press_state; // 按键状态
   
}HardwareBtn_t; // 硬件结构体


void hardware_btn_init(HardwareBtn_t *btn,int pin); // 硬件初始化


#endif
```

`HAL_BTN_CONFIG.h`

```c
#ifndef HAL_BTN_CONFIG_H
#define HAL_BTN_CONFIG_H
#include "hal_btn.h"    

/*
根据结构体 定义接口方法
typedef struct 
{
    void (*init)(int pin); // 初始化方法
    int (*read)(int pin); // 读取管脚状态的方法
    unsigned long (*Get_millis)(void); // 获取定时器方法 以提供 不带阻塞的延时
    int pin; // 定义管脚
    int keyup; // 按键是否提起
    int current_time; // 定时器
    int press_state; // 按键状态
   
}HardwareBtn_t; // 硬件结构体

 */

/* INCLUDE */ // 把单片机的接口库带入
#include "driver/gpio.h" // 管脚接口
#include "Arduino.h" // 提取 millis 方法
/* CODE */


void btn_init(int pin) // gpio 初始化
{
    gpio_num_t BTN_PIN = (gpio_num_t)pin;
    gpio_config_t ioConfig = {
        .pin_bit_mask = 1ULL << BTN_PIN,            // 管脚2
        .mode = GPIO_MODE_INPUT,              // 输出模式
        .pull_up_en = GPIO_PULLUP_ENABLE,     // 取消上拉
        .pull_down_en = GPIO_PULLDOWN_DISABLE, // 取消下拉
        .intr_type = GPIO_INTR_DISABLE,        // 禁止中断
    };
    gpio_config(&ioConfig);
}


int btn_read(int pin) // 读取方法
{
    gpio_num_t BTN_PIN = (gpio_num_t)pin;
    return gpio_get_level(BTN_PIN);
}


unsigned long get_millis()  // 获取定时器
{
    return millis();
}   

void hardware_btn_init(HardwareBtn_t *btn,int pin) // 硬件抽象层初始化
{
    gpio_num_t BTN_PIN = (gpio_num_t)pin;   
    btn->read = btn_read;
    btn->init = btn_init;
    btn->press = btn_press;
    btn->release = btn_release; 
    btn->Get_millis = get_millis;
    btn->pin = BTN_PIN;
    btn->press_state = IDLE;
    btn->current_time = 0;  
    btn->init(pin);
}

#endif

```



## #2 应用层   

`BTN.h`   

::: tip 提示
因为我这是在`platformIO`下编写 要适配 `C++` 语言 所以要带上

```c
#ifdef __cplusplus 
extern "C" {
#endif
/* 代码在这里 */
#ifdef __cplusplus
}
#endif 

```
:::

```c
#ifndef     BTN_H
#define     BTN_H
#include "hal_btn.h"

#ifdef __cplusplus //方便在stm32 c语言下使用
extern "C" {
#endif
void btn_process(HardwareBtn_t *btn);   
void press(int pin);    
void btnrelease(int pin);


#ifdef __cplusplus
}
#endif  


#endif
```


`BTN.cpp`

::: warning 
此处函数和结构体有缺失 
请参考 [kaza_hal_button_driver/blob/main/button.cpp](https://github.com/kazawan/kaza_hal_button_driver/blob/main/button.cpp)
:::

```cpp
#include "btn.h"

void btn_process(HardwareBtn_t *btn)
{
    if (btn->read(btn->pin) == 0)
    {
        if (btn->Get_millis() - btn->current_time > 5)
        {
            if (btn->press_state == IDLE)
            {
                btn->press_state = PRESS;
                press(btn->pin); // 触发按下的函数  可以在main 编写函数
                // 如有多个按键,可以在外部写以个函数 以管脚做标记 触发按键动作
            }
            btn->current_time = btn->Get_millis();
        }
    }
    else
    {
        if (btn->press_state == PRESS)
        {
            btn->press_state = RELEASE;
            btnrelease(btn->pin); // 触发释放的函数  可以在main 编写函数
        }
        else
        {
            btn->press_state = IDLE;
        }
    }
}

```

## #3 使用


`MAIN.cpp`
```cpp
HardwareBtn_t btn;
HardwareBtn_t btn2;

void press(int pin)
{
  switch (pin)
  {
  case 5:
    printf("BTN1 Pressed!!!!\n");
    
    break;
  case 18:
    printf("BTN2 Pressed!!!\n");
    break;
  default:
    break;
  }
}
void btnrelease(int pin)
{
  switch (pin)
  {
  case 5:
    printf("BTN1 Release!!!!\n");
    break;
  case 18:
    printf("BTN2 Release!!!\n");
    break;
  default:
    break;
  }
}

void btn_scan(HardwareBtn_t *btn) // 多按键下 额外的方法 
{
  switch(btn->press_state)
  {
    case PRESS:
      printf("BTN Pressed\n");
      break;
    case RELEASE:
      printf("BTN Release\n");
      btn->press_state = IDLE;
      break;
    default:
      break;
  
  }
}
void setup()
{
  hardware_btn_init(&btn, 5);
  hardware_btn_init(&btn2, 18);
}

void loop()
{
  // flash_led(&led, 2000);
  btn_process(&btn);
  btn_process(&btn2);
  btn_scan(&btn);
  btn_scan(&btn2);
}


```


## 总结

此方法可以分开硬件和应用层,方便移植驱动

如使用stm32 开发的话 只需要修改 `HAL_BTN_CONFIG` 中的接口函数即可     
接口代码可能需要区分管脚的 `PORT` , 所有需要更新一下函数的传参 !!!




