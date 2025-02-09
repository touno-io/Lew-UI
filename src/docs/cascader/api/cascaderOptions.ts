export default {
    title: 'CascaderOptions',
    columnsKey: 'props',
    data: [
        {
            name: 'label',
            description: '选项组的标签',
            type: 'string',
            default: '-',
        },
        {
            name: 'value',
            description: '值',
            type: `string`,
            default: '-',
        },
        {
            name: 'isHasChild',
            description: '是否存在子元素',
            type: `boolean`,
            default: '-',
        },
        {
            name: 'children',
            description: '值',
            type: `CascaderOptions`,
            default: '-',
        },
        {
            name: 'disabled',
            description: '禁用',
            type: `boolean`,
            default: '-',
        },
    ],
};
