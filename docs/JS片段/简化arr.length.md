---
title: Array.prototype.at()简化arr.length
---

# Array.prototype.at()简化arr.length

*  `Array.prototype.at()`接收一个正整数或者负整数作为参数，表示获取指定位置的成员

*  参数正数就表示顺数第几个，负数表示倒数第几个，这可以很方便的某个数组末尾的元素

```javascript
var arr = [1, 2, 3, 4, 5]
// 以前获取最后一位
console.log(arr[arr.length-1]) //5
// 简化后
console.log(arr.at(-1)) // 5
```
