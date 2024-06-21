# ESP32 断电保存数据

::: warning
基于 Arduino
:::

::: tip 参考
[ESP8266 使用 NVS 分区永久保存数据](https://juejin.cn/post/7155479311045099533)
:::

使用 esp32 nvs 分区保存数据刷写后还会存在

## 删除命名空间

在 Preferences 库中，并没有完全删除命令空间的方法，我们存储很多数据之后，nvs 分区可能就满了，所以我们想要完全擦除 nvs 分区，可以使用以下程序运行一次：

```c
#include <nvs_flash.h>

void setup() {
  nvs_flash_erase(); // 擦除NVS分区
  nvs_flash_init();  // 初始化NVS分区
  while(true);
}

void loop() {

}
```

## 示例

```c
#include <Arduino.h>
#include "Preferences.h"
#include <string.h>


Preferences preferences;



void setup() {
  Serial.begin(115200);

  preferences.begin("my-app", false);
  unsigned int count = preferences.getUInt("count", 0);
  Serial.printf("OLD Count: %u\n", count);
  count++;
  preferences.putUInt("count", count);
  Serial.printf("NEW Count: %u\n", count);
  preferences.end();
  Serial.println("Done");
  delay(3000);
  ESP.restart();



}

void loop() {
}

```


## 保存结构体

确定数据结构
```c
typedef struct {
  char name[20];
  char password[20];
} MyData;

MyData myData;

```

保存数据
```c
    preferences.begin("my-app", false);
    sprintf(myData.name, "John Doe");
    sprintf(myData.password, "123456"); 
    preferences.putBytes("my-data", &myData, sizeof(myData));
```

读取数据
```c
    preferences.begin("my-app", false);

    preferences.getBytes("my-data", &myData, sizeof(myData));
    Serial.printf("Name: %s\n", myData.name);
    Serial.printf("Password: %s\n", myData.password);
```
