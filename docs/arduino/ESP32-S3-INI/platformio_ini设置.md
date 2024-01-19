# esp32-s3 cdc usb serial
::: tip 
基于arduino platformio的配置
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
monitor_port = /dev/cu.usbmodem14*
monitor_speed = 9600
monitor_rts = 0
monitor_dtr = 0
; lib_deps = 
; 	chegewara/ESP32TinyUSB@^2.0.2
; 	olikraus/U8g2@^2.34.22
board_build.partitions = huge_app.csv
```