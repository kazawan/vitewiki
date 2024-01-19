## stm32cubemx platformio 配置文件


### `正点原子mini v4`
```ini
[platformio]
src_dir = ./
include_dir = Core/Inc
[env:genericSTM32F103RC]
platform = ststm32
board = genericSTM32F103RC
build_flags = 
	-D STM32F103xx
	-ICore/Inc
	-IDrivers/CMSIS/Include
	-IDrivers/CMSIS/Device/ST/STM32F1xx/Include
	-IDrivers/STM32F1xx_HAL_Driver/Inc
	-IDrivers/STM32F1xx_HAL_Driver/Inc/Legacy
src_filter = +<Core/Src> +<startup_stm32f103xe.s> +<Drivers/> +<Middlewares/>
board_build.ldscript = ./STM32F103RCTx_FLASH.ld
upload_protocol = serial
monitor_speed = 115200
```

### DIY `F103C8T6`
```ini
[env:genericSTM32F103C8]
platform = ststm32
board = genericSTM32F103C8
; framework = stm32cube
build_flags = 
	-D STM32F103xx
	-ICore/Inc
	-IDrivers/CMSIS/Include
	-IDrivers/CMSIS/Device/ST/STM32F1xx/Include
	-IDrivers/STM32F1xx_HAL_Driver/Inc
	-IDrivers/STM32F1xx_HAL_Driver/Inc/Legacy
src_filter = +<Core/Src> +<startup_stm32f103xb.s> +<Drivers/> +<Middlewares/>
board_build.ldscript = ./STM32F103C8Tx_FLASH.ld
upload_protocol = stlink 
debug_tool = stlink






[platformio]
src_dir = ./
include_dir = Core/Inc
```

## RCT6 USB DEVICE CDC 串口通信
```ini
[platformio]
src_dir = ./
include_dir = Core/Inc
[env:genericSTM32F103RC]
platform = ststm32
board = genericSTM32F103RC
build_flags = 
	-D STM32F103xx
	-ICore/Inc
	-IDrivers/CMSIS/Include
	-IDrivers/CMSIS/Device/ST/STM32F1xx/Include
	-IDrivers/STM32F1xx_HAL_Driver/Inc
	-IDrivers/STM32F1xx_HAL_Driver/Inc/Legacy
	-IUSB_DEVICE/App
	-IUSB_DEVICE/Target 
	-IMiddlewares/ST/STM32_USB_Device_Library/Core/Inc
	-IMiddlewares/ST/STM32_USB_Device_Library/Class/CDC/Inc
src_filter = +<Core/Src> +<startup_stm32f103xe.s> +<Drivers/> +<Middlewares/>+<USB_DEVICE/>
board_build.ldscript = ./STM32F103RCTx_FLASH.ld
upload_protocol = stlink
```












