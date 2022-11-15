---
title: element表头添加图标,悬浮内容
---

# element表头添加图标,悬浮内容

![](/Vue2/element表头添加图标,悬浮内容.png)

```javascript
<el-table-column
  label="xxxx内容1"
  show-overflow-tooltip
  prop="xxxx数据"
  :render-header="renderHeader"
></el-table-column>
<el-table-column
  label="xxxx内容2"
  show-overflow-tooltip
  prop="xxxx数据"
  :render-header="renderHeader"
></el-table-column>

methods: {
    // 表头icon提示
  renderHeader (h, { column }) {
    const nianZongShouTaiLvContent = [
      h(
        'div',
        {
          slot: 'content',
          style: 'margin-bottom:5px'
        },
        'xxxxx悬浮提示内容1'
      )
    ]
    const pingJunDongJingShuContent = h(
      'div',
      {
        slot: 'content'
      },
      '贷款 = 券后价 * 数量'
    )
    return h('div', [
      h('span', column.label),
      h(
        'el-tooltip',
        {
          props: {
            placement: 'top'
          }
        },
        [
          column.label === 'xxxx内容1' ? nianZongShouTaiLvContent : pingJunDongJingShuContent,
          h('i', {
            class: 'el-icon-question',
            style: 'color:red;margin-left:5px;font-size:16px;'
          })
        ]
      )
    ])
  },
}
```