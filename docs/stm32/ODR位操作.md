
## ODR直接控制gpio 输出 ODR🩹



##🥇定义宏
```
#define GPIOD_ODR  *(unsigned int*)(0x4001140C) // D 16位管脚
#define GPIOA_ODR  *(unsigned int*)(0x4001080C) // A 16位管脚
```

##🧰操作

```
    GPIOD_ODR = 0xFFFB; //1111 1111 1111 1011 
    GPIOA_ODR = 0xFFFF;
    HAL_Delay(1000);
    GPIOD_ODR = 0xFFFF;
    GPIOA_ODR = 0xFEFF;
    HAL_Delay(1000);
```



