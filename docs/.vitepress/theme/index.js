import DefaultTheme from 'vitepress/theme'
import vitepressNprogress from 'vitepress-plugin-nprogress'

export default {
  ... DefaultTheme,
  enhanceApp: (ctx) => {
    vitepressNprogress(ctx)
  }
}