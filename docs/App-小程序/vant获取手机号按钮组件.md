---
title:vant获取手机号按钮封装
---

# vant获取手机号按钮封装

![](/小程序/vant获取手机号按钮组件.png)

## 组件封装
### index.wxml

```html
<-- index.wxml -->
<van-button
  color="#09b492"
  size="small"
  custom-style="width:170rpx;height:68rpx;font-weight:500;font-size:32rpx"
  open-type="getPhoneNumber"
  bind:getphonenumber="getPhoneNumber"
>自动获取
</van-button>
```
### index.js

```javascript
// index.js
Component({
  //组件的属性列表
  properties: {},

  //组件的初始数据
  data: {
    code: '',
    pending: false,
    mobile: ''
  },

  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached: function () {
      wx.login({
        success: (res) => {
          this.setData({
            code: res.code,
          })
        },
      })
    },
  },

  //组件的方法列表
  methods: {
    getPhoneNumber (e) {
      if (this.data.pending) return;
      wx.showLoading({
        title: '加载中',
        mask: true,
      });
      this.setData({pending: true})
      const { encryptedData, iv } = e.detail
        const params = {
          encryptedData,
          iv,
          code: this.data.code,
        }
      //此处的request请求经过封装
      return request('/api/xxxxxxxx','GET', params)
        .then(res => {
          wx.hideLoading();
          this.setData({pending: false})
          if(res && res.data.success) {
            this.setData({
              mobile: res.data.data.phoneNumber,
            })
            this.triggerEvent('getMobile', this.data.mobile)
          } else {
            wx.login({
              success: (res) => {
                this.setData({
                  code: res.code,
                })
                this.getPhoneNumber
              },
            })
          }
          wx.request
        })
        .catch(err =>{
          wx.hideLoading();
          this.setData({pending: false})
          wx.showModal({
            title: '提示',
            content: '手机号获取失败',
            showCancel:false,
            confirmColor: '#1dceb2',
          })
        })
    }
  }
})
```
### index.json

```json
// index.json
{
  "component": true,
  "usingComponents": {}
}
```

## 调用
### index.html
```html
<--index.html-->
<van-field value="{{form.mobile}}" input-align="right" label="手机号" placeholder="请输入手机号" type="number" maxlength="{{11}}" use-button-slot>
    <get-mobile slot="button" bind:getMobile="getMobile"></get-mobile>
</van-field>
```
### index.js

```javascript
  data: {
    form: {
      mobile: ''
    }
  }
  //获取手机号
  getMobile(e) {
    this.setData({
      'form.mobile': e.detail
    })
  },
```
### index.json

```json
// index.json
{
  "navigationStyle": "custom",
  "usingComponents": {
    "get-mobile": "../../components/getMobile/index"
  }
}
```