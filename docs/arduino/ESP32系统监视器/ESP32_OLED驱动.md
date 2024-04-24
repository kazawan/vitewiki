# ESP32 OLED 驱动

::: tip 
基于 Arduino 框架
:::


## 使用`U8G2`

```cpp
#include <U8g2lib.h>
// 硬件SPI CLK->18 MOSI/DATA->23 DC->25  CS->27 RST->26 常用 
U8G2_SSD1309_128X64_NONAME0_F_4W_HW_SPI u8g2(U8G2_R0, /* cs=*/27, /* dc=*/25, /* reset=*/26);

u8g2.begin()

```





