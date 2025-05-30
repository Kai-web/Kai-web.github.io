---
title: Vue2中mapbox常用方法封装
---

# Vue2中mapbox常用方法封装

### 获取行政区划边界
```js
 // 获取区划边界
    // addLayer 是否需要添加边界图层
    async getBounds(region = { standardCode: '', level: 0 }, addLayer = true) {
      try {
        if (region.level === true) {
          return
        }
        const res = await axios.get(
          `https://geoserver-xxxxxxx.cn/geoserver/wg/ows?service=WFS&version=1.0.0&request=GetFeature&typename=wg:bd_bounds&srsname=EPSG:4326&maxFeatures=2000&outputFormat=application/json&CQL_FILTER=adcode like '${region.standardCode}${encodeURIComponent('%')}' and level in (${region.level},${region.level + 1})`
        )
        if (res.data.features.length) {
          if (addLayer) {
            // 注意：先添加面 在添加边界
            this.addPolygonLayer(
              'regionFill',
              res.data,
              {
                'fill-color': '#fff',
                'fill-opacity': 0.2
              }
            )
            this.addLineLayer(
              'regionBorder',
              res.data,
              {
                'line-color': '#eb6100',
                'line-width': 2.2
              }
            )
          }
          this.setZoom(res.data, { left: -20, right: 20, top: 20, bottom: 20 })
          return res.data
        } else if (region.parentCode) {
          await this.getBounds({ standardCode: region.parentCode, level: region.level - 1 })
        } else {
          Notification.error({
            title: '提示',
            message: '未查询到该地区的边界数据'
          })
        }
      } catch (err) {
        console.log('🚀 ~ [err]', err)
        Notification.error({
          title: '查询失败',
          message: err.message
        })
      }
    },
```

### 区域面积自适应视口
```js
    // 区域面积自适应视口
    setZoom(bboxData, padding = 20 || {}) {
      if (!bboxData) return
      const bboxFeature = Array.isArray(bboxData) ? bboxData : bbox(bboxData)
      this.map.fitBounds(bboxFeature, { padding })
    },
```

### 添加图标点图层
```js
    // 添加图标点图层
    addMarkerLayer(id, geojson, iconUrl, iconSize = 1.0, paint = {}, animation = true) {
      // 移除同名图层
      if (this.map.getLayer(id)) {
        this.map.removeLayer(id)
      }

      // 添加或更新数据源
      const source = this.map.getSource(id)
      if (source) {
        source.setData(geojson)
      } else {
        this.map.addSource(id, { type: 'geojson', data: geojson })
      }

      // 统一的图层添加逻辑
      const addLayer = () => {
        this.map.addLayer({
          id,
          type: 'symbol',
          source: id,
          layout: {
            'icon-image': Array.isArray(iconUrl) ? ['get', iconUrl[1]] : iconUrl,
            'icon-size': iconSize,
            'icon-anchor': 'bottom',
            'icon-ignore-placement': true,
            'icon-allow-overlap': true,
            'symbol-sort-key': ['get', 'priority']
          },
          paint
        })
      }

      // 如果是使用表达式，先预加载所有图标
      if (Array.isArray(iconUrl)) {
        // 获取所有不同的图标URL
        const iconUrls = new Set()
        geojson.features.forEach(feature => {
          if (feature.properties?.icon) {
            iconUrls.add(feature.properties.icon)
          }
        })

        // 预加载所有图标
        Promise.all([...iconUrls].map(url =>
          new Promise(resolve => {
            if (this.map.hasImage(url)) {
              resolve()
              return
            }
            this.map.loadImage(url, (error, image) => {
              if (error) {
                console.warn(`Failed to load image: ${url}`, error)
                resolve()
                return
              }
              this.map.addImage(url, image, { sdf: false })
              resolve()
            })
          })
        )).then(() => {
          addLayer()
        })
      } else {
        // 单一图标的处理逻辑
        if (this.map.hasImage(iconUrl)) {
          addLayer()
        } else {
          this.map.loadImage(iconUrl, (error, image) => {
            if (error) return console.warn(`Failed to load image: ${iconUrl}`, error)
            this.map.addImage(iconUrl, image, { sdf: false })
            addLayer()
          })
        }
      }
    },
```

### 添加区划面图层
```js
    addPolygonLayer(id, geojson, paint = {}) {
      // 移除同名图层
      if (this.map.getLayer(id)) {
        this.map.removeLayer(id)
      }
      // 添加或更新数据源
      const source = this.map.getSource(id)
      if (source) {
        source.setData(geojson)
      } else {
        this.map.addSource(id, { type: 'geojson', data: geojson })
      }
      // 添加填充图层
      this.map.addLayer({
        id,
        type: 'fill',
        source: id,
        paint
      })
    },
```

### 添加线图层
```js
    addLineLayer(id, geojson, paint = {}) {
      // 先移除之前的同名图层
      if (this.map.getLayer(id)) {
        this.map.removeLayer(id)
      }
      // 添加或更新数据源
      const source = this.map.getSource(id)
      if (source) {
        source.setData(geojson)
      } else {
        this.map.addSource(id, { type: 'geojson', data: geojson })
      }
      this.map.addLayer({
        id,
        type: 'line',
        source: id,
        paint
      })
    },
```

### 将点数据转换成GeoJson数据
```js
    toGeoJSON(location, id) {
      return {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [location.lng, location.lat]
            },
            properties: {
              id
            }
          }
        ]
      }
    }
```