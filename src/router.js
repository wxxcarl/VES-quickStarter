import Vue from 'vue'
import Layout from './App.vue'
import Login from './views/user/login.vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
const About = () => import(/* webpackChunkName: "aboutPage" */ '@/views/About.vue')

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            component: Layout,
            children: [
                {
                    path: '',
                    name: 'Home Page',
                    component: Home
                }
            ]
        },
        {
            path: '/about',
            component: Layout,
            children: [
                {
                    path: '',
                    name: 'About Page',
                    component: About
                }
            ]
        }
    ]
})
