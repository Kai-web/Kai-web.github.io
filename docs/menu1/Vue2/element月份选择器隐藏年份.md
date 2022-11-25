---
title: element月份选择器隐藏年份
---

# element月份选择器隐藏顶部年份

![](/Vue2/element月份选择器隐藏顶部年份.png)

```html
<el-form-item label="月份" class="form-item">
  <el-date-picker
    v-model="searchForm.month"
    type="month"
    popper-class="monthHeader"
    :popper-append-to-body="false"
    placeholder="选择月"
    format="M"
    value-format="M"
    style="width: 140px"
  >
  </el-date-picker>
</el-form-item>

<!--不能在<style scoped></style>中修改-->
<style lang="less">
  // 去除月份选择器的header
  .monthHeader {
    .el-date-picker__header {
      display: none;
    }
  }
</style>
```