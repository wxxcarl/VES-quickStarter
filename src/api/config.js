/*
 * callback用例： this.$ajax.method(url[, data[, config]], successCallback(), errorCallback())
 * promise用例： this.$ajax.method(url[, data[, config]]).then().catch()
 * { diy: true }：在不以{ success: true} 作为判断依据的时候， 统一在successCallback()或者then()内处理请求结果
 * enctype: json: 默认值，form: 普通form类型，multi: 二进制文件form类型
 */

import axios from 'axios'
import { Message } from 'element-ui'

const isObject = v => {
    return Object.prototype.toString.call(v) === '[object Object]'
}

axios.defaults.baseURL = '/'

axios.interceptors.response.use(response => {
    if (response.status !== 200) {
        return Promise.reject(response)
    }
    return response
}, (error) => {
    let status = error.response.status
    switch (status) {
    case 400:
        Message.error('对不起，您请求的参数错误，请确认后重试')
        break
    case 401:
        Message.error({
            message: '登录超时，请重新登录',
            duration: 2000,
            onClose() {
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login?rederect=' + encodeURIComponent(window.location.href)
                }
            }
        })
        break
    case 403:
        Message.error('对不起，你没有权限进行此项操作')
        break
    case 404:
        Message.error('对不起，你请求的服务不存在')
        break
    case 500:
        Message.error('服务器内部可能正在升级,请稍后再试')
        break
    default:
        Message.error('对不起，系统繁忙，请稍后再试，错误代码(' + status + ')')
    }
    return Promise.reject(error)
})

const methods = ['post', 'get', 'delete']
const Ajax = {}
methods.forEach((method) => {
    Ajax[method] = function(url, pms = {}, ops = {}) {
        // debugger
        ops = isObject(ops) ? ops : {}
        let request = method === 'get' ? axios.get(url, { params: pms })
            : method === 'post' ? axios.post(url, pms, ops)
                : axios.delete(url, { data: pms })
        return request.then(response => {
            let res = response.data
            let success = res.code === 0 || res.msg === 'success'
            if (success) {
                return Promise.resolve(response)
            } else {
                Message.error(res.msg || '系统繁忙，请稍后再试')
                return Promise.reject(res)
            }
        }, error => {
            return Promise.reject(error)
        })
    }
})

export default Ajax
