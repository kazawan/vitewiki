# QMK-RBG-Matrix 配置

## `keyboard.json`

```json
"features":{
    "rgb_matrix": true ,
    // other option ...
},
 "rgb_matrix":{
        "animations":{
            "breathing": true,
            "cycle_left_right": true,
            "cycle_up_down": true,
            "rainbow_moving_chevron": true,
            "gradient_up_down": true,
            "typing_heatmap": true

        },
        "driver": "ws2812",
        "hue_steps":8,
        "center_point":[112,32],
        "layout":[
            {"matrix":[0,0],"x":0,"y":0,"flags":8},
            {"matrix":[0,1],"x":74,"y":0,"flags":4},
            {"matrix":[0,2],"x":150,"y":0,"flags":4},
            {"matrix":[0,3],"x":224,"y":0,"flags":4},

            {"matrix":[1,0],"x":0,"y":21,"flags":4},
            {"matrix":[1,1],"x":74,"y":21,"flags":4},
            {"matrix":[1,2],"x":150,"y":21,"flags":4},
            {"matrix":[1,3],"x":224,"y":21,"flags":4},

            {"matrix":[2,0],"x":0,"y":42,"flags":4},
            {"matrix":[2,1],"x":74,"y":42,"flags":4},
            {"matrix":[2,2],"x":150,"y":42,"flags":4},
            {"matrix":[2,3],"x":224,"y":42,"flags":4},

            {"matrix":[3,0],"x":0,"y":64,"flags":4},
            {"matrix":[3,1],"x":74,"y":64,"flags":4},
            {"matrix":[3,2],"x":150,"y":64,"flags":4}

        ]
    },

```

### Common Configuration
RGB matrix 灯珠定位要填入 `[0,0] - [224,64]` 之间的定位...
计算公式 
```c
x = 224 / (列总数 - 1) * 位置[ 由 0 开始]
y =  64 / (行总数 - 1) * 位置[ 由 0 开始]
```

### Flags 标志位

| #define | Value | Des | 
| --- | --- | --- |
| LED_FLAG_ALL	     |`0xFF`	| If this LED has all flags    
| LED_FLAG_NONE  	  |  `0x00`	| If this LED has no flags    
| LED_FLAG_MODIFIER |	`0x01`	| If the LED is on a modifier key     
| LED_FLAG_UNDERGLOW|	`0x02`	| If the LED is for underglow   
| LED_FLAG_KEYLIGHT	|`0x04`|	If the LED is for key backlight       
| LED_FLAG_INDICATOR|	`0x08`|	If the LED is for keyboard state indication    

例如 CAPS_LOCK 按键中的轴灯 定义为 `{"matrix":[0,0],"x":0,"y":0,"flags":8}` 动画效果中的变化不会影响其变化   

```c
// 函数实现
bool rgb_matrix_indicators_kb(void) {
    if (!rgb_matrix_indicators_user()) {
        return false;
    }
    if(host_keyboard_led_state().caps_lock){
        rgb_matrix_set_color(0, 0, 255, 0); 
        // rgb_matrix_set_color(index, r,g,b)
        // index 灯index 例如 他是第一颗灯珠则为 0 
        // r,g,b 对应hex code

    }
    return true;
}
```

::: info   

[QMK DOC - Common Configuration](https://docs.qmk.fm/features/rgb_matrix#common-configuration)     
[QMK DOC - Flags](https://docs.qmk.fm/features/rgb_matrix#flags)   
:::






## `rules.mk`

```c
WS2812_DRIVER = bitbang
other option ...
```

## `VIA 灯光配置`
`via.json`
```json
"menus":[
      {
        "label": "Lighting",
        "content": [
          {
            "label": "Backlight",
            "content": [
              {
                "label": "Brightness",
                "type": "range",
                "options": [0, 255],
                "content": ["id_qmk_rgb_matrix_brightness", 3, 1]
              },
              {
                "label": "Effect",
                "type": "dropdown",
                "content": ["id_qmk_rgb_matrix_effect", 3, 2],
                "options":[
                  "Breathing",
                  "Cycle Left/Right",
                  "Cycle Up/Down",
                  "Rainbow Moving Chevron",
                  "Gradient Up/Down",
                  "Typing Heatmap"
              
                ]          
              },
              {
                "showIf": "{id_qmk_rgb_matrix_effect} != 0",
                "label": "Effect Speed",
                "type": "range",
                "options": [0, 255],
                "content": ["id_qmk_rgb_matrix_effect_speed", 3, 3]
              },
              {
                "showIf": "{id_qmk_rgb_matrix_effect} != 0 && {id_qmk_rgb_matrix_effect} != 24 && {id_qmk_rgb_matrix_effect} != 28 && {id_qmk_rgb_matrix_effect} != 29 && {id_qmk_rgb_matrix_effect} != 32",
                "label": "Color",
                "type": "color",
                "content": ["id_qmk_rgb_matrix_color", 3, 4]
              }
            ]
          }
        ]
      }
    ],
    "keycodes":["qmk_lighting"]
```

