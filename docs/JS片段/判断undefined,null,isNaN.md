---
title: 判断undefined，null，isNaN
---

# 判断undefined，null，isNaN

*  undefined，null，isNaN返回空字符串，否则返回原值并转换为字符串

```javascript
function verIllegal (tmp) {
  if((typeof(tmp) == "undefined") || (!tmp && typeof(tmp) != "undefined" && tmp != 0) || (!isNaN(tmp))) {
    return ''
  } else {
    return tmp.toString()
  }
}
```
