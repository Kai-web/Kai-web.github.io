import menu1Sidebar from "./menu1Sidebar";
import mdItCustomAttrs  from 'markdown-it-custom-attrs'

export default {
  base: '/',
  title: "前端加油站 🧠",
  titleTemplate: 'Kai-web',
  // 会渲染成<meta>标签，SEO用
  description: '学习开发日常记录',
  //图片预览(图片灯箱远程引入)
  head:[
    [
      "link",
      { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css" },
    ],
    [
      "script", 
      { src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js" }
    ],
  ],
  themeConfig: {
    // 展示搜索框
    algolia: {
      appId: '4BG2APT558',
      appKey: 'a1fc7d4ad4121505cc5afa90232970e3',
      indexName: 'kai-web.cn',
    },
      nav: [
          { text: '文档', link: '/menu1/前端环境搭建', activeMatch: '/menu1/' },
      ],
      sidebar: {
        '/menu1/': menu1Sidebar,
      },
      socialLinks: [
          { icon: 'github', link: 'https://github.com/Kai-web' },
      ],
      //丝滑滚动
      smoothScroll: true,
      // 启用时间线
      editLinks: true,
      //在git上编辑提示文字
      editLinkText: '在 GitHub 上编辑此页',
      // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
      lastUpdated: '上次更新',
      docFooter: { //上下篇文本
        prev: '上一篇',
        next: '下一篇'
      },

      footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright © 2022-present Kai-web'
      },
  },
  markdown:{
    config: (md) => {
      // use more markdown-it plugins!
      md.use(mdItCustomAttrs, 'image', {
          'data-fancybox': "gallery"
      })
    }
  }
}