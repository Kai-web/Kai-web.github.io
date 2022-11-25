---
title: el-input为number时去除右侧箭头
---

# el-input为number时去除右侧箭头

```css
/deep/.numrule input::-webkit-outer-spin-button,
/deep/.numrule input::-webkit-inner-spin-button {
    -webkit-appearance: none!important;
}
/deep/.numrule input[type="number"]{
    -moz-appearance: textfield;
}
```    