<template lang="html">
    <div id="app" class="main">
        <img src="../../assets/img/login.png" id="dmpBanner" class="login-img" />
        <div class="login-panel">
            <el-form ref="loginForm" class="login-form" :rules="rules" :model="options" @keyup.enter.native="onLoginButtonClick">
                <el-form-item prop="username">
                    <el-input prefix-icon="dmp-icon-yonghu" placeholder="请输入用户名" v-model="options.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="dmp-icon-mima" placeholder="请输入密码" type="password" v-model="options.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click.native.prevent="onLoginButtonClick" type="primary" size="small" class="submit">登 录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { userLogin } from '@/api'
export default {
    data() {
        return {
            errmsg: '',
            options: {
                username: '',
                password: ''
            },
            rules: {
                username: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }]
            },
            bannerOptions: {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            }
        }
    },
    mounted() {
        this.$store.commit('resetFieldData')
        // this.bannerAnimate()
    },
    methods: {
        bannerAnimate() {
            let banner = window.document.querySelector('#dmpBanner')
            banner.onload = () => {
                let bannerOptions = {
                    left: banner.offsetLeft,
                    top: banner.offsetTop,
                    width: banner.offsetWidth,
                    height: banner.offsetHeight
                }
                banner.onmousemove = e => {
                    let mLeft = e.clientX - bannerOptions.left
                    let mTop = e.clientY - bannerOptions.top
                    let roX = -10 * (1 - mTop / (bannerOptions.height / 2))
                    let roY = 6 * (1 - mLeft / (bannerOptions.width / 2))
                    banner.style.transform = 'perspective(700px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg) scale3d(1, 1, 1)'
                }
                banner.onmouseleave = e => {
                    banner.style.transform = 'none'
                }
            }
        },
        onLoginButtonClick() {
            var _t = this
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    userLogin(this.options).then(res => {
                        let userInfo = res.data.result.user
                        userInfo.roles = res.data.result.roles
                        window.localStorage.userInfo = JSON.stringify(userInfo)
                        this.$store.commit('updateUserInfo', userInfo)
                        if (_t.$route.query.rederect && decodeURIComponent(_t.$route.query.rederect)
                            .indexOf(window.location.host) > -1) {
                            window.location.href = _t.$route.query.rederect
                        } else {
                            window.location.href = '/label'
                        }
                    }).catch(() => {})
                    // nodeLogin(this.options).then(res=>{

                    // })
                }
            })
        }
    }
}

</script>
<style lang="scss" scoped>
.main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    background: var(--colorBodyBack);
    background-image: radial-gradient(circle, #b0e3ff 2%, transparent 2px),
        radial-gradient(circle, #b0e3ff 2%, transparent 2px);
    background-size: 96px 112px;
    background-position: 2px 18px, 50px 74px;

    .login-img {
        width: calc(100% * 700 / 1920);
        transition: all .1s;
    }
}

.login-panel {
    text-align: center;
    width: calc(100% * 400 / 1920);
    background: #fff;
    box-shadow: 0px 10px 18px 0px rgba(243, 245, 250, 1);
    border-radius: 8px;
    margin-left: 60px;

    .logo {
        width: 180px;
        margin: 40px auto;
    }

    .login-form /deep/ {
        padding: 0 35px;

        .el-form-item {
            margin: 0 0 30px;

            &:last-child {
                margin-bottom: 0;
            }

            .el-form-item__content {
                .el-input {
                    border-bottom: #dcdfe6 solid 1px;

                    .el-input__inner {
                        padding: 5px 0 5px 30px;
                        border: none;
                        box-shadow: 0 0 0px 60px white inset;
                    }

                    .el-input__icon {
                        font-size: 16px;
                    }
                }
            }
        }
    }

    .submit {
        width: 100%;
        margin: 16px 0 40px;
    }
}

</style>
