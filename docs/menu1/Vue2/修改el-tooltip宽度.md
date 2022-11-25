---
title: 修改el-tooltip宽度
---

# 修改el-tooltip宽度

![](/Vue2/修改el-tooltip宽度.png)

```css
// 不能在<style scoped></style>中修改

<style lang="less">
  .el-tooltip__popper {
    max-width: 20%;
  }
</style>
```