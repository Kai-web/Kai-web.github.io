import menu1Sidebar from "./menu1Sidebar";

export default {
  base: '/',
  title: "前端加油站 🧠",
  titleTemplate: 'Kai-web',
  description: '学习开发日常记录', // 会渲染成<meta>标签，SEO用
  themeConfig: {
      nav: [
          { text: '文档', link: '/menu1/前端环境搭建', activeMatch: '/menu1/' },
      ],
      sidebar: {
        '/menu1/': menu1Sidebar,
        // '/menu2/': menu2Sidebar,
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

      footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright © 2022-present Kai-web'
      },
  }
}