---
title: Vue2中mapbox批量加载点
---

# Vue2中mapbox批量加载点的一种方法

### 注意

- 如果打点数据量较小可以使用该方法
- 采用了数据分块加载和虚拟列表
- 如果需要优化大数据量渲染性能，可以考虑通过map.addSource('source_id', { type: 'vector', url: '...' })方式接入MVT服务。动态加载可见区域数据
- 当前分块加载实现方案更适合中等数据量场景。

### 示例

```js
    // 先引入
    import pako from 'pako'

    // 获取地图标点
    async getMapMarker() {
      this.mapLoading = true
      // 再次点击清除所有标点
      this.markerAll = !this.markerAll
      // 清除所有动画
      this.clearAllAnimations()
      // 清除所有标点和数据源
      this.clearLayersAndSources()
      if (this.markerAll) {
        const params = {
          date: this.date,
          endDate: this.endDate,
          organization: this.organization.id,
          hydatidSystem: true,
          zip: true
        }
        const res = await this.$get('/api/xxxxxxx', params)
        if (res !== -1) {
          const binaryData = atob(res)
          const bytes = new Uint8Array(binaryData.length)
          for (let i = 0; i < binaryData.length; i++) {
            bytes[i] = binaryData.charCodeAt(i)
          }
          const decompressedData = JSON.parse(pako.inflate(bytes, { to: 'string' }))
          if (decompressedData.features.length) {
            // 调用分批加载
            await this.processMarkerData(decompressedData)
          } else {
            this.$notify.warning({
              title: '提示',
              message: '暂无数据'
            })
          }
        }
      }
      this.mapLoading = false
    },

    async processMarkerData(decompressedData) {
      const total = decompressedData.total
      const batchSize = 1000 // 根据实际情况调整分组
      const batchDelay = 5000 / Math.ceil(total / batchSize) // 根据实际情况调整间隔时间
      let currentIndex = 0
      const loadBatch = async(geojson, index) => {
        let batch = geojson.features.slice(index, index + batchSize)
        batch = {
          type: 'FeatureCollection',
          features: batch
        }
        await this.addMarkerLayer(
          `realTimeMap-AllMarker-${index}`,
          batch,
          this.markerImageUrl,
          1.0,
          {},
          false
        )
      }
      const processBatch = async() => {
        while (currentIndex < total) {
          await loadBatch(decompressedData, currentIndex)
          currentIndex += batchSize
          await new Promise(resolve => setTimeout(resolve, batchDelay))
        }
      }
      // 执行批处理
      processBatch()
    },
```