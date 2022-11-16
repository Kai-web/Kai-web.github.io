---
title: vue后台动态控制路由权限(可单独控制二级菜单)
---

# vue后台动态控制路由权限(可单独控制二级菜单)

## 动态路由生成逻辑

*   从 `router`路由中 导入页面模块，获取用户角色 `roles`。

*   遍历 `roles`，判断是否具有路由访问权限。如果不具备，继续遍历 `roles`。如果具备，判断路由是否包含 `children`。如果包含 `children`，遍历 `children`，过滤 `children`，更新 `tmp.children`，再传入判断路由是否包含 `children`。如果不包含 `children`，将路由存入 `res`。



## 动态路由的实现

###  关键方法

*   生成动态路由的关键方法是 `premission.js` 中的 `generateRoutes` 方法，代码如下所示

```javascript
import { test1, test2, test3, test4 } from '@/router'

const actions = {
  generateRoutes ({ commit, rootState }, roles) {
    return new Promise(resolve => {
      let accessedRoutes = []
      // 超级管理员
      if (roles.includes('ADMIN')) {
        accessedRoutes = [...test1, ...test2, ...test3, ...test4]
      } else if (roles.includes('MANAGER')) {
        // 管理员
        accessedRoutes = [...test1, ...test2, ...test3, ...filterAsyncRoutes(test4, roles)]
      } else {
        accessedRoutes = [...test3]
      }
       // 将路由保存到 vuex 中
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}
```

*   `mutations` 中的 `SET_ROUTES`，代码如下所示

```javascript
const mutations = {
  SET_ROUTES: (state, routes) => {
    // 将 routes 保存到 state 中的 addRoutes
    state.addRoutes = routes
    // 将 routes 集成到 src/router/index.js 中的 constantRoutes 中
    state.routes = constantRoutes.concat(routes)
  }
}
```
### 检查权限

*   检查权限的方法 `hasPermission`，代码如下所示

```javascript
// 检查权限的方法
const hasPermission = (roles, route) => {
  // 检查路由是否包含 meta 和 meta.roles 属性
  if (route.meta && route.meta.roles) {
    // 判断 route.meta.roles 中是否包含用户角色 roles 中的任何一个权限，如果包含则返回 true
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    // 如果路由没有 meta 或 meta.roles 属性，则视为该路由不需要进行权限控制，所有用户对该路由可访问
    return true
  }
}
```

### 路由过滤

*   路由过滤的方法 `filterAsyncRoutes`，代码如下所示

```javascript
// 路由过滤
export const filterAsyncRoutes = (routes, roles) => {
  const res = []
  // 遍历全部的路由
  routes.forEach(route => {
    // 对路由进行浅拷贝，注意 children 不会拷贝，因为不需要对 children 进行判断，所有可以直接使用
    const tmp = { ...route }
    // 检查用户角色是否具备访问路由的权限
    if (hasPermission(roles, tmp)) {
      // 当路由具备访问的权限时，判断路由是否具备 children 属性
      if (tmp.children) {
        // 当路由包含 children 时，对 children 迭代调用 filterAsyncRoutes 方法
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      // 当路由具有访问权限时，将 tmp 保存到 res 中
      res.push(tmp)
    }
  })
  return res
}
```
### router路由

```javascript
// router/index.js
export const test4 = [
  {
    path: '/test4',
    redirect: '/test4/index1',
    component: () => import('@/views/base.vue'),
    meta: {
      title: '测试模块',
      icon: '测试模块',
      sidebarVisible: true,
      order: 4
    },
    children: [
      {
        path: 'index1',
        name: 'Test4Index1',
        component: () => import('@/views/test4/index1.vue'),
        meta: {
          title: '测试页面1',
          roles: ['ADMIN', 'MANAGER']
        }
      },
      {
        path: 'index2',
        name: 'Test4Index2',
        component: () => import('@/views/test4/index2.vue'),
        meta: {
          title: '测试页面2',
          roles: ['ADMIN', 'MANAGER']
        }
      }
    ]
  }
]
```

## 完整代码：permission.js

```javascript
// store/modules/permission.js

import { test1, test2, test3, test4 } from '@/router'

// 检查权限的方法
const hasPermission = (roles, route) => {
  // 检查路由是否包含 meta 和 meta.roles 属性
  if (route.meta && route.meta.roles) {
    // 判断 route.meta.roles 中是否包含用户角色 roles 中的任何一个权限，如果包含则返回 true
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    // 如果路由没有 meta 或 meta.roles 属性，则视为该路由不需要进行权限控制，所有用户对该路由可访问
    return true
  }
}

// 路由过滤
export const filterAsyncRoutes = (routes, roles) => {
  const res = []
  // 遍历全部的路由
  routes.forEach(route => {
    // 对路由进行浅拷贝，注意 children 不会拷贝，因为不需要对 children 进行判断，所有可以直接使用
    const tmp = { ...route }
    // 检查用户角色是否具备访问路由的权限
    if (hasPermission(roles, tmp)) {
      // 当路由具备访问的权限时，判断路由是否具备 children 属性
      if (tmp.children) {
        // 当路由包含 children 时，对 children 迭代调用 filterAsyncRoutes 方法
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      // 当路由具有访问权限时，将 tmp 保存到 res 中
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
     // 将 routes 保存到 state 中的 addRoutes
    state.addRoutes = routes
     // 将 routes 集成到 src/router/index.js 中的 constantRoutes 中
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes ({ commit, rootState }, roles) {
    return new Promise(resolve => {
      let accessedRoutes = []
      // 超级管理员
      if (roles.includes('ADMIN')) {
        accessedRoutes = [...test1, ...test2, ...test3, ...test4]
      } else if (roles.includes('MANAGER')) {
        // 管理员
        accessedRoutes = [...test1, ...test2, ...test3, ...filterAsyncRoutes(test4, roles)]
      } else {
        accessedRoutes = [...test3]
      }
       // 将路由保存到 vuex 中
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```