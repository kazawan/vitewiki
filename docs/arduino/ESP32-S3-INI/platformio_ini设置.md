# esp32-s3 cdc usb serial
::: tip 
基于arduino platformio的配置
 -> 添加 `-DCORE_DEBUG_LEVEL=5 ` 可以使用ESP_LOGI
:::

```
[env:esp32-s3-devkitc-1]
platform = espressif32
board = esp32-s3-devkitc-1
framework = arduino
lib_ldf_mode = deep
build_flags = 
	-DARDUINO_USB_MODE=1
	-DARDUINO_USB_CDC_ON_BOOT=1
	-DCORE_DEBUG_LEVEL=5 

monitor_port = /dev/cu.usbmodem14*
monitor_speed = 9600
monitor_rts = 0
monitor_dtr = 0

board_build.partitions = huge_app.csv
```