---
title: webview使用微信JSSDK
---

# webview使用微信JSSDK

- 在小程序webview中使用微信JSSDK -- 初始化配置与获取定位例子
- wx.getLocation()
- 微信小程序必须是企业认证的

## 注意

- ios调用wx.config时当前域名最好是跳转到 webview 时的链接地址，不能有任何改变，否则会报错invalid url domain

- 安卓则需要使用当前的实际路由作为链接，所以需要在当前页面的 created 中调用 wx.config

## 步骤一

- 绑定域名

首先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。

## 步骤二

- 引入JS文件

```bash
npm install weixin-js-sdk

// 在你所需页面的代码里导入
import wx from "weixin-js-sdk";
```

## 步骤三

- 通过 config 接口注入权限验证配置
- 出于安全考虑，开发者必须在服务端实现签名逻辑，所以在前端人员开发过程中，不需要去关心这3个字段怎么来的，只需要去调用接口获取。
- timestamp、nonceStr、signature

```js
// 配置说明
// 初始化config
export async goWxConfig() {
  console.log("执行注册微信config")
  try {
    let res = await getJsSdkSignatureApi({
      appid: .....,
      url: encodeURIComponent(window.location.href.split('#')[0]) // 一定要处理
    });
    
    if (res.result) {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: ....., // 必填，公众号的唯一标识
        timestamp: res.result.timeStamp, // 必填，生成签名的时间戳
        nonceStr: res.result.noncestr, // 必填，生成签名的随机串
        signature: res.result.signature, // 必填，签名
        jsApiList: ["getLocation"] // 必填，需要使用的JS接口列表
      });
    }

    wx.ready(function () {
      console.log("wx ready");
    });
    wx.error(function(err){
      console.log("wx error", err);
      // config信息验证失败会执行 error 函数，如签名过期导致验证失败，具体错误信息可以打开 config 的debug模式查看，也可以在返回的 res 参数中查看，对于 SPA 可以在这里更新签名。
    });
  } catch (error) {
    console.warn("微信config报错：", error);
  }
}

```

# 使用

```js
// 获取定位
export getLocation() {
  console.log("执行微信定位api")
  // config信息验证后会执行 ready 方法，所有接口调用都必须在 config 接口获得结果之后，config是一个客户端的异步操作
  // 所以如果需要在页面加载时就调用相关接口，则须把相关接口放在 ready 函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在 ready 函数中。
  // wx.ready(function () {});
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'wgs84', // 默认为wgs84的 gps 坐标，如果要返回直接给 openLocation 用的火星坐标，可传入'gcj02'
      success: function (res) {
        // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        // var speed = res.speed; // 速度，以米/每秒计
        // var accuracy = res.accuracy; // 位置精度
        console.log("成功获取定位数据：", res);
        resolve(res);
      },
      fail: function (err) {
        console.log("获取定位位置信息失败：", err);
        Toast("获取定位位置信息失败：", err);
        reject();
      },
      cancel: function (err) {
        console.log('用户拒绝授权获取地理位置：', err);
        reject();
      }
    });
  })
  
}
```

- 在vue页面调用

```js
// 页面vue文件中中使用
const ua = window.navigator.userAgent.toLowerCase();
if (/iphone|ipad|ipod/.test(ua)) {
  getLocation()
    .then((res) => {
      // 执行后续代码
    })
    .catch(() => {
      // 报错
    });
} else {
  goWxConfig(); // 执行wx.config
  wx.ready(function () {
    getLocation()
      .then((res) => {
          // 执行后续代码
        })
        .catch(() => {
          // 报错
        });
  });
}
```
