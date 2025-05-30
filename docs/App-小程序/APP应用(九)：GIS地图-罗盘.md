---
title: GIS地图-地图罗盘
---

# GIS地图-地图罗盘

### 地图罗盘

- 利用Mapbox 的 自带的定位GeolocateControl 获取用户位置，然后创建一个静态的罗盘UI，上北下南，左西右东，四个方向指示

- 将罗盘作为 Marker 添加到地图上的GeolocateControl当前位置。

<img src="/小程序/app地图罗盘.png" width="200" height="200">

```js
    // 创建静态罗盘元素
    const compassEl = document.createElement('div')
    compassEl.className = 'location-compass'
    compassEl.innerHTML = `
      <div class="compass-container">
        <div class="compass-ring"></div>
        <div class="compass-directions">
          <div class="direction-wrapper">
            <span class="direction north">北</span>
            <span class="direction east">东</span>
            <span class="direction south">南</span>
            <span class="direction west">西</span>
          </div>
        </div>
      </div>
    `

    // TODO: 添加罗盘样式 (renderjs中使用rpx样式会失效，具体原因不知)
    const style = document.createElement('style')
    style.textContent = `
      .location-compass {
        width: 120px;
        height: 120px;
        position: relative;
      }
      .compass-container {
        width: 100%;
        height: 100%;
        position: relative;
      }
      .compass-ring {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 2px solid rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      }
      .compass-directions {
        position: absolute;
        width: 140%;
        height: 140%;
        left: -20%;
        top: -20%;
        pointer-events: none;
      }
      .direction-wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .compass-directions .direction {
        position: absolute;
        font-size: 18px;
        color: #fff;
        text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
        font-weight: bold;
      }
      .compass-directions .north {
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        color: #FF4B4B;
        font-weight: 900;
        font-size: 22px;
        text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
      }
      .compass-directions .south {
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
      .compass-directions .east {
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      .compass-directions .west {
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    `
    document.head.appendChild(style)

    // 罗盘位置
    let locationMarker = null

    // 监听定位跟踪事件
    geolocate.on('geolocate', (e) => {
      const coords = e.coords
      if (!locationMarker) {
        locationMarker = new mapboxgl.Marker({
          element: compassEl,
          rotationAlignment: 'map'
        })
        .setLngLat([coords.longitude, coords.latitude])
        .addTo(this.map)
      } else {
        locationMarker.setLngLat([coords.longitude, coords.latitude])
      }
    })

		// 取消GeolocateControl激活状态(手动取消会触发该方法)
		geolocate.on('trackuserlocationend', () => {
			// 移除罗盘dom
		  if (locationMarker) {
				locationMarker.remove();
				locationMarker = null;
			}
		});

    return geolocate
  }
```

