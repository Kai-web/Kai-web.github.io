---
title: APP内版本更新
---

# APP测试应用：APP内版本更新

### 注意

- 该文介绍App内版本更新，未涉及上架应用商店更新

### 版本管理

- 安卓apk下载链接必须为.apk结尾，如果不是.apk结尾，就会跳转外部下载（比如应用市场链接）。

- 苹果支持appstore链接和wgt更新，不支持整包ipa更新。

- 如果线上最新的版本是wgt热更新，用户手机中的版本落后很多后，要先更新到最新一次的整包更新，然后再更新到最新的wgt包

- 管理页列表
<img src="/小程序/app内版本更新.png" width="600" height="600">

- 新增app版本
<img src="/小程序/app内版本更新2.png" width="600" height="600">

- 编辑app版本
<img src="/小程序/app内版本更新3.png" width="600" height="600">

### 整包更新

- 在pages.json中添加页面路径。注意：一定不要设置为pages.json中第一项。
```js
"pages": [
		{
			"path": "pages/appVersion/index",
			"style": {
					"app-plus": {
							"animationDuration": 200,
							"animationType": "fade-in",
							"background": "transparent",
							"backgroundColorTop": "transparent",
							"popGesture": "none",
							"scrollIndicator": false,
							"titleNView": false
					},
					"disableScroll": true
			}
		}
]
```

- 我这里采用的更新实际是跳转到一个新页面，这么做的原因是为了覆盖底下的tabbar，其他方式也可实现。
- 这里就不展示详细代码了

### 注意

- 整包更新的原理就是重新安装最新的应用（手机会卸载原来的重新安装）。

- 调试需要打自定义基座测试或者打正式包，否则uni.getSystemInfoSync().platform获取到的可能不是android或者ios，会导致无法跳转更新页

- 进度条显示，下载apk完成后，安卓不会自动弹出安装页面，原因：可能是离线打包未添加安卓安装权限，请添加以下权限或者使用云打包。

```js
<uses-permission android:name="android.permission.INSTALL_PACKAGES" />

<uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />
```

<img src="/小程序/app整包更新.png" width="600" height="600">


### wgt热更新

- 热更新包较小，如果选择静默更新，可以不弹窗后台会静默更新，下次重新启动应用自动更新，与小程序的更新类似。
- 不能热更新的有：1、增加推送、第三方登录、地图、视频播放、支付等模块，或者其他安卓权限。2、修改启动图或者app图标。
- 进度条100%，苹果无法安装，原因：1、wgt包名不要设置为中文，2、增加原生模块必须上传appstore，不能热更新。
- 热更新时wgt包可以下载，但是无法安装，控制台提示wgt/wgtu文件格式错误。解决方法：下载地址必须为http://xxxxxx.wgt的格式，就是链接必须以.wgt结尾。2、如果地址是http://xxxxxx.wgt格式，请在浏览器打开这个下载地址，如果无法自动下载，上传的包可能存在问题。

<img src="/小程序/appwgt热更新.png" width="600" height="600">