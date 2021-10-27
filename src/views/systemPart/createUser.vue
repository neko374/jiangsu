<template>
  <div class="registerBox">
    <!-- <div class="registerBox_title">
         账号注册
     </div> -->
    <div class="registerForm_box">
      <div class="registerForm_con">
        <div class="registerForm_con_tit">
          <img src="../../assets/images/registerIcon_20201120.png" alt="" />
          账号新增
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
              ></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="realname">
              <el-input
                v-model="formLabelAlign.realname"
                placeholder="请输入您的姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input
                v-model="formLabelAlign.phone"
                placeholder="请输入您的手机号"
              ></el-input>
            </el-form-item>

            <el-form-item prop="email" label="邮箱">
              <el-input
                v-model="formLabelAlign.email"
                placeholder="请输入您的邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model="formLabelAlign.pass"
                autocomplete="off"
                placeholder="请输入您的密码"
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
            <el-form-item label="用户权限" prop="resource">
              <el-radio-group v-model="formLabelAlign.resource">
                <el-radio :label="0">普通用户</el-radio>
                <el-radio :label="1">管理员</el-radio>
              </el-radio-group>
            </el-form-item>
            
            <div class="errText" v-html="errText"></div>

            <el-form-item>
              <el-button type="primary" @click="submitForm('formLabelAlign')"
                >注册</el-button
              >
              <el-button @click="resetForm('formLabelAlign')" type="success"
                >重置</el-button
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
    var checkPhone = (rule, value, callback) => {
      let reg = /^1[345789]\d{9}$/;
      if (!reg.test(value)) {
        callback(new Error("请输入11位手机号"));
      } else {
        callback();
      }
    };
    var validateAccount = (rule, value, callback) => {
      setTimeout(() => {
        var reg = /^[\u4e00-\u9fa5_a-zA-Z0-9\.][^\'\"\-\, ]{1,19}$/; // 中英文、数字、下划线!
        if (!reg.test(value)) {
          callback(new Error("由汉字、英文字母、数字、点或下划线组成"));
        } else if (this.getByteLen(value) > 20 || this.getByteLen(value) < 2) {
          callback(new Error('由5-20个字符组成，每个英文字母或数字算一个字符，每个汉字算两个字符'));
          // console.log(this.getByteLen(value));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      isShow: 0,
      labelPosition: "top",
     nodeId: 0,
      nodeName:'',
      nodeName1:'',
      nodeName2:'',
      nodeName3:'',
      nodeName4:'',
      parentName:'',
      parentName1:'',
      parentName2:'',
      parentName3:'',
      parentId: 0,
      formLabelAlign: {
        name: "",
        realname: "",
        phone: "",
        email: "",
        pass: "",
        checkPass: "",
        resource: 0,
        region1: "",
        region2: "",
        region3: "",
        region4: "",
        inputVal: "",
        checkcode: "",
      },
      province: [],
      cityOptions: [],
      areaOptions: [],
      schoolOptions:[],
      errText: "",
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: validateAccount, trigger: "blur" },
        ],
        realname: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            type: "number",
            validator: checkPhone,
            message: "请输入11位有效手机号号码",
            trigger: ["blur", "change"],
          },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        region1: [
          { required: true, message: "请选择单位名称", trigger: "blur" },
        ],
        region2: [
          { required: true, message: "请选择单位名称", trigger: "blur" },
        ],
        pass: [{required: true, message: '请输入密码', trigger: 'blur' },{ min: 8, message: '密码至少8位字符', trigger: 'blur' },{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      
      },
    };
  },
  methods: {
    //获取节点Id 和 name
    getIds() {

     //如果第一级选择教育部门，
       if(this.formLabelAlign.region1.value == 1){ 
          
          //如果第二级存在  第三级为空
          if(this.formLabelAlign.region2 && this.formLabelAlign.region3 == ""){
            this.parentId = 0; 
            this.nodeId = this.formLabelAlign.region2.value;
            this.nodeName = this.formLabelAlign.region2.label;
            this.parentName = "江苏省教育厅";
          }
          //如果第三级存在
          else if(this.formLabelAlign.region3){
            if(this.formLabelAlign.region4 == "" && this.formLabelAlign.inputVal == ""){//只到第三级
              this.parentId = this.formLabelAlign.region2.value;
              this.nodeId = this.formLabelAlign.region3.value;
              this.nodeName = this.formLabelAlign.region3.label;
              this.parentName = this.formLabelAlign.region2.label;
            }else if(this.formLabelAlign.region4 == "" && this.formLabelAlign.inputVal != ""){//第四级下拉框为空，填写文本框
               this.parentId = this.formLabelAlign.region3.value;
                this.nodeId = 0;
                this.nodeName = this.formLabelAlign.inputVal;
                this.parentName = this.formLabelAlign.region3.label;
            }else if(this.formLabelAlign.region4 && this.formLabelAlign.inputVal == ""){//第四级选择下拉框，无文本框
                 this.parentId = this.formLabelAlign.region3.value;
                this.nodeId =  this.formLabelAlign.region4.value;
                this.nodeName = this.formLabelAlign.region4.label;
                this.parentName = this.formLabelAlign.region3.label;
            }else if(this.formLabelAlign.region4 && this.formLabelAlign.inputVal){//如果第四级选择下拉框，同时也写了文本框，优先注册文本框
                 this.parentId = this.formLabelAlign.region3.value;
                this.nodeId = 0;
                this.nodeName = this.formLabelAlign.inputVal;
                this.parentName = this.formLabelAlign.region3.label;
            }
          }
            
      }else if(this.formLabelAlign.region1.value ==2){  //高校
              this.parentId = 0;
              this.nodeId =  this.formLabelAlign.region2.value;
              this.nodeName = this.nodeName2;
              this.parentName = "高校";
          } 
    },
    doSubmit(userId) {
      this.getIds(); //获取节点Id
      let Base64 = require("js-base64").Base64;
      this.$http(
        "/wcm/center.do",
        {
          ServiceId: encodeURI("edu_user"),
          methodname: encodeURI("saveUser"),
          userId: userId, //0-新增  >0更新
          userName: encodeURI(this.formLabelAlign.name),
          trueName: encodeURI(this.formLabelAlign.realname),
          mobile: this.formLabelAlign.phone,
          email: this.formLabelAlign.email,
          password: Base64.encode(this.formLabelAlign.pass),
          nodeId: this.nodeId,
          isAdmin: this.formLabelAlign.resource,
        },
        (res) => {
          console.log(res);
          if (res.code == 0) {
            this.errText = res.msg;
          } else if (res.code == 1) {
             this.$message({
               showClose: true,
              message: '新建成功!',
              type: 'success'
            });
            this.$router.back(-1);
          }
        },
        (err) => {
           this.$message({
            showClose: true,
            message: '新建失败,请重试!',
            type: 'error'
          });
        }
      );
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //type=1教育部门  type=2 高校
    selectTrigger(params) {
      const { value, label } = params;
      this.parentName1 = params.label;
      this.$http(
        "/wcm/edu/note_tree.jsp",
        { type: this.formLabelAlign.region1.value },
        (res) => {
          this.cityOptions = res.nodes;
        },
        (err) => {
          console.log(err);
        }
      );
      this.formLabelAlign.region2 = "";
      this.formLabelAlign.region3 = "";
      this.formLabelAlign.region4 = "";
      this.formLabelAlign.inputVal = "";
    },

    selectCityTrigger(params) {
      const { value, label } = params;
      this.parentName2 = params.label;
      this.nodeName2 = params.label;
      this.$http(
        "/wcm/edu/note_tree.jsp",
        { parentId: params.value },
        (res) => {
          this.areaOptions = res.nodes;
        },
        (err) => {
          console.log(err);
        }
      );
      //  this.formLabelAlign.region2 = "";
      // this.formLabelAlign.region3 = "";
      this.formLabelAlign.region4 = "";
      this.formLabelAlign.inputVal = "";
    },
      selectAreaTrigger(params){
      //  const { value, label } = params;
      //  this.nodeName3 = params.label;
      const { value, label } = params;
      this.parentName3 = params.label;
      this.nodeName3 = params.label;
      this.$http(
        "/wcm/edu/note_tree.jsp",
        { parentId: params.value },
        (res) => {
          this.schoolOptions = res.nodes;
        },
        (err) => {
          console.log(err);
        }
      );
      this.formLabelAlign.region4 = "";

    },
     getByteLen(val) {
      var len = 0;
      for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
          len += 2;
        }
        else {
          len += 1;
        }
      }
      return len;
    },
  },
  mounted() {
    // this.getOptions();
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
.registerForm_con_li {
  width: 900px;
  height: 1170px;
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

.registerForm_con_li .el-input {
  width: 485px;
}
/* .el-form{
      width: 520px;
      margin: 0 auto;
  } */
.registerForm_con_li .el-form-item__label {
  font-size: 22px !important;
  font-weight: bold !important;
  color: #515151 !important;
}
.registerForm_con_li.el-select .el-input {
  width: 160px !important;
}
#codeImage {
  height: 36px;
  cursor: pointer;
  margin-left: 10px;
}
.registerForm_con_li .el-select {
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
  font-size: 14px;
  line-height: 1;
  padding-top: 3px;
  margin-bottom: 20px;
}
.elSelectin {
  display: inline-block;
}
</style>