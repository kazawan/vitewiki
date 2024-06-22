# ESP32 计数器编码器 PCNT

::: warning 
基于Arduino
:::


::: tip 参考
[怎样去使用ESP32的PCNT（脉冲计数器）模块呢](https://bbs.elecfans.com/jishu_2240684_1_1.html)
:::

::: tip idf 方法
[esp-idf rotary_encoder](https://github.com/espressif/esp-idf/tree/master/examples/peripherals/pcnt/rotary_encoder)
:::


## 配置

```c

#include "driver/pcnt.h"
#include "driver/gpio.h"


#define EXAMPLE_PCNT_HIGH_LIMIT 100 // 计数器最大值
#define EXAMPLE_PCNT_LOW_LIMIT -100 // 计数器最小值

#define EXAMPLE_EC11_GPIO_A 15 // 编码器A相引脚
#define EXAMPLE_EC11_GPIO_B 16  // 编码器B相引脚

#define EXAMPLE_EC11_BUTTON_GPIO GPIO_NUM_18 // 编码器按键引脚



void pcnt_init() // 初始化PCNT
{
  pcnt_config_t pcnt_config = {
      .pulse_gpio_num = EXAMPLE_EC11_GPIO_A, 
      .ctrl_gpio_num = EXAMPLE_EC11_GPIO_B,
      .lctrl_mode = PCNT_MODE_REVERSE, // 反向计数
      .hctrl_mode = PCNT_MODE_KEEP, // 正向计数
      .pos_mode = PCNT_COUNT_INC, // 正向计数
      .neg_mode = PCNT_COUNT_DIS, // 负向计数
      .counter_h_lim = EXAMPLE_PCNT_HIGH_LIMIT, 
      .counter_l_lim = EXAMPLE_PCNT_LOW_LIMIT,
      .unit = PCNT_UNIT_0, // PCNT单元0
      .channel = PCNT_CHANNEL_0, // PCNT通道0
  };

  pcnt_unit_config(&pcnt_config); // 配置PCNT单元
  pcnt_counter_pause(PCNT_UNIT_0); // 暂停计数器
  pcnt_counter_clear(PCNT_UNIT_0); // 清零计数器
  pcnt_counter_resume(PCNT_UNIT_0); // 恢复计数器
  pcnt_filter_enable(PCNT_UNIT_0); // 启用滤波器
}


void ec11_sw_init()
{
  gpio_config_t io_conf;
  io_conf.intr_type = GPIO_INTR_DISABLE;
  io_conf.mode = GPIO_MODE_INPUT;
  io_conf.pin_bit_mask = 1ULL << EXAMPLE_EC11_BUTTON_GPIO;
  io_conf.pull_down_en = GPIO_PULLDOWN_DISABLE;
  io_conf.pull_up_en = GPIO_PULLUP_ENABLE;
  gpio_config(&io_conf);
}
```

## 编码器计数获取

```c
void encoder_task(void *pvParameter)
{
  while (true)
  {
    int16_t count = 0;
    pcnt_get_counter_value(PCNT_UNIT_0, &count); // 获取计数器值
    
    printf("Count: %d\n", count);
    vTaskDelay(50 / portTICK_PERIOD_MS);
  }
  
}
```

## 简单按钮状态 恢复清零

```c
void ec11_sw_task(void *pvParameter)
{ 
  static bool last_state = false;
  while (true)
  { 
    if(gpio_get_level(EXAMPLE_EC11_BUTTON_GPIO) == 0 && last_state == true)
    {
      printf("Button pressed\n");
      last_state = false;
      pcnt_counter_clear(PCNT_UNIT_0);
      
    }
    else if(gpio_get_level(EXAMPLE_EC11_BUTTON_GPIO) == 1 && last_state == false)
    {
      last_state = true;
    }
    
    vTaskDelay(50 / portTICK_PERIOD_MS);
  }
  
}
```


## 示例代码

::: details 代码

```c
#include <Arduino.h>

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/queue.h"
#include "driver/pcnt.h"
#include "driver/gpio.h"
#include "esp_sleep.h"
 
#define EXAMPLE_PCNT_HIGH_LIMIT 100 // 计数器最大值
#define EXAMPLE_PCNT_LOW_LIMIT -100 // 计数器最小值

#define EXAMPLE_EC11_GPIO_A 15 // 编码器A相引脚
#define EXAMPLE_EC11_GPIO_B 16  // 编码器B相引脚

#define EXAMPLE_EC11_BUTTON_GPIO GPIO_NUM_18 // 编码器按键引脚





void pcnt_init() // 初始化PCNT
{
  pcnt_config_t pcnt_config = {
      .pulse_gpio_num = EXAMPLE_EC11_GPIO_A, 
      .ctrl_gpio_num = EXAMPLE_EC11_GPIO_B,
      .lctrl_mode = PCNT_MODE_REVERSE, // 反向计数
      .hctrl_mode = PCNT_MODE_KEEP, // 正向计数
      .pos_mode = PCNT_COUNT_INC, // 正向计数
      .neg_mode = PCNT_COUNT_DIS, // 负向计数
      .counter_h_lim = EXAMPLE_PCNT_HIGH_LIMIT, 
      .counter_l_lim = EXAMPLE_PCNT_LOW_LIMIT,
      .unit = PCNT_UNIT_0, // PCNT单元0
      .channel = PCNT_CHANNEL_0, // PCNT通道0
  };

  pcnt_unit_config(&pcnt_config); // 配置PCNT单元
  pcnt_counter_pause(PCNT_UNIT_0); // 暂停计数器
  pcnt_counter_clear(PCNT_UNIT_0); // 清零计数器
  pcnt_counter_resume(PCNT_UNIT_0); // 恢复计数器
  pcnt_filter_enable(PCNT_UNIT_0); // 启用滤波器
}


void encoder_task(void *pvParameter)
{
  while (true)
  {
    int16_t count = 0;
    pcnt_get_counter_value(PCNT_UNIT_0, &count); // 获取计数器值
    
    printf("Count: %d\n", count);
    vTaskDelay(50 / portTICK_PERIOD_MS);
  }
  
}


void ec11_sw_init()
{
  gpio_config_t io_conf;
  io_conf.intr_type = GPIO_INTR_DISABLE;
  io_conf.mode = GPIO_MODE_INPUT;
  io_conf.pin_bit_mask = 1ULL << EXAMPLE_EC11_BUTTON_GPIO;
  io_conf.pull_down_en = GPIO_PULLDOWN_DISABLE;
  io_conf.pull_up_en = GPIO_PULLUP_ENABLE;
  gpio_config(&io_conf);
}


void ec11_sw_task(void *pvParameter)
{ 
  static bool last_state = false;
  while (true)
  { 
    if(gpio_get_level(EXAMPLE_EC11_BUTTON_GPIO) == 0 && last_state == true)
    {
      printf("Button pressed\n");
      last_state = false;
      pcnt_counter_clear(PCNT_UNIT_0);
      
    }
    else if(gpio_get_level(EXAMPLE_EC11_BUTTON_GPIO) == 1 && last_state == false)
    {
      last_state = true;
    }
    
    vTaskDelay(50 / portTICK_PERIOD_MS);
  }
  
}


void setup()
{
  
  ec11_sw_init();
  pcnt_init();
  xTaskCreate(encoder_task, "encoder_task", 2048, NULL, 10, NULL);  
  xTaskCreate(ec11_sw_task, "ec11_sw_task", 2048, NULL, 10, NULL);
  
}

void loop()
{
  
}

```
:::







