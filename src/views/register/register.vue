<template>

  <div class="registerBox">
    <!-- <div class="registerBox_title">
         账号注册
     </div> -->
    <div class="registerForm_box">
      <div class="registerForm_con">
        <div class="registerForm_con_tit">
          <img src="../../assets/images/registerIcon_20201120.png" alt="" /> 账号注册
        </div>
        <div class="registerForm_con_li">
          <div style="margin: 20px"></div>
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
            <el-form-item label="登录名" prop="name">
              <el-input v-model="formLabelAlign.name" placeholder="请输入您的登录名"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="realname">
              <el-input v-model="formLabelAlign.realname" placeholder="请输入您的姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="formLabelAlign.phone" placeholder="请输入您的手机号"></el-input>
            </el-form-item>

            <el-form-item prop="email" label="邮箱">
              <el-input v-model="formLabelAlign.email" placeholder="请输入您的邮箱"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="formLabelAlign.pass" autocomplete="off" placeholder="请输入您的密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="formLabelAlign.checkPass" autocomplete="off" placeholder="请确认您的密码"></el-input>
            </el-form-item>
            <el-form-item label="所在地区" prop="region" class="elSelect">

              <el-form-item prop="region1" class="region">
                <el-select v-model="formLabelAlign.region1" placeholder="请选择" @change="changeSelect">
                  <el-option v-for="(item,index) in regionOptions" :key="index" :label="item" :value="item" />
                </el-select>

              </el-form-item>
              <el-form-item prop="city1" class="city">
                <el-select v-model="formLabelAlign.city1" placeholder="请选择" v-show="sCtiy1">
                  <el-option v-for="(item,index) in cityOptions1" :key="index" :label="item" :value="item" />
                </el-select>
              </el-form-item>

            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('formLabelAlign')">注册</el-button>
              <el-button @click="resetForm('formLabelAlign')" type="success">重置</el-button>
            </el-form-item>
            <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center :append-to-body="true">
              <span>注册成功！</span>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="hidden()">确 定</el-button>
              </span>
            </el-dialog>
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
      let reg = /^1[345789]\d{9}$/
      if (!reg.test(value)) {
        callback(new Error('请输入11位手机号'))
      } else {
        callback()
      }
    };

    var checkRealname = (rule, value, callback) => {

      if (value.replace(/\s+/g, '') == '') {
        callback(new Error('真实姓名不能为空！'))
      } else {
        callback()
      }
    };

    var checkCode = (rule, value, callback) => {

      if (value.replace(/\s+/g, '') == '') {
        callback(new Error('验证码不能为空！'))
      } else {
        callback()
      }
    };
    var validateAccount = (rule, value, callback) => {

      setTimeout(() => {
        var reg = /^[\u4e00-\u9fa5_a-zA-Z0-9\.][^\'\"\-\, ]{1,19}$/; // 中英文、数字、下划线!
        if (value.replace(/\s+/g, '') == '') {
          callback(new Error('登录名不能为空！'))
        }
        else if (!reg.test(value)) {
          callback(new Error('由2-20个汉字、英文字母、数字、点或下划线组成'));
        } else if (this.getByteLen(value) > 20 || this.getByteLen(value) < 2) {
          callback(new Error('由2-20个字符组成，每个英文字母或数字算一个字符，每个汉字算两个字符'));
          // console.log(this.getByteLen(value))
        } else {
          callback();
        }
      }, 1000);
    };

    return {
      sCtiy1: false,
      sCtiy2: false,
      sCtiy3: false,
      sCtiy4: false,
      centerDialogVisible: false,
      isShow: 0,
      labelPosition: "top",
      nodeId: 0,
      nodeName: '',
      nodeName1: '',
      nodeName2: '',
      nodeName3: '',
      nodeName4: '',
      parentName: '',
      parentName1: '',
      parentName2: '',
      parentName3: '',
      parentId: 0,
      formLabelAlign: {
        name: "",
        realname: "",
        phone: "",
        email: "",
        pass: "",
        checkPass: "",
        resource: "",
        region: "",
        city1: "",
        city2: "",
        city3: "",
        city4: "",
        region1: "",
        region2: "",
        region3: "",
        region4: "",
        inputVal: "",
        checkcode: "",
      },
      cityOptions1: ["南京", "上海", "苏州", "杭州", "济南"],
      // cityOptions2: ["广州", "深圳", "厦门", "海口"],
      // cityOptions3: ["沈阳", "大连", "长春", "哈尔滨", "北京", "天津"],
      // cityOptions4: ["石家庄", "成都", "长沙", "武汉", "西安", "南昌"],
      areaOptions: [],
      schoolOptions: [],
      regionOptions: ["华东区", "华南区", "华北区", "华中区"],
      cityOptions: [],
      errText: "",
      rules: {
        name: [{ required: true, message: '请输入登录名', trigger: 'blur' },
        { validator: validateAccount, trigger: "blur" }
        ],
        realname: [{ required: true, message: '请输入您的真实姓名', trigger: 'blur' },
        { validator: checkRealname, trigger: "blur" }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' },
        { type: 'number', validator: checkPhone, message: '请输入11位有效手机号号码', trigger: ['blur', 'change'] }],
        email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
      
        pass: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 8, message: '密码至少8位字符', trigger: 'blur' }, { validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
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



    doSubmit() {


      this.$http({
        url: '/user/register',
        method: "post",

        data: {
          userName: this.formLabelAlign.name,
          trueName: this.formLabelAlign.realname,
          mobile: this.formLabelAlign.phone,
          email: this.formLabelAlign.email,
          password: this.formLabelAlign.pass,
          region:this.formLabelAlign.region1,
          city:this.formLabelAlign.city1

        },
      }).then(res => {
        console.log(res.data);
        if (res.data.status == 200) {
          this.centerDialogVisible = true;

        } else if (res.code == 201) {
          this.$message.error(res.data.msg);
        }
      })
        .catch(err => {
          console.log('错误：' + err)
        })


     

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
    changeSelect(params) {
      console.log(params);
      this.sCtiy1 = true;
      if (params == "华东区") {

        this.cityOptions1 = ["南京", "上海", "苏州", "杭州", "济南"];
        this.formLabelAlign.city1 = ""
      } else if (params == "华南区") {
        this.cityOptions1 = ["广州", "深圳", "厦门", "海口"];
        this.formLabelAlign.city1 = ""
      } else if (params == "华北区") {
        this.cityOptions1 = ["沈阳", "大连", "长春", "哈尔滨", "北京", "天津"];
        this.formLabelAlign.city1 = ""
      } else if (params == "华中区") {
        this.cityOptions1 = ["石家庄", "成都", "长沙", "武汉", "西安", "南昌"];
        this.formLabelAlign.city1 = ""
      }
    },



    hidden() {
      this.centerDialogVisible = false;
      this.$router.push('/login');
    }
  },
  mounted() {
    // this.getOptions();


  },
};
</script>

<style >
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
  background: url('../../assets/images/registerbg_20201120.jpg') repeat;
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
.el-form-item__label {
  width: 100%;
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
.region {
  display: inline-block;
}
.city {
  display: inline-block;
}
</style>