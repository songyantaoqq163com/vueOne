<template>
  <div>
    <!--登录1-->

    <div class="login-box">
      <!-- 通过:rules="loginFormRules"来绑定输入内容的校验规则 -->
      <el-form :rules="loginFormRules" ref="loginForm" :model="loginForm" label-position="right" label-width="auto"
        show-message>
        <span class="login-title">欢迎登录</span>
        <div style="margin-top: 5px"></div>
        <el-form-item label="用户名" prop="loginName">
          <el-col :span="22">
            <el-input type="text" v-model="loginForm.loginName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码" prop="loginPassword">
          <el-col :span="22">
            <el-input type="password" v-model="loginForm.loginPassword"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginSubmit('loginForm')">登录</el-button>
          <el-button type="primary" @click="onRegit('loginForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <div style="justify-content:center;">
            <div class="login-box" id="app">
              <el-row>
                <el-col :span="24">
                  <el-input id="name" placeholder="Username" v-model="username">
                    <template slot="append">(账号)登录页</template>
                  </el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-input id="password" type="password" placeholder="Password" v-model="password">
                    <template slot="append">(密码)el-col="12"左右两边布局</template>
                  </el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" style="margin-top: 20px">
                  <el-button id="login" style="width:100%" type="primary" @click="login">点我进入页面</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-col> -->
  </div>
</template>
<script>
// @ts-nocheck

export default {
  name: 'login',
  data() {
    return {
      Username: '',
      Password: '',
      username: '',
      password: '',
      loginForm: {
        loginName: '',
        loginPassword: ''
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      loginFormRules: {
        loginName: [
          { required: true, message: '账号不可为空', trigger: 'blur' }
        ],
        loginPassword: [
          { required: true, message: '密码不可为空', trigger: 'blur' }
        ]
      },
      //   value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],//当天的时间
      value1: '',
      value3: ''
    }
  },
  created() {
    let list = ["Aside首页", "登录"]
    sessionStorage.setItem("keylist", JSON.stringify(list))
  },
  methods: {
    loginSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
          // this.$router.replace('/')
          sessionStorage.setItem('key-token', JSON.stringify('123456'))
          this.$router.push({ path: '/hello' })
        } else {
          return false
        }
      })
    },
    login() {
      sessionStorage.setItem('key-token', JSON.stringify('123456'))
      this.$router.push({ path: '/hello' })
    }
  }
}
</script>
<style scoped>
.login-box {
  border: 1px solid #dcdfe6;
  width: 400px;
  height: 200px;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px palegreen;
  /* margin:auto; */
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -100px;
  text-align: center;
}

.login-title {
  text-align: center;
  margin: 0 40px;
  color: #66cd00;
  font-size: 30px;
  font-weight: bold;
}
</style>
