# QMK Encoder 配置

## `keyboard.json`

```json
"features":{
    "encoder": true,
    ...
},
"encoder":{
    "rotary":[
        {"pin_a":"B10","pin_b":"B11"},
        {第二个encoder...}
    ]
}
```


## `keymap.c`


解析 ` [层] = { ENCODER_CCW_CW(功能, 功能) , 第二个encoder } ` 

```c
const uint16_t PROGMEM encoder_map[][NUM_ENCODERS][NUM_DIRECTIONS] = {
    [0] = { ENCODER_CCW_CW(KC_VOLU, KC_VOLD) }
};
```

## `rules.mk`

```c
ENCODER_MAP_ENABLE = yes
// other option ...
```


## VIA 配置

::: info   
[VIA encoder docs](https://caniusevia.com/docs/layouts#rotary-encoders)   
:::  

```json
"layouts": {
      "keymap": [
        your layout ...,
        [
          {"x":3,"a":7},"e0"
        ],
        [
          {"x":4,"a":7},"e1"
        ]
      ]
    },

```





