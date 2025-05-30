---
title: 定位和导航
---

# APP测试应用：定位和导航

### 定位

- 有网定位时，如果手机能够连接到 Wi-Fi 或移动数据网络，浏览器可能会使用 网络定位来进行定位，如果位置比较偏远，周围的基站又比较少，这时候就会造成定位漂移（这也是影响定位的其中一个原因），如果你的小程序对无网定位不是那么苛刻，可以使用小程序的缓存管理器来解决，这个缓存管理器如果你是在使用过程中断网，去调用wx.getLocationg是没问题的，如果你是好几天没网，而且又是冷启动，这个缓存管理器有时候获取不到坐标，就不稳定。

- 无网定位时，精度通常依赖于 [手机GPS](https://weibo.com/ttarticle/p/show?id=2309405120195541991703) 本身的精度，可以提供几米到十几米的误差范围。精度也会受到多种因素影响，如手机的质量、卫星信号的强弱、环境的开阔程度等，关于手机gps定位的原理，网上有很多文章，不同年份发布的不同型号的手机定位都是有区别的，单频，双频，三频，等等这些参数都可以在手机型号的详情页找到。

- 无网定位时，由于没有网络支持，GPS 定位的速度可能比有网络时要慢，尤其是在首次定位时，可能需要更多时间来连接到卫星。

- uniapp和h5+里的定位api调用和小程序没有区别，如果使用 [uni](https://uniapp.dcloud.net.cn/tutorial/app-geolocation.html#geolocation%E5%AE%9A%E4%BD%8D) 或者 [H5+](https://www.html5plus.org/doc/zh_cn/geolocation.html) 定位API返回的wgs84坐标，绘制到天地图上时不需要对坐标进行转换，[高德SDK](https://lbs.amap.com/api/android-location-sdk/locationsummary/)，[百度SDK](https://lbsyun.baidu.com/faq/api?title=android-locsdk)，腾讯等坐标系需要转换坐标。

- 百度地图目前与uniapp终止合作，但是在源码视图中也可配置，选择本地打包后也可使用。（不确定是否会出现问题）

<img src="/小程序/App模块配置定位.png" width="600" height="600">

### 导航

- [导航API](https://uniapp.dcloud.net.cn/api/location/open-location.html#openlocation) 调用与原生小程序无异，可选择手机中安装的地图应用

<img src="/小程序/app定位导航.png" width="600" height="600">
