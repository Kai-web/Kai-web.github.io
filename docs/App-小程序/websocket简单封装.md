---
title: websocket简单封装
---

# websocket简单封装

* 封装websocket,创建websocket.js

## 微信公众平台设置websocket生产地址

![](/小程序/websocket封装.png)

## app.js

```javascript
// app.js
App({
  globalData: {
    // 是否连接过webSocket
    socketOpen: false
  },
});
```

## utils/websocket.js

```javascript
// utils/websocket.js
const app = getApp()
//websocket服务器baseUrl
let webSocketUrl = ''
const env = __wxConfig.envVersion;
if(env === 'release') {
  // 生产地址 （注意域名规则！！！）
  webSocketUrl = 'wss://xxxxxxx.cn/ws'
}
let SocketTask = null;

/**
 * @param reMsg: 传入一个函数
 */

function ws_connect(reMsg){
  SocketTask = wx.connectSocket({
    url: `${webSocketUrl}`,
    header: {
      'content-type': 'application/json'
    }
  })
  wx.showLoading('连接中')

  // 开启连接
  SocketTask.onOpen(res => {
    wx.hideLoading()
    app.globalData.socketOpen = true;
    console.log('WebSocket连接已打开');
  })

  // 关闭连接
  SocketTask.onClose(onClose => {
    wx.hideLoading()
    app.globalData.socketOpen = false;
    console.log('WebSocket连接已关闭。', onClose)
    if(onClose?.code !== 1000) {
      wx.showModal({
        title: 'WebSocket连接已关闭',
        content: `错误码${onClose?.code || onClose?.reason}`,
        showCancel: false,
        confirmColor: '#1dceb2',
        success (res) {
            if(res.confirm) {
                successCallback()
            }
        }
      })
    }
  })

  // 报错
  SocketTask.onError(onError => {
    app.globalData.socketOpen = true;
    wx.hideLoading()
    console.log('WebSocket错误', onError)
  })

  // 收到消息
  SocketTask.onMessage(onMessage => {
    const data = JSON.parse(onMessage.data)
    reMsg(data);
  })
}

// 发送
function sendMsg(msg,success){
  if (app.globalData.socketOpen) {
    console.log('通过 WebSocket 连接发送数据', msg)
    SocketTask.send({
      data: JSON.stringify(msg)
    }, res => {
      success(res)
    })
  }
}

// 关闭连接
function closeWebSocket () {
  if(app.globalData.socketOpen) {
    SocketTask.close()
    SocketTask = null
    app.globalData.socketOpen = false
  }
}

module.exports.ws_connect = ws_connect;
module.exports.sendMsg = sendMsg;
module.exports.closeWebSocket = closeWebSocket;
```

## 其他页面调用

```javascript
// index.js

// 引入封装的websocket.js
const websocket = require('../../utils/websocket')

// 连接WebSocket
if(!app.globalData.socketOpen) {
    websocket.ws_connect(async (data) => {
        if(data === '连接成功') {
            //websocket发送消息
            websocket.sendMsg(res, (data) => {})
        }
    },
}

// 结束WebSocket连接
websocket.closeWebSocket()
```