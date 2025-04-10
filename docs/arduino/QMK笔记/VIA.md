## VIA 配置json文件

> via.json 貌似不影响编译,只影响在网页显示的layout 对不对..

::: warning   
    `productId`  `vendorId` 必须与keyboard.json 中的`pid` `vid` 一致   
:::   

```via.json
{
    "matrix": {
      "rows": 4,
      "cols": 4
    },
    "name": "STM32PAD44",
    "productId": "0xFEAB",
    "vendorId": "0x4821",
    "layouts": {
      "keymap": [
        [
          "0,0",
          "0,1",
          "0,2",
          "0,3"
        ],
        [
          "1,0",
          "1,1",
          "1,2",
          "1,3"
        ],
        [
          "2,0",
          "2,1",
          "2,2",
          {
            "h": 2
          },
          "2,3"
        ],
        [
          "3,0",
          "3,1",
          "3,2"
        ],
        [
          {"x":3,"a":7},"e0"
        ]
      ]
    },
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
    
  }

```

## `rules.mk`

```c
VIA_ENABLE = yes
VIAL_ENABLE = yes
LTO_ENABLE = yes // 压缩 build 文件大小
```