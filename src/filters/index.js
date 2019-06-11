import Vue from 'vue'

Vue.filter('toFixed', function(data, num) {
    return data ? parseFloat(data).toFixed(num || 2) : '0.00'
})

Vue.filter('toThousands', function(value) {
    value = Number(value)
    if (isNaN(value) || typeof value !== 'number') {
        return ''
    }
    let val = value + ''
    return val.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
})

Vue.filter('dateFormat', function(dt, fmt = 'yyyy-MM-dd hh:mm:ss') {
    let newDate = dt
    if (!dt) {
        return ''
    }
    // debugger
    if (typeof dt === 'string') {
        // dt = dt.replace(/-/g, '/') // IOS上只支持yyyy/MM/dd这种标准格式
        dt = /^\d+$/.test(dt) ? parseInt(dt) : /.\+./.test(dt) ? new Date(dt) : dt.replace(/-/g, '/') // 传入的日期可能是个纯数字组成的字符串，如"1511107200000"
    }
    if (dt instanceof Date === false) {
        dt = new Date(dt)
    }
    if (!dt.getTime()) {
        return newDate
    }

    let o = {
        'M+': dt.getMonth() + 1, // 月份
        'd+': dt.getDate(), // 日
        'h+': dt.getHours(), // 小时
        'm+': dt.getMinutes(), // 分
        's+': dt.getSeconds(), // 秒
        'q+': Math.floor((dt.getMonth() + 3) / 3), // 季度
        S: dt.getMilliseconds() // 毫秒
    }

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (dt.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
    }

    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            )
        }
    }

    return fmt
})

Vue.filter('dayFormat', function(ms, split) {
    if (!ms) {
        return ''
    }
    ms = Number(ms)
    split = split || '-'
    var _date = new Date(ms)
    var year = _date.getFullYear(),
        month = _date.getMonth() + 1,
        date = _date.getDate()
    return (
        year + split + (month < 10 ? '0' + month : month) + split + (date < 10 ? '0' + date : date)
    )
})
Vue.filter('parseNumber', function(v, num) {
    num = typeof num === 'undefined' ? 0 : num
    return /^[+-]?\d+(\.\d+)?$/.test(v) ? num === 0 ? parseInt(v) : parseFloat(v).toFixed(num) : Number(0).toFixed(num)
})
Vue.filter('MathFloor', function(v, num) {
    num = typeof num === 'undefined' ? 0 : num
    // 小数点num位之后舍弃
    return /^[+-]?\d+(\.\d+)?$/.test(v) ? num === 0 ? Math.floor(v) : v.toString().split('.')[0] + '.' + v.toString().split('.')[1].substr(0, 2) : 0
})
Vue.filter('toString', function(data) {
    return typeof a === 'object' ? JSON.stringify(data) : ''
})
Vue.filter('toPercent', function(data) {
    return data ? ((parseFloat(data) * 100).toFixed(2) + '%') : '0.00%'
})
Vue.filter('toRate', function(data, total) {
    return data && total ? (parseFloat((data / total) * 100).toFixed(2) + '%') : '0.00%'
})
Vue.filter('toRMB', function(data) {
    return data ? ('¥' + parseFloat(data).toFixed(2)) : '¥0.00'
})

Vue.filter('computFormat', function(type) {
    return type === '1' ? '标签组合' : type === '2' ? '上传' : '运算'
})
