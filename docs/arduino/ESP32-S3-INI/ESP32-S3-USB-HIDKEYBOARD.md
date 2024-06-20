# ESP32-S3-USB-HIDKEYBOARD

::: warning 
基于Arduino platformIO
:::

## `platformio.ini` 配置 

配置使用板载 usb 烧录 

按住boot 加 en 进入 `DFU` 模式
```ini
[env:esp32-s3-devkitc-1]
platform = espressif32
board = esp32-s3-devkitc-1
framework = arduino
lib_ldf_mode = deep
build_flags = 
	-DARDUINO_USB_MODE=1
	-DARDUINO_USB_CDC_ON_BOOT=1
monitor_port = /dev/cu.usbmodem14*
monitor_speed = 9600
monitor_rts = 0
monitor_dtr = 0

board_build.partitions = huge_app.csv
``` 

## 示例代码

```c
#include <Arduino.h>
#include "USB.h"
#include "USBHIDKeyboard.h"


ESPUSB Usb;
USBHIDKeyboard keyboard;

KeyReport _keyReport;

#define KEY_A 0x04
#define KEY_B 0x05
#define KEY_C 0x06
#define KEY_D 0x07
#define KEY_E 0x08
#define KEY_F 0x09
#define KEY_G 0x0A
#define KEY_H 0x0B
#define KEY_I 0x0C
#define KEY_J 0x0D


void setup()
{
  Usb.begin();  
  keyboard.begin();
}

void loop()
{
  _keyReport.keys[2] = KEY_A;
  keyboard.sendReport(&_keyReport);
  delay(1000);
  _keyReport.keys[2] = 0x00;
  keyboard.sendReport(&_keyReport);
  delay(1000);
}
```




