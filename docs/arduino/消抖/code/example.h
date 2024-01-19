#include "debouce_btn.h"

BTN_t push_btn = {7, 1, 0,150};
void setup() {
  Serial.begin(115200);
  btn_init(push_btn.pin);
  
}

void loop() {
  // ws_run(ws.lednum);
  btn_scan(push_btn.pin,
          &push_btn.keyup,
          &push_btn.current_time,
          push_btn.debouce_time);
}
