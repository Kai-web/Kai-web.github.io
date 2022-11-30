---
title: Array.prototype.at()简化arr.length
---

# String.prototype.replaceAll()简化replace一次性替换所有子字符串

*   `String.prototype.replaceAll()`用法与`String.prototype.replace()`类似

*   但是`replace`仅替换第一次出现的子字符串，而`replaceAll`会替换所有

*   例如需要替换所有a为A：

```javascript
// 以前
console.log('aaa'.replace(/a/g,'A')) //AAA

// 简化后
console.log('aaa'.replaceAll('a','A')) //AAA
```
