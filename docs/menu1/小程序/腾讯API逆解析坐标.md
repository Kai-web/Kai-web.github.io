---
title: 小程序腾讯API逆解析坐标
---

# 腾讯API逆解析坐标

```javascript
// 获取定位坐标
getLocation() {
  wx.getLocation({
    type: 'gcj02',
    success: res=> {
      let latitude = res.latitude
      let longitude = res.longitude
      // 调用城市名称方法
      this.getCity(latitude, longitude)
    },
    fail(err) {
      //用户已授权，但是获取地理位置失败，提示用户去系统设置中打开定位
      wx.showModal({
        title: '',
        content: '请在手机系统设置中打开定位服务,在进入该页面',
        confirmText: '确定',
      })
    }
  })
}

// 腾讯API逆解析
getCity(latitude, longitude) {
// key需在腾讯地图申请
  wx.request({
    url: `https://apis.map.qq.com/ws/geocoder/v1/?key=xxxxxxxxxxxx&location=` + latitude + ',' + longitude,
    success: res => {
      const data = res.data
      console.log(data.result.ad_info)
      console.log(data.result.address)
    }
  })
},

```