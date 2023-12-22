---
title: mpvue小程序压缩vendor.js
---

# mpvue小程序压缩vendor.js

## 问题

- mpvue开发小程序遇到的最头疼的坑,引入外部的包会导致vendor.js文件过大，轻轻松松就能超过500kb，有时会导致无法提交体验版

## webpack.dev.conf.js

- 打开build/webpack.dev.conf.js

```js
// 顶部引入
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
    // ...
  plugins: [
    // ...
    new UglifyJsPlugin({ sourceMap: true }) // 加入这个就能解决
  ]
})
```