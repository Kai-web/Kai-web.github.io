---
title: wxs的使用
---

# wxs的使用

## 在wxml页面中引入wxs文件

```html
<wxs module="filters" src="../../utils/addmul.wxs"></wxs>
```

## 保留两位小数

```html
<view>
	<span>{{filters.toFix2(money)}}</span>
</view>
```

## 保留一位小数

```html
<view>
	<span>{{filters.toFix1(money)}}</span>
</view>
```

## 保留整数

```html
<view>
	<span>{{filters.toFix(money)}}</span>
</view>
```

## addmul.wxs

```javascript
var filters = {
  toFix2: function (value) {
    return parseFloat(value).toFixed(2)//此处2为保留两位小数
  },

  toFix1: function (value) {
    return parseFloat(value).toFixed(1)//此处1为保留一位小数
  },

  toFix: function (value) {
    return parseFloat(value).toFixed(0)//此处0为取整数
  }
}

module.exports = {
  toFix2: filters.toFix2,
  toFix1: filters.toFix1,
  toFix: filters.toFix
}
```


## 当前页面使用wxs语法

### 截取时间

```html
<view>{{time.sub(beginDate,5,10)}}至{{time.sub(endDate,5,10)}}</view>

<wxs module="time">
  module.exports = {
    sub: function (val, start, end) {
      if (val === undefined || val === '' || val == null) {
        return;
      }
      if (val.length >= end) {
        return val.substring(start, end);
      } else {
        return val;
      }
    }
  }
</wxs>
```
