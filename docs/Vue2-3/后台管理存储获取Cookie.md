---
title: 后台管理存储获取Cookie
---

# 后台管理存储获取Cookie

```bash
npm i js-cookie
```

## 封装

```javascript
// utils/auth.js
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

## 调用

```javascript
// 其他页面调用
import { setCookie, getCookie, removeCookie } from '@/utils/auth'

// 获取Cookie
const Token = getCookie('sddatok')

// 设置Cookie
setCookie('token',data.refresh_token)

// 清除Cookie
logout ({ commit, rootState }) {
  removeCookie('Token')
  resetRouter()
}
```