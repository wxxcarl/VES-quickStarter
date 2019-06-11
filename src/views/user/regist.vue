<template lang="html">
    <div id="app">
        <el-row>
            <el-col :span="8" :offset="8">
                <div class="account-title">DMP用户注册</div>
                <el-form ref="loginForm" :rules="rules" :model="options" label-width="80px" @submit.native.prevent="onLoginButtonClick">
                    <el-form-item label="用户名" prop="username">
                        <el-input placeholder="请输入用户名" v-model="options.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input placeholder="请输入密码" type="password" v-model="options.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <input type="submit" class="submit" value="注 册">
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { nodeRegist } from '@/api'
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
            }
        }
    },
    methods: {
        onLoginButtonClick() {
            // vuex数据清除，重新加载
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    nodeRegist(this.options).then(() => {

                    })
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>
    .el-row {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 4px;
        margin-right: 16px;
        text-align: center;
        line-height: 36px;
    }

    .account-title {
        color: #20a0ff;
        font-size: 40px;
        padding-top: 100px;
        padding-bottom: 30px;
    }

    .submit {
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
    }
</style>
