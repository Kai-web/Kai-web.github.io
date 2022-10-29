---
title: vantDialog未通过校验阻止关闭
---

# vantDialog未通过校验阻止关闭

![](/小程序/vantDialog未通过校验阻止关闭.gif)

```html
  <van-dialog
    use-slot
    title="星 级 评 定"
    show="{{ dialogVisible }}"
    show-cancel-button
    confirm-button-open-type="getUserInfo"
    bind:close="onClose"
    custom-style="border-radius: 15rpx"
    confirm-button-color="#1dab71"
    before-close="{{beforeClose}}"
  >
    <view class="dialogRate">
      <van-rate
        value="{{rateValue}}"
        size="{{25}}"
        count="{{10}}"
        color="#ffd21e"
        void-icon="star"
        void-color="#eee"
        bind:change="onChangeRate"
      />
      <view class="rateNum">星级评定：{{rateValue}}星</view>
    </view>
  </van-dialog>
```

```javascript
  Page({
    data: {
      // 弹框未通过校验阻止关闭
      beforeClose(action) {
        return new Promise((resolve) => {
          if (action === 'confirm') {
            if(this.data.rateValue >0){
              this.onSubmitRate()
              resolve(true);
            }else {
              wx.showToast({
                title: '请选择星级',
                icon: 'none'
              })
              resolve(false);
            }
          } else {
            // 拦截取消操作
            resolve(true);
          }
        });
      },
    }
  })
  
  onLoad(options) {
    this.setData({ beforeClose: this.data.beforeClose.bind(this) })
  },
```