---
title: OpenLayers基本使用
---


![](/OpenLayers/OpenLayers基本使用.png)


# 安装OpenLayers

## 安装openLayers包

- 我这里使用的7.1.0版本

```bash
npm install ol@7.1.0
```

## 使用

- 在vue中使用

```javascript
<template>
  <div id="map" />
</template>
<script>
import 'ol/ol.css'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import { Map, View } from 'ol'
import { fromLonLat } from 'ol/proj'

export default {
  data() {
    return {
      map: null,
      mapView: {
        center: fromLonLat([108.939062, 34.374741]), // 地图中心点
        zoom: 11, // 初始缩放级别
        minZoom: 10, // 最小缩放级别
        maxZoom: 17 // 最大缩放级别
      },
      // 瓦片引入地址 nginx
      // mapUrl: `http://127.0.0.1:9098/tiles/{z}/{x}/{y}.png`
      // 瓦片本地引入 瓦片等级越高加载编译越慢
      // 在 public 下新建 tiles 文件夹，将下好的瓦片放进去
      mapUrl: `tiles/{z}/{x}/{y}.png`
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    // 初始化地图
    initMap() {
      const tileLayer = new TileLayer({
        source: new XYZ({
          url: this.mapUrl
        })
      })
      this.map = null
      this.map = new Map({
        layers: [tileLayer],
        view: new View(this.mapView),
        target: 'map' // 将地图注入到 dom 元素中，此处写 dom id
      })
    }
  }
}
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>

```
