---
title: 全局监听globalData的属性变化
---

# 全局监听globalData的某个属性变化

- 使用Object.defineProperty()监听属性全局更改，参考vue实现数据双向绑定原理：采用数据劫持结合发布者-订阅者模式的方式，通过 Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应监听回调。

## app.js

```js
App({
  globalData: {
    socketOpen: false,
    manualClose: true
  },

  onLaunch () {
    // 调用监听
    this.watchGlobalData((key, value) => {});
  },

  // 监听全局变量的变化
  watchGlobalData: function (callback) {
    const globalData = this.globalData;
  
    const defineProperty = (key) => {
      let value = globalData[key];
      Object.defineProperty(globalData, key, {
        configurable: true,
        enumerable: true,
        set: function(newVal) {
          value = newVal;
          callback && callback(key, newVal);
        },
        get: function() {
          return value;
        }
      });
    };
  
    // 定义要监听的全局变量
    const variablesToWatch = ['socketOpen', 'manualClose'];
  
    // 遍历要监听的全局变量，并进行定义
    variablesToWatch.forEach((variable) => {
      defineProperty(variable);
    });
  },
});
```

## 其他页面调用

```js
app.watchGlobalData((key, value) => {
    this.getSocket()
});

getSocket() {
    this.setData({
        socketOpen: app.globalData.socketOpen,
        manualClose: app.globalData.manualClose
    })
}
```