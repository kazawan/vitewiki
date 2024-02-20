import{_ as s,c as n,o as a,V as p}from"./chunks/framework.6DK9nIBo.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"stm32/ESP32REG.md","filePath":"stm32/ESP32REG.md"}'),l={name:"stm32/ESP32REG.md"},e=p(`<h3 id="☣️esp32直接端口操作" tabindex="-1">☣️ESP32直接端口操作 <a class="header-anchor" href="#☣️esp32直接端口操作" aria-label="Permalink to &quot;☣️ESP32直接端口操作&quot;">​</a></h3><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>-&gt; <code>WOKWI</code><a href="https://wokwi.com/projects/368567923857784833" target="_blank" rel="noreferrer">WOKWI ESP32 寄存器 OUTPUT</a></p><p>-&gt; <code>WOKWI</code><a href="https://wokwi.com/projects/368567923857784833" target="_blank" rel="noreferrer">WOKWI ESP32 寄存器 INPUT</a></p><p>-&gt; <code>参考蚊帐</code><a href="https://cloud.tencent.com/developer/ask/sof/115377624" target="_blank" rel="noreferrer">📘ESP32直接端口操作</a></p></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>寄存器地址 0 - 31 32-36有另外的方法</p></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>#define PARALLEL_0  24 //从24开始</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int value ;</span></span>
<span class="line"><span>void setup() {</span></span>
<span class="line"><span>  // put your setup code here, to run once:</span></span>
<span class="line"><span>  Serial.begin(115200);</span></span>
<span class="line"><span>  Serial.println(&quot;Hello, ESP32!&quot;);</span></span>
<span class="line"><span>  REG_WRITE(GPIO_ENABLE_W1TS_REG, 0x6 &lt;&lt; PARALLEL_0); // 0x6 = 0110</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void loop() {</span></span>
<span class="line"><span>  // put your main code here, to run repeatedly:</span></span>
<span class="line"><span>  value = 0x02; // 0x02 = 0010 25号管脚打开 26号关闭</span></span>
<span class="line"><span>  REG_WRITE(GPIO_OUT_REG, value &lt;&lt; PARALLEL_0); </span></span>
<span class="line"><span>  delay(200); // this speeds up the simulation</span></span>
<span class="line"><span>  value = 0x04 ; //0x04 = 0100 25号管脚关闭 26号打开</span></span>
<span class="line"><span>  REG_WRITE(GPIO_OUT_REG, value &lt;&lt; PARALLEL_0);</span></span>
<span class="line"><span>  delay(200); // this speeds up the simulation</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>#define PARALLEL_0  24</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int value ;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void setup() {</span></span>
<span class="line"><span>  // put your setup code here, to run once:</span></span>
<span class="line"><span>  Serial.begin(115200);</span></span>
<span class="line"><span>  Serial.println(&quot;Hello, ESP32!&quot;);</span></span>
<span class="line"><span>  REG_WRITE(GPIO_ENABLE_W1TS_REG, 0x6 &lt;&lt; PARALLEL_0);</span></span>
<span class="line"><span>  REG_WRITE(GPIO_ENABLE_W1TC_REG,0x03&lt;&lt;18);</span></span>
<span class="line"><span>  // pinMode(18 , INPUT_PULLUP);</span></span>
<span class="line"><span>  // pinMode(19,INPUT_PULLUP);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>uint32_t  key = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>uint8_t parallel_read18(void) {</span></span>
<span class="line"><span>  uint32_t input = REG_READ(GPIO_IN_REG);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (input &gt;&gt; 18 ^ 0xf);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>uint8_t parallel_read19(void) {</span></span>
<span class="line"><span>  uint32_t input = REG_READ(GPIO_IN_REG);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (input &gt;&gt; 19 ^ 0xf);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void loop() {</span></span>
<span class="line"><span>  //input读取</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // Serial.print(&quot;18 ==&gt; :&quot;);</span></span>
<span class="line"><span>  // Serial.print(parallel_read18(),BIN);</span></span>
<span class="line"><span>  // Serial.print(&quot;   &quot;);</span></span>
<span class="line"><span>  // Serial.print(&quot;19 ==&gt; :&quot;);</span></span>
<span class="line"><span>  // Serial.println(parallel_read19(),BIN);</span></span>
<span class="line"><span>  if(parallel_read18() == 0xE)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    Serial.println(&quot;18 pressed&quot;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if(parallel_read18() == 0xd)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    Serial.println(&quot;19 pressed&quot;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if(parallel_read18() == 0xc){</span></span>
<span class="line"><span>    Serial.println(&quot;all pressed&quot;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  delay(5);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //OUTPUT 读取</span></span>
<span class="line"><span>  // put your main code here, to run repeatedly:</span></span>
<span class="line"><span>  // value = 0x02;</span></span>
<span class="line"><span>  // REG_WRITE(GPIO_OUT_REG, value &lt;&lt; PARALLEL_0);</span></span>
<span class="line"><span>  // delay(100); // this speeds up the simulation</span></span>
<span class="line"><span>  // value = 0x04 ;</span></span>
<span class="line"><span>  // REG_WRITE(GPIO_OUT_REG, value &lt;&lt; PARALLEL_0);</span></span>
<span class="line"><span>  // delay(100); // this speeds up the simulation</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,5),i=[e];function t(c,o,r,u,_,d){return a(),n("div",null,i)}const P=s(l,[["render",t]]);export{h as __pageData,P as default};
