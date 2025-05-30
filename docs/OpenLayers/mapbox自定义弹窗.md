---
title: Vue2中mapbox自定义弹窗
---

# Vue2中mapbox自定义弹窗

- 自定义弹窗一般封装为组件，这里就不展示详细代码了

- 弹窗一般伴随点击事件出现，所以也要监听地图点击事件

```js
import mapboxgl from 'mapbox-gl'
import mapBoxBase from '@/mixins/mapBoxBase'
import mapPopup from './components/mapPopup.vue'
import Vue from 'vue'
import gcoord from 'gcoord'

 // 在data中申明地图弹窗变量
 mapPopup: null,

  mounted() {
    this.getMap()
    // 监听点击地图
    this.map.on('click', this.onMapClickMark)
  },

  methods: {
    // 地图标点并弹窗
    // isAddMap 是否需要重新添加点
    markerAndPopup(itemVal, isAddMap = true) {
      const transitionResult = gcoord.transform([itemVal.longitude, itemVal.latitude], gcoord.BD09, gcoord.WGS84)
      if (this.mapPopup) {
        this.mapPopup.remove()
      }
      const layerMqMarker = this.map.getLayer(`realTimeMap-MqMarker-${itemVal.id}`)
      if (!layerMqMarker && isAddMap && !this.markerAll) {
        const geoJSON = this.toGeoJSON({ lng: transitionResult[0], lat: transitionResult[1] }, itemVal.id)
        this.addMarkerLayer(
          'realTimeMap-Marker-list',
          geoJSON,
          this.markerImageUrl
        )
      }
      // 挂载弹窗
      const p = Vue.extend(mapPopup)
      // eslint-disable-next-line new-cap
      const vm = new p({
        propsData: {
          value: itemVal
        }
      })
      vm.$mount()
      this.mapPopup = new mapboxgl.Popup({ closeButton: true, offset: [-110, -15], closeOnClick: false, anchor: 'bottom' })
        .setLngLat([Number(transitionResult[0]), Number(transitionResult[1])])
        .setDOMContent(vm.$el)
        .addTo(this.map)
        // 飞行
      this.map.flyTo({
        center: [Number(transitionResult[0]), Number(transitionResult[1])],
        zoom: 12,
        bearing: 0
      })
    },

    // 点击地图
    onMapClickMark(e) {
      const features = this.map.queryRenderedFeatures(e.point)
      // 只能点击到Marker
      if (features.length && features[0].layer.id.includes('Marker')) {
        this.getRecordDetail(features[0].properties.id)
      }
    },

    // 获取详情
    getRecordDetail(id, isAddMap = false) {
      this.mapLoading = true
      return this.$api.get(`/api/xxxx/${id}`).then(res => {
        this.mapLoading = false
        if (res.data.id) {
          this.markerAndPopup(res.data, isAddMap)
          return res
        } else {
          this.$notify.error({
            title: '获取详情失败',
            message: res.message || ''
          })
        }
      })
    },
  }
```