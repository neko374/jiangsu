<template>
  <div class="infoBox">
    <!-- <div class="registerBox_title">
         账号注册
     </div> -->
    <div class="registerForm_box">
      <div class="registerForm_con">
        <div class="registerForm_con_tit">
          <img src="../../assets/images/registerIcon_20201120.png" alt="" />
          个人信息
        </div>
        <div class="registerForm_con_li">
          <div style="margin: 20px"></div>
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="formLabelAlign"
            :rules="rules"
            ref="formLabelAlign"
          >
            <el-form-item label="登录名" prop="name">
              <el-input
                v-model="formLabelAlign.name"
                placeholder="请输入您的登录名"
                :disabled = userNamedisabled
              ></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="realname">
              <el-input
                v-model="formLabelAlign.realname"
                placeholder="请输入您的姓名"
                :disabled = disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input
                v-model="formLabelAlign.phone"
                placeholder="请输入您的手机号"
                :disabled = disabled 
              ></el-input>
            </el-form-item>

            <el-form-item
              prop="email"
              label="邮箱"
              :rules="[
                { message: '请输入邮箱地址', trigger: 'blur' },
                {
                  type: 'email',
                  message: '请输入正确的邮箱地址',
                  trigger: ['blur', 'change'],
                },
              ]"
            >
              <el-input
                v-model="formLabelAlign.email"
                placeholder="请输入您的邮箱"
                :disabled = disabled
              ></el-input>
            </el-form-item>
            
           
            <span class="errText" v-html="errText"></span>
            <el-form-item style="padding-bottom:22px;margin-bottom:0px;">
              <el-button type="primary" @click="doUpdate()" v-if="disabled"
                >修改</el-button
              >
              <el-button type="primary" @click="doupdateSave()" v-if="!disabled"
                >保存修改</el-button
              >
              <el-button @click="$router.back(-1)" type="success"
                >退出</el-button
              >
            </el-form-item>
             <el-dialog
            title="提示"
            :visible.sync="centerDialogVisible"
            width="30%"
            center
            :append-to-body="true"
        >
        <span>修改成功！</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="hidden()">确 定</el-button>
        </span>
    </el-dialog>
          </el-form>
        </div>
      </div>
    </div>
    <el-dialog
        title="提示"
        :visible.sync="wxdialogVisible"
        width="500px"
        height="500px"
      
        :append-to-body="true"
        >
        <!-- <iframe src="http://192.168.1.54:8080/#/wxewm" frameborder="0" width="100%" height="400px"></iframe> -->
        <span>确定要修改绑定的微信账号吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="wxdialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="openSite()">确 定</el-button>
        </span>
    </el-dialog>
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
      isShow: 0,
      labelPosition: "top",
     userNamedisabled:true,
     disabled:true,
      formLabelAlign: {
        name: "",
        realname: "",
        phone: "",
        email: "",
       
      },
      centerDialogVisible:false,
        wxdialogVisible:false,
     userId:0,
      errText: "",
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
   //获取节点Id 和 name
    // getIds() {
    //    if(this.formLabelAlign.region1.value == 1){ //教育部门
    //         this.parentId = this.formLabelAlign.region3.value;
    //         this.nodeId = 0;
    //         this.nodeName = this.formLabelAlign.inputVal;
    //         this.parentName = "江苏省教育厅";
    //       }else if(this.formLabelAlign.region1.value ==2){  //高校
    //           this.parentId = 0;
    //           this.nodeId =  this.formLabelAlign.region2.value;
    //           this.nodeName = this.nodeName2;
    //           this.parentName = "高校";
    //       } 
    // },
    doSubmit() {
      
    },
  
    // openSite(){
    //         this.wxdialogVisible = false;
    //         window.open("http://192.168.1.54:8080/#/wxewm");
    //         return
    // },
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       this.doSubmit();
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    
      // getLoginInfo(){
      //   this.$http(
      //       "/wcm/center.do",
      //       {
      //       ServiceId: encodeURI("edu_user"), 
      //       methodname: encodeURI("findLoginUserInfo"),
      //       },
      //       (res) => {
            
      //      this.formLabelAlign.name = res.userName ;
      //       this.formLabelAlign.realname =res.trueName ;
      //       this.formLabelAlign.phone = res.mobile;
      //       this.formLabelAlign.email = res.email;
      //       // console.log(res)
      //       this.userId = res.userId;
      //       },
      //       (err) => {
      //       console.log(err);
      //       }
      //   );
      //   },
      // 修改保存
    doupdateSave() {
      this.dialogVisible = false;
      this.$http(
        "/wcm/center.do",
        {
          ServiceId: encodeURI("edu_user"),
          methodname: encodeURI("saveUser"),
          userId: this.userId, //0-新增  >0更新
          userName: encodeURI(this.formLabelAlign.name),
          trueName: encodeURI(this.formLabelAlign.realname),
          mobile: this.formLabelAlign.phone,
          email: this.formLabelAlign.email,
          // isAdmin: this.resource,//是否为管理员
        },
        (res) => {
            this.centerDialogVisible = true;
            this.disabled = true;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    hidden(){
         this.centerDialogVisible = false;
    },
    doUpdate(){
        this.disabled = false;
       
    }
    
  },
  mounted() {
    // this.getOptions();
    //this.getLoginInfo();
    this.formLabelAlign.name = this.$store.getters.getLoginName
    this.formLabelAlign.realname = this.$store.getters.getTrueName
    this.formLabelAlign.phone = this.$store.getters.getPhone
    this.formLabelAlign.email = this.$store.getters.getEmail
  },
};
</script>

<style >

.infoBox {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.infoBox .registerBox_title {
  width: 100%;
  /* height: 38px; */
  height: 80px;
  background: linear-gradient(to right, #115397, #228be6);
  line-height: 80px;
  color: #fff;
  font-size: 24px;
  padding-left: 35px;
}
.infoBox .registerForm_box {
  width: 100%;
  background: url("../../assets/images/registerbg_20201120.jpg") repeat;
  /* overflow-y: auto; */
}
.infoBox .registerForm_con {
  width: 1024px;
  height: 100%;
  margin: 0 auto;
}
.infoBox .registerForm_con_li {
  width: 900px;
  height: 100%;
  background: #fefeff;
  border-radius: 10px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 50px 0px 0px 46px;
}
.infoBox .registerForm_con_tit {
  width: 100%;
  font-size: 24px;
  color: #1664b0;
  padding: 50px 0 26px 0;
}
.infoBox .registerForm_con_tit img {
  vertical-align: top;
}
.el-form-item__label {
  
}
.infoBox .registerForm_con_li .el-input {
  width: 485px;
}
/* .el-form{
      width: 520px;
      margin: 0 auto;
  } */
.infoBox .registerForm_con_li .el-form-item__label {
  font-size: 22px !important;
  font-weight: bold !important;
  color: #515151 !important;
}
.infoBox .infoBox.registerForm_con_li.el-select .el-input {
  width: 160px !important;
}
.infoBox #codeImage {
  height: 36px;
  cursor: pointer;
  margin-left: 10px;
}
.infoBox .registerForm_con_li .el-select {
  margin-right: 10px;
}
.infoBox .lastVal {
  width: 200px;
}
.infoBox .elSelect .el-select,
.elSelect .el-input {
  width: 170px !important;
}
 .infoBox .errText {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  margin-bottom: 30px;
  display:block;
}
.infoBox .elSelectin {
  display: inline-block;
}
</style>