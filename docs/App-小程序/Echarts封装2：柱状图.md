---
title: Echarts封装2：柱状图
---

# Echarts封装2：柱状图

- 重新优化了封装，接收参数无需在修改ec-canvas.js，初始化方式更合理

```html
// index.wxml

<view class="canvas-container">
  <ec-canvas id="echarts" canvas-id="echarts" ec="{{ ec }}"></ec-canvas>
</view>
```

```js
// index.js

import * as echarts from "../ec-canvas/echarts";

let chart = null;

// 初始化图表函数
function initChart(canvas, width, height, dpr, xAxisData, echartsData) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  })

  canvas.setChart(chart)
  let option = getChartOption(xAxisData, echartsData);
  chart.clear()
  chart.setOption(option);
  return chart;
}

// 获取图表配置
function getChartOption(xAxisData, echartsData) {
  return {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: "15%",
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      confine: true, // 确保tooltip不会超出视口
      position: (pos, params, dom, rect, size) => {
        // 保证tooltip不超出容器边界
        const obj = {top: 10};
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
        return obj;
      },
      axisPointer: {
        type: 'shadow',
      },
      textStyle: {
        fontSize: 8
      }
    },
    legend: {
      textStyle: {
        fontSize: 8,
        color: '#666666'
      },
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 15,
      icon: 'circle',
      right: 20,
      top: 0
    },
    xAxis: {
      type: 'category',
      data: xAxisData || [],
      axisTick: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        rotate: 0,
        formatter: value => {
          if (value && value.length > 10) {
            return value.slice(0, 8) + '\n' + value.slice(10)
          }
          return value
        },
        color: '#7c7c7c',
        fontSize: 8
      },
      splitLine: {
        show: false
      }
    },
    yAxis: [
      {
        show: true,
        type: 'value',
        axisLabel: {
          color: '#7c7c7c',
          fontSize: 8
        },
      }
    ],
    series: (echartsData || []).map((item) => {
      return {
        name: item.name,
        type: 'bar',
        barWidth: 10,
        label: {
          show: true,
          position: 'top',
          formatter: params => params.value > 0 ? params.value : '',
          fontSize: 8,
          color: '#333333'
        },
        itemStyle: {
          color: item.color,
          borderRadius: [20, 20, 0, 0]
        },
        data: item.data
      }
    })
  }
}

Component({
  // 接收页面传递过来的柱状图数据
  properties: {
    xAxisData: {
      type: Array,
      value: []
    },
    echartsData: {
      type: Array,
      value: []
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },
  observers: {
    'xAxisData, echartsData': (xAxisData, echartsData) => {
      if (chart) {
        // 先隐藏tooltip
        chart.dispatchAction({
          type: 'hideTip'
        });
        const option = getChartOption(xAxisData, echartsData);
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
  height: 450rpx;
}
.canvas-container ec-canvas {
  width: 100%;
  height: 100%;
}
```
