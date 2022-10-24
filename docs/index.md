---
layout: home

hero:
  name: Wang Kaibing
  home: true
  text: Hi, guys, this is my daily record!
  tagline: Record my learning and code......
  image:
    src: /logo.png
    alt: VitePress
  actions:
    - theme: brand
      text: 查看更多
      link: '/menu1/WebStorm编辑器/常用快捷键'
    - theme: alt
      text: 访问我的Github
      link: https://github.com/Kai-web

features:
  - icon: 🛠️
    title: Vue2
    details: 借助Markdown，帮助您专注于编写和部署。
  - icon: 📦
    title: 小程序
    details: 可选 “多页应用” 或 “库” 模式的预配置 Rollup 构建
  - icon: 🔩
    title: 思维导图
    details: 使用 Markdown 中 Vue 的所有功能自定义网站。
  - icon: 🔑
    title: WebStorm编辑器
    details: 使用真正的 SSG + SPA 架构。页面加载时静态。
---

<script setup>
  import { onMounted } from 'vue'
  // features跳转
  onMounted(() => {
      const cards = document.getElementsByTagName('article')
      for (let i=0; i<cards.length; i++){ 
        cards[i].classList.add('article')
        let url = ''
        switch(i){
          case 0:
            url = '/menu1/Vue2/Vue页面模版.html'
            break;
          case 1:
            url = '/menu1/小程序/小程序components模板.html'
            break;
          case 2:
            url = '/menu1/思维导图/Git操作.html'
            break;
          case 3:
            url = '/menu1/WebStorm编辑器/常用快捷键.html'
            break;
        }
        cards[i].addEventListener('click',()=> {
          window.location.replace(url)
        })
      }
    })
</script>

<style>
    :root {
        --vp-home-hero-name-color: transparent;
        --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
        --vp-home-hero-image-background-image: linear-gradient(-45deg,#bd34fe 50%,#4c09b9 50%);
        --vp-home-hero-image-filter: blur(40px);
    }
    .article:hover {
      cursor: pointer;
      transform: scale(1.02);
      -webkit-box-shadow: #ccc 0px 10px 10px;
      -moz-box-shadow: #ccc 0px 10px 10px;
      box-shadow: #ccc 0px 10px 10px;
    }
</style>
