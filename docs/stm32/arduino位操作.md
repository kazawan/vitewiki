
## ♿ARDUINO 位操作 

::: tip
[🔗 参考地址](https://www.runoob.com/w3cnote/bit-operation.html)
:::

::: info 位移符号
  |= 或 
 两个位都为0时，结果才为0

  &= 与 
 两个位都为1时，结果才为1

  ~ 取反
  0变1，1变0

  << 左移
 各二进位全部左移若干位，高位丢弃，低位补0

  />> 右移
 各二进位全部右移若干位，对无符号数，高位补0，有符号数，各编译器处理方法不一样，有的补符号位（算术右移），有的补0（逻辑右移）
:::


::: tip
[🔗WOKWI 工程参考](https://wokwi.com/projects/369468647590385665)
:::
``` c
void pin_write(POS p,PINSTATE s)
{
  switch(s)
  {
    case pinhigh:
    PORTC = PORTC |= 1 << p; 
    // ‼️🧐 等于 0x00 |= 0x01  结果：**0x01** 
    break;
    case pinlow:
    PORTC = PORTC &= ~(1 << p); 
    // 🧬(1 << 0) "0x0000 0001"  取反 结果 "0xFE" 0x1111 1110 
    // 🔣等于 0x01 &= 0xFE 结果：**0x00**
    break;
  }
};
```
### 仿arduino 的 `digitalWrite(pin,state)`
``` c
  pin_write(_A0,1);
  pin_write(_A1,pinlow);
  pin_write(_A2,pinhigh);
  pin_write(_A2,pinhigh);
  pin_write(_A3,pinlow);
  pin_write(_A3,pinlow);
  pin_write(_A4,pinhigh);
  delay(1000);
  pin_write(_A0,pinlow);
  pin_write(_A1,pinhigh);
  pin_write(_A2,pinlow);
  pin_write(_A3,pinhigh);
  pin_write(_A4,pinlow);
  delay(1000);
```


## ♿ARDUINO 直接定义寄存器地址 

::: tip
[🔗WOKWI 工程参考](https://wokwi.com/projects/370102518374898689)
:::

```c 
//arduino
#define PIN_C *(uint8_t*)(0x28) //PORTC 内存地址
#define BIT_WRITE_PINC(VAL,P)  VAL == 1 ? (PIN_C = PIN_C |= 1 << P) : (PIN_C = PIN_C &= ~(1 << P))
#define count_p(x,limit) x+1 >= limit ? x= 0:x++ ;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  
}
int count = 0;
void loop() {
  // put your main code here, to run repeatedly:
  
  BIT_WRITE_PINC(0,0);
  BIT_WRITE_PINC(1,1);
  // BIT_WRITE_PINC(~count,1);
  
  delay(1000);
  BIT_WRITE_PINC(1,0);
  BIT_WRITE_PINC(0,1);
  delay(1000);
}
```