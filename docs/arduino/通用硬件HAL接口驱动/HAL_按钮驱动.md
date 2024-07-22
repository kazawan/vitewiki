# 测试简易移植按键库

::: tip 地址
[测试简易移植按键库](https://github.com/kazawan/kaza_hal_button_driver)
:::

增加适配STM32 HAL

暂时只适配 arduino esp32

## 配置管脚 api

生成`button_config.h`

```c
#include "button.h"

void  btn_init(int pin)
{
    gpio_num_t gpio_num = (gpio_num_t)pin;
    gpio_config_t ioConfig = {
        .pin_bit_mask = 1ULL << gpio_num,
        .mode = GPIO_MODE_INPUT,
        .pull_up_en = GPIO_PULLUP_ENABLE,
        .pull_down_en = GPIO_PULLDOWN_DISABLE,
        .intr_type = GPIO_INTR_DISABLE,
    };
    gpio_config(&ioConfig);
}

int btn_read(int pin)
{
    gpio_num_t gpio_num = (gpio_num_t)pin;
    return gpio_get_level(gpio_num);
}

int get_millis()
{
    return millis();
}


void hardware_btn_init(HardwareBtn_t *btn,int pin)
{
    gpio_num_t gpio_num = (gpio_num_t)pin;
    btn->read = btn_read;
    btn->init = btn_init;
    btn->Get_millis = get_millis;
    btn->PIN = gpio_num;


    btn->CURRENT_TIME = 0;
    btn->RELEASE_CURRENT_TIME = 0;
    btn->PRESS_DEBOUNCE_TIME = 50; // 按下去抖时间
    btn->LONG_RELEASE_TIME = 2000; // 长按时长
    btn->HAVE_LONG_PRESS = true;
    btn->BUTTON_STATE = IDLE;
    btn->KEY_UP = 1;

    #if useSTM32 == 0
    btn->init(pin);
    #endif

}

```

## 使用

`main.cpp`

配置 `button_process(HardwareBtn_t *btn)` 函数

```c
void button_process(HardwareBtn_t *btn)
{
  {
    switch (btn->PIN)
    {
    case button1:
      key_opt_state(&btn1); // 按键1处理逻辑
      break;
    case button2:
      key_opt2_state(&btn2); // 按键2处理逻辑
      break;
    }
  }
}
```

## 初始化方法

先抽象按键

```c
HardwareBtn_t btn1 ;
```

### 第一种



```c
  btn1.init = btn_init;   // 初始化
  btn1.read = btn_read;  // 读取按键状态
  btn1.Get_millis =get_millis; // 获取时间
  btn1.PIN = button1; // 按键引脚
  btn1.KEY_UP = 1; // 按键状态
  btn1.CURRENT_TIME = 0; // 按下时定时器
  btn1.RELEASE_CURRENT_TIME = 0; // 抬起时定时器
  btn1.PRESS_DEBOUNCE_TIME = 50; // 按下去抖时间
  btn1.LONG_RELEASE_TIME = 2000; // 长按时长
  btn1.HAVE_LONG_PRESS = false; // 是否有长按
  btn1.BUTTON_STATE = IDLE; // 按键状态
  btn1.init(button1); // 初始化按键

```

### 第二种

在`button_config.h` 配置 `void hardware_btn_init(HardwareBtn_t *btn,int pin)` 函数

```c

void hardware_btn_init(HardwareBtn_t *btn,int pin)
{
    gpio_num_t gpio_num = (gpio_num_t)pin; // 类型转换
    btn->read = btn_read; // 读取函数
    btn->init = btn_init; // 初始化函数
    btn->Get_millis = get_millis;  // 获取时间函数
    btn->PIN = gpio_num; // 管脚


    btn->CURRENT_TIME = 0; // 按下时定时器
    btn->RELEASE_CURRENT_TIME = 0; // 抬起时定时器
    btn->PRESS_DEBOUNCE_TIME = 50; // 按下去抖时间
    btn->LONG_RELEASE_TIME = 2000; // 长按时长
    btn->HAVE_LONG_PRESS = true; // 是否有长按
    btn->BUTTON_STATE = IDLE; // 按键状态
    btn->KEY_UP = 1; // 按键状态

    #if useSTM32 == 0
    btn->init(pin); // 初始化
    #endif

}
```

## 使用

```c
  button_scan(&btn1);
  button_process(&btn1);

```

## `button.h`
```c
#ifndef BUTTON_H
#define BUTTON_H


//! 选择模式 here  
// STM32 使用cubuxMX 不用配置init方法
// Arduino 使用Arduino.h
// ESP32 配置 driver/gpio.h
// 选择模式
#define useArduino 1    
#define useSTM32 0 
#define useESP32 1
//! Include here
#if useArduino  
#include <Arduino.h>
#endif

#if useSTM32
#include "stm32f1xx_hal.h"
#endif

#if useESP32
#include "driver/gpio.h"
#endif



// enum KEY_STATE
enum
{
    IDLE = 0,
    PRESS,
    RELEASE,
    LONG_RELEASE
}KEY_STATE;



typedef struct 
{
    void (*init)(int pin);
    #if useSTM32 
        int (*read)(GPIO_TypeDef PROT ,uint16_t gpio_pin);
    #endif
    #if useESP32 
        int (*read)(int pin);
    
    #endif
    // int (*read)(int pin);
    int (*Get_millis)(void);
    int PIN;
    int KEY_UP;
    int CURRENT_TIME;// 按下时定时器
    int PRESS_DEBOUNCE_TIME; // 按下去抖时间
    int RELEASE_CURRENT_TIME;    // 抬起时定时器
    int LONG_RELEASE_TIME;    // 长按时长
    bool HAVE_LONG_PRESS;
    int BUTTON_STATE;
   
}HardwareBtn_t;


#ifdef __cplusplus
extern "C" {
#endif
void hardware_btn_init(HardwareBtn_t *btn,int pin);
void button_scan(HardwareBtn_t *btn);   // 按键扫描
void button_process(HardwareBtn_t *btn);    // 按键处理逻辑



#ifdef __cplusplus
}
#endif


#endif // BUTTON_H
```

## `button.cpp`
```cpp
#include "button.h"


void button_scan(HardwareBtn_t *btn)
{
    if (btn->read(btn->PIN) == 0 && btn->KEY_UP == 1)
    {
        if (btn->Get_millis() - btn->CURRENT_TIME > btn->PRESS_DEBOUNCE_TIME)
        {
            if (btn->BUTTON_STATE == IDLE)
            {
                btn->BUTTON_STATE = PRESS;
                btn->KEY_UP = 0;
                btn->RELEASE_CURRENT_TIME = btn->Get_millis();
            }
        }
    }
    else if (btn->read(btn->PIN) == 1 && btn->KEY_UP == 0)
    {
        if (btn->BUTTON_STATE == PRESS)
        {
            if (btn->Get_millis() - btn->RELEASE_CURRENT_TIME > btn->LONG_RELEASE_TIME && btn->HAVE_LONG_PRESS == true)
            {
                btn->BUTTON_STATE = LONG_RELEASE;
                btn->KEY_UP = 1;
                btn->CURRENT_TIME = btn->Get_millis();
                
            }else if(btn->Get_millis() - btn->RELEASE_CURRENT_TIME >btn -> PRESS_DEBOUNCE_TIME)
            {
                btn->BUTTON_STATE = RELEASE;
                btn->KEY_UP = 1;
                btn->CURRENT_TIME = btn->Get_millis();
            }   
        }

    }
}

```