# lvgl 笔记

::: tip
各种无法归类但又难以记住的点,做个笔记
:::

## lvgl 颜色

关键词 : `lvgl颜色` `lv_color_t` `lv color`

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

## 禁止滑动条出现

`lv_obj_set_scrollbar_mode`

关键词 : `禁止` `滑动` `scrollbar` `bar` `disable`


```c
    lv_obj_set_scrollbar_mode(scr, LV_SCROLLBAR_MODE_OFF);
```
种类:
```c
enum {
    LV_SCROLLBAR_MODE_OFF,      /**< Never show scrollbars*/
    LV_SCROLLBAR_MODE_ON,       /**< Always show scrollbars*/
    LV_SCROLLBAR_MODE_ACTIVE,   /**< Show scroll bars when object is being scrolled*/
    LV_SCROLLBAR_MODE_AUTO,     /**< Show scroll bars when the content is large enough to be scrolled*/
};
typedef uint8_t lv_scrollbar_mode_t;
```

## 滑动条自动对齐中间

关键词 : `scroll` `bar` `snap` `对齐` `center` `align`

`lv_obj_set_scroll_snap_y`

```c
    lv_obj_set_scroll_snap_y(list, LV_SCROLL_SNAP_CENTER);
```
种类:
```c
enum {
    LV_SCROLL_SNAP_NONE,    /**< Do not align, leave where it is*/
    LV_SCROLL_SNAP_START,   /**< Align to to the left/top*/
    LV_SCROLL_SNAP_END,     /**< Align to to the right/bottom*/
    LV_SCROLL_SNAP_CENTER   /**< Align to to the center*/
};
typedef uint8_t lv_scroll_snap_t;
```


## 组焦点应用

关键词 : `group` `focus` `焦点` `组` `lv_group_t`

组件分在一个组并只能有一个焦点

创建组
```c
// group
    lv_group_t * btn_group = lv_group_create();
```

添加组件到组
```c
    lv_group_add_obj(btn_group, btn1);
    lv_group_add_obj(btn_group, btn2);
    lv_group_add_obj(btn_group, btn3);
    lv_group_add_obj(btn_group, btn4);
    lv_group_add_obj(btn_group, btn5);
    lv_group_add_obj(btn_group, btn6);
```

自动焦点到某元素

```c
    lv_group_focus_obj(btn3);
```



