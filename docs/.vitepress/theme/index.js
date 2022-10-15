import DefaultTheme from 'vitepress/theme'
import vitepressNprogress from 'vitepress-plugin-nprogress'

import './styles/custom.css'

export default {
  ... DefaultTheme,
  enhanceApp: (ctx) => {
    vitepressNprogress(ctx)
  }
}