---
title: 解决多个网络请求第一次hideLoading后所有loading消失
---

# 解决多个网络请求第一次hideLoading后所有loading消失

## 问题
-  小程序中页面引入组件后，组件页面中的接口请求完成wx.hideLoading()后，父页面的loading也会提前消失

## 解决方法

-  首先需要在app.js加一个变量loadingCount
-  将loading与request请求一起封装，页面调用接口时不需要在写loading

## 完整代码
```javascript
// app.js

App({
    globalData: {
      loadingCount: 0
    },
});
```

```javascript
// utils/api.js

const request = function (obj, showLoading = true) {
  const app = getApp();
  return new Promise(function (resolve, reject) {
    app.globalData.loadingCount++;
    if (showLoading) {
      wx.showLoading({
        title: '加载中',
        mask: true,
      })
    }
    wx.request({
      url: obj.url,
      dataType: obj.dataType || 'json',
      method: obj.method || 'GET',
      header: obj.header || {
        "content-type": "application/json", //修改此处即可
        'X-Zhny-Token': wx.getStorageSync('token')
      },
      data: obj.data,
      success: function (res) {
        app.globalData.loadingCount--;
        if(app.globalData.loadingCount === 0){
          wx.hideLoading()
        }
        if (res.statusCode == 200) {
          if (res.data.errno == 501) {
            // 清除登录相关内容
            try {
              wx.removeStorageSync('userInfo');
              wx.removeStorageSync('token');
            } catch (e) {
              // Do something when catch error
            }
            // 切换到登录页面
            wx.navigateTo({
              url: '/pages/auth/user-login/user-login'
            });
          } else {
            resolve(res.data);
          }
        }
        resolve(res.data)
      },
      fail: function (err) {
        app.globalData.loadingCount -= 1;
        wx.showToast({
          title: err.errMsg,
          icon: 'none'
        })
         if(app.globalData.loadingCount === 0){
          wx.hideLoading()
        }
        reject(err)
      },
    })

  })
}
module.exports = {
  request,
}
```



