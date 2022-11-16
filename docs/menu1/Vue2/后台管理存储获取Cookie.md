---
title: 后台管理存储获取Cookie
---

# 后台管理存储获取Cookie

```bash
npm i js-cookie
```

```javascript
// auth.js
// 引入 js-cookie包
import Cookies from 'js-cookie'

// 设置Cookie
export function setCookie (TokenKey, value, time) {
  if (time) {
    return Cookies.set(TokenKey, value, { expires: new Date(new Date().getTime() + time) })
  } else {
    return Cookies.set(TokenKey, value)
  }
}

// 获取Cookie
export function getCookie (TokenKey) {
  return Cookies.get(TokenKey)
}

// 移除Cookie
export function removeCookie (TokenKey) {
  return Cookies.remove(TokenKey)
}
```