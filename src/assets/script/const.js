export const INVOICETYPE = {
    array: [
        { value: '10100', label: '增值税专用发票' },
        { value: '10101', label: '增值税普通发票' },
        { value: '10102', label: '增值税电子普通发票' },
        { value: '10103', label: '增值税普通发票(卷票)' },
        { value: '10104', label: '机动车销售统一发票' },
        { value: '10105', label: '二手车销售统一发票' },
        { value: '10505a', label: '船票' },
        { value: '10200', label: '定额发票' },
        { value: '10400', label: '机打发票' },
        { value: '10500', label: '出租车发票' },
        { value: '10503', label: '火车票' },
        { value: '10505', label: '客运汽车' },
        { value: '10506', label: '航空运输电子客票行程单' },
        { value: '10507', label: '过路费发票' },
        { value: '10900', label: '可报销其他发票' },
        { value: '20100', label: '国际小票' },
        { value: '20105', label: '滴滴出行行程单' },
        { value: '10902', label: '完税证明' }
    ],
    map: key => {
        let label = ''
        this.array.forEach(item => {
            if (item.value === key) label = item.label
        })
        return label
    }
}
