```c
uint16_t sample_rate = 500;


enum
{
  UP = 0,
  PRESSING,
  RELEASE,
  LONG_RELEASE,
} PRESS_STATE;

typedef struct BTN_t
{
  byte pin;//管脚
  int keyup;//按键状态
  int current_time;//时间
  int long_time_release;
  unsigned int debouce_time;//消抖时间
  byte pin_read;
  int PRESS_STATE;
};

BTN_t push_btn = {7, 1, 0, 0, 500, 1, UP};

// int count;

//**************************
//初始化
void btn_init(BTN_t* p)
{
  pinMode(p->pin, INPUT_PULLUP);
}

//**************************
//按键扫描
void btn_scan(BTN_t* p)
{

  for (int i = 0 ; i < sample_rate ; i ++ )
  {
    if (i < sample_rate - 1)
    {
      p->pin_read = digitalRead(p->pin);
    }
    else if (i == sample_rate - 1 )
    {

      if (p->pin_read == 0 && p->keyup == 1 && p->pin_read == digitalRead(p->pin))//如果keyup == 1 管脚状态处于断开状态  p == 0
      {
        p->long_time_release = millis();
        // if (millis() - p->current_time > p->debouce_time)
        // {
        p->current_time = millis();
        p->keyup = 0;

        //*****你的程序在这下面*********
        // Serial.println("pressed");
        //*****************************

        // }
      } else if (p->pin_read == 1 && p->keyup == 0)
      {
        if (millis() - p->long_time_release > 1000)
        {
          
          p->keyup = 1;
          p-> PRESS_STATE = LONG_RELEASE ;
        } else
        {
          p->keyup = 1;
          p-> PRESS_STATE = RELEASE ;
          
        }

      } else if (p->pin_read == 1 && p->keyup == 1)
      {
        p-> PRESS_STATE = UP ;
      }
    }
  }

}


void btnCheck(BTN_t* p)
{
  switch (p->PRESS_STATE)
  {
    case UP:

      break;
    case RELEASE:
      digitalWrite(13, !digitalRead(13));
      Serial.println("short release");
      break;
    case LONG_RELEASE:
      digitalWrite(12, !digitalRead(12));
      Serial.println("long release");
      break;
  }
}


void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  btn_init(&push_btn);
  pinMode(13, OUTPUT);
  pinMode(12, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  btn_scan(&push_btn);
  btnCheck(&push_btn);
}
```