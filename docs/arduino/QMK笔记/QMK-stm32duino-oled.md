# STM32duino QMK OLED SSD1306 驱动

## `keyboard.json` 
添加 `"oled": true` =  `rules.mk` 添加 `OLED_ENABLE = yes`
```json
"features":{
    ...,
    "oled": true
}
```

## `rules.mk`
```c
OLED_DRIVER = ssd1306
OLED_TRANSPORT = i2c  
// ... other option...
```


## `halconf.h`
启动 I2C
```c
#pragma once

#define HAL_USE_I2C TRUE

#include_next <halconf.h>
```

## `mcuconf.h`
启动 STM32 I2C 1 `I2C1`
```c
#pragma once

#include_next <mcuconf.h>

#undef STM32_I2C_USE_I2C1
#define STM32_I2C_USE_I2C1 TRUE
```

## `config.h`

通过查看STM32duino github   
::: info  
[https://github.com/stm32duino/Arduino_Core_STM32/blob/main/libraries/Wire/examples/i2c_scanner/i2c_scanner.ino](https://github.com/stm32duino/Arduino_Core_STM32/blob/main/libraries/Wire/examples/i2c_scanner/i2c_scanner.ino)  
:::   

`PB6 - SCL ` `PB7 - SDA `

```c
#pragma once



#define I2C_DRIVER I2CD1 
#define I2C1_SCL_PIN B6 
#define I2C1_SDA_PIN B7

#define I2C1_DUTY_CYCLE  FAST_DUTY_CYCLE_2 
#define I2C1_CLOCK_SPEED 400000

#define OLED_SCROLL_TIMEOUT 60000
#define OLED_TIMEOUT 300000
#define OLED_UPDATE_INTERVAL 30
#define OLED_DISPLAY_128X64

// other options...


```


## `keymap.c`

```c
// #ifdef OLED_ENABLE
bool oled_task_user(void) {
    // Host Keyboard Layer Status
     // Host Keyboard Layer Status
     oled_write_P(PSTR("Layer: "), false);

     switch (get_highest_layer(layer_state)) {
         case _QWERTY:
             oled_write_P(PSTR("Default\n"), false);
             break;
         case _FN:
             oled_write_P(PSTR("FN\n"), false);
             break;

         default:
             // Or use the write_ln shortcut over adding '\n' to the end of your string
             oled_write_ln_P(PSTR("Undefined"), false);
     }
 
     // Host Keyboard LED Status
     led_t led_state = host_keyboard_led_state();
     oled_write_P(led_state.num_lock ? PSTR("NUM ") : PSTR("    "), false);
     oled_write_P(led_state.caps_lock ? PSTR("CAP ") : PSTR("    "), false);
     oled_write_P(led_state.scroll_lock ? PSTR("SCR ") : PSTR("    "), false);
     
     return false;
}
// #endif

```


## i2c1 管脚 配置成 `PB8 SCL` `PB9 SDA` 方法

::: info  
[整个带屏数字小键盘吧，先搞定 QMK 固件支持 STM32F103 的 I2C Remap](https://xujiwei.com/blog/2024/06/qmk-stm32f103-i2c-remap/)  
:::  

在 ` platforms/chibios/boards/STM32_F103_STM32DUINO/board/board.c` 中找到 `boardInit(void)`  

修改 `AFIO->MAPR |= AFIO_MAPR_SWJ_CFG_JTAGDISABLE | AFIO_MAPR_I2C1_REMAP;`

```c
// 文件路径 platforms/chibios/boards/STM32_F103_STM32DUINO/board/board.c
void boardInit(void) {
   //JTAG-DP Disabled and SW-DP Enabled
   AFIO->MAPR |= AFIO_MAPR_SWJ_CFG_JTAGDISABLE | AFIO_MAPR_I2C1_REMAP;
   //Set backup register DR10 to enter bootloader on reset
   BKP->DR10 = RTC_BOOTLOADER_FLAG;
}
```

