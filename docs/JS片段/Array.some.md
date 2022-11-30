---
title: Array.some
---

# Array.some

*   如果有一个元素满足条件，则表达式返回true，剩余的元素不会在执行检测
*   如果没有满族条件的元素，则返回false
*   some 不会对空数组进行检测
*   some 不会改变原始数组

```javascript
const someArr = [false, true, false, true, false]

// 三个参数：遍历项 索引 数组本身
// 配合箭头函数，只要有一个为true，就返回true，一个都true都没有，就返回false
const someArr2 = someArr.some((bol, index, arr) => bol)
console.log(someArr2)     true

let roles = [
  {
    description: "普通用户"
    id: "001"
    name: "USER"
  },
  {
    description: "专家"
    id: "002"
    name: "EXPERT"
  }
]
let isExpert = roles.some(item => item.description === '专家')
console.log(isExpert === ture);

// 如果有相同项就返回true，否则返回false
let newfilename = '测试文件.doc'
let fileType = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf']
const str = newfilename.split('.')[newfilename.split('.').length - 1]
const isHave = fileType.some((item) => {
  return item === str
})
console.log(isHave)    // true
```
