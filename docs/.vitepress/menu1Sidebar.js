const commonVue = '/Vue2';
const commonMiniProgram = '/小程序';
const commonGit = '/Git';
const commonMindMap = '/思维导图';
const commonJsFragment = '/JS片段';
const commonEditorUtility = '/WebStorm编辑器';
const commonEnvironment = '/环境部署';
const commonOpenLayers = '/OpenLayers';

export const vueFragment = [
  {
    text: 'Vue2',
    collapsible: true,
    collapsed: true,
    items: [
      {text: 'vue后台动态控制路由权限', link: `${commonVue}/vue后台动态控制路由权限.md`},
      {text: '管道符的使用', link: `${commonVue}/管道符的使用.md`},
      {text: 'computed计算属性的使用', link: `${commonVue}/computed计算属性的使用.md`},
      {text: 'Math.random()的使用', link: `${commonVue}/Math.random()的使用.md`},
      {text: '接口传值时字段为空不传该字段', link: `${commonVue}/接口传值时字段为空不传该字段.md`},
      {text: 'element-confirm提示Promise版', link: `${commonVue}/element-confirm提示Promise版.md`},
      {text: 'element-table 一行拆分多列', link: `${commonVue}/element-table 一行拆分多列.md`},
      {text: 'element表格动态列排序错乱', link: `${commonVue}/element表格动态列排序错乱.md`},
      {text: 'element表头添加图标,悬浮内容', link: `${commonVue}/element表头添加图标,悬浮内容.md`},
      {text: 'element动态设置日期选择范围', link: `${commonVue}/element动态设置日期选择范围.md`},
      {text: 'element月份选择器隐藏年份', link: `${commonVue}/element月份选择器隐藏年份.md`},
      {text: '修改el-tooltip宽度', link: `${commonVue}/修改el-tooltip宽度.md`},
      {text: 'el-input为number时右侧箭头', link: `${commonVue}/el-input为number时右侧箭头.md`},
      {text: '防止dialog弹窗超出视窗', link: `${commonVue}/防止dialog弹窗超出视窗.md`},
      {text: '滚动条样式美化(不兼容火狐和IE)', link: `${commonVue}/滚动条样式美化(不兼容火狐和IE).md`},
      {text: '输入框自动填充背景色问题', link: `${commonVue}/输入框自动填充背景色问题.md`},
      {text: '侧边栏菜单渐变色', link: `${commonVue}/侧边栏菜单渐变色.md`},
      {text: '后台管理存储获取Cookie', link: `${commonVue}/后台管理存储获取Cookie.md`},
      {text: '父组件调用子组件方法', link: `${commonVue}/父组件调用子组件方法.md`},
      {text: 'Vue页面模版', link: `${commonVue}/Vue页面模版.md`},
    ]
  }
]

export const miniProgram = [
  {
    text: '小程序',
    collapsible: true,
    collapsed: true,
    items: [
      {text: 'wxs的使用', link: `${commonMiniProgram}/wxs的使用.md`},
      {text: '多个请求完成后在取消loading', link: `${commonMiniProgram}/多个请求完成后在取消loading.md`},
      {text: 'vant开始结束日期选择器组件', link: `${commonMiniProgram}/vant开始结束日期选择器组件.md`},
      {text: 'vantDialog未通过校验阻止关闭', link: `${commonMiniProgram}/vantDialog未通过校验阻止关闭.md`},
      {text: '全局监听网络状态', link: `${commonMiniProgram}/全局监听网络状态.md`},
      {text: '获取授权和定位封装', link: `${commonMiniProgram}/获取授权和定位封装.md`},
      {text: '腾讯逆解析坐标封装', link: `${commonMiniProgram}/腾讯逆解析坐标封装.md`},
      {text: '预览PDF文档封装', link: `${commonMiniProgram}/预览PDF文档封装.md`},
      {text: 'vant获取手机号按钮组件', link: `${commonMiniProgram}/vant获取手机号按钮组件.md`},
      {text: '苹果手机少数名族姓名(手机)显示', link: `${commonMiniProgram}/苹果手机少数名族姓名(手机)显示.md`},
      {text: '姓名添加特殊字符组件(vant)', link: `${commonMiniProgram}/姓名添加特殊字符组件(vant).md`},
      {text: '小程序page模版', link: `${commonMiniProgram}/小程序page模版.md`},
      {text: '小程序components模板', link: `${commonMiniProgram}/小程序components模板.md`},
    ]
  }
]

