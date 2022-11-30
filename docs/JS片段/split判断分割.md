---
title: split判断分割
---

# split判断分割

*   当数据如果有逗号以逗号分割字符串,没逗号不使用split分割

```javascript
data: {
  images: "https://www.xxxx.com/1234.jpg"
  images: "https://www.xxxx.com/12345.jpg,https://www.xxxx.com/123456.jpg"
}

item.images = (item.images || '').split(',')
```
