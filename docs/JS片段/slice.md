---
title: slice
---

# slice
*  slice方法只需将复数作为参数传递，它就会从最后一个索引开始对数组进行切片
*  slice不会改变原始数组

```javascript
// 获取数组最后一个元素
let arr = [1, 3, 5, 7, 9, 0]
console.log(arr.slice(-1))    // [0]
console.log(arr.slice(-3))    // [7, 9, 0]
```
