---
title: element-confirm提示Promise版
---

## element-confirm提示Promise版

```javascript
// 确认提示
areYouOK(tips) {
  return new Promise((resolve, reject) => {
    this.$confirm(tips ? tips : '确认设置为默认包?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        resolve()
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
        reject('操作取消')
      })
  })
}

//使用
async use() {
  try {
    await this.areYouOK('哈哈')
    ...
  } catch (error) {
    console.log(error)
  }
}
```