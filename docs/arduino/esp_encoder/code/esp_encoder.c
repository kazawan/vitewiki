#include <Arduino.h>

typedef struct
{
    byte CLK;
    byte DT;
    int val;
    int lastCLK;
} ENCODER;



typedef struct 
{
    byte SW;                  // 管脚
    int keyup ;                 // 按键状态
    int current_time;          // 时间
    unsigned int debouce_time; // 消抖时间
}ESWITCH;
