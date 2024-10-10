# lvgl笔记

::: tip
各种无法归类但又难以记住的点,做个笔记
:::

## lvgl颜色

`lv_palette_main` 

```c
typedef enum {
    LV_PALETTE_RED,
    LV_PALETTE_PINK,
    LV_PALETTE_PURPLE,
    LV_PALETTE_DEEP_PURPLE,
    LV_PALETTE_INDIGO,
    LV_PALETTE_BLUE,
    LV_PALETTE_LIGHT_BLUE,
    LV_PALETTE_CYAN,
    LV_PALETTE_TEAL,
    LV_PALETTE_GREEN,
    LV_PALETTE_LIGHT_GREEN,
    LV_PALETTE_LIME,
    LV_PALETTE_YELLOW,
    LV_PALETTE_AMBER,
    LV_PALETTE_ORANGE,
    LV_PALETTE_DEEP_ORANGE,
    LV_PALETTE_BROWN,
    LV_PALETTE_BLUE_GREY,
    LV_PALETTE_GREY,
    _LV_PALETTE_LAST,
    LV_PALETTE_NONE = 0xff,
}lv_palette_t;
```
example:
```c
lv_style_set_bg_color(&obj, lv_palette_main(LV_PALETTE_RED));
```

`lv_color_hex`
example:
```c
lv_style_set_bg_color(&obj, lv_color_hex(0x00ff00)); // 绿色
```




