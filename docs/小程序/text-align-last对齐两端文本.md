---
title: text-align-last对齐两端文本
---

# text-align-last对齐两端文本

![](/小程序/text-align-last对齐两端文本.png)


```html
 <view class="item">
    <view class="label">详细地址</view>
    <view class="value">新疆维吾尔自治区乌鲁木齐市Xxx街道</view>
 </view>
```

```css
 .item {
    display: flex;
    padding-top: 20rpx;
    font-size: 32rpx;
 }
 .item .label {
    min-width: 140rpx;
    margin-right: 30rpx;
    text-align: justify;
    text-align-last: justify;
    display: block;
    float: left;
    color: #999;
    position: relative;
 }
 .item .label::after {
    position: absolute;
    right: -12rpx;
    content: ":";
 }
 ```