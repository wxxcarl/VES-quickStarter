import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const Main = resolve => require(['./view/main.vue'], resolve)

let routes = [
	  {
		 path: '/',
		 redirect: '/main',
	  },
	  {
          path: '/main',
          component: Main,
          name: 'homePage',
      }
]

const routers = new VueRouter({
    mode: 'history',
    routes: routes,
})

export default routers
