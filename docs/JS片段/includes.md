---
title: includes
---

# includes

*   传入元素，如果数组中能找到此元素，则返回true，否则返回false

```javascript
const includeArr = [1, 2 , 3, '林三心', '科比']

const isKobe = includeArr.includes('科比')
console.log(isKobe) // true

if (['png', 'jpeg', 'jpg', 'gif'].includes(x)) {
  //下一步
}

if(includeArr.includes('科比')) {
  ...
}

const nameArr = ['张三', '李四', '王五']
const stationArr = ['张三', '李四']
this.station = !!stationArr.find(item => nameArr.includes(item))
console.log(this.station)     // true
```
