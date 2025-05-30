---
title: GIS地图-图层切换
---

# GIS地图-图层切换

### 图层切换

- 地图加载我们这里采用官方renderjs教程中的推荐写法：不要直接引用大型类库，推荐通过 [动态创建 script 方式引用](http://47.104.254.164:8090/wangkaibing/uniapp-app-vue3/-/blob/master/origin-other/pages/ultimateMap/index.vue?ref_type=heads3)。

- 地图加载在renderjs中尤其要注意加载顺序。

- 图层切换配置与vue后台的写法无异。

- mapbox现在最新的是v3版本，v3版本对安卓9以下不兼容，需要自己修改源码向下兼容，所以最终采用了mapbox-gl-v2.15，已去除Token验证，只要不使用 Mapbox 的在线服务，就不需要 Mapbox token。

<img src="/小程序/mapbox去除token验证.png" width="600" height="600">

- 天地图、吉林一号、mapbox地图

<img src="/小程序/app地图图层切换.png" width="600" height="600">
