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
        text: '代码片段',
        collapsible: true,
        collapsed: false,
        items: [
            { text: 'Vue', link: `${commonPath}/代码片段.md` },
        ]
    },
]