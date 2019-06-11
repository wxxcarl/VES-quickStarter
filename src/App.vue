<template>
    <div id="app">
        <aside>
            <div class="logo"></div>
            <el-menu :router="true" :default-active="activeIndex" background-color="var(--colorSiderBack)" active-text-color="#fff" text-color="var(--colorTipText)">
                <el-menu-item index="/home"><i class="dmp-icon-biaoqianjishi"></i>首页</el-menu-item>
                <el-menu-item index="/about"><i class="dmp-icon-huaxiangfenxi"></i>关于</el-menu-item>
            </el-menu>
        </aside>
        <main>
            <header>
                <i class="dmp-icon-yonghu"></i> 用户名
                <el-button type="text" class="logout" @click="logout">登出</el-button>
            </header>
            <article class="main">
                <router-view />
            </article>
        </main>
    </div>
</template>

<script>
import { userLogout } from '@/api'

export default {
    data() {
        return {
            isAdmin: true,
            activeIndex: ''
        }
    },
    mounted() {
    },
    watch: {
        '$route': {
            handler: function(v) {
                let path = v.path.split('/')[1] || ''
                this.activeIndex = path ? `/${path}` : ''
            },
            immediate: true
        }
    },
    methods: {
        logout() {
            userLogout().then(() => {
                window.location.href = '/login'
            })
        }
    },
}

</script>

<style lang="scss">

</style>
