---
title: 账号登录和短信登录和微信登录
---

# APP测试应用：账号登录、短信登录、微信登录

### 账号登录和短信登录

- 账号登录和短信登录与我们之前写的后台项目中的登录逻辑一样，直接拿来复用就行。

- 账号登录

<img src="/小程序/账号登录.jpg" width="200" height="200">

- 短信登录

<img src="/小程序/短信登录.jpg" width="200" height="200">

- 需要注意的是encryptlong库（长文本加密）在uniapp中使用会报错，会出现兼容的问题，通过 [encryptlong源码](https://github.com/LesixCoder/encryptlong)（长文本加密）可以看出它是基于 [jsencrypt](https://github.com/travist/jsencrypt) 库的方法拓展，所以我们需要本地修改jsencrypt库，保证兼容性。

- 导出这里因为我是vite所以用的是export default导出，如果你是webpack导出就用module.exports


### 安卓微信登录

- 微信登录的实现需要先完成以下步骤
- 首先需要制作一个发布页（用来申请移动应用的APPID）
- 登录已绑定小程序的微信开放平台申请移动应用的 AppID（应用类型流程图和申请说明尽量放简单的流程易通过，比如我这里放的放的都是一些填写表单，和查看列表，地图那些什么的先不要放，申请应用说明也要按照上传的流程图一步一步说明）。
- 到了第二步，这里就选哪种类型的应用，我这里就介绍安卓，安卓手机打正式包安装到手机后，可通过微信签名工具 Gen_Signature_Android221cbf.apk获取应用签名，填入之后，就等待审核通过，如果被拒绝，就按照拒绝理由去修改。

<img src="/小程序/微信开放平台.png" width="600" height="600">

- 安卓获取应用签名

<img src="/小程序/应用签名.png" width="200" height="200">

- 安卓微信登录成功

<img src="/小程序/微信登录成功.png" width="200" height="200">


### 移动应用申请

- 移动应用申请通过后可通过APPID微信登录。获取真正的微信登录openId和unionId需要打自定义基座调试或者打正式包。后端需要通过unionId来判断是否已经在小程序中注册过。

<img src="/小程序/移动应用申请.png" width="600" height="600">


### 参考资料
- [uni-app使用jsencrypt](https://blog.csdn.net/weixin_39370093/article/details/125840700)


