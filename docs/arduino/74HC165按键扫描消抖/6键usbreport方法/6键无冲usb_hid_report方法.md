# :keyboard:HID USB 发送按键状态方法

### :hammer:定义buff
```c
uint8_t sendBuffer[6] = {0};
#define key_buffer_size 6
```

### :dart:查找空的位置
```c
int find_buff_emtpy_index()
{
  uint8_t i;
  int index = -1;
  
    for (i = 0; i < key_buffer_size; i++)//循环buff
    {
      if(index == -1)
      {
        if(sendBuffer[i] == 0)//如果找到一个位置是空的则返回i
        {
          index = i;
          break;
        }
      }else
      {
        index = -1;
      }
    }
    return index;
}
```


### :pen:插入buff
```c
void key_buffer_insert(int index,int key)
{
  if(index != -1)
  {
    sendBuffer[index] = key_value[key].key;
  }
}
```


### :heavy_multiplication_x:删除指定buff
```c
void remove_buff(int buff_index)
{
  sendBuffer[buff_index] = 0x00;
}
```


### :email:发送
按sdk方法发送report
