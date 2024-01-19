#include "button.h"

void btn_init(BTN_t *btn, int pin)
{
  btn->pin = pin;
  pinMode(btn->pin, INPUT_PULLUP);
  btn->keyup = 1;
  btn->current_time = 0;
  btn->debouce_time = 20;
  btn->long_time_release = 0;
  btn->pin_read = 1;
  btn->state = IDLE;
  btn->loop_time = 0;
  btn->func = NULL;
}

static bool loop_flag(BTN_t *p)
{
  if (millis() - p->loop_time > BTN_SACN_LOOP)
  {
    p->loop_time = millis();
    p->pin_read = digitalRead(p->pin);
    return true;
  }
  else
  {
    return false;
  }
}

static void btn_idle(BTN_t *p)
{
  if (p->pin_read == 0)
  {
    p->state = PRESSING;

#if LOG_ENABLE
    Serial.println("idle to pressing");
#endif
  }
};

static void btn_pressing(BTN_t *p)
{
  if (p->pin_read == 0 && p->keyup == 1)
  {
    if (millis() - p->current_time > p->debouce_time)
    {
      p->keyup = 0;
      p->state = PRESSED;
#if LOG_ENABLE
      Serial.println("pressing");
#endif
    }
  }
};

static void btn_pressed(BTN_t *p)
{
  if (p->pin_read == 1 && p->keyup == 0)
  {
    p->state = RELEASED;
    p->keyup = 1;
#if LOG_ENABLE
    Serial.println("pressed");
#endif
  }
};

static void btn_released(BTN_t *p)
{
  if (p->pin_read == 1 && p->keyup == 1)
  {
    p->state = IDLE;
    p->current_time = millis();
    p->keyup = 1;
#if LOG_ENABLE
    Serial.println("released");
#endif
  }
};

void btn_tick(BTN_t *p)
{
  if (loop_flag(p))
  {
    switch (p->state)
    {
    case IDLE:
      btn_idle(p);
      break;
    case PRESSING:
      btn_pressing(p);

      break;
    case PRESSED:
      btn_pressed(p);

      break;
    case RELEASED:
      btn_released(p);
      if (p->func != NULL)
      {
        p->func();
      }

      break;
    }
  }
};

void attach_func(BTN_t *p, callbackFunction func)
{
  p->func = func;
}

// void test1(BTN_t *p)
// {
//   delay(1000);
//   Serial.println(p->keyup);
// }

