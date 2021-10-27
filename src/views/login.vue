<template>
  <div class="loginBox">
    <div class="login_con" id="personalLogin">
      <p class="login_title">江苏教育集团信息报送平台</p>
      <div class="loginDiv">
        <div class="loginTab">个人登录</div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item prop="account">
            <el-input
              v-model="ruleForm.account"
              autocomplete="on"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>

          <div class="register" @click="$router.push('/register')">
            申请注册
          </div>

          <!-- 错误提示信息 -->
          <span class="errText" v-html="errText"></span>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
              style="width: 100%; margin-top: 20px"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="login_con" id="wxCodeLogin" style="display:none;">
      <img
        class="loginPCIcon"
        src="../assets/images/jsqmt_pcicon_20210115.png"
        alt=""
        @click="doChangeLogin('pc')"
      />
      <p class="login_title">苏教融媒服务平台</p>
    </div>
  </div>
</template>

<script>
// import $ from "jquery";
import axios from 'axios'
export default {
  data() {
    var validateAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入账号'))
      }

      setTimeout(() => {
        var reg = /^[\u4e00-\u9fa5_a-zA-Z0-9\.][^\'\"\-\, ]{2,19}$/ // 中英文、数字、下划线!
        if (value.replace(/\s+/g, '') == '') {
          callback(new Error('登录名不能为空！'))
        } else if (!reg.test(value)) {
          callback(new Error('由汉字、英文字母、数字、点或下划线组成'))
        } else if (this.getByteLen(value) > 20) {
          callback(
            new Error(
              '由3-20个字符组成，每个英文字母或数字算一个字符，每个汉字算两个字符'
            )
          )
        } else {
          callback()
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }

    var checkCode = (rule, value, callback) => {
      if (value.replace(/\s+/g, '') == '') {
        callback(new Error('验证码不能为空！'))
      } else {
        callback()
      }
    }

    var validateCheckcode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }

    return {
      errText: '',
      activeName: 'first',
      ruleForm: {
        account: '',
        pass: '',
        checkcode: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        account: [{ validator: validateAccount, trigger: 'blur' }]
      }
    }
  },
  methods: {
    doChangeLogin(obj) {
      if (obj == 'wx') {
        document.getElementById('personalLogin').style.display = 'none'
        document.getElementById('wxCodeLogin').style.display = 'block'
        this.wxlogin()
      } else if (obj == 'pc') {
        document.getElementById('personalLogin').style.display = 'block'
        document.getElementById('wxCodeLogin').style.display = 'none'
      }
    },

    getByteLen(val) {
      var len = 0
      for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i)
        if (a.match(/[^\x00-\xff]/gi) != null) {
          len += 2
        } else {
          len += 1
        }
      }
      return len
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(valid)
          this.login()
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleClick(tab, event) {},
    //登录
    login() {
      this.$http({
        url: '/user/login',
        method: 'post',

        data: {
          username: this.ruleForm.account,
          password: this.ruleForm.pass
        }
      })
        .then(res => {
          console.log(res.data)
          if (res.data.meta.status == '200') {
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            this.$store.commit('setLoginName', res.data.user.username)
            this.$store.commit('setLogin', true)
            this.$store.commit('setTrueName', res.data.user.truename)
            this.$store.commit('setEmail', res.data.user.email)
            this.$store.commit('setPhone', res.data.user.phone)
            this.saveData('loginData')
            this.$router.push('/home')
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
        .catch(err => {
          console.log('错误：' + err)
        })
    },
    saveData(val) {
      localStorage.setItem(val, '')
      localStorage.setItem(val, JSON.stringify(this.$store.state))
    }
  },
}
</script>

<style>
.login_con .el-form-item__content {
  line-height: 44px;
}
.loginTab {
  font-size: 20px;
  color: rgb(51, 51, 51);
  margin-bottom: 20px;
  margin-top: 3px;
}
.loginWXCode {
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  height: 80px;
  cursor: pointer;
}
.loginPCIcon {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 80px;
  height: 80px;
  cursor: pointer;
}
.loginBox {
  margin: 0 auto;
  position: absolute;
  top: 0;
  min-height: 100%;
  width: 100%;
  background: url('../assets/images/jsxmtloginbg01_20201120.jpg');
  background-size: cover;
}

.login_con {
  width: 380px;
  height: 500px;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  right: 20%;
  top: 50%;
  /* margin-top: -440px; */
  transform: translateY(-50%);
  text-align: center;
  padding: 0 30px;
  box-sizing: border-box;
}
.login_title {
  width: 100%;
  height: 80px;
  font-size: 22px;
  font-family: 微软雅黑;
  font-weight: bold;
  line-height: 80px;
  color: #115397;
}

.loginDiv {
  width: 100%;
}

.loginDiv .el-tabs__nav {
  width: 100% !important;
}
.loginDiv .el-tabs__nav > div {
  width: 50%;
  font-size: 18px;
}
.loginDiv .el-input {
  font-size: 16px;
}
.loginDiv .el-link {
  width: 100%;
  display: inline-block;
  text-align: left;
}
.register {
  width: 20%;
  text-align: left;
  font-size: 14px;
  padding-left: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
  margin-left: -10%;
}
.checkcode-image {
  width: 85px;
  height: 38px;
  cursor: pointer;
}
.loginDiv .el-form-item {
  margin-bottom: 26px !important;
}
.loginDiv.el-form-item__error {
  text-align: left;
}
.errText {
  float: right;
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 3px;
  width: 70%;
  /* display: inline-block; */
}
</style>
