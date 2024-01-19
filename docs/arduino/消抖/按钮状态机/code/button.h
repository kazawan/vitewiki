/**
 * @file button.h
 * @brief 按键状态机
 * @version 1.0
 * @date 2023-09-26
 * @author kazawan
 *
 */

#ifndef BUTTON_H
#define BUTTON_H
#include <Arduino.h>
#define _weak_ __attribute__((weak))
#define btn_sample_rate 300 // 按键扫描频率
#define BTN_SACN_LOOP 10    // 按键扫描频率

#define LOG_ENABLE 0 // 使能日志

enum
{
  IDLE = 0,
  PRESSING,
  PRESSED,
  RELEASED,
  LONG_RELEASED
} BTN_STATE; // 按钮状态

extern "C"
{
  typedef void (*callbackFunction)(void); // 定义函数指针类型
}

// 按钮结构体
struct BTN_t
{
  byte pin;         // 管脚
  int keyup;        // 按键状态
  int current_time; // 时间
  int long_time_release;
  int loop_time;             // 循环时间
  unsigned int debouce_time; // 消抖时间
  byte pin_read;             // 管脚状态  上拉 默认 1  下拉 默认0
  byte state;
  callbackFunction func;
};
// extern "C"{
//   typedef void test(BTN_t *p);
// }

void btn_init(BTN_t *btn, int pin); // 初始化
static bool loop_flag(BTN_t *p);    // 循环标志
static void btn_idle(BTN_t *p);
static void btn_pressing(BTN_t *p);
static void btn_pressed(BTN_t *p);
static void btn_released(BTN_t *p);
void btn_tick(BTN_t *p);                           // 按键状态机
void attach_func(BTN_t *p, callbackFunction func); // 绑定函数
// test test1;

#endif