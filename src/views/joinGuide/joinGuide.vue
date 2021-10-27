<template>
    <div class="joinGuide_style">
        <div class="elMain">
            <!-- 模块一 -->
            <div class="guide_part" v-if="showguide">
                <div class="part_title">全媒体接入指南</div>
                <div class="centent_part">
                    <div class="clearfix">
                        <div class="guide_icon">
                            <img src="../../assets/images/guid20201126_icon.png" alt="">
                        </div>
                        <div class="guide_test">
                            当部门或新媒体首次接入时，需要填写学校数量（学院数量）、覆盖人数、网站名称、网站访问量、网站地址、微信公众号ID、公众号名称、微信关注数。<br/>当学校数量（学院数量）、覆盖人数、网站名称、网站访问量、网站地址、微信公众号ID、公众号名称、微信关注数等信息发生变更时请及时修改。请谨慎填写。
                        </div>
                    </div>
                    <div class="guide_arrow_inside">
                        <div class="arrow_box" @click="showPart"><img src="../../assets/images/jsxmt_downarrow_20201125.png" alt=""></div>
                    </div>
                </div>
            </div>
            <div class="guide_arrow" v-if="!showguide">
                <img src="../../assets/images/arrow-down20201126.png" alt="" @click="showPart">
            </div>

            <!-- 模块二 -->
            <div class="part_title">马上接入</div>
            <div class="centent_part clearfix join">
                <div class="join_icon">
                    <img src="../../assets/images/joinin20201126_icon.png" alt="">
                </div>
                <ul class="join_part">
                    <el-form :model="validateForm" ref="validateForm">
                        <!-- <li class="list_first">
                            <span>所属单位</span>
                            <el-input v-model="validateForm.unit" collapse-tags :disabled="true"></el-input>
                        </li> -->
                        <li>
                            <span>{{ schoolName }}</span>
                            <el-form-item prop="school" :rules="rules.numberSchool">
                                <el-input v-model.number="validateForm.school" placeholder="请输入数量" :disabled="disabledInput"></el-input>
                            </el-form-item>

                            <span class="list_pad">学员数量</span>
                            <el-form-item prop="people" :rules="rules.numberPeople">
                                <el-input v-model.number="validateForm.people" placeholder="请输入人数" :disabled="disabledInput"></el-input>
                            </el-form-item>
                        </li>
                        <li>
                            <span>网站名称</span>
                            <el-form-item prop="webname" :rules="rules.emptyWebname">
                                <el-input v-model="validateForm.webname" placeholder="请输入名称" collapse-tags :disabled="disabledInput"></el-input>
                            </el-form-item>
                            <span class="list_pad">网站访问量</span>
                            <el-form-item prop="visite" :rules="rules.numberVisite">
                                <el-input v-model.number="validateForm.visite" placeholder="请输入访问量" collapse-tags :disabled="disabledInput"></el-input>
                            </el-form-item>
                        </li>
                        <li>
                            <span>网站地址</span>
                            <el-form-item prop="website" :rules="rules.website">
                                <el-input v-model="validateForm.website" placeholder="请输入地址" collapse-tags :disabled="disabledInput"></el-input>
                            </el-form-item>

                            <span class="list_pad">微信公众号ID</span>
                            <el-form-item prop="weixinId" :rules="rules.emptyWeixinId">
                                <el-input v-model="validateForm.weixinId" placeholder="请输入公众号ID" collapse-tags :disabled="disabledInput"></el-input>
                            </el-form-item>
                        </li>
                        <li>
                            <span>公众号名称</span>
                            <el-form-item prop="socialname" :rules="rules.emptySocialname">
                                <el-input v-model="validateForm.socialname" placeholder="请输入名称" collapse-tags :disabled="disabledInput"></el-input>
                            </el-form-item>

                            <span class="list_pad">微信关注数</span>
                            <el-form-item prop="weixinNum" :rules="rules.numberWeixinNum">
                                <el-input v-model.number="validateForm.weixinNum" placeholder="请输入关注数" collapse-tags :disabled="disabledInput"></el-input>
                            </el-form-item>
                        </li>
                    </el-form>

                    <!-- 表单结束 -->
                    <div class="remind">
                        <!-- 注释：一个节点的人从第二个开始只可以修改 学校数量，覆盖人数，网站名称，访问量，网站地址、公众号、关注数等，所属单位系统自动载入。 -->
                    </div>
                    <div class="button_box">
                        <el-button @click="sendDatas()" type="primary" :disabled="disabledButton">更新入驻信息</el-button>
                        <span class="message_fail">{{ failmsg }}</span>
                        <!-- <el-link type="success" @click="openDialog" style="margin-left:20px">绑定微信</el-link>     -->
                    </div>

                </ul>
            </div>
        </div>

    </div>