export const jsFragment = [
  {
    text: 'JS片段',
    collapsible: true,
    collapsed: true,
    items: [
      {text: '简化arr.length', link: `${commonJsFragment}/简化arr.length.md`},
      {text: '简化replace替换', link: `${commonJsFragment}/简化replace替换.md`},
      {text: '正则提取手机号', link: `${commonJsFragment}/正则提取手机号.md`},
      {text: '判断undefined,null,isNaN', link: `${commonJsFragment}/判断undefined,null,isNaN.md`},
      {text: '判断对象是否为空', link: `${commonJsFragment}/判断对象是否为空.md`},
      {text: '判断是否符合正则条件', link: `${commonJsFragment}/判断是否符合正则条件.md`},
      {text: '判断两个对象是否相等', link: `${commonJsFragment}/判断两个对象是否相等.md`},
      {text: '判断对象属性是否为空', link: `${commonJsFragment}/判断对象属性是否为空.md`},
      {text: '判断两个数组是否相等', link: `${commonJsFragment}/判断两个数组是否相等.md`},
      {text: '两个数组的相同项', link: `${commonJsFragment}/两个数组的相同项.md`},
      {text: '过滤数据或提取数据', link: `${commonJsFragment}/过滤数据或提取数据.md`},
      {text: '调换字符串位置', link: `${commonJsFragment}/调换字符串位置.md`},
      {text: '去除数组外部引号', link: `${commonJsFragment}/去除数组外部引号.md`},
      {text: '获取数组中符合条件的元素', link: `${commonJsFragment}/获取数组中符合条件的元素.md`},
      {text: '数组中的元素通过时间排序', link: `${commonJsFragment}/数组中的元素通过时间排序.md`},
      {text: '数组中对象添加新属性', link: `${commonJsFragment}/数组中对象添加新属性.md`},
      {text: '空值合并操作符', link: `${commonJsFragment}/空值合并操作符.md`},
      {text: 'split判断分割', link: `${commonJsFragment}/split判断分割.md`},
      {text: '对象转数组', link: `${commonJsFragment}/对象转数组.md`},
      {text: 'Array.some', link: `${commonJsFragment}/Array.some.md`},
      {text: 'Array.every', link: `${commonJsFragment}/Array.every.md`},
      {text: 'includes', link: `${commonJsFragment}/includes.md`},
      {text: 'slice', link: `${commonJsFragment}/slice.md`},
      {text: 'indexOf', link: `${commonJsFragment}/indexOf.md`},
    ]
  }
]

export const OpenLayers = [
  {
    text: 'OpenLayers',
    collapsible: true,
    collapsed: true,
    items: [
      {text: '正在填充', link: `${commonOpenLayers}/index.md`},
    ]
  }
]

export const gitOrder = [
  {
    text: 'Git',
    collapsible: true,
    collapsed: true,
    items: [
      {text: '常用命令', link: `${commonGit}/常用命令.md`},
      {text: '清空git远程仓库', link: `${commonGit}/清空git远程仓库.md`},
      {text: '代码提交', link: `${commonGit}/代码提交.md`},
    ]
  }
]

export const environment = [
  {
    text: '环境部署',
    collapsible: true,
    collapsed: true,
    items: [
      {text: 'Github Pages自动化部署', link: `${commonEnvironment}/Github Pages自动化部署.md`},
      {text: '环境搭建', link: `${commonEnvironment}/前端环境搭建.md`},
    ]
  }
]

export const editorUtility = [
  {
    text: 'WebStorm编辑器',
    collapsible: true,
    collapsed: true,
    items: [
      {text: '常用快捷键', link: `${commonEditorUtility}/常用快捷键.md`},
      {text: '个性化console', link: `${commonEditorUtility}/个性化console.md`},
      {text: '配置小程序Less', link: `${commonEditorUtility}/配置小程序Less.md`},
    ]
  }
]

export const mindMap = [
  {
    text: '思维导图',
    collapsible: true,
    collapsed: true,
    items: [
      {text: 'Git操作', link: `${commonMindMap}/Git操作.md`},
      {text: 'HTTP', link: `${commonMindMap}/HTTP.md`},
      {text: 'head请求头', link: `${commonMindMap}/head请求头.md`},
      {text: 'markdown语法', link: `${commonMindMap}/markdown语法.md`},
      {text: 'regx正则表达式', link: `${commonMindMap}/regx正则表达式.md`},
      {text: '盒模型', link: `${commonMindMap}/盒模型.md`},
      {text: 'css选择器', link: `${commonMindMap}/css选择器.md`},
      {text: 'css变形(transform)', link: `${commonMindMap}/css变形(transform).md`},
      {text: 'Sass', link: `${commonMindMap}/Sass.md`},
      {text: 'Flex布局', link: `${commonMindMap}/Flex布局.md`},
      {text: 'Grid布局', link: `${commonMindMap}/Grid布局.md`},
      {text: 'console技巧', link: `${commonMindMap}/console技巧.md`},
      {text: 'ECMAScript6简介', link: `${commonMindMap}/ECMAScript6简介.md`},
      {text: '编程风格', link: `${commonMindMap}/编程风格.md`},
      {text: '读懂规格', link: `${commonMindMap}/读懂规格.md`},
      {text: 'let和const命令', link: `${commonMindMap}/let和const命令.md`},
      {text: '变量的解构赋值', link: `${commonMindMap}/变量的解构赋值.md`},
      {text: 'Promise对象', link: `${commonMindMap}/Promise对象.md`},
      {text: 'async函数', link: `${commonMindMap}/async函数.md`},
      {text: '扩展运算符', link: `${commonMindMap}/扩展运算符.md`},
      {text: '函数的扩展', link: `${commonMindMap}/函数的扩展.md`},
      {text: '对象的扩展和新增方法', link: `${commonMindMap}/对象的扩展和新增方法.md`},
      {text: '数组的扩展', link: `${commonMindMap}/数组的扩展.md`},
      {text: '数值的扩展', link: `${commonMindMap}/数值的扩展.md`},
      {text: '字符串的扩展和新增方法', link: `${commonMindMap}/字符串的扩展和新增方法.md`},
      {text: '正则的扩展', link: `${commonMindMap}/正则的扩展.md`},
      {text: 'Babel转码器', link: `${commonMindMap}/Babel转码器.md`},
      {text: 'Symbol', link: `${commonMindMap}/Symbol.md`},
      {text: 'Set和Map数据结构', link: `${commonMindMap}/Set和Map数据结构.md`},
      {text: 'Proxy', link: `${commonMindMap}/Proxy.md`},
      {text: 'Reflect', link: `${commonMindMap}/Reflect.md`},
      {text: 'Iterator和for...of 循环', link: `${commonMindMap}/Iterator和for...of 循环.md`},
      {text: 'Generator函数的语法和应用', link: `${commonMindMap}/Generator函数的语法和应用.md`},
      {text: 'Class的继承', link: `${commonMindMap}/Class的继承.md`},
      {text: 'Module的语法', link: `${commonMindMap}/Module的语法.md`},
      {text: 'Module的加载实现', link: `${commonMindMap}/Module的加载实现.md`},
      {text: '异步遍历器', link: `${commonMindMap}/异步遍历器.md`},
      {text: 'ArrayBuffer', link: `${commonMindMap}/ArrayBuffer.md`},
      {text: 'Decorator', link: `${commonMindMap}/Decorator.md`},
      {text: '应用实例和组件实例', link: `${commonMindMap}/应用实例和组件实例.md`},
      {text: '模板语法', link: `${commonMindMap}/模板语法.md`},
      {text: '计算属性和监听器', link: `${commonMindMap}/计算属性和监听器.md`},
      {text: '绑定class和style', link: `${commonMindMap}/绑定class和style.md`},
      {text: '条件渲染', link: `${commonMindMap}/条件渲染.md`},
      {text: '列表渲染v-for', link: `${commonMindMap}/列表渲染v-for.md`},
      {text: '事件处理', link: `${commonMindMap}/事件处理.md`},
      {text: 'v-model及其修饰符', link: `${commonMindMap}/v-model及其修饰符.md`},
      {text: '组件的基本使用', link: `${commonMindMap}/组件的基本使用.md`},
      {text: '注册组件', link: `${commonMindMap}/注册组件.md`},
      {text: '组件Props', link: `${commonMindMap}/组件Props.md`},
      {text: '动态组件和异步组件', link: `${commonMindMap}/动态组件和异步组件.md`},
      {text: '深入组件', link: `${commonMindMap}/深入组件.md`},
      {text: '非属性特性', link: `${commonMindMap}/非属性特性.md`},
      {text: '自定义事件', link: `${commonMindMap}/自定义事件.md`},
      {text: '插槽slot', link: `${commonMindMap}/插槽slot.md`},
      {text: '依赖注入：Provide和Inject', link: `${commonMindMap}/依赖注入：Provide和Inject.md`},
      {text: '模板引用和控制更新', link: `${commonMindMap}/模板引用和控制更新.md`},
      {text: '配置选项', link: `${commonMindMap}/配置选项.md`},
    ]
  }
]
