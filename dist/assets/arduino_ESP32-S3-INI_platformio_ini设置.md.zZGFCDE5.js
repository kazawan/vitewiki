import{_ as s,c as a,o as n,V as p}from"./chunks/framework.6DK9nIBo.js";const b=JSON.parse('{"title":"esp32-s3 cdc usb serial","description":"","frontmatter":{},"headers":[],"relativePath":"arduino/ESP32-S3-INI/platformio_ini设置.md","filePath":"arduino/ESP32-S3-INI/platformio_ini设置.md"}'),e={name:"arduino/ESP32-S3-INI/platformio_ini设置.md"},i=p(`<h1 id="esp32-s3-cdc-usb-serial" tabindex="-1">esp32-s3 cdc usb serial <a class="header-anchor" href="#esp32-s3-cdc-usb-serial" aria-label="Permalink to &quot;esp32-s3 cdc usb serial&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>基于arduino platformio的配置 -&gt; 添加 <code>-DCORE_DEBUG_LEVEL=5 </code> 可以使用ESP_LOGI</p></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>[env:esp32-s3-devkitc-1]</span></span>
<span class="line"><span>platform = espressif32</span></span>
<span class="line"><span>board = esp32-s3-devkitc-1</span></span>
<span class="line"><span>framework = arduino</span></span>
<span class="line"><span>lib_ldf_mode = deep</span></span>
<span class="line"><span>build_flags = </span></span>
<span class="line"><span>	-DARDUINO_USB_MODE=1</span></span>
<span class="line"><span>	-DARDUINO_USB_CDC_ON_BOOT=1</span></span>
<span class="line"><span>	-DCORE_DEBUG_LEVEL=5 </span></span>
<span class="line"><span></span></span>
<span class="line"><span>monitor_port = /dev/cu.usbmodem14*</span></span>
<span class="line"><span>monitor_speed = 9600</span></span>
<span class="line"><span>monitor_rts = 0</span></span>
<span class="line"><span>monitor_dtr = 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>board_build.partitions = huge_app.csv</span></span></code></pre></div>`,3),l=[i];function t(o,c,r,_,d,u){return n(),a("div",null,l)}const f=s(e,[["render",t]]);export{b as __pageData,f as default};
