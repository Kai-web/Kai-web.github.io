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

if(includeArr.includes('科比')) {
  ...
}

const nameArr = ['张三', '李四', '王五']
const stationArr = ['张三', '李四']
this.station = !!stationArr.find(item => nameArr.includes(item))
console.log(this.station)     // true
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

## 调换字符串位置

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

## 去除数组外部引号

```javascript
第一种方法(不推荐)
// eslint-disable-next-line no-eval
const Arrs = eval("['2021-10-23 18:28:31','2021-10-23 18:32:31']")
console.log(Arrs)  // ["2021-10-23 18:28:31", "2021-10-23 18:32:31"]

第二种方法(推荐)
const Arrs = JSON.parse("['2021-10-23 18:28:31','2021-10-23 18:32:31']")
console.log(Arrs)  // ["2021-10-23 18:28:31", "2021-10-23 18:32:31"]
JSON.parse()可以把JSON规则的字符串转换为JSONObject
```

## 获取数组中符合条件的元素

*  **filter** 方法返回一个新数组，新数组中的元素是通过检查指定数组中符合条件的所有元素，不会对空数组进行检测、不会改变原始数组
*  **map** 方法返回一个新数组，按照原始数组元素顺序依次处理元素，不会对空数组进行检测，不会改变原始数组
*  **find** 方法用于查找数组中符合条件的第一个元素，如果没有符合条件的元素，则返回undefined，不会对空数组进行检测，不会改变原始数组

```javascript
const foods = [
  { name: '汉堡', group: 1 },
  { name: '薯条', group: 1 },
  { name: '咖啡', group: 1 },
  { name: '可乐', group: 1 }
]    

const names = foods.filter(i=> i.group === 1).map(i => i.name)
console.log(names) // ['汉堡','薯条','可乐']
 
const humbugger = foods.find(i=> i.name === '汉堡' && i.group === 1)
console.log(humbugger) // {name: '汉堡', group: 1}  
```

## 数组中的元素通过时间排序

```javascript
const  list = [
    {
      title: '第一条消息',
      createTime: "2020-04-01 13:40:06"
    },
    {
      title: '第二条消息',
      createTime: "2020-04-01 13:39:06"
    },
    {
      title: '第三条消息',
      createTime: "2020-04-01 13:40:06"
    },
     {
      title: '第四条消息',
      createTime: "2020-04-01 13:39:03"
    }
  ]
  
  //降序
  list.sort((a, b)=> {
    return b.createTime < a.createTime ? -1 : 1
  })
  
  //升序
  list.sort((a, b)=> {
    return b.createTime < a.createTime ? 1 : -1
  })
```

## 数组中对象添加新属性

```javascript
let person = [
  { id: 1,name: 'vhen'},
  { id: 2,name: 'json'}
]

let newArr = obj.map((item, index) => {
  return Object.assign(item, { index: index })
})
```
## 判断是否符合正则条件

*  是否是超链接返回true或false

```javascript
const exp = /((https?|http):\/\/[^\s]*[-A-Z0-9+&@#\\/%?=~_|!:,.;]*[-A-Z0-9+&@#\\/%=~_|]*\.pdf)/g
this.table.forEach(item => {
  item.introductionLink = exp.test(item.introduction)
    ? item.introduction.replace(exp, "<a target='_blank' href='$1'>$1</a>")
    : item.introduction
})
```
## 空值合并操作符（??）

*   只有当左侧为`null`和`undefined`时，才会返回右侧的数

*   空值合并操作符（??）是一个逻辑操作符，当左侧的操作数为 `null` 或者 `undefined` 时，返回其右侧操作数，否则返回左侧操作数。

*   与逻辑或操作符（||）不同，逻辑或操作符会在左侧操作数为假值时返回右侧操作数。也就是说，如果使用 || 来为某些变量设置默认值，可能会遇到意料之外的行为。比如为假值（例如，'' 或 0）时。见下面的例子。

```javascript
let str = null || undefined
let result = str ?? '你真好看'
console.log(result)//你真好看

const nullValue = null;
const emptyText = ""; // 空字符串，是一个假值，Boolean("") === false
const someNumber = 42;

const valA = nullValue ?? "valA 的默认值";
const valB = emptyText ?? "valB 的默认值";
const valC = someNumber ?? 0;

console.log(valA); // "valA 的默认值"
console.log(valB); // ""（空字符串虽然是假值，但不是 null 或者 undefined）
console.log(valC); // 42
```
## split判断分割

*   当数据如果有逗号以逗号分割字符串,没逗号不使用split分割

```javascript
data: {
  images: "https://www.xxxx.com/1234.jpg"
  images: "https://www.xxxx.com/12345.jpg,https://www.xxxx.com/123456.jpg"
}

item.images = (item.images || '').split(',')
```
## 判断两个对象是否相等

```javascript
var a ={"name":"lsx","age":12};
var b ={"age":12,"name":"lsx"};

isObjectValueEqual(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    if (aProps.length != bProps.length) {
        return false;
    }
    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i]
        var propA = a[propName]
        var propB = b[propName]
        if ((typeof (propA) === 'object')) {
            if (this.isObjectValueEqual(propA, propB)) {
                return true
            } else {
                return false
            }
        } else if (propA !== propB) {
            return false
        } else {}
    }
    return true
}
```