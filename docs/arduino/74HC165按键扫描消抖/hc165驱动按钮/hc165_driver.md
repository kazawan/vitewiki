# hc165驱动
::: tip 
基于Arduino
:::

## hc165.h
```c
#ifndef HC165_H
#define HC165_H
#include "Arduino.h"

/**
*           _____                    _____                    _____                    _____ *
*          /\    \                  /\    \                  /\    \                  /\    \ *
*         /::\____\                /::\    \                /::\    \                /::\    \ *
*        /:::/    /               /::::\    \               \:::\    \              /::::\    \ *
*       /:::/    /               /::::::\    \               \:::\    \            /::::::\    \ *
*      /:::/    /               /:::/\:::\    \               \:::\    \          /:::/\:::\    \ *
*     /:::/____/               /:::/__\:::\    \               \:::\    \        /:::/__\:::\    \ *
*    /::::\    \              /::::\   \:::\    \               \:::\    \      /::::\   \:::\    \ *
*   /::::::\____\________    /::::::\   \:::\    \               \:::\    \    /::::::\   \:::\    \ *
*  /:::/\:::::::::::\    \  /:::/\:::\   \:::\    \               \:::\    \  /:::/\:::\   \:::\    \ *
* /:::/  |:::::::::::\____\/:::/  \:::\   \:::\____\_______________\:::\____\/:::/  \:::\   \:::\____\ *
* \::/   |::|~~~|~~~~~     \::/    \:::\  /:::/    /\::::::::::::::::::/    /\::/    \:::\  /:::/    / *
*  \/____|::|   |           \/____/ \:::\/:::/    /  \::::::::::::::::/____/  \/____/ \:::\/:::/    / *
*        |::|   |                    \::::::/    /    \:::\~~~~\~~~~~~                 \::::::/    / *
*        |::|   |                     \::::/    /      \:::\    \                       \::::/    / *
*        |::|   |                     /:::/    /        \:::\    \                      /:::/    / *
*        |::|   |                    /:::/    /          \:::\    \                    /:::/    / *
*        |::|   |                   /:::/    /            \:::\    \                  /:::/    / *
*        \::|   |                  /:::/    /              \:::\____\                /:::/    / *
*         \:|   |                  \::/    /                \::/    /                \::/    / *
*          \|___|                   \/____/                  \/____/                  \/____/ *
 * @brief 74HC165按键扫描
 * @note 本库基于Arduino开发，移植注意修改
 * @note 本库基于74HC165芯片，https://github.com/kazawan/arduino_funtion_lib/tree/main/74HC165%E6%8C%89%E9%94%AE%E6%89%AB%E6%8F%8F%E6%B6%88%E6%8A%96/hc165_lib
 * @author KAZAWAN
*/

#define _weak_ __attribute__((weak)) // 弱引用
#define sample_rate 1000 // 按键扫描频率
#define LATCHDOWN(latch) digitalWrite(latch,0) // 锁存引脚拉低
#define LATCHUP(latch) digitalWrite(latch,1) // 锁存引脚拉高
#define CLKDOWN(clock) digitalWrite(clock,0) // 时钟引脚拉低
#define CLKUP(clock) digitalWrite(clock,1) // 时钟引脚拉高


/**
 * @brief 74HC165按键扫描芯片配置
 * @param data_pin 数据引脚
 * @param clock_pin 时钟引脚
 * @param latch_pin 锁存引脚
 * @param key_num 按键数量
*/
struct HC165_typeDef
{
    uint8_t data_pin;
    uint8_t clock_pin;
    uint8_t latch_pin;
    int key_num;

};

/**
 * @brief 按键映射
 * @param key_value 按键值
*/
struct KEYMAP_typeDef
{
    uint8_t key_value;
};

/**
 * @brief 按键配置
 * @param keyup 按键状态
 * @param current_time 当前时间
 * @param debouce_time 消抖时间
 * @param state 按键状态
*/
struct BTN165_typeDef
{
    int keyup;
    int current_time;
    unsigned int debouce_time; // 消抖时间
    int state;
};



void hc165_init(HC165_typeDef *hc165,BTN165_typeDef *btn165,int key_num);
void hc165_scan(HC165_typeDef *hc165,KEYMAP_typeDef *key_map,BTN165_typeDef *btn165);

#endif
```

## hc165.cpp
```cpp

#include "hc165.h"

/**
 * @brief 按键状态
 * 
*/
_weak_ void  press_handler() 
{
//   Serial.println("press:(in 165.cpp)");
}


/**
 * @brief 按键释放状态
*/
_weak_ void  release_handler()
{
//   Serial.println("release:(in main.cpp)");
};


/**
 * @brief 按键初始化
 * @param hc165 74HC165芯片配置 
 * @param btn165 按键状态
 * @param key_num 按键数量
 * 
*/
void hc165_init(HC165_typeDef *hc165,BTN165_typeDef *btn165,int key_num)
{
    int i;
    pinMode(hc165->data_pin, INPUT);
    pinMode(hc165->clock_pin, OUTPUT);
    pinMode(hc165->latch_pin, OUTPUT);
    for(i=0;i<key_num;i++)
    {
        btn165[i].keyup = 1;
        btn165[i].current_time = 0;
        btn165[i].debouce_time = 30;
        btn165[i].state = 0;
    }
};


/**
 * @brief 按键扫描
 * @param hc165 74HC165芯片配置
 * @param key_map 按键映射
 * @param btn165 按键状态
 * @return null
*/
void hc165_scan(HC165_typeDef *hc165,KEYMAP_typeDef *key_map,BTN165_typeDef *btn165){
    int j;
    for(j = 0 ;j < sample_rate; j++)
    {
        LATCHDOWN(hc165->latch_pin);
        LATCHUP(hc165->latch_pin);
        if(j < sample_rate - 1)
        {
            for(int i = 0 ; i < hc165->key_num; i++)
            {
                btn165[i].state = digitalRead(hc165->data_pin);
                CLKUP(hc165->clock_pin);
                CLKDOWN(hc165->clock_pin);
            }
        }else if(j == sample_rate - 1)
        {
            for(int i = 0 ; i < hc165->key_num;i++)
            {
                if(btn165[i].state == 1 && btn165[i].keyup == 1 && btn165[i].state == digitalRead(hc165->data_pin))
                {
                    if(millis() - btn165[i].current_time > btn165[i].debouce_time)
                    {
                        btn165[i].keyup = 0;
                        btn165[i].current_time = millis();
                        // Serial.print("press: ");
                        press_handler();
                        Serial.println(key_map[i].key_value);
                    }
                }else if(btn165[i].keyup == 0 && btn165[i].state == 0)
                {
                    release_handler();
                    Serial.println(key_map[i].key_value);
                    btn165[i].keyup = 1;
                }
                CLKUP(hc165->clock_pin);
                CLKDOWN(hc165->clock_pin);
            }

        }
    }
};
```

