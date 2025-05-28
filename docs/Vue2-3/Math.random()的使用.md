---
title: Math.random()的使用
---

# Math.random()的使用

## 原理
- el-table动态设置key

## 可解决的问题

- 表格中的值更新后表格未重新渲染
- 表格抖动问题
- table的column,可以根据条件if来判断是否显示，有时会出现不显示的问题

## 注意

- 千万不用使用:key="Math.random()"，否则坑会很多，切记

```html
<el-table
    :data="tableData"
    :key="tableKey"
    style="width: 100%">
    <el-table-column
        prop="date"
        label="日期"
        width="180">
    </el-table-column>
    <el-table-column
        v-for="(item, index) in nameList"
        :key="'name' + index"
        prop="name"
        label="姓名"
        width="180">
    </el-table-column>
    <el-table-column
        prop="address"
        label="地址">
    </el-table-column>
</el-table>

<script>
    export default {
         data () {
            return {
                tableKey: '1'
            }
          }
    }

    methods: {
        changeIsFliter (row, state) {
            this.tableKey = Math.random()
        },
    }
</script>
 ```   