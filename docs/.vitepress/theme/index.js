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
  }
}