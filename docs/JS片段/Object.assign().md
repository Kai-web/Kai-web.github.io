---
title: Object.assign()
---

# Object.assign()

- 用于合并对象的静态方法source复制到目标对象。它将返回目标对象target

## 注意
- 如果多个源对象具有相同的属性名，后面的源对象的属性值会覆盖前面的。

```js
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

const mergedObject = Object.assign(target, source);
console.log(mergedObject); // { a: 1, b: 3, c: 4 }
```

- 此方法是浅拷贝操作，只复制对象的属性的值，而不会复制对象的引用。如果源对象的属性值是一个对象或数组，复制后的目标对象与源对象之间仍然共享相同的引用。

```js
const obj1 = { a: { b: 1 } };
const obj2 = Object.assign({}, obj1);

obj2.a.b = 2;

console.log(obj1.a.b); // 2
```

## 技巧

- 在Vue和mpvue开发中，销毁页面有时需要重置初始化data中的变量，这时可以在生命周期中使用该方法重置

- mpvue小程序为例

```js
data () {
    return {
      regionList: [],
      role: '',
      region: '',
      phone: '',
      fullname: '',
      idNumber: '',
      regionType: {name: '', id: null}
    };
},

  onUnload() {
    Object.assign(this.$data, this.$options.data());
  }
```

- 还可用于mpvue小程序无法更新视图
```js
data () {
    return {
      form: {
         regionType: {name: '地州', id: '1'}
      }
    };
},
let e = {name: '区县', id: 2}
this.form = Object.assign({}, this.form, { regionType: e });
```