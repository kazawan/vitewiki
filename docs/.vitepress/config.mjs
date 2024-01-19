import { defineConfig } from 'vitepress'
import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "#卡泽湾爬坑记",
  description: "web app / arduino / linux",
  themeConfig: {
    search: {
      provider: 'local'
    },
    logo:'https://avatars.githubusercontent.com/u/99900286?v=4',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '🚾Home', link: '/' },
      
      { text: '🔰Arduino', link: '/arduino/' },
      { text: '♻️Web开发', link: '/webdev/' },
      { text: '❇️STM32', link: '/stm32/' },
    ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kazawan' }
    ]
  },
  vite: {
    plugins: [
      // add plugin
      AutoSidebar({
        // You can also set options to adjust sidebar data
        // see option document below
        ignoreList:['code','img'],
        ignoreIndexItem:true,
        titleFromFile:true,
        collapsed:true,
      })
    ]
  },
})
