---
title: JS常用片段
---

## Array.some

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

## Array.every

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

## includes

*   传入元素，如果数组中能找到此元素，则返回true，否则返回false

```javascript
const includeArr = [1, 2 , 3, '林三心', '科比']

const isKobe = includeArr.includes('科比')
console.log(isKobe) // true

if (['png', 'jpeg', 'jpg', 'gif'].includes(x)) {
  //下一步
}
```

## slice
*  slice方法只需将复数作为参数传递，它就会从最后一个索引开始对数组进行切片
*  slice不会改变原始数组

```javascript
// 获取数组最后一个元素
let arr = [1, 3, 5, 7, 9, 0]
console.log(arr.slice(-1))    // [0]
console.log(arr.slice(-3))    // [7, 9, 0]
```

## indexOf
*   indexOf 方法找到数组中特定元素的索引
*   如果要检索的字符串值没有出现，则该方法返回 -1

```javascript
let arr = [1, 3, 5, 7, 9, '张三', '李四']
console.log(arr.indexOf('张三')) // 5
console.log(arr.indexOf(3)) // 1
console.log(arr.indexOf(3)) // -1
```

## 数组反转顺序(字符串)

*   split 将字符串进行分割成多个字符串数组
*   reverse 颠倒数组中元素的顺序
*   join 把数组中的所有元素放入一个字符串

```javascript
let coord = "123.1,231.2"
location = coord.split(',').reverse().join()
console.log(location)   // "231.2,123.1"
```

## 判断对象是否为空
*   该方法有个缺点：JSON.stringify()只能序列化对象的可枚举的自有属性，即如果有属性是不可枚举或继承属性的话，结果也是true

```javascript
const obj = {}
console.log(JSON.stringify(obj) === '{}')  // true

```

*   Object.getOwnPropertyNames()
*   方法会返回该对象所有可枚举和不可枚举属性的属性名（不含Symbol属性）组成的数组。然后再通过判断返回的数组长度是否为零
*   如果为零的话就是空对象。该方法对于不可枚举的属性也能检测出来

```javascript
const obj = {}
console.log(Object.getOwnPropertyNames(obj).length === 0)  // true
```