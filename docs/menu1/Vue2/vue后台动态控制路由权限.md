---
title: vue后台动态控制路由权限（可单独控制二级菜单，三级菜单）
---

# vue后台动态控制路由权限（可单独控制二级菜单，三级菜单）

## 动态路由生成逻辑

*   从 `@router` 读取 `asyncRoutes` 和 `constantRoutes`，获取用户角色 `roles`，判断 `roles` 是否包含 `admin`。

*   如果 `roles` 是包含 `admin`，将过滤后的 `asyncRoutes` 保存到 `vuex` 中。

*   如果 `roles`不包含 `admin`，那么遍历 `roles`，判断是否具有路由访问权限。如果不具备，继续遍历 `roles`。如果具备，判断路由是否包含 `children`。如果包含 `children`，遍历 `children`，过滤 `children`，更新 `tmp.children`，再传入判断路由是否包含 `children`。如果不包含 `children`，将路由存入 `res`，将过滤后的 `asyncRoutes` 保存到 `vuex `中。

*   将过滤后的 `asyncRoutes` 保存到 `vuex` 中后，`asyncRoutes` 和 `constantRoutes` 进行合并。



## 动态路由的实现

###  关键方法

*   生成动态路由的关键方法是 `premission.js` 中的 `generateRoutes` 方法，代码如下所示

```javascript
const actions = {
  generateRoutes ({ commit, rootState }, roles) {
    return new Promise(resolve => {
      let accessedRoutes = []
      // 超级管理员
      if (roles.includes('ADMIN')) {
        // 切换账号
        accessedRoutes = [...patrol, ...personnel, ...defaultRoutes, ...platform]
      } else if (roles.includes('MANAGER')) {
        // 管理员
        accessedRoutes = [...patrol, ...personnel, ...defaultRoutes, ...filterAsyncRoutes(platform, roles)]
      } else if (roles.includes('OFFICER')) {
        // 区域管理员
        accessedRoutes = [...defaultRoutes, ...filterAsyncRoutes(platform, roles)]
      } else if (roles.includes('DEFENDER')) {
        // 工作人员
        accessedRoutes = [...patrol, ...defaultRoutes]
      } else {
        accessedRoutes = [...defaultRoutes]
      }
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
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
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



## 完整代码：`premission.js`

```javascript
import {
  constantRoutes,
  defaultRoutes,
  patrol,
  personnel,
  platform
} from '@/router'

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
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes ({ commit, rootState }, roles) {
    return new Promise(resolve => {
      let accessedRoutes = []
      // 超级管理员
      if (roles.includes('ADMIN')) {
        // 切换账号
        accessedRoutes = [...patrol, ...personnel, ...defaultRoutes, ...platform]
      } else if (roles.includes('MANAGER')) {
        // 管理员
        accessedRoutes = [...patrol, ...personnel, ...defaultRoutes, ...filterAsyncRoutes(platform, roles)]
      } else if (roles.includes('OFFICER')) {
        // 区域管理员
        accessedRoutes = [...defaultRoutes, ...filterAsyncRoutes(platform, roles)]
      } else if (roles.includes('DEFENDER')) {
        // 工作人员
        accessedRoutes = [...patrol, ...defaultRoutes]
      } else {
        accessedRoutes = [...defaultRoutes]
      }
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



##   完整代码：`user.js`

```javascript
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction } = data

        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    router.addRoutes(accessRoutes)

    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```