---
title: element表格动态列排序错乱问题
---

# element表格动态列排序错乱问题

-  使用element-table表格的<el-table-column></el-table-column>需要v-if判断动态展示列时,有时会发生表格排序错乱的问题

![](/Vue2/element表格动态列排序错乱问题.png)

- 解决方法

- 给每个el-table-column加一个key值,注意是每一个el-table-column,可以用数字的方式给key赋值