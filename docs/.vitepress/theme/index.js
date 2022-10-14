import vitepressNprogress from 'vitepress-plugin-nprogress'

export default {
  enhanceApp: (ctx) => {
    vitepressNprogress(ctx)
  }
}