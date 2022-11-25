---
title: 防止dialog弹窗超出视窗
---

# 防止dialog弹窗超出视窗

```css
/deep/ .el-dialog {
  // 居中弹框
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 !important;
  transform: translate(-50%, -50%);
  // 防止超出视窗
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
  //实现body内部滚动
  display: flex;
  flex-direction: column;
  .el-dialog__body {
    overflow: auto;
   // 修改火狐浏览器中的滚动条宽度
    scrollbar-width: thin;
  }
}
```