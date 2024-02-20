import{_ as n,c as s,o as a,V as p}from"./chunks/framework.6DK9nIBo.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"stm32/stm32printf/stm32使用printf.md","filePath":"stm32/stm32printf/stm32使用printf.md"}'),e={name:"stm32/stm32printf/stm32使用printf.md"},l=p(`<h2 id="platformio-cubemx-f103-使用printf重定向" tabindex="-1">🔨platformio cubemx f103 使用printf重定向 <a class="header-anchor" href="#platformio-cubemx-f103-使用printf重定向" aria-label="Permalink to &quot;:hammer:platformio cubemx f103 使用printf重定向&quot;">​</a></h2><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>--&gt;<a href="https://blog.csdn.net/Yellow0102/article/details/119150684" target="_blank" rel="noreferrer"><code>参考地址</code></a></p></div><h3 id="在core-src下建立syscall-c" tabindex="-1">🆕在Core/Src下建立syscall.c <a class="header-anchor" href="#在core-src下建立syscall-c" aria-label="Permalink to &quot;:new:在Core/Src下建立syscall.c&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;sys/stat.h&gt;</span></span>
<span class="line"><span>#include &quot;usart.h&quot;</span></span>
<span class="line"><span>#include &quot;stm32f1xx_hal.h&quot;  //修改成F1xx系列  其他未知</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>#ifdef __cplusplus</span></span>
<span class="line"><span>extern &quot;C&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>#endif</span></span>
<span class="line"><span>    // 重定向到串口1</span></span>
<span class="line"><span>    int _write(int fd, uint8_t *pBuffer, int size)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        for (int i = 0; i &lt; size; i++)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            while (!(USART1-&gt;SR &amp; USART_SR_TXE))</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            HAL_UART_Transmit(&amp;huart1, &amp;pBuffer[i], 1, 0xFFFF);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return size;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>    int _read(int fd, uint8_t *pBuffer, int size)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        for (int i = 0; i &lt; size; i++)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            while ((USART1-&gt;SR &amp; USART_SR_RXNE) == 0)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            pBuffer[i] = HAL_UART_Receive(&amp;huart1, &amp;pBuffer[i], 1, 0xFFFF);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return size;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>    caddr_t _sbrk(int increment)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        extern char end asm(&quot;end&quot;);</span></span>
<span class="line"><span>        register char *pStack asm(&quot;sp&quot;);</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>        static char *s_pHeapEnd;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>        if (!s_pHeapEnd)</span></span>
<span class="line"><span>            s_pHeapEnd = &amp;end;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>        if (s_pHeapEnd + increment &gt; pStack)</span></span>
<span class="line"><span>            return (caddr_t)-1;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>        char *pOldHeapEnd = s_pHeapEnd;</span></span>
<span class="line"><span>        s_pHeapEnd += increment;</span></span>
<span class="line"><span>        return (caddr_t)pOldHeapEnd;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>    int _close(int fd)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        return -1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>    int _lseek(int fd1, int fd2, int fd3)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        return -1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>    int _fstat(int fd, struct stat *pStat)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        pStat-&gt;st_mode = S_IFCHR;</span></span>
<span class="line"><span>        return 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>    int _isatty(int fd)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>#ifdef __cplusplus</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#endif</span></span></code></pre></div><h3 id="usart-c-中添加重定向代码" tabindex="-1">📖usart.c 中添加重定向代码 <a class="header-anchor" href="#usart-c-中添加重定向代码" aria-label="Permalink to &quot;:book:usart.c 中添加重定向代码&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>//实现printf函数重定向到串口，即支持printf信息到USART</span></span>
<span class="line"><span>#ifdef __GNUC__</span></span>
<span class="line"><span>/* With GCC/RAISONANCE, small printf (option LD Linker-&gt;Libraries-&gt;Small printf</span></span>
<span class="line"><span>   set to &#39;Yes&#39;) calls __io_putchar() */</span></span>
<span class="line"><span>#define PUTCHAR_PROTOTYPE int __io_putchar(int ch)</span></span>
<span class="line"><span>#else</span></span>
<span class="line"><span>#define PUTCHAR_PROTOTYPE int fputc(int ch, FILE *f)</span></span>
<span class="line"><span>#endif /* __GNUC__ */</span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> * @brief  Retargets the C library printf function to the USART.</span></span>
<span class="line"><span> * @param  None</span></span>
<span class="line"><span> * @retval None</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>PUTCHAR_PROTOTYPE</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  /* Place your implementation of fputc here */</span></span>
<span class="line"><span>  /* e.g. write a character to the EVAL_COM1 and Loop until the end of transmission */</span></span>
<span class="line"><span>  HAL_UART_Transmit(&amp;huart1, (uint8_t *)&amp;ch, 1, 0xFFFF);</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>  return ch;</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,6),i=[l];function t(c,r,o,d,_,f){return a(),s("div",null,i)}const m=n(e,[["render",t]]);export{h as __pageData,m as default};
