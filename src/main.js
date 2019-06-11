import Vue from 'vue'
import router from './router'
import store from './store'
import '@/assets/element.js'
import './filters'
import ajax from '@/api/config'
import utils from '@/assets/util'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/font/iconfont.css'
import '@/assets/common.scss'

// Vue.use(ElementUI);
Vue.prototype.$ajax = ajax
Vue.prototype.$util = utils

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    router,
    store,
    render: h => h('router-view')
})
