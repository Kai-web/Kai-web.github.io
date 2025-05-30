---
title:姓名添加特殊字符组件(vant)
---

# 姓名添加特殊字符组件(vant)

![](/小程序/输入姓名添加特殊字符组件.png)

## 组件封装

### index.wxml
```html
<view class="special" catch:tap="addSpecial">·</view>
```

### index.js
```javascript
Component({
  methods: {
    addSpecial() {
      this.triggerEvent('addSpecial', '·')
    }
  }
})
```

### index.json
```json
{
  "component": true
}
```

### indx.wxss
```css
.special {
  width: 68rpx;
  height: 68rpx;
  line-height: 68rpx;
  background-color: #eee;
  color: #000;
  font-weight: bold;
  text-align: center;
  border-radius: 8rpx;
}
```

## 调用

### index.wxml
```html
<van-field 
  value="{{form.fullname}}" 
  hold-keyboard 
  input-align="right" 
  label="真实姓名" 
  placeholder="请输入真实姓名"
  maxlength="{{20}}"
  required
>
  <special-name slot="button" bind:addSpecial="addSpecial"></special-name>
</van-field>
```

### index.js
```javascript
  data: {
    form: {
      fullname: ''
    }
  }
  // 姓名添加特殊字符
  addSpecial(e) {
    this.setData({
      'form.fullname': this.data.form.fullname + '·'
    })
  },
```

### index.json
```json
{
  "navigationStyle": "custom",
  "usingComponents": {
    "special-name": "../../components/specialName/index",
  },
}
```

