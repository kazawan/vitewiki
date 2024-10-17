# ESP32 LVGL 优化


::: info 参考
基于Arduino platformIO 开发
lvgl 8.3.10
tft_espi 卖家配置的
:::

::: info 参考
[如何优化你的屏幕帧数 [嵌入式] [ESP32-S3-N16R8] [VScode+PlatformIO]](https://bangumi.tv/blog/344049)
[ESP32】Arduino+LVGL 如何使用PSRAM优化显示](https://blog.csdn.net/JackieCoo/article/details/128581591)

:::

## platformIO.ini 配置
库使用卖加配置的
```ini
[env:esp32-s3-devkitc-1]
platform = espressif32
board = esp32-s3-devkitc-1
framework = arduino
board_build.arduino.partitions = default_16MB.csv
board_build.arduino.memory_type = qio_opi
board_build.f_cpu = 240000000L
board_build.f_flash = 80000000L
board_build.flash_mode = qio
build_flags = 
	-O2
	-DBOARD_HAS_PSRAM
	-ISRC/UI
build_unflags = -Os
board_upload.flash_size = 16MB
```

## TFT_ESPI 配置

找到配置文件 `Setup303_Waveshare_ESP32S3_ST7789.h` 修改  
添加以下代码

```c
#define ESP32_DMA 
```


## lv_conf.h 配置

```c
#define LV_MEM_CUSTOM 1 // 调用PSRAM

#define LV_DISP_DEF_REFR_PERIOD 8 

#define LV_INDEV_DEF_READ_PERIOD 10

#define LV_MEM_BUF_MAX_NUM 128 // 最大缓存数量
```

## lv_port_disp.cpp 修改
初始化
```c
static void disp_init(void)
{
    /*You code here*/
    tft.init();
    tft.initDMA(true); // 使用DMA
    // tft.setRotation(1);
}
```

刷屏函数
```c
static void disp_flush(lv_disp_drv_t *disp_drv, const lv_area_t *area, lv_color_t *color_p)
{
    uint32_t w = (area->x2 - area->x1 + 1);
    uint32_t h = (area->y2 - area->y1 + 1);
    //! 优化
    tft.setSwapBytes(true);
    tft.pushImageDMA(area->x1, area->y1, w, h,(uint16_t *)&color_p->full);

    //! 旧的方法
    // tft.startWrite();
    // tft.setAddrWindow(area->x1, area->y1, w, h);
    // tft.pushColors((uint16_t *)&color_p->full, w * h, true);
    // tft.endWrite();

    lv_disp_flush_ready(disp_drv);
}
```

双缓冲

```c
void lv_port_disp_init(void)
{

    disp_init();


    static lv_disp_draw_buf_t draw_buf_dsc_2;

    static lv_color_t *buf_2_1_qio = NULL;
    static lv_color_t *buf_2_2_qio = NULL;
    buf_2_1_qio = (lv_color_t *)heap_caps_malloc(MY_DISP_HOR_RES * 10 * sizeof(lv_color_t), MALLOC_CAP_SPIRAM);
    buf_2_2_qio = (lv_color_t *)heap_caps_malloc(MY_DISP_HOR_RES * 10 * sizeof(lv_color_t), MALLOC_CAP_SPIRAM);

    lv_disp_draw_buf_init(&draw_buf_dsc_2, buf_2_1_qio, buf_2_2_qio, MY_DISP_HOR_RES * 10); /*Initialize the display buffer*/
    
    static lv_disp_drv_t disp_drv; /*Descriptor of a display driver*/
    lv_disp_drv_init(&disp_drv);   /*Basic initialization*/


    disp_drv.hor_res = MY_DISP_HOR_RES;
    disp_drv.ver_res = MY_DISP_VER_RES;

    disp_drv.flush_cb = disp_flush;

    disp_drv.draw_buf = &draw_buf_dsc_2;
    // Always make the whole screen redrawn
    disp_drv.full_refresh = 1; 


    lv_disp_drv_register(&disp_drv);
}
```







