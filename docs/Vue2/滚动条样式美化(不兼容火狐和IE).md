---
title: 滚动条样式美化(不兼容火狐和IE)
---

# 滚动条样式美化(不兼容火狐和IE)

![](/Vue2/滚动条样式美化(不兼容火狐和IE).png)

```css
/deep/ ::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}

/deep/ ::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #d6d7dc;
}

/deep/ ::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 10px;
  background: transparent;
}
```