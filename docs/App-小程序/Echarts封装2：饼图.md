---
title: Echarts封装2：饼图
---

# Echarts封装2：饼图

- 重新优化了封装，接收参数无需在修改ec-canvas.js，初始化方式更合理

```html
// index.wxml

<view class="canvas-container">
    <ec-canvas id="echarts-pie" canvas-id="echarts-pie" ec="{{ ec }}"></ec-canvas>
</view>
```

```js
// index.js

import * as echarts from "../ec-canvas/echarts";

let chart = null;

// 初始化图表函数
function initChart(canvas, width, height, dpr, echartsData) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  })

  canvas.setChart(chart)
  let option = getChartOption(echartsData);
  chart.clear()
  chart.setOption(option);
  return chart;
}

// 获取图表配置
function getChartOption(pieData) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
      confine: true,
      textStyle: {
        fontSize: 8
      }
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 5,
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 6,
      pageButtonPosition: 'end',
      pageButtonGap: 5,
      pageButtonItemGap: 5,
      pageIconColor: '#0068b7',
      pageIconInactiveColor: '#aaa',
      pageIconSize: 5,
      pageTextStyle: {
        fontSize: 8,
        color: '#333'
      },
      textStyle: {
        fontSize: 8,
        color: '#333333'
      },
      formatter: name => {
        const item = pieData.find(data => data.name === name);
        if (item) {
          return name;
        }
        return name;
      }
    },
    series: [
      {
        type: 'pie',
        radius: '92%',
        center: ['45%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 0
        },
        label: {
          show: true,
          position: 'inside',
          formatter: '{d}%',
          fontSize: 8,
          color: '#fff',
          fontWeight: 'bold'
        },
        labelLine: {
          show: false
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 8,
            fontWeight: 'bold'
          }
        },
        data: pieData
      }
    ]
  };
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    echartsData: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    }
  },

  observers: {
    'echartsData': echartsData => {
      if (chart && echartsData && echartsData.length) {
        // 先隐藏tooltip
        chart.dispatchAction({
          type: 'hideTip'
        });
        const option = getChartOption(echartsData);
        chart.setOption(option);
      }
    }
  }
})

```

```json
{
  "component": true,
  "usingComponents": {
    "ec-canvas": "../ec-canvas/ec-canvas"
  }
}
```

```css
.canvas-container {
  width: 100%;
  height: 390rpx;
}
.canvas-container ec-canvas {
  width: 100%;
  height: 100%;
}
```
