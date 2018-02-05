import Vue from 'vue';
import VueResource from 'vue-resource';
import { Loading,Message,MessageBox } from 'element-ui';

// 接口主机名，开发环境一般为空，生产环境根据情况设置
// const HOST = "http://127.0.0.1:8080/smartreporter";
const HOST = "";

Vue.use(VueResource);
// 服务器无法处理application/json,所以只能把请求当作表单提交
Vue.http.options.emulateJSON = false;
Vue.http.options.xhr = {
    withCredentials: true
};

const skipLogin = ["login"];

Vue.http.interceptors.push((request, next) => {
    request.url = HOST + request.url;
    // 请求发送前的处理逻辑
    next((response) => {
        if (response.body.success === false) {
            Message.error('系统错误');
        }
        switch (response.status) {
            case 200:
                // 内层业务处理结果判断
                return response;
                break;
            case 400:
                Message.error('对不起，请求的参数错误，请确认后重试')
                break;
            case 401:
                Message.error({
                    message: '登录超时，请重新登录',
                    duration: 2000,
                    onClose() {
						if(window.location.pathname != '/login'){
							window.location.href = "/login?rederect=" + encodeURIComponent(window.location.href)
						}
                    }
                })
                break;
            case 403:
                Message.error({
                    message: '对不起，您没有权限进行此项操作',
                    duration: 2000,
                    onClose() {
						// if(window.location.pathname != '/login'){
						// 	window.location.href = "/login?rederect=" + encodeURIComponent(window.location.href)
						// }
                    }
                })
                break;
            case 404:
                Message.error('对不起，您请求的服务不存在')
                break;
            case 422:
                Message.error('您提交的数据格式不正确，请重新检查')
                break;
            case 500:
                Message.error('服务器内部可能正在升级,请稍后再试')
                break;
            default:
                Message.error('对不起，系统繁忙，请稍后再试，错误代码(' + response.status + ')')
        }
    });
});

// 登录
export const login = Vue.resource('/base/login.json')
