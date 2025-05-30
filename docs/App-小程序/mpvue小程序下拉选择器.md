---
title: mpvue小程序下拉选择器
---

# mpvue小程序下拉选择器

- 点击下拉选择器之外的区域自动收起下拉框

![](/小程序/mpvue小程序下拉选择器.gif)

```html
  <van-popup
    :show="popVisible"
    close-on-click-overlay
    safe-area-inset-bottom
    @close="popVisible = false"
    @click="checkClick"
>
  <view class="pop-item">
    <view class="input-title">下拉框</view>
    <view class='select-box' ref="selectBox">
      <view class='select' @click='selectTap'>
        <text class='select-text'>{{ form.check || '请选择' }}</text>
        <image class="com-sImg" :class="{ arrow_rotate: selectVisible }" src="https://xxxxxxxxxxx/images/arrow_down.png"></image>
      </view>
      <van-transition :show="selectVisible" custom-class="block">
        <view class='option-box'>
          <text class='option' v-for="(item, index) in  selectData" :key="index" @click="selectItem(item)">{{item}}</text>
        </view>
      </van-transition>

    </view>
  </view>
</van-popup>
```

```js
 data() {
    return {
        selectData: [
            '下拉框1',
            '下拉框1',
            '下拉框3',
            '下拉框4',
            '下拉框5'
        ],
        form: {
            check: ''
        },
        selectVisible: false,
    }
 }       

 methods: {
  // 下拉框下拉
  selectTap(e) {
    this.selectVisible = !this.selectVisible;
  },

  // 下拉框选择
  selectItem(e) {
    this.form.check = e;
    this.selectVisible = false;
  },

  // 检查点击区域是否在核查方式下拉框元素内
  // 不在核查方式下拉框内则关闭下拉框
  checkClick(e) {
    const optionBox = this.$refs.selectBox;
    const target = e.touches[0];
    if (optionBox && target) {
      const query = wx.createSelectorQuery();
      query.select('.select-box').boundingClientRect();
      query.exec((rects) => {
        const optionBoxRect = rects[0];
        if (
          optionBoxRect &&
          target.pageX >= optionBoxRect.left &&
          target.pageX <= optionBoxRect.right &&
          target.pageY >= optionBoxRect.top &&
          target.pageY <= optionBoxRect.bottom
        ) {
          // 点击在区域内
          console.log('点击在核查方式下拉框区域内');
        } else {
          // 点击在区域外
          console.log('点击在核查方式下拉框区域外');
          this.selectVisible = false;
        }
      });
    }
  }
 }
```

```less
  .pop-item {
      display: flex;
      align-items: center;
      color: #666666;
      padding: 0 35rpx 50rpx;
      .input-title {
        padding-right: 20rpx;
      }
      .select-box{
        background: #f7f8fa;
        width: 70%;
        position: relative;
        z-index: 102;
        .select{
          box-sizing: border-box;
          width: 100%;
          height: 70rpx;
          border:1px solid #efefef;
          border-radius: 8rpx;
          display: flex;
          align-items: center;
          padding: 0 20rpx;
        }
        .select-text{
          font-size: 30rpx;
          flex: 1;
        }
        .com-sImg{
          width: 10px;
          height: 9px;
          display: block;
          transition: transform 0.3s;
        }
        .arrow_rotate {
          transform:rotate(-180deg);
        }
        .option-box{
          position: absolute;
          top: 72rpx;
          width: 100%;
          border:1rpx solid #efefef;
          box-sizing: border-box;
          max-height: 500rpx;
          z-index: 101;
          overflow-y: auto;
          border-top: 0;
          background: #fff;
          //transition: height 0.3s;
          box-shadow: 0 4rpx 24rpx rgba(100, 101, 102, 0.12);
        }
        .option{
          display: block;
          line-height: 40rpx;
          font-size: 30rpx;
          border-bottom: 1px solid #efefef;
          padding: 20rpx;
        }
      }
    }
```    