---
title: 生成Vue页面模版
---
# 生成Vue页面模版

```javascript
<template>
  <div class="">${COMPONENT_NAME}</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // 组件名，keep-alive时，可搭配组件name进行缓存过滤
  name: '${COMPONENT_NAME}',
  // 局部注册组件，import引入的组件需要注入到对象中才能使用
  components: {},
  // 分发 Vue 组件中可复用功能
  mixins: [],
  // 这里存放数据
  data () {
    return {

    }
  },
  // 监控自己定义的变量，该变量不在data里面声明，直接在computed里面定义
  computed: {

  },
  // 监控data中的数据变化，一般用于监控路由、input输入框的值特殊处理等等，比较适合的场景是一个数据影响多个数据
  watch: {

  },
  // 方法集合
  methods: {

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  // 生命周期 - 创建之前
  beforeCreate () {

  },
  // 生命周期 - 挂载之前
  beforeMount () {

  },
  // 生命周期 - 更新之前
  beforeUpdate () {

  },
  // 生命周期 - 更新之后
  updated () {

  },
  // 生命周期 - 销毁之前
  beforeDestroy () {

  },
  // 生命周期 - 销毁完成
  destroyed () {

  },
  // 如果页面有keep-alive缓存功能，这个函数会触发
  activated () {

  }
}
</script>

<style lang="less" scoped>
// 需提前安装less依赖
// 可引入公共样式
// 例如：@import "../../css/table.less";

</style>
```