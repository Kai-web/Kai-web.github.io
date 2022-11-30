---
title: computed计算属性的使用
---

# computed计算属性的使用

## 根据选择的id返回name属性

```html
<div>{{stepsName(townsList,dialogForm.townCollectStation)}}</div>
```

```javascript
computed: {
  stepsName: function () {
    return function (a, b) {
      let name = ''
      a.forEach(item => {
        if (item.organizationId === b) {
          name = item.name
        }
      })
      return name
    }
  }
}
```
