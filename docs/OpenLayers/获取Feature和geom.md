---
title: 获取Feature和geom
---

# 获取Feature和geom

## 点击地图获取Feature

```js
mapClick() {
	this.map.on('click', e => {
		this.map.forEachFeatureAtPixel(e.pixel, feature => {
			this.getGeom(feature).then(res => {
				console.log(res)
			})
		})
	})
}
```

## 获取Feature的geom

```js
// import { toLonLat } from 'ol/proj'

getGeom (feature) {
  return new Promise(resolve => {
    const geom = feature.getGeometry().getCoordinates()[0]
    // 转换4326
    // for (let i = 0; i < geom.length; i++) {
    //   for (let j = 0; j < geom[i].length; j++) {
    //     geom[i][j] = toLonLat(geom[i][j], 'EPSG:3857')
    //   }
    // }
    resolve({
      geom
    })
  })
}
```

## 初始化地图和点击方法

```js
mounted() {
	this.initMap()
	this.mapClick()
}
```
