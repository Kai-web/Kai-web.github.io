---
title: Echarts封装思路
---

# Echarts封装思路

- 减少多个option
- 方便复用
- 自动化导入，不需要一个个import
- 图表根据界面缩放自动缩放，不需要手动调用

```json
|-- src
    |-- components
        |-- chart
            |-- index.vue    // 图表单文件组件，供界面调用
            |-- index.js    // 实现自动化导入options里的图表option
            |-- options    // 存放各种图表的option
                |-- pie    // 随便一例子
                    |-- index.js
    |-- views
        |-- chartPage    // 实例所在
            |-- index.vue
|-- main.js    // 全局引入echarts图表，方便复用
```

## index.vue

```javascript
// components/chart/index.vue
// 组件：供其他页面调用

<!--
    图表
    @params: width 宽度
    @params: height 高度
    @params: autoResize 是否自动调整大小
    @params: chartOption 图表的配置
-->

<template>
  <div class="chart">
    <div ref="chart" :style="{ height: height, width: width }" />
  </div>
</template>
<script>

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]
)

export default {
  name: 'ChartView',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartOption: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: 'canvas'
    },
    playHighlight: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chart: null,
      // 动画定时器
      actionTimer: '',
      currentIndex: -1
    }
  },
  watch: {
    chartOption: {
      deep: true,
      handler(newVal) {
        this.setOptions(newVal)
      }
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      window.addEventListener('resize', this.resizeHandler)
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.resizeHandler)
    }
    this.chart.dispose()
    this.chart = null

    clearInterval(this.actionTimer)
    this.actionTimer = null
  },
  methods: {
    resizeHandler() {
      this.chart.resize()
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart, '', {
        renderer: this.type
      })
      this.chart.setOption(this.chartOption)
      this.chart.on('click', this.handleClick)

      if (this.playHighlight) {
        this.playHighlightAction()
      }
    },
    handleClick(params) {
      this.$emit('click', params)
    },
    setOptions(option) {
      this.clearChart()
      this.resizeHandler()
      if (this.chart) {
        this.chart.setOption(option)
      }
    },
    refresh() {
      this.setOptions(this.chartOption)
    },
    clearChart() {
      this.chart && this.chart.clear()
    },
    playHighlightAction() {
      this.actionTimer = setInterval(() => {
        const dataLen = this.chartOption.series[0].data.length
        // 取消之前高亮的图形
        this.chart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: this.currentIndex
        })
        this.currentIndex = (this.currentIndex + 1) % dataLen
        // 高亮当前图形
        this.chart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: this.currentIndex
        })
        // 显示tooltip
        this.chart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: this.currentIndex
        })
      }, 1000)
    }
  }
}
</script>
<style scoped lang="scss">
</style>
```

## index.js

```javascript
// components/chart/index.js
// 图表遍历导入，页面调用时无需多次import

const modulesFiles = require.context('./options', true, /index.js$/)
let modules = {}
modulesFiles.keys().forEach(item => {
  modules = Object.assign({}, modules, modulesFiles(item).default)
})
export default modules
```

## pie：饼图封装示例

```javascript
// components/chart/options/pie/index.js
/**
 * 基础饼图封装
 * @param data
 * @param color
 */

import 'echarts/lib/chart/pie'

const getPieChart = (data, color) => {
  const defaultConfig = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    color: color,
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ]
  }

  const opt = Object.assign({}, defaultConfig)
  const { grid, tooltip, xAxis, yAxis, title, series } = opt
  return {
    color,
    grid,
    tooltip,
    xAxis,
    yAxis,
    title,
    series
  }
}

export default { getPieChart }
```

## main.js：全局引入

```javascript
// eCharts组件(全局引入，方便调用)
import eChartFn from '@/components/chart/index.js'
import ChartPanel from '@/components/chart/index.vue'
Vue.component(ChartPanel.name, ChartPanel)
Vue.prototype.$eChartFn = eChartFn
```

## 其他页面调用示例

```javascript
<template>
  <div class="chart-page">
    <chart-view class="chart-content" :chart-option="chartPineOpt" :auto-resize="true" height="100%" />
    <chart-view class="chart-content" :chart-option="chartPineOpt" :auto-resize="true" height="100%" />
  </div>
</template>

<script>
export default {
  name: 'chartPage',

  components: {},

  mixins: [],

  data() {
    return {
      chartPineOpt: {}
    }
  },

  created() {
    this.chartPineOpt = this.$eChartFn.getPieChart([100, 23, 43, 65], ['#36CBCB', '#FAD337', '#F2637B', '#975FE4'])
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
```