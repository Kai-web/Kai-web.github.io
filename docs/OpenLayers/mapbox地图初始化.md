---
title: Vue2中mapbox地图初始化
---

# mapbox

- mapbox是一个地图框架，不仅提供前端渲染能力，还具备后端服务接口能力。

- 相较于openlayers，它可构建二维和三维地图，并支持MVT大批量数据加载

# OpenLayers与Mapbox比较

- OpenLayers仅提供渲染能力，而Mapbox提供前后端接口服务能力。 

- Mapbox对OpenLayers的概念进行了封装，但不影响整体认识。 

- Mapbox可以构建二维和三维地图，而OpenLayers主要针对二维地图。 

- Mapbox提供优化导航路线和位置搜索等功能。

# mapbox地图初始化



### 安装mapbox v1版本 和 turf.js

```bash
npm install mapbox-gl
npm install @turf/turf
```

### 引入Mapbox GL库和样式文件。 

- 这里我将所有mapbox基础配置封装起来，方便多处调用，搭配天地图

```js
// /mixins/mapBoxBase.js

import { bbox } from '@turf/turf'
import mapboxGL from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// 定义地图相关的秘钥和URL
const mapKey = {
  TianDiTu: 'xxxxxxx',
  mapboxAccessToken: 'undefined' // v1版本去除了token校验
}

// 定义天地图的图层URL
const map = {
  TianDiTu: {
    // 影像底图
    img: {
      img_w: [`https://t${Math.floor(Math.random() * 8)}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${mapKey.TianDiTu}`]
    },
    // 矢量底图
    vector: {
      vec_w: [`https://t${Math.floor(Math.random() * 8)}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${mapKey.TianDiTu}`]
    },
    // 矢量注记（地区名）
    cva: {
      label: {
        urls: [`https://t${Math.floor(Math.random() * 8)}.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=${mapKey.TianDiTu}`]
      }
    }
  }
}

// 导出地图的数据源设置
export const mapSource = {
  // 天地图影像底图
  TianDiTuImg: {
    type: 'raster',
    tiles: map.TianDiTu.img.img_w,
    tileSize: 256
  },
  // 天地图矢量底图
  TianDiTuVec: {
    type: 'raster',
    tiles: map.TianDiTu.vector.vec_w,
    tileSize: 256
  },
  // 天地图矢量注记（地区名）
  TianDiTuCvaLabel: {
    type: 'raster',
    tiles: map.TianDiTu.cva.label.urls,
    tileSize: 256
  },
  // 区划面填充
  regionFill: {
    type: 'geojson',
    data: null
  },
  // 区划边界
  regionBorder: {
    type: 'geojson',
    data: null
  }
}

export default {
  data() {
    return {
      map: null,
    }
  },

  methods: {
    getMap(TianDiTuBase = mapSource.TianDiTuImg) {
      mapboxGL.accessToken = mapKey.mapboxAccessToken
      this.map = new mapboxGL.Map(
        {
          container: this.$refs.map,
          center: [88, 42], // 初始新疆地区
          zoom: 5,
          maxZoom: 24, // 最大缩放级别
          pitch: 0, // 视角倾斜度
          bearing: 0, // 视角方向
          antialias: true, // 抗锯齿
          pitchWithRotate: false, // 禁止地图随旋转倾斜
          dragRotate: false, // 禁止地图拖拽旋转
          renderWorldCopies: false, // 设置地图不连续显示
          style: {
            version: 8, // 地图样式规范的版本（必填）
            sources: {
              TianDiTuBase, // 天地图底图数据源
              TianDiTuCvaLabel: mapSource.TianDiTuCvaLabel // 天地图矢量注记数据源
            },
            // 图层
            layers: [
              {
                id: 'TianDiTuBase',
                type: 'raster', // 栅格图层
                source: 'TianDiTuBase',
                minzoom: 0,
                maxzoom: 24
              },
              {
                id: 'TianDiTuCvaLabel',
                type: 'raster', // 栅格图层
                source: 'TianDiTuCvaLabel',
                minzoom: 0,
                maxzoom: 24
              }
            ]
          },
          transformRequest: (url, resourceType) => {
            // 携带token
            if (resourceType === 'Tile' && url.startsWith('https://xxxx')) {
              return {
                url: url,
                headers: {
                  authorization: getCookie('xxxx')
                }
              }
            }
          }
        }
      )
    },
  },

  beforeDestroy() {
    this.map.remove()
    this.map = null
  }
}
```

### 使用
```js
<template>
    <div ref="map" class="map" />
</template>
<script>
    import mapBoxBase from '@/mixins/mapBoxBase'

    export default {
      mixins: [ mapBoxBase],

      mounted() {
        this.getMap()
      },
    }
</script>
<style>
    .map {
      width: 100%;
      height: 100vh;
    }
</style>
```