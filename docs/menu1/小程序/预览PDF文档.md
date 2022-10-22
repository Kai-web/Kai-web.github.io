---
title: 预览PDF文档
---

# 预览PDF文档

```javascript
previewPdf () {
  //预览网络文档
  wx.downloadFile({
    // 下载资源的 url(接口中返回)
    url: xxxxxxxxxxxx,
    success: res=> {
     //返回的文件临时地址，用于后面打开本地预览所用
      wx.openDocument({
        filePath: res.tempFilePath ,
        success: res=> {
          console.log('打开成功');
        }
      })
    },
    fail (err) {
      wx.showToast({
        title: "下载失败",
        icon: "none",
        duration: 2000,
        mask: true
      })
    }
  })
},
```