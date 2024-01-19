### ☣️ESP32直接端口操作

::: tip
->
`WOKWI`
[WOKWI ESP32 寄存器 OUTPUT](https://wokwi.com/projects/368567923857784833)

->
`WOKWI`
[WOKWI ESP32 寄存器 INPUT](https://wokwi.com/projects/368567923857784833)

->
`参考蚊帐`
[📘ESP32直接端口操作](https://cloud.tencent.com/developer/ask/sof/115377624)
:::

::: warning
寄存器地址 0 - 31  32-36有另外的方法
:::


```
#define PARALLEL_0  24 //从24开始

int value ;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial.println("Hello, ESP32!");
  REG_WRITE(GPIO_ENABLE_W1TS_REG, 0x6 << PARALLEL_0); // 0x6 = 0110
  
}

void loop() {
  // put your main code here, to run repeatedly:
  value = 0x02; // 0x02 = 0010 25号管脚打开 26号关闭
  REG_WRITE(GPIO_OUT_REG, value << PARALLEL_0); 
  delay(200); // this speeds up the simulation
  value = 0x04 ; //0x04 = 0100 25号管脚关闭 26号打开
  REG_WRITE(GPIO_OUT_REG, value << PARALLEL_0);
  delay(200); // this speeds up the simulation
}
```


```
#define PARALLEL_0  24

int value ;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial.println("Hello, ESP32!");
  REG_WRITE(GPIO_ENABLE_W1TS_REG, 0x6 << PARALLEL_0);
  REG_WRITE(GPIO_ENABLE_W1TC_REG,0x03<<18);
  // pinMode(18 , INPUT_PULLUP);
  // pinMode(19,INPUT_PULLUP);
  
}
uint32_t  key = 0;

uint8_t parallel_read18(void) {
  uint32_t input = REG_READ(GPIO_IN_REG);

  return (input >> 18 ^ 0xf);
}

uint8_t parallel_read19(void) {
  uint32_t input = REG_READ(GPIO_IN_REG);

  return (input >> 19 ^ 0xf);
}
void loop() {
  //input读取

  // Serial.print("18 ==> :");
  // Serial.print(parallel_read18(),BIN);
  // Serial.print("   ");
  // Serial.print("19 ==> :");
  // Serial.println(parallel_read19(),BIN);
  if(parallel_read18() == 0xE)
  {
    Serial.println("18 pressed");
  }
  if(parallel_read18() == 0xd)
  {
    Serial.println("19 pressed");
  }
  if(parallel_read18() == 0xc){
    Serial.println("all pressed");
  }
  
  delay(5);
  

  //OUTPUT 读取
  // put your main code here, to run repeatedly:
  // value = 0x02;
  // REG_WRITE(GPIO_OUT_REG, value << PARALLEL_0);
  // delay(100); // this speeds up the simulation
  // value = 0x04 ;
  // REG_WRITE(GPIO_OUT_REG, value << PARALLEL_0);
  // delay(100); // this speeds up the simulation
}
```


