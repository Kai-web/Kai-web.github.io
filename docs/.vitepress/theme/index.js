import DefaultTheme from 'vitepress/theme'
import vitepressNprogress from 'vitepress-plugin-nprogress'
import confetti from "./components/confetti.vue";

import './styles/custom.css'

export default {
  ... DefaultTheme,
  enhanceApp: (ctx) => {
    const { app } = ctx;
    vitepressNprogress(ctx)
    app.component("confetti", confetti);
    // 设置默认为暗色模式
    if (typeof window !== 'undefined') {
      const html = document.querySelector('html')
      html.classList.add('dark')
    }
  }
}