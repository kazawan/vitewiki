# ESP32 FREERTOS QUEUE 队列

## 配置

头文件

```c
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/queue.h" // 队列

```

## 设置句柄

```c
QueueHandle_t DISPLAY_QUEUE;
```

## 设置要传递的结构体

```c
typedef struct
{
  char *message;
}display_message_t;
```

## 生成队列

```c
  DISPLAY_QUEUE = xQueueCreate(10, sizeof(display_message_t));
```

## 发送 / 接收

```c
display_message_t display_message;

// 发送 任务a
xQueueSend(DISPLAY_QUEUE, &display_message, 0);
// 接收 任务b
if(xQueueReceive(DISPLAY_QUEUE, &display_message, 0) == pdTRUE)
{
    // handler function
}



```