</template>
<script>
export default {
    name: "joinGuide",
    data() {
        return {
            validateForm: {
                unit: "",  //所属单位
                school: "", //学校数量
                people: "", //覆盖人数
                webname: "", //网站名称
                visite: "", //网站访问量
                website: "", //网站地址
                weixinId: "", //微信公众号id
                socialname: "", //公众号名称
                weixinNum: "", //微信关注数
            },
            showguide: true,
            unitId: "",
            schoolName: "员工人数",
            params: {
                ServiceId: "edu_node", //写死
                methodname: "saveNode", //写死
                nodeId: "", //节点ID, 0为新增 >0修改
                schoolNumber: "", // 学校数量 //非必填
                coverNumber: "", //覆盖人数 //非必填
                websiteName: "", //网站名称 // URLEncoder加密  非必填
                websiteAddr: "", // 网站地址// URLEncoder加密 非必填
                visits: "", //网站访问量 //非必填
                wechatId: "", //微信公众号ID //非必填
                wechatName: "", //微信公众号名称 // URLEncoder加密  非必填
                wechatCcn: "", //微信公众号关注数 //非必填
            },
            centerDialogVisible: false,

            rules: {
                numberSchool: [
                    { required: true, message: '数量不能为空' },
                    { type: 'number', message: '数量必须为数字值' },
                    {
                        validator(rule, value, callback) {
                            if (value < 0) {
                                callback(new Error('数量不能为负数'));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                numberPeople: [
                    { required: true, message: '覆盖人数不能为空' },
                    { type: 'number', message: '覆盖人数必须为数字值' },
                    {
                        validator(rule, value, callback) {
                            if (value < 0) {
                                callback(new Error('覆盖人数不能为负数'));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                numberVisite: [
                    { required: true, message: '网站访问量不能为空' },
                    { type: 'number', message: '网站访问量必须为数字值' },
                    {
                        validator(rule, value, callback) {
                            if (value < 0) {
                                callback(new Error('网站访问量不能为负数'));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                numberWeixinNum: [
                    { required: true, message: '微信关注数不能为空' },
                    { type: 'number', message: '微信关注数必须为数字值' },
                    {
                        validator(rule, value, callback) {
                            if (value < 0) {
                                callback(new Error('微信关注数不能为负数'));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                website: [
                    { required: true, message: '请正确输入网址', trigger: 'blur' },
                    {
                        validator(rule, value, callback) {
                            var reg = /[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/;
                            if (reg.test(value)) {
                                callback();
                            } else {
                                callback(new Error('网址格式不正确'));
                            }
                        }
                    }
                ],
                emptyWebname: [
                    { required: true, message: '网站名不能为空' },
                    {
                        validator(rule, value, callback) {
                            var str = value.replace(/^\s+|\s+$/g, "");
                            if (str == "") {
                                callback(new Error('网站名不能为空'));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                emptyWeixinId: [
                    { required: true, message: '公众号ID不能为空' },
                    {
                        validator(rule, value, callback) {
                            var str = value.replace(/^\s+|\s+$/g, "");
                            if (str == "") {
                                callback(new Error('公众号ID不能为空'));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                emptySocialname: [
                    { required: true, message: '公众号名称不能为空' },
                    {
                        validator(rule, value, callback) {
                            var str = value.replace(/^\s+|\s+$/g, "");
                            if (str == "") {
                                callback(new Error('公众号名称不能为空'));
                            } else {
                                callback();
                            }
                        }
                    }
                ]
            },
            disabledInput: false,
            disabledButton: false,
            failmsg: "",
            dialogVisible: false, //弹出框
        };
    },
    components: {

    },
    mounted() {
        //this.getEcho();
    },
    methods: {
        // 新媒体接入指南，模块收缩
        showPart() {
            this.showguide = !this.showguide;
        },


        // 获取所属单位 数结构
        getEcho() {
            this.$http("/wcm/center.do", {
                ServiceId: 'edu_user',   //写死
                methodname: 'findLoginUserInfo', //写死
                isGetNode: 1, //是否显示节点信息 0不显示  1显示   默认0
            }, (data) => {
                if (data.nodes.length == 0) {
                    this.disabledInput = true;
                    this.disabledButton = true;
                    return;
                }
                this.disabledInput = false;
                this.disabledButton = false;

                var types = data.nodes[0].type; // 1 教育部门 2 高校
                if (types * 1 == 1) {
                    this.schoolName = "学校数量";
                } else {
                    this.schoolName = "高校数量";
                }
                this.params.nodeId = data.nodes[0].nodeId;
                this.validateForm.unit = data.nodes[0].nodeName;
                this.validateForm.school = data.nodes[0].schoolNumber;  // 学校数量 非必填
                this.validateForm.people = data.nodes[0].coverNumber;  //覆盖人数 非必填
                this.validateForm.webname = data.nodes[0].websiteName;  //网站名称 URLEncoder加密  非必填
                this.validateForm.website = data.nodes[0].websiteAddr;  // 网站地址 URLEncoder加密 非必填
                this.validateForm.visite = data.nodes[0].visits;  //网站访问量 非必填
                this.validateForm.weixinId = data.nodes[0].wechatId;  //微信公众号ID 非必填
                this.validateForm.socialname = data.nodes[0].wechatName;  //微信公众号名称 URLEncoder加密  非必填
                this.validateForm.weixinNum = data.nodes[0].wechatCcn;  //微信公众号关注数 非必填
            });
        },
        // 更新入驻数据
        sendDatas() {
            this.$refs["validateForm"].validate((valid) => {
                if (valid) {
                    this.doSendDates();
                }
            });
        },
        doSendDates() {
            this.params.schoolNumber = this.validateForm.school;  // 学校数量 非必填
            this.params.coverNumber = this.validateForm.people;  //覆盖人数 非必填
            this.params.websiteName = this.validateForm.webname;  //网站名称 URLEncoder加密  非必填
            this.params.websiteAddr = this.validateForm.website;  // 网站地址 URLEncoder加密 非必填
            this.params.visits = this.validateForm.visite;  //网站访问量 非必填
            this.params.wechatId = this.validateForm.weixinId;  //微信公众号ID 非必填
            this.params.wechatName = this.validateForm.socialname;  //微信公众号名称 URLEncoder加密  非必填
            this.params.wechatCcn = this.validateForm.weixinNum;  //微信公众号关注数 非必填

            this.$http("/wcm/center.do", this.params, (data) => {
                if (data.code == 1) {
                    this.openMsg();
                    this.failmsg = "";
                } else {
                    this.failmsg = data.msg;
                }
            });
        },
        // 提示框 打开方法
        openMsg() {
            this.$message({
                message: '您的信息已更新成功！',
                type: 'success'
            });
        },
    }
};
</script> 

<style scoped="scoped">
.buttons {
  background: #2c78c7;
  color: #fff;
}
.message_fail {
  font-size: 14px;
  vertical-align: middle;
  color: #f56c6c;
  padding-left: 1rem;
}

#homeIcon {
  width: 100%;
  position: absolute;
  bottom: 0px;
}
.joinGuide_style {
  width: 100%;
  height: 100%;
  color: #474e69;
}
.elMain {
  background: transparent !important;
}
.part_title {
  font-size: 22px;
  padding: 10px 0;
}
.centent_part {
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  padding-top: 20px;
  font-size: 16px;
}
.guide_part  .centent_part {
    background: #7f9dc6 !important;
    color: #ffffff;
    
  }
.guide_icon {
      width: 12%;
      height: 100px;
      float: left;
      position: relative;
      
    }
    .guide_icon img {
        display: block;
        position: absolute;
        top: 4px;
        left: 50%;
        margin-left: -41px;
      }
    .guide_test {
      width: 82%;
      float: left;
    }
    .guide_arrow_inside {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
     
    }
    .guide_arrow_inside  .arrow_box {
        display: inline;
        height: 40px;
        text-align: center;
        cursor: pointer;
      }
     .guide_arrow_inside img {
        -moz-transform: scaleY(-1);
        -webkit-transform: scaleY(-1);
        -o-transform: scaleY(-1);
        transform: scaleY(-1);
      }
.guide_arrow {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  
}
.guide_arrow img {
    cursor: pointer;
  }
.join_icon {
  width: 12%;
  float: left;
  min-height: 100px;
  position: relative;
  
}
.join_icon img {
    display: block;
    position: absolute;
    top: 4px;
    left: 50%;
    margin-left: -41px;
  }
.join_part {
  width: 82%;
  float: left;
}
.join_part li {
  width: 100%;
}
.join_part li span {
  display: inline-block;
  width: 110px;
}
.join_part .list_pad {
  margin-left: 10%;
}
.join_part .list_first {
  margin-bottom: 22px;
}
.el-select {
  width: 120px;
}
.el-input {
  display: inline-block;
  width: 217px !important;
}
.remind {
  color: #f56c6c;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  border-top: 1px dashed #b8bfd7;
  margin-top: 30px;
}
.button_box {
  width: 100%;
  margin-bottom: 30px;
}
.el-form-item {
  display: inline-block;
}
</style>