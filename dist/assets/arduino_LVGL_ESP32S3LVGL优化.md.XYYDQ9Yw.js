import{_ as s,c as i,o as a,V as n}from"./chunks/framework.6DK9nIBo.js";const c=JSON.parse('{"title":"ESP32 LVGL 优化","description":"","frontmatter":{},"headers":[],"relativePath":"arduino/LVGL/ESP32S3LVGL优化.md","filePath":"arduino/LVGL/ESP32S3LVGL优化.md"}'),l={name:"arduino/LVGL/ESP32S3LVGL优化.md"},h=n(`<h1 id="esp32-lvgl-优化" tabindex="-1">ESP32 LVGL 优化 <a class="header-anchor" href="#esp32-lvgl-优化" aria-label="Permalink to &quot;ESP32 LVGL 优化&quot;">​</a></h1><div class="info custom-block"><p class="custom-block-title">参考</p><p>基于Arduino platformIO 开发 lvgl 8.3.10 tft_espi 卖家配置的</p></div><div class="info custom-block"><p class="custom-block-title">参考</p><p><a href="https://bangumi.tv/blog/344049" target="_blank" rel="noreferrer">如何优化你的屏幕帧数 [嵌入式] [ESP32-S3-N16R8] [VScode+PlatformIO]</a><a href="https://blog.csdn.net/JackieCoo/article/details/128581591" target="_blank" rel="noreferrer">ESP32】Arduino+LVGL 如何使用PSRAM优化显示</a></p></div><h2 id="platformio-ini-配置" tabindex="-1">platformIO.ini 配置 <a class="header-anchor" href="#platformio-ini-配置" aria-label="Permalink to &quot;platformIO.ini 配置&quot;">​</a></h2><p>库使用卖加配置的</p><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[env:esp32-s3-devkitc-1]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">platform</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = espressif32</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">board</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = esp32-s3-devkitc-1</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">framework</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = arduino</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">board_build.arduino.partitions</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = default_16MB.csv</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">board_build.arduino.memory_type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = qio_opi</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">board_build.f_cpu</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 240000000L</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">board_build.f_flash</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 80000000L</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">board_build.flash_mode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = qio</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">build_flags</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-O2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-DBOARD_HAS_PSRAM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-ISRC/UI</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">build_unflags</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = -Os</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">board_upload.flash_size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 16MB</span></span></code></pre></div><h2 id="tft-espi-配置" tabindex="-1">TFT_ESPI 配置 <a class="header-anchor" href="#tft-espi-配置" aria-label="Permalink to &quot;TFT_ESPI 配置&quot;">​</a></h2><p>找到配置文件 <code>Setup303_Waveshare_ESP32S3_ST7789.h</code> 修改<br> 添加以下代码</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">#define</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ESP32_DMA</span></span></code></pre></div><h2 id="lv-conf-h-配置" tabindex="-1">lv_conf.h 配置 <a class="header-anchor" href="#lv-conf-h-配置" aria-label="Permalink to &quot;lv_conf.h 配置&quot;">​</a></h2><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">#define</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> LV_MEM_CUSTOM</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 调用PSRAM</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">#define</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> LV_DISP_DEF_REFR_PERIOD</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 8</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">#define</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> LV_INDEV_DEF_READ_PERIOD</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 10</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">#define</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> LV_MEM_BUF_MAX_NUM</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 128</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 最大缓存数量</span></span></code></pre></div><h2 id="lv-port-disp-cpp-修改" tabindex="-1">lv_port_disp.cpp 修改 <a class="header-anchor" href="#lv-port-disp-cpp-修改" aria-label="Permalink to &quot;lv_port_disp.cpp 修改&quot;">​</a></h2><p>初始化</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> disp_init</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    /*You code here*/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    tft.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">init</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    tft.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">initDMA</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 使用DMA</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // tft.setRotation(1);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>刷屏函数</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> disp_flush</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">lv_disp_drv_t</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">disp_drv</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> lv_area_t</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">area</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">lv_color_t</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">color_p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    uint32_t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> w </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (area-&gt;x2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> area-&gt;x1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    uint32_t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> h </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (area-&gt;y2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> area-&gt;y1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //! 优化</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    tft.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setSwapBytes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    tft.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pushImageDMA</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(area-&gt;x1, area-&gt;y1, w, h,(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">uint16_t</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">color_p-&gt;full);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //! 旧的方法</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // tft.startWrite();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // tft.setAddrWindow(area-&gt;x1, area-&gt;y1, w, h);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // tft.pushColors((uint16_t *)&amp;color_p-&gt;full, w * h, true);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // tft.endWrite();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    lv_disp_flush_ready</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(disp_drv);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>双缓冲</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> lv_port_disp_init</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    disp_init</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    static</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> lv_disp_draw_buf_t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> draw_buf_dsc_2;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    static</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> lv_color_t</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">buf_2_1_qio </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    static</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> lv_color_t</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">buf_2_2_qio </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    buf_2_1_qio </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">lv_color_t</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">heap_caps_malloc</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(MY_DISP_HOR_RES </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 10</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> sizeof</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">lv_color_t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), MALLOC_CAP_SPIRAM);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    buf_2_2_qio </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">lv_color_t</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">heap_caps_malloc</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(MY_DISP_HOR_RES </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 10</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> sizeof</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">lv_color_t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), MALLOC_CAP_SPIRAM);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    lv_disp_draw_buf_init</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">draw_buf_dsc_2, buf_2_1_qio, buf_2_2_qio, MY_DISP_HOR_RES </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> /*Initialize the display buffer*/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    static</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> lv_disp_drv_t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> disp_drv;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> /*Descriptor of a display driver*/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    lv_disp_drv_init</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">disp_drv);</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   /*Basic initialization*/</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    disp_drv.hor_res </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MY_DISP_HOR_RES;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    disp_drv.ver_res </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MY_DISP_VER_RES;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    disp_drv.flush_cb </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> disp_flush;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    disp_drv.draw_buf </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">draw_buf_dsc_2;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // Always make the whole screen redrawn</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    disp_drv.full_refresh </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    lv_disp_drv_register</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">disp_drv);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div>`,18),p=[h];function t(k,e,d,r,E,g){return a(),i("div",null,p)}const o=s(l,[["render",t]]);export{c as __pageData,o as default};
