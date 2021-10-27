<template>
  <div class="registerBox">
    <!-- <div class="registerBox_title">
         账号注册
     </div> -->
    <div class="registerForm_box">
      <div class="registerForm_con">
        <div class="registerForm_con_tit">
          <img src="../../assets/images/registerIcon_20201120.png" alt="" />
          密码修改
        </div>
        <div class="modifyForm_con_li">
          <!-- <div style="margin: 20px"></div> -->
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="formLabelAlign"
            :rules="rules"
            ref="formLabelAlign"
          >
             <el-form-item label="当前密码" prop="nowPass">
              <el-input
                type="password"
                v-model="formLabelAlign.nowPass"
                autocomplete="off"
                placeholder="请输入您的密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
              <el-input
                type="password"
                v-model="formLabelAlign.pass"
                autocomplete="off"
                placeholder="请输入您的新密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                type="password"
                v-model="formLabelAlign.checkPass"
                autocomplete="off"
                placeholder="请确认您的密码"
              ></el-input>
            </el-form-item>
          
          
            <!-- <el-form-item prop="checkcode" label="验证码">
              <el-input
                v-model="formLabelAlign.checkcode"
                autocomplete="off"
                placeholder="请输入验证码"
                style="width: 20%; float: left"
              ></el-input>
              <img
                src=""
                class="checkcode-image"
                @click="getVaildatecode()"
                id="codeImage"
                title="点击刷新验证码"
              />
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" @click="submitForm('formLabelAlign')"
                >修改密码</el-button
              >
              <el-button @click="$router.back(-1)" type="success"
                >关闭</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.formLabelAlign.checkPass !== "") {
          this.$refs.formLabelAlign.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formLabelAlign.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
     labelPosition: "top",
      formLabelAlign: {
        nowPass:"",
        pass: "",
        checkPass: "",
       
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    
    };
  },
  methods: {
   
   //获取用户信息
      getLoginInfo(){
        this.$http(
            "/wcm/center.do",
            {
            ServiceId: encodeURI("edu_user"), 
            methodname: encodeURI("findLoginUserInfo"),
            },
            (res) => {
            
         
            this.formLabelAlign.nowPass = res.pass;
            // console.log(res)
            this.userId = res.userId;
            },
            (err) => {
            console.log(err);
            }
        );
        },
    doSubmit() {

   
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.doSubmit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
   
   

  },
  mounted() {
  },
};
</script>

<style  >
.registerCon {
  height: 100% !important;
}
.registerBox {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.registerBox_title {
  width: 100%;
  /* height: 38px; */
  height: 80px;
  background: linear-gradient(to right, #115397, #228be6);
  line-height: 80px;
  color: #fff;
  font-size: 24px;
  padding-left: 35px;
}
.registerForm_box {
  width: 100%;
  background: url("../../assets/images/registerbg_20201120.jpg") repeat;
  /* overflow-y: auto; */
}
.registerForm_con {
  width: 1024px;
  height: 100%;
  margin: 0 auto;
}
.modifyForm_con_li {
  width: 900px;
  height: 400px;
  background: #fefeff;
  border-radius: 10px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 50px 0px 0px 46px;
}
.registerForm_con_tit {
  width: 100%;
  font-size: 24px;
  color: #1664b0;
  padding: 50px 0 26px 0;
}
.registerForm_con_tit img {
  vertical-align: top;
}
.el-form-item__label {
 
}
.modifyForm_con_li .el-input {
  width: 485px;
}
/* .el-form{
      width: 520px;
      margin: 0 auto;
  } */
.modifyForm_con_li .el-form-item__label {
  font-size: 22px !important;
  font-weight: bold !important;
  color: #515151 !important;
}
.modifyForm_con_li.el-select .el-input {
  width: 160px !important;
}
#codeImage {
  height: 36px;
  cursor: pointer;
  margin-left: 10px;
}
.modifyForm_con_li .el-select {
  margin-right: 10px;
}
.lastVal {
  width: 200px;
}
.elSelect .el-select,
.elSelect .el-input {
  width: 170px !important;
}
.errText {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  margin-bottom: 30px;
  display: block;
}
.elSelectin {
  display: inline-block;
}
</style>