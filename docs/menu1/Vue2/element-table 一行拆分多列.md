---
title: element-table 一行拆分多列
---

## element-table 一行拆分多列

![](/Vue2/element-table一行拆分多列.png)

```html
<template>
  <div class="box">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
      ></el-table-column>
      <el-table-column
        width="100px"
        prop="amount1"
        sortable
        label="数值 1"
        align="center"
      >
        <template>
          <div class="flex">
            <div class="item">9</div>
            <div class="item">10</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="amount2" sortable label="数值 2" align="center">
        <template>
          <div class="flex">
            <div class="item">9</div>
            <div class="item">10</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="amount3"
        sortable
        label="数值 3"
        align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    props: {},
    data() {
      return {
        tableData: [
          {
            id: "12987122",
            name: "王小虎",
            amount1: "234",
            amount2: "3.2",
            amount3: 10,
          },
          {
            id: "12987123",
            name: "王小虎",
            amount1: "165",
            amount2: "4.43",
            amount3: 12,
          },
          {
            id: "12987124",
            name: "王小虎",
            amount1: "324",
            amount2: "1.9",
            amount3: 9,
          },
          {
            id: "12987125",
            name: "王小虎",
            amount1: "621",
            amount2: "2.2",
            amount3: 17,
          },
          {
            id: "12987126",
            name: "王小虎",
            amount1: "539",
            amount2: "4.1",
            amount3: 15,
          },
        ],
      };
    },
    computed: {},
    components: {},
    methods: {},
    mounted() {},
    watch: {},
  };
</script>
<style lang="less">
  .box {
    margin: 50px auto;
    width: 90%;
  }
  .flex {
    .item {
      padding: 10px;
      &:first-child {
        border-bottom: 1px solid #ebeef5;
      }
    }
  }

  .el-table .cell,
  .el-table th div {
    padding: 0 !important;
    // text-align: center;
  }
</style>
```