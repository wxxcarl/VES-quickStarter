<template>
<div class="wrapper">
    <div class="mainContainer">
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</div>
</template>
<script>
import {
    logout
} from '~/api'
export default {
    name: 'app',
    data() {
        return {
            contentMinHeight: '100%',
        }
    },
    watch: {
    },
    mounted() {
        this.contentMinHeight = window.document.documentElement.clientHeight-80+'px'
    },
    methods: {

    }
};
</script>
<style lang="scss">
@import "style.scss";
</style>
