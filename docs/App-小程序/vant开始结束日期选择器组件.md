---
title: vant开始结束日期选择器组件
---

# vant开始结束日期选择器组件

*   开始日期不能大于结束日期
*   结束日期不能小于开始日期
*   开始日期默认选择6天前

![](/小程序/vant开始结束日期选择器组件.gif)

## index.html
```html
<view class="comp">
  <view class="label">{{lang.home.date}}</view>
  <view class="interval">
    <view class="date {{isJump ? 'placeholder': ''}}" catch:tap="onDisplay" data-index='{{0}}' wx:if="{{beginDate}}">{{beginDate}}
<!--      <van-icon catch:tap="clearDate" data-clear="startDate" data-index='{{0}}' name="clear" color="#999" size="38rpx" custom-style="padding-left:20rpx"/>-->
    </view>
    <view class="placeholder" catch:tap="onDisplay" data-index='{{0}}' wx:else>开始日期</view>
    <view class="line"></view>
    <view class="date {{isJump ? 'placeholder': ''}}" catch:tap="onDisplay" data-index='{{1}}' wx:if="{{endDate}}">{{endDate}}
<!--      <van-icon catch:tap="clearDate" data-clear="startDate" data-index='{{1}}' name="clear" color="#999" size="38rpx" custom-style="padding-left:20rpx"/>-->
    </view>
    <view class="placeholder" catch:tap="onDisplay" data-index='{{1}}' wx:else>结束日期</view>
  </view>
  <slot ></slot>
</view>
<van-popup show='{{show}}' position='bottom' z-index='6000'>
  <van-datetime-picker
    type="date"
    value="{{ chooseIndex === 0 ? ( minDate || currentDate) : maxDate  }}"
    max-date='{{chooseIndex === 0 ? maxDate : currentDate}}'
    min-date='{{chooseIndex === 0 ? null : minDate }}'
    formatter='{{formatter}}'
    bind:confirm='confirm'
    bind:cancel='onDisplay'
    bind:change="change"
    title="{{chooseIndex === 0 ? '选择开始日期' : '选择结束日期'}}"
  />
</van-popup>
```

## index.js

```javascript

import {timeStampToDate, getAWeekAgo} from "../../utils/format"

Component({
  properties: {
    putInStart: {
      type: String,
      value: ''
    },

    putInEnd: {
      type: String,
      value: ''
    },

    // 从其他页面跳转进入禁止选择日期
    isJump: {
      type: Boolean,
      value: false
    },
  },

  observers: {
    putInEnd(n) {
      this.initData()
    }
  },

  data: {
    show: false,
    beginDate: '',
    endDate: '',
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    minDate: null,
    chooseIndex: 0,
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`
      }
      if (type === 'day') {
        return `${value}日`
      }
      return value
    },
  },

  methods: {
    setLanguage() {
      this.setData({
        lang: wx.$T.getLanguage()
      })
    },
    initData() {
      this.setData({
        beginDate: this.data.putInStart,
        endDate: this.data.putInEnd,
      })
    },

    confirm(e) {
      const date = timeStampToDate(e.detail)
      const prop = this.data.chooseIndex === 0 ? 'beginDate' : 'endDate'
      const dateProp = this.data.chooseIndex === 0 ? 'minDate' : 'maxDate'
      this.setData({
        show: false,
        [prop]: date,
        [dateProp]: e.detail,
      })

      this.triggerEvent('change',  {
        beginDate: this.data.beginDate,
        endDate: this.data.endDate,
        init: false,
      })
    },

    // clearDate(e) {
    //   const {index} = e.currentTarget.dataset
    //   const prop = index === 0 ? 'beginDate' : 'endDate'
    //   const dateProp = index === 0 ? 'minDate' : 'maxDate'
    //   this.setData({
    //     [prop]: '',
    //     init: true,
    //   })
    // },

    onDisplay(e) {
      // 从其他页面跳转进入禁止选择日期
      if(this.data.isJump && this.data.putInStart) {return}
      const { index } = e.currentTarget.dataset
      this.setData({
        show: !this.data.show,
        chooseIndex: index,
      })
    },
  },
  lifetimes: {
    attached() {
      this.setLanguage()
      if (!this.data.endDate) {
        this.setData({
          beginDate: getAWeekAgo(),
          endDate: timeStampToDate(Date.parse(new Date())),
        })
      }
      this.triggerEvent('change', {
        beginDate: this.data.beginDate,
        endDate: this.data.endDate,
        init: true,
      })
    },
  }
})
```

## index.wxss

```css
.comp {
  display: flex;
  align-items: center;
  padding: 10rpx 0 0 46rpx;
  background-color: #fff;
}
.comp .label {
  font-size: 32rpx;
  color: #999;
  flex-shrink: 0;
}
.comp .interval {
  flex: 1;
  display: flex;
  align-items: center;
  margin-right: 10rpx;
  justify-content: space-around;
}
.comp .interval .line {
  width: 33rpx;
  height: 2rpx;
  background-color: #dfd3d3;
  flex-shrink: 0;
}
.comp .interval .date,
.comp .interval .placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F7F8FA;
  width: 260rpx;
  color: #444444;
  height: 60rpx;
}
.comp .interval .placeholder {
  color: #999;
}
```

## index.json

```json
{
  "component": true,
  "usingComponents": {
    "van-datetime-picker": "@vant/weapp/datetime-picker/index"
  }
}
```

## utils

```javascript

// utils/format.js

const timeStampToDate = (timestamp,type='date') => {
  //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const date = new Date(timestamp)
  const Y = date.getFullYear()
  const M = (date.getMonth() + 1).toString().padStart(2, 0)
  if (type === 'date') {
    const D = date.getDate().toString().padStart(2,0)
    return Y + '-' + M + '-' + D
  } else if (type === 'year-month') {
    return Y + '-' + M
  } else {
    console.warn('参数有误')
  }
}

// 当天往前推六天
const getAWeekAgo = () =>{
  const now = new Date()
  const date = new Date(now.getTime() - 6 * 24 * 3600 * 1000)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2,0)
  const day = (date.getDate()).toString().padStart(2,0)
  const aWeekAgo = year + '-' + month + '-' + day
  return aWeekAgo
}
```