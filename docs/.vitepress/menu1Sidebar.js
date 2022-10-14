const commonPath = '/menu1';

export default [
    {
        text: '前端环境',
        collapsible: true,
        collapsed: false,
        items: [
            { text: '搭建', link: `${commonPath}/前端环境搭建.md` },
        ]
    },
    {
        text: '思维导图',
        collapsible: true,
        collapsed: false,
        items: [
            { text: '应用实例和组件实例', link: `${commonPath}/思维导图/应用实例和组件实例.md` },
            { text: '模板语法', link: `${commonPath}/思维导图/模板语法.md` },
            { text: '配置选项', link: `${commonPath}/思维导图/配置选项.md` },
            { text: 'Vue', link: `${commonPath}/思维导图/计算属性和监听器.md` },
            { text: 'Vue', link: `${commonPath}/思维导图/条件渲染.md` },
            { text: 'Vue', link: `${commonPath}/思维导图/列表渲染v-for.md` },
            { text: 'Vue', link: `${commonPath}/思维导图/事件处理.md` },
            { text: 'Vue', link: `${commonPath}/思维导图/v-model及其修饰符.md` },
            { text: 'Vue', link: `${commonPath}/思维导图/深入组件.md` },
            { text: 'Vue', link: `${commonPath}/思维导图/注册组件.md` },
            { text: 'Vue', link: `${commonPath}/思维导图/组件Props.md` },
            { text: 'Vue', link: `${commonPath}/思维导图/非属性特性.md` },
            { text: 'Vue', link: `${commonPath}/思维导图/自定义事件.md` },
            { text: 'Vue', link: `${commonPath}/思维导图/插槽slot.md` },
            { text: 'Vue', link: `${commonPath}/思维导图/依赖注入：Provide和Inject.md` },
            { text: 'Vue', link: `${commonPath}/思维导图/动态组件和异步组件.md` },
            { text: 'Vue', link: `${commonPath}/思维导图/模板引用和控制更新.md` },
        ]
    },
    {
        text: '代码片段',
        collapsible: true,
        collapsed: false,
        items: [
            { text: 'Vue', link: `${commonPath}/代码片段.md` },
        ]
    },
]