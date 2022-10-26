---
title: element动态设置日期选择范围
---

# element动态设置日期选择范围

*   开始日期，结束日期不可选择当前年月日之后的日期

*   开始日期可选择范围根据已选择的结束日期往前一年

*   结束日期可选择的范围根据已选择的开始日期往后一年

*   开始日期结束日期下拉框默认动态根据选择的日期展示

![](/Vue2/element动态设置日期选择范围.gif)

```html
<el-form-item class="form-item" label="开始日期" prop="startDate">
  <el-date-picker
    v-model="searchForm.startDate"
    value-format="yyyy/MM/dd"
    :picker-options="startDateOptions"
    :default-value="startDefaultValue"
    type="date"
    :editable="false"
  ></el-date-picker>
</el-form-item>

<el-form-item class="form-item" label="结束日期" prop="endDate">
  <el-date-picker
    v-model="searchForm.endDate"
    value-format="yyyy/MM/dd"
    :picker-options="EndDateOptions"
    :default-value="endDefaultValue"
    type="date"
    :editable="false"
  ></el-date-picker>
</el-form-item>
```

```javascript
data () {
  return {
    searchForm: {
      startDate: '',
      //默认选中当前日期的前一天
      endDate:
        new Date().getFullYear() +
        '/' +
        (new Date().getMonth() + 1) +
        '/' +
        (new Date().getDate() - 1),
    },
  }
},

computed: {
  // 开始日期下拉框默认展示的年月：如结束日期选择2021-10-26，那么开始日期下拉框默认定位到2020-10月
  startDefaultValue () {
    let defaultValue = ''
    if (this.searchForm.endDate) {
      defaultValue = new Date().setFullYear(new Date(this.searchForm.endDate).getFullYear() - 1)
    } else {
      defaultValue = formatDate(new Date())
    }
    return defaultValue
},

// 结束日期下拉框默认展示的年月：如开始日期选择2020-09-01，那么结束日期下拉框默认定位到2021-09月
endDefaultValue () {
  let defaultValue = ''
  if (this.searchForm.startDate) {
    defaultValue = new Date().setFullYear(new Date(this.searchForm.startDate).getFullYear() + 1)
    // 如果计算出的结束日期大于当前年月日则返回当前年月日
    if (defaultValue > Date.now()) {
      defaultValue = Date.now()
    }
  } else {
    defaultValue = formatDate(new Date())
  }
  return defaultValue
},

// 开始日期可选范围：结束日期年份减1
startDateOptions () {
  return {
    disabledDate: time => {
      if (this.searchForm.endDate) {
        return (
          time.getTime() < new Date(this.searchForm.endDate).setFullYear(new Date(this.searchForm.endDate).getFullYear() - 1) || time.getTime() > new Date(this.searchForm.endDate)
        )
      } else {
        return time.getTime() > Date.now()
      }
    }
  }
},

// 结束日期可选范围：开始日期年份加1
  EndDateOptions () {
    return {
      disabledDate: time => {
        if (this.searchForm.startDate) {
          return time.getTime() <= new Date(this.searchForm.startDate) || time.getTime() > Date.now() || time.getTime() > new Date(this.searchForm.startDate).setFullYear(new Date(this.searchForm.startDate).getFullYear() + 1)
        }
        return (
          time.getTime() > Date.now()
        )
      }
    }
  }
},

```

```javascript
//utils/tool.js
export function formatDate (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  const t1 = [year, month, day].map(formatNumber).join('-')
  
  return `${t1}`
}
```