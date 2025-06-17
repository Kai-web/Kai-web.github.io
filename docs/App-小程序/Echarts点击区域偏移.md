---
title: 微信小程序中ECharts点击区域偏移问题及修复方案
---

# 微信小程序中ECharts点击区域偏移问题及修复方案

### 问题描述

在微信小程序中使用ECharts图表组件时，经常会遇到点击区域偏移的问题。这个问题在不同机型上表现不一，主要特征是：

- 在图表上点击某个区域，但实际触发的是另一个位置的点击事件
- 切换不同的机型时，偏移的位置不同
- 屏幕尺寸、像素密度不同的设备上偏移程度不同

### 原因分析

经过分析，这个问题主要由以下几个因素导致：

1. **坐标计算问题**：ECharts原生是为Web环境设计的，而小程序的触摸事件坐标系与Web环境有差异
2. **设备像素比(DPR)差异**：不同设备的DPR不同，导致实际渲染尺寸与逻辑尺寸存在差异
3. **Canvas定位问题**：Canvas在小程序页面中的实际位置与触摸事件的坐标系统不匹配

### 修复方案

通过修改`ec-canvas`组件中的触摸事件处理逻辑，可以有效解决这个问题。核心修改如下：

#### 1. 修改触摸事件处理函数

在`ec-canvas.js`中，修改`touchStart`、`touchMove`、`touchEnd`方法，重新计算触摸点相对于Canvas的准确坐标：

```javascript
touchStart(e) {
  if (this.chart && e.touches.length > 0) {
    // 获取canvas元素的位置信息
    const query = wx.createSelectorQuery().in(this);
    query.select('.ec-canvas').boundingClientRect(res => {
      if (res) {
        const touch = e.touches[0];
        // 计算触摸点相对于canvas的坐标
        const canvasOffsetLeft = res.left;
        const canvasOffsetTop = res.top;

        // 计算准确的触摸坐标
        const touchX = touch.clientX - canvasOffsetLeft;
        const touchY = touch.clientY - canvasOffsetTop;

        const handler = this.chart.getZr().handler;
        handler.dispatch('mousedown', {
          zrX: touchX,
          zrY: touchY,
          preventDefault: () => {},
          stopImmediatePropagation: () => {},
          stopPropagation: () => {}
        });
        handler.dispatch('mousemove', {
          zrX: touchX,
          zrY: touchY,
          preventDefault: () => {},
          stopImmediatePropagation: () => {},
          stopPropagation: () => {}
        });
        handler.processGesture(wrapTouch(e, canvasOffsetLeft, canvasOffsetTop), 'start');
      }
    }).exec();
  }
}
```

同样的方式修改`touchMove`和`touchEnd`方法。

#### 2. 修改wrapTouch函数

修改`wrapTouch`函数，增加对触摸点坐标的修正：

```javascript
function wrapTouch(event, canvasOffsetLeft, canvasOffsetTop) {
  for (let i = 0; i < event.touches.length; ++i) {
    const touch = event.touches[i];
    // 修正坐标偏移
    touch.offsetX = touch.clientX - canvasOffsetLeft;
    touch.offsetY = touch.clientY - canvasOffsetTop;
  }
  return event;
}
```

#### 3. 调整图表容器边距

为了减少偏移影响，在柱状图和饼图的配置中增加了边距：

```javascript
// 柱状图边距调整
grid: {
  left: '8%',     // 增加左边距
  right: '8%',    // 增加右边距
  bottom: '8%',   // 增加下边距
  top: "18%",     // 增加上边距
  containLabel: true
}

// 饼图配置调整
series: [
  {
    type: 'pie',
    radius: '80%',         // 调整饼图大小
    center: ['45%', '50%'], // 调整饼图位置
    // ...
  }
]
```

### 修改前后对比

#### 修改前

```javascript
// 修改前的触摸事件处理
touchStart(e) {
  if (this.chart && e.touches.length > 0) {
    var touch = e.touches[0];
    var handler = this.chart.getZr().handler;
    handler.dispatch('mousedown', {
      zrX: touch.x,
      zrY: touch.y,
      preventDefault: () => {},
      stopImmediatePropagation: () => {},
      stopPropagation: () => {}
    });
    // ...
  }
}

// 修改前的wrapTouch函数
function wrapTouch(event) {
  for (let i = 0; i < event.touches.length; ++i) {
    const touch = event.touches[i];
    touch.offsetX = touch.x;
    touch.offsetY = touch.y;
  }
  return event;
}
```

#### 修改后

```javascript
// 修改后的触摸事件处理
touchStart(e) {
  if (this.chart && e.touches.length > 0) {
    const query = wx.createSelectorQuery().in(this);
    query.select('.ec-canvas').boundingClientRect(res => {
      if (res) {
        const touch = e.touches[0];
        const canvasOffsetLeft = res.left;
        const canvasOffsetTop = res.top;
        const touchX = touch.clientX - canvasOffsetLeft;
        const touchY = touch.clientY - canvasOffsetTop;

        const handler = this.chart.getZr().handler;
        handler.dispatch('mousedown', {
          zrX: touchX,
          zrY: touchY,
          // ...
        });
        // ...
      }
    }).exec();
  }
}

// 修改后的wrapTouch函数
function wrapTouch(event, canvasOffsetLeft, canvasOffsetTop) {
  for (let i = 0; i < event.touches.length; ++i) {
    const touch = event.touches[i];
    touch.offsetX = touch.clientX - canvasOffsetLeft;
    touch.offsetY = touch.clientY - canvasOffsetTop;
  }
  return event;
}
```

### 总结

这个修复方案主要通过以下几点解决点击区域偏移问题：

1. 使用`createSelectorQuery`获取Canvas在页面中的实际位置
2. 通过`clientX/Y - canvasOffset`计算准确的触摸点坐标
3. 调整图表边距增加容错性

### 建议

1. 尽量保持Canvas宽高固定，减少动态变化
2. 如果页面布局复杂，可适当增加图表边距
3. 对于交互密集的图表，可以在点击后添加视觉反馈，增强用户体验

### 参考资料

- [微信小程序Canvas文档](https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html)
- [ECharts for 微信小程序](https://github.com/ecomfe/echarts-for-weixin)
- [小程序中的坐标系统](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html)
