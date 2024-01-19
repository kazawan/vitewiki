## 整数转字符串

[菜鸟w3c C 语言整数与字符串的相互转换](https://www.runoob.com/w3cnote/c-int2str.html)

```c
#include <stdlib.h>
#include <stdio.h>
int main()
{
    int number1 = 123456;
    int number2 = -123456;
    char string[16] = {0};
    itoa(number1,string,10);
    printf("数字：%d 转换后的字符串为：%s\n",number1,string);
    itoa(number2,string,10);
    printf("数字：%d 转换后的字符串为：%s\n",number2,string);
    return 0;
}
```