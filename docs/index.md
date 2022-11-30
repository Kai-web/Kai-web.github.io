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
      link: '/思维导图/Git操作'
    - theme: alt
      text: 访问我的Github
      link: https://github.com/Kai-web

features:
  - icon: ⚡️
    title: 博客
    details: 和大家平常见到的常规博客或随笔一样，可能偶尔一个小时或半天的时间输出一小块内容。碎片化、结构化、体系化的个人知识库。
  - icon: 💡
    title: 随笔
    details: 更多则是自己平常通过视频教程，文档等学习做的笔记，更多是初次接触某个领域所做的笔记，相对来说更多带有自己的思考和理解。
  - icon: 🖖
    title: 记录
    details: 学习优秀的开源作品，同时将学习到的知识记录下来，梳理所学，便于记录的内容被再次利用，不用再担心掌握的知识无迹可寻。
---

<script setup>
  import { onMounted } from 'vue'
  alert('站点部署在Gihub（搜索引擎无法收录），国内访问较慢，请耐心等待。')

  // features跳转
  //import menu1Sidebar from "./.vitepress/menu1Sidebar";
  onMounted(() => {
      const cards = document.getElementsByTagName('article')
      for (let i=0; i<cards.length; i++){
        cards[i].classList.add('article')
        let title = cards[i].childNodes[1].innerHTML
        cards[i].addEventListener('click',()=> {
          window.location.replace(menu1Sidebar.find(x => x.text === title).items[0].link.replace(/.md/g,'.html'))
        })
      }
    })
</script>

<style>
    :root {
        --vp-home-hero-name-color: transparent;
        --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
        --vp-home-hero-image-background-image: linear-gradient(-45deg,#bd34fe 50%,#4c09b9 50%);
        --vp-home-hero-image-filter: blur(80px);
    }
    .article:hover {
      -webkit-transition-duration: 0.3s;
      transition-duration: 0.3s;
      -webkit-transition-property: box-shadow, transform;
      transition-property: box-shadow, transform;
      -webkit-box-shadow: #ccc 0px 10px 10px;
      -moz-box-shadow: #ccc 0px 10px 10px;
      box-shadow: #ccc 0px 10px 10px;
    }
</style>
