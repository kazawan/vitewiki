/*简单消抖
 *包含结构体
 */

//定义按钮
typedef struct BTN_t
{
  byte pin;//管脚
  int keyup;//按键状态
  int current_time;//时间
  unsigned int debouce_time;//消抖时间
};

// BTN_t push_btn = {7, 1, 0,150};

// int count;

//**************************
//初始化
void btn_init(byte p)
{
  pinMode(p, INPUT_PULLUP);
}

//**************************
//按键扫描
void btn_scan(byte p, int *keyup, int *t,unsigned int debouce)
{
  if (*keyup && !digitalRead(p))//如果keyup == 1 管脚状态处于断开状态  p == 0 
  {
    if(millis() - *t > debouce)
    {
      *keyup = 0;
      //*****你的程序在这下面*********
      
      //*****************************
      *t = millis();
    }
  } else if (digitalRead(p))
  {
    *keyup = 1;
  }
}


//**************************
//带返回值 1 按下 0 未按下
int btn_state(byte p, int *keyup, int *t,unsigned int debouce)
{
  if (*keyup && !digitalRead(p))//如果keyup == 1 管脚状态处于断开状态  p == 0 
  {
    if(millis() - *t > debouce)
    {
      *keyup = 0;
      //*****你的程序在这下面*********
      return 1;
      //*****************************
      *t = millis();
    }
  } else if (digitalRead(p))
  {
    *keyup = 1;
    return 0;
  }else{
    return 0;
  }
  return 0;
};
