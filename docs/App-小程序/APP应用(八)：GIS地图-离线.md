---
title: GIS地图-地图离线
---

# GIS地图-地图离线

### 地图离线

- 地图离线可以采用SQLite（indexDB,瓦片以图片方式存入手机等其他方式也可实现）。实现地图离线的重要方式为mapbox的 [transformRequest](https://docs.mapbox.com/mapbox-gl-js/api/properties/#requestparameters)，它可以在地图请求外部URL之前运行回调。回调可用于拦截修改url。无网时我们可以通过transformRequest向框架发送模拟请求。

- 下载瓦片我这里使用的是fetch请求，原因是demo里是为了演示地图缓存，只要是查看过的区域就会自动缓存，后续可能会需要像奥维地图一样，有框选某片区域缓存离线瓦片的需求，那么也可以利用框选区域的zxy来fetch请求实现缓存。

### 有网时缓存瓦片到SQLite数据库

```js
  /**
   * 设置瓦片请求监听
	 * 
	 * transformRequest也可实现请求监听，这里为了不影响正常的瓦片加载流程，同时可以异步地进行缓存操作，使用了Mapbox的事件监听事件
	 * 监听两个事件：1、sourcedata：当地图源数据发生变化时触发  2、data：当地图数据加载时触发。真实业务里面我们要缓存不止地图瓦片还有地图上的图层数据，等等其他数据，
	 * 
   * @param {string[]} sources 需要缓存的瓦片源
   */
  setupTileListener(sources) {
    const handleTileEvent = (e) => {
      if (e.sourceId && sources.includes(e.sourceId) && e.tile) {
        const source = this.map.getSource(e.sourceId)
        if (source && source.tiles) {
        // 获取到标准化的瓦片坐标（z/x/y）
          const coords = e.tile.tileID.canonical          // TILEMATRIX={z} 对应缩放级别
			// TILECOL={x} 对应x坐标
			// TILEROW={y} 对应y坐标
          const url = source.tiles[0]
            .replace('{z}', coords.z)
            .replace('{x}', coords.x)
            .replace('{y}', coords.y)
			// console.log('🚀 ~ [瓦片请求:]', url, '🚀 ~ [source:]', e.sourceId)
          downloadAndCacheTile(url, coords.z, coords.x, coords.y, e.sourceId)
        }
      }
    }

    this.map.on('sourcedata', handleTileEvent)
    this.map.on('data', handleTileEvent)
  }/**
 * 下载并缓存瓦片
 * @param {string} url 瓦片URL
 * @param {number} z 缩放级别
 * @param {number} x X坐标
 * @param {number} y Y坐标
 * @param {string} source 瓦片源
 */
export const downloadAndCacheTile = async (url, z, x, y, source) => {
  try {
    // 先检查瓦片是否已存在
    const exists = await checkTileExists(z, x, y, source)
    if (exists) {
      // console.log('🚀 ~ [瓦片已存在，跳过下载:]', `z=${z}, x=${x}, y=${y}, source=${source}`)
      return null
    }

    // console.log('🚀 ~ [开始下载瓦片:]', url)
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const blob = await response.blob()
    // console.log('🚀 ~ [获取到的瓦片大小:]', blob.size, 'bytes')

    const base64Data = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })

    // console.log('🚀 ~ [Base64数据长度:]', base64Data.length)
    await saveTile(url, z, x, y, base64Data, source)
    return base64Data
  } catch (error) {
    console.log('🚀 ~ [下载瓦片失败:]', error)
    return null
  }
}
```

### 有网时的请求链接

<img src="/小程序/app地图离线有网链接.png" width="600" height="600">

### 无网加载SQLite中瓦片

```js
async createOfflineMap(container, source, options = {}) {
  // 首先从SQLite缓存获取所有瓦片
  const tiles = await getAllTiles(source)
  const tileData = formatTileData(tiles)

  // 使用特殊的瓦片源配置
  const defaultOptions = {
    style: {
      sources: {
        'offline-tiles': {
          type: 'raster',
           // 关键点1：使用特殊格式的虚拟URL（前缀可以随意定义，我们只需要和transformRequest中一样就行）
          tiles: [
            'data:image/png;base64,{z}/{x}/{y}' 
          ],
          tileSize: 256
        }
      }
    },
    // 通过 transformRequest 拦截和处理这个虚拟URL
    transformRequest: (url, resourceType) => {
    // 关键点2：识别虚拟URL请求
      if (resourceType === 'Tile' && url.includes('data:image/png;base64,')) {
      // 关键点3：从虚拟URL中提取瓦片坐标
        const parts = url.replace('data:image/png;base64,', '').split('/')
        const key = parts.join('/')
        // 关键点4：返回实际的缓存瓦片数据，框架会自己处理加载瓦片
        if (tileData[key]) {
          return { url: tileData[key] }
        }
        return { cancel: true }
      }
      return { url }
    }
  }
}
```

### 无网时模拟的请求链接

<img src="/小程序/app地图离线无网链接.png" width="600" height="600">

### 数据库中的缓存数据

<img src="/小程序/app安卓手机地图缓存.png" width="200" height="200">

- 通过数据库工具查看表结构

<img src="/小程序/app地图离线数据库示例.png" width="600" height="600">
