import{_ as s,c as i,o as a,V as n}from"./chunks/framework.6DK9nIBo.js";const o=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"stm32/stm32-platformio.md","filePath":"stm32/stm32-platformio.md"}'),l={name:"stm32/stm32-platformio.md"},t=n(`<h2 id="stm32cubemx-platformio-配置文件" tabindex="-1">stm32cubemx platformio 配置文件 <a class="header-anchor" href="#stm32cubemx-platformio-配置文件" aria-label="Permalink to &quot;stm32cubemx platformio 配置文件&quot;">​</a></h2><h3 id="正点原子mini-v4" tabindex="-1"><code>正点原子mini v4</code> <a class="header-anchor" href="#正点原子mini-v4" aria-label="Permalink to &quot;\`正点原子mini v4\`&quot;">​</a></h3><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[platformio]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">src_dir</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = ./</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">include_dir</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = Core/Inc</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[env:genericSTM32F103RC]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">platform</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = ststm32</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">board</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = genericSTM32F103RC</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">build_flags</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-D STM32F103xx</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-ICore/Inc</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-IDrivers/CMSIS/Include</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-IDrivers/CMSIS/Device/ST/STM32F1xx/Include</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-IDrivers/STM32F1xx_HAL_Driver/Inc</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-IDrivers/STM32F1xx_HAL_Driver/Inc/Legacy</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">src_filter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = +&lt;Core/Src&gt; +&lt;startup_stm32f103xe.s&gt; +&lt;Drivers/&gt; +&lt;Middlewares/&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">board_build.ldscript</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = ./STM32F103RCTx_FLASH.ld</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">upload_protocol</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = serial</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">monitor_speed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 115200</span></span></code></pre></div><h3 id="diy-f103c8t6" tabindex="-1">DIY <code>F103C8T6</code> <a class="header-anchor" href="#diy-f103c8t6" aria-label="Permalink to &quot;DIY \`F103C8T6\`&quot;">​</a></h3><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[env:genericSTM32F103C8]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">platform</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = ststm32</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">board</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = genericSTM32F103C8</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; framework = stm32cube</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">build_flags</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-D STM32F103xx</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-ICore/Inc</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-IDrivers/CMSIS/Include</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-IDrivers/CMSIS/Device/ST/STM32F1xx/Include</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-IDrivers/STM32F1xx_HAL_Driver/Inc</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-IDrivers/STM32F1xx_HAL_Driver/Inc/Legacy</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">src_filter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = +&lt;Core/Src&gt; +&lt;startup_stm32f103xb.s&gt; +&lt;Drivers/&gt; +&lt;Middlewares/&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">board_build.ldscript</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = ./STM32F103C8Tx_FLASH.ld</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">upload_protocol</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = stlink </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">debug_tool</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = stlink</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[platformio]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">src_dir</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = ./</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">include_dir</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = Core/Inc</span></span></code></pre></div><h2 id="rct6-usb-device-cdc-串口通信" tabindex="-1">RCT6 USB DEVICE CDC 串口通信 <a class="header-anchor" href="#rct6-usb-device-cdc-串口通信" aria-label="Permalink to &quot;RCT6 USB DEVICE CDC 串口通信&quot;">​</a></h2><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[platformio]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">src_dir</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = ./</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">include_dir</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = Core/Inc</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[env:genericSTM32F103RC]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">platform</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = ststm32</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">board</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = genericSTM32F103RC</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">build_flags</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-D STM32F103xx</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-ICore/Inc</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-IDrivers/CMSIS/Include</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-IDrivers/CMSIS/Device/ST/STM32F1xx/Include</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-IDrivers/STM32F1xx_HAL_Driver/Inc</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-IDrivers/STM32F1xx_HAL_Driver/Inc/Legacy</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-IUSB_DEVICE/App</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-IUSB_DEVICE/Target </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-IMiddlewares/ST/STM32_USB_Device_Library/Core/Inc</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	-IMiddlewares/ST/STM32_USB_Device_Library/Class/CDC/Inc</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">src_filter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = +&lt;Core/Src&gt; +&lt;startup_stm32f103xe.s&gt; +&lt;Drivers/&gt; +&lt;Middlewares/&gt;+&lt;USB_DEVICE/&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">board_build.ldscript</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = ./STM32F103RCTx_FLASH.ld</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">upload_protocol</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = stlink</span></span></code></pre></div>`,7),p=[t];function e(h,k,r,E,d,c){return a(),i("div",null,p)}const y=s(l,[["render",e]]);export{o as __pageData,y as default};
