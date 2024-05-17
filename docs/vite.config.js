import { defineConfig } from "vite";
const env = process.env.NODE_ENV === "development" ? "" : "/blog"

export default defineConfig({
  appearance: 'force-dark',
  base: env,
  ssr: {
    noExternal: ['vitepress-plugin-nprogress']
  },
});