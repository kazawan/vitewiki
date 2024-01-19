#ifndef ESP_ENCODER_H
#define ESP_ENCODER_H

#include <Arduino.h>

// void encoder_init(byte, byte, byte);

// const int Int_Pin = digitalPinToInterrupt(encoder.CLK);

// void encoder_init(byte clk, byte dt, byte sw)
// {
//     pinMode(clk, INPUT);
//     pinMode(dt, INPUT);
//     pinMode(sw, INPUT_PULLUP);
//     const int Int_Pin = digitalPinToInterrupt(clk);
// }



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

//**编码器🎛️
void encoder_begin(void *pt, byte c, byte d)
{
    ENCODER *encoder = (ENCODER *)pt;
    encoder->CLK = c;
    encoder->DT = d;
    byte clk = encoder->CLK;
    byte dt = encoder->DT;
    encoder->val = 0;
    encoder->lastCLK = 0;
    pinMode(clk, INPUT);
    pinMode(dt, INPUT);
    const int Int_Pin = digitalPinToInterrupt(clk);
}
//**编码器 ** 扫描
void encoder_scan(void *pt)
{
    ENCODER *encoder = (ENCODER *)pt;
    int clk = digitalRead(encoder->CLK);
    int dt = digitalRead(encoder->DT);
    if (clk != encoder->lastCLK)
    {
        encoder->lastCLK = clk;
        encoder->val += (clk != dt ? -1 : 1);
        //*** 业务逻辑 ***

        //*** end ***
        Serial.print("val:");
        Serial.println(encoder->val);
    }
}

//**编码器开关⌨️
void encoder_sw_begin(void *pt,byte pin,int debouce_time = 100)
{
    ESWITCH *esw = (ESWITCH *)pt;
    esw->SW = pin;
    esw->keyup = 1;
    esw->current_time = 0;
    esw->debouce_time = debouce_time;
    pinMode(esw->SW, INPUT_PULLUP);
}

//**编码器开关 ** 扫描
void encoder_scan_sw(void *pt)
{
    ESWITCH *esw = (ESWITCH *)pt;
    if (esw->keyup && !digitalRead(esw->SW)) // 如果keyup == 1 管脚状态处于断开状态  p == 0
    {
        if (millis() - esw->current_time > esw->debouce_time)
        {
            esw->keyup = 0;
            //*****你的程序在这下面*********
            // callback();
            //*****************************
            esw->current_time = millis();
        }
    }
    else if (digitalRead(esw->SW))
    {
        esw->keyup = 1;
    }
}


//**编码器开关
// int encoder_sw_state(void *pt)
// {
//     ESWITCH *esw = (ESWITCH *)pt;
//     if (esw->keyup && !digitalRead(esw->SW)) // 如果keyup == 1 管脚状态处于断开状态  p == 0
//     {
//         if (millis() - esw->current_time > esw->debouce_time)
//         {
//             esw->keyup = 0;
//             //*****你的程序在这下面*********

//             //*****************************
//             esw->current_time = millis();

//             return 0;
//         }
//     }
//     else if (digitalRead(esw->SW))
//     {
//         esw->keyup = 1;
//         return 1;
//     }
//     else{
//         return 1;
//     }
    
// }

#endif
