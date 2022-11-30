---
title: Array.every
---

# Array.every

*   如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不再检测
*   如果所有元素都满足条件，则返回 true
*   every 不会对空数组进行检测
*   every 不会改变原始数组

```javascript
const everyArr = [false, true, false, true, false]

// 三个参数：遍历项 索引 数组本身
// 配合箭头函数，需要所有为true，才返回true，否则返回false
const everyArr2 = everyArr.every((bol, index, arr) => bol)
console.log(everyArr2)
```
