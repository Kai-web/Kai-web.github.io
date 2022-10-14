const commonPath = '/menu1';

export default [
    {
        text: '介绍',
        collapsible: true,
        collapsed: false,
        items: [
            { text: '文档', link: `${commonPath}/about.md` },
        ]
    },
]