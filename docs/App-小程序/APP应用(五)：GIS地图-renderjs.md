---
title: GIS地图-renderjs
---

# GIS地图-renderjs

### renderjs

- 在uniapp中如果我们要实现地图离线加载，那就不能像原生小程序使用web-view那样的写法，这里需要用到uniapp的 [renderjs](https://uniapp.dcloud.net.cn/tutorial/renderjs.html#renderjs) 来开发地图，这里面的内容一定要逐行去看，尤其是底下的注意事项，要看并且要理解，文档里面官方也给了一个例子。

- APP 端可以使用 dom、bom API，不可直接访问逻辑层数据，不可以使用 uni 相关接口（如：uni.request）

- APP 端视图层的页面引用资源的路径相对于根目录计算，例如：./static/test.js。

- 在renderjs的script中，是无法获取到uni中script--data中的数据的，所以要通过一定的方式去传输。

- 调用方法时也可以通过this.$ownerInstance.callMethod('函数名', 数据)向uni的script发送。

<img src="/小程序/renderjs通信封装.png" width="200" height="200">

### 封装

```js
/**
 * author: wangkaibing
 * time: 2025-01-10 10:21:30
 * 
 * 
 * renderjs通信封装
 * 
 * 设计模式解释：
 * 
 * 真实业务中可能会有多张地图调用这个通信连接方法，这样每个 renderjs 组件需要独立的通信连接，不同页面的通信不能混淆，并且需要统一的事件处理机制，所以我采用类来封装
 * 
 * 
 * 1. 单例模式：整个应用只需要一个通信实例，多个实例会导致混乱
 *    - 通过 export const bridge = new RenderBridge() 导出单例
 *    - 其他地方引入时都是同一个实例
 * 
 * 2. 观察者模式：一个对象(目标)维护一组依赖它的对象(观察者)，当状态发生改变时通知它们
 *    - eventHandlers 存储所有的观察者(处理函数)
 *    - 数据变化时通知相应的观察者
 * 
 * 主要用于解决以下场景：
 * 1. 地图操作：在renderjs中处理地图事件后，需要通知逻辑层更新数据
 * 2. 数据同步：逻辑层数据更新后，需要在renderjs中响应变化
 * 3. 离线存储：地图瓦片下载后，需要通知逻辑层进行存储
 */

// 【单例模式】：通过class定义RenderBridge类
class RenderBridge {
  constructor() {
    // 用于调用逻辑层的方法，比如保存离线地图、更新轨迹等
    this.ownerInstance = null
    
    // 【观察者模式】：eventHandlers作为观察者集合
    // 使用 Map 结构存储，key 是数据名(如'message')，value 是观察者函数
    // 例如: this.eventHandlers.set('message', (newVal) => console.log(newVal))
    this.eventHandlers = new Map()
  }

  /**
   * 保存vue实例，后续用于调用逻辑层的方法
   * 比如：地图下载瓦片后，调用逻辑层的保存方法
   */
  init(ownerInstance) {
    // 【单例模式】：确保只初始化一次
    if (!this.ownerInstance && ownerInstance) {
      this.ownerInstance = ownerInstance
			console.log('🚀 ~ [RenderBridge:]', '初始化成功')
    }
  }

  /**
   * 调用逻辑层的方法
   * 比如：
   * 1. 地图点击后，通知逻辑层更新坐标
   * 2. 下载瓦片后，通知逻辑层保存到本地
   * 3. 轨迹绘制完成后，通知逻辑层保存轨迹
   */
  callMethod(method, data) {
    if (!this.ownerInstance) {
			console.log('🚀 ~ [RenderBridge:]', '请先初始化')
      return
    }
    try {
      this.ownerInstance.callMethod(method, data)
			console.log('🚀 ~ [RenderBridge:]', `${method}调用成功`, data)
    } catch (e) {
			console.log('🚀 ~ [RenderBridge:]', `${method}调用失败`, e)
    }
  }

  /**
   * 【观察者模式】：注册观察者，监听逻辑层数据变化
   * 比如：
   * 1. 监听地图配置变化，实时更新地图样式
   * 2. 监听坐标变化，更新地图标记位置
   * 3. 监听网络状态变化，切换在线/离线地图
   */
  onDataChange(key, handler) {
    // 将观察者函数存入Map
    this.eventHandlers.set(key, handler)
  }

  /**
   * 【观察者模式】：通知观察者，处理逻辑层数据变化
   * 比如：
   * 1. 配置更新：逻辑层切换地图类型，renderjs层切换地图图层
   * 2. 位置更新：逻辑层传入新坐标，renderjs层更新地图中心点
   * 3. 样式更新：逻辑层修改地图样式，renderjs层重新渲染地图
   */
  handleDataChange(key, newVal, oldVal, ownerInstance) {
    this.init(ownerInstance)

    // 获取对应的观察者函数并执行
    const handler = this.eventHandlers.get(key)
    if (handler) {
      handler(newVal, oldVal)
    }
  }
}

// 导出单例，这样其他地方引入时都是同一个实例
export const bridge = new RenderBridge() 
```

### 使用
```js
<template>
  <view class="wrap">
    <view class="tips">点击空白区域Renderjs向逻辑层通信</view>
    <view
      class="container"
      :message="message"
      :change:message="renderModule.handleMessageChange"
      @click="renderModule.handleClick"
    ></view>
    <view class="result-area">
      <view class="result-item">
        <text class="label">Renderjs接收到消息:</text>
        <text class="content">{{ message }}</text>
      </view>
      <view class="result-item">
        <text class="label">逻辑层接收到消息:</text>
        <text class="content">{{ eventData }}</text>
      </view>
    </view>
    <view class="controls">
      <button @click="sendMessage">逻辑层向Renderjs通信</button>
    </view>
		<view class="tips">注意</view>
		<view>这套rendejs通信只是简单封装，以下2个问题需要在真实业务中验证：</view>
		<view>1.性能开销过大</view>
		<view>2.通信太频繁，消息堆积，数据更新可能会有延迟</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      message: '暂无数据',
      eventData: '暂无数据',
    }
  },
  methods: {
    sendMessage() {
      this.message = '来自逻辑层的消息 time: ' + Date.now()
    },
    handleEvent(e) {
      console.log('🚀 ~ [逻辑层收到renderjs的数据:]', e)
      this.eventData = e
    },
  },
}
</script>

<script module="renderModule" lang="renderjs">
import { bridge } from '../../utils/renderBridge.js'

export default {
  mounted() {
    // 监听message变化
    bridge.onDataChange('message', (newVal, oldVal) => {
        console.log('🚀 ~ [message changed:]', newVal)
    })
  },
  
  methods: {
    // 监听父组件数据变化
    handleMessageChange(newVal, oldVal, ownerInstance) {
      bridge.handleDataChange('message', newVal, oldVal, ownerInstance)
    },

    // 点击事件处理
    handleClick() {
      console.log('🚀 ~ [点击事件触发]')
      bridge.callMethod('handleEvent', '来自Renderjs的消息 time: ' + Date.now())
    }
  }
}
</script>
```



