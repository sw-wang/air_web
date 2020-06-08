import Vue from 'vue'

Vue.filter('amount', function (val) {
    /* eslint-disable */
    val = val.toString().replace(/\$|\,/g, '')
    if (isNaN(val)) {
        val = '0'
    }
    let sign = val == (val = Math.abs(val))
    val = Math.floor(val * 100 + 0.50000000001)
    let cents = val % 100
    val = Math.floor(val / 100).toString()
    if (cents < 10) {
        cents = '0' + cents
    }
    for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
        val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3))
    }

    return (sign ? '' : '-') + val + '.' + cents
})
// Vue.filter('amount', function(value, dot) {
//     if (!value) return '0.00'
//     if (!dot) dot = 2
//     return parseFloat(value).toFixed(dot)
// })
Vue.filter('limit', function(value, dot) {
    if (!value) return ''
    if (!dot) dot = 10
    if (value.length <= dot) return value
    else return value.substring(0, dot) + '...'
})
Vue.filter('format', function(value, format) {
    if (!value) return ''
    if (typeof value !== 'number') value = value.replace(/-/g, '/')
    const _ = new Date(value)
    const date = {
        'M+': _.getMonth() + 1,
        'd+': _.getDate(),
        'h+': _.getHours(),
        'm+': _.getMinutes(),
        's+': _.getSeconds(),
        'q+': Math.floor((_.getMonth() + 3) / 3),
        'S+': _.getMilliseconds()
    }
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (_.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (const k in date) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
        }
    }
    return format
})
Vue.filter('invoiceType', function(value) {
    /* eslint-disable */
    const map = {
        '10100': '增值税专用发票',
        '10101': '增值税普通发票',
        '10102': '增值税电子普通发票',
        '10103': '增值税普通发票(卷票)',
        '10104': '机动车销售统一发票',
        '10105': '二手车销售统一发票',
        '10505a': '船票',
        '10200': '定额发票',
        '10400': '机打发票',
        '10500': '出租车发票',
        '10503': '火车票',
        '10505': '客运汽车',
        '10506': '航空运输电子客票行程单',
        '10507': '过路费发票',
        '10900': '可报销其他发票',
        '20100': '国际小票',
        '20105': '滴滴出行行程单',
        '10902': '完税证明'
    }
    return map[value]
})
