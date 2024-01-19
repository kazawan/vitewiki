# :book: 结构体
```c

//******结构体*****
typedef struct{
  int pin;
  int time;
}LEDS;
//*******************

//******实例******
LEDS led[] = 
{
  {2,300},
  {3,500},
};

//*****函数传参*****
void ledInit(LEDS p[])
{
  pinMode(p[0].pin,OUTPUT);
}


```