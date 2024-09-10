import{_ as s,c as a,o as e,V as i}from"./chunks/framework.6DK9nIBo.js";const u=JSON.parse('{"title":"创建docker镜像","description":"","frontmatter":{},"headers":[],"relativePath":"webdev/docker笔记/创建docker镜像.md","filePath":"webdev/docker笔记/创建docker镜像.md"}'),t={name:"webdev/docker笔记/创建docker镜像.md"},h=i('<h1 id="创建docker镜像" tabindex="-1">创建docker镜像 <a class="header-anchor" href="#创建docker镜像" aria-label="Permalink to &quot;创建docker镜像&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>在本地测试好的项目，需要将项目打包成镜像，然后上传到docker仓库。 在服务器下载镜像 挂载好数据库实现持久化 使用 <code>1panel</code> 升级镜像 达到一键升级 方便修改</p></div><h2 id="创建镜像" tabindex="-1">创建镜像 <a class="header-anchor" href="#创建镜像" aria-label="Permalink to &quot;创建镜像&quot;">​</a></h2><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -t</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 镜像名称:版本号.</span></span></code></pre></div><h2 id="上传镜像" tabindex="-1">上传镜像 <a class="header-anchor" href="#上传镜像" aria-label="Permalink to &quot;上传镜像&quot;">​</a></h2><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> push</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 镜像名称:版本号.</span></span></code></pre></div><h2 id="下载镜像" tabindex="-1">下载镜像 <a class="header-anchor" href="#下载镜像" aria-label="Permalink to &quot;下载镜像&quot;">​</a></h2><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pull</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 镜像名称:版本号.</span></span></code></pre></div><h2 id="其他命令" tabindex="-1">其他命令 <a class="header-anchor" href="#其他命令" aria-label="Permalink to &quot;其他命令&quot;">​</a></h2><p>查看镜像</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> images</span></span></code></pre></div><p>删除镜像</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rmi</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 镜像名称:版本号.</span></span></code></pre></div>',13),l=[h];function d(n,p,o,c,r,k){return e(),a("div",null,l)}const F=s(t,[["render",d]]);export{u as __pageData,F as default};
