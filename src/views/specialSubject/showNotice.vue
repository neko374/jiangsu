<template>
  <div class="newCreate">
    <el-form ref="createNoticeFrom" :model="createFrom" label-width="120px" size="medium" class="showForm" :rules="createNoticeRules" :hide-required-asterisk="true">
      <el-form-item label="公告标题" prop="name">
        <img src="../../assets/images/jsxmt_formicon_20201125.png" alt="" />
        <el-input v-model="createFrom.name" style="width: 60%" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="撰写时间" prop="writeTime">
        <img src="../../assets/images/jsxmt_formicon_20201125.png" alt="" />
        <el-col :span="4">
          <el-date-picker v-model="createFrom.writeTime" style="width: 200px" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择撰写日期" :disabled="true">
          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="创建人" prop="creatName">
        <img src="../../assets/images/jsxmt_formicon_20201125.png" alt="" />
        <el-input v-model="createFrom.creatName" style="width: 60%" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="公告内容" prop="content" class="richContext">
        <img src="../../assets/images/jsxmt_formicon_20201125.png" alt="" />
        <!-- <el-input
          type="textarea"
          v-model="createFrom.content"
          :rows="10"
          style="width: 60%" 
          :disabled="true"
        ></el-input> -->
        <quill-editor ref="myTextEditor" class="myQuillEditor" v-model="createFrom.content" :options="editorOption" disabled style="width:60%;height:500px;"></quill-editor>
      </el-form-item>
      <!-- <el-form-item label="附件" prop="fileList">
        <img src="../../assets/images/jsxmt_formicon_20201125.png" alt="" />
        <el-upload
          ref="upload"
          action="#"
          :file-list="createFrom.fileList"
          class="elUpload"
          :disabled = "true"
        >
          
        </el-upload>
      </el-form-item> -->
      <!-- <el-form-item label="通知方式" prop="sendWay">
        <img src="../../assets/images/jsxmt_formicon_20201125.png" alt="" />
        <el-radio-group v-model="createFrom.sendWay">
          <el-radio :label="1" :disabled="true">平台</el-radio>
          <el-radio :label="2" :disabled="true">短信</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发送时间" prop="timing">
        <img src="../../assets/images/jsxmt_formicon_20201125.png" alt="" />
        <el-col :span="4">
          <el-date-picker
            v-model="createFrom.timing"
            style="width: 200px"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
            :disabled="true"
          >
          </el-date-picker>
         
        </el-col>
      </el-form-item> -->

    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor, Quill } from 'vue-quill-editor'
export default {
  data() {
    return {
      wcmFileList: [],
      uploadLists: [],
      createFrom: {
        name: "",
        sendWay: 1, //1-平台  2-短信
        writeTime: "",
        content: "",
        fileList: [],
        attachment: "",
        timing: "",
        creatName: "",
      },
      pagesize: "10",
      isStripe: true,
      isShowHeader: false,
      showindex: true, //是否显示序号
      showoperation: true, //是否显示操作栏
      operationVal: "",
      selection: false, //是否有多选框

      //日期时间选择器配置
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now(); // 选当前时间之后的时间
        },
      },
      createNoticeRules: {
        name: [{ required: true, message: "请输入公告标题", trigger: "blur" }],
        content: [
          { required: true, message: "请输入公告内容", trigger: "blur" },
        ],
      },
      editorOption: {
        placeholder: '编辑文章内容',
        modules: {
          toolbar: [
          ]
        }
      },
    };
  },
  components: {
    quillEditor
  },
  methods: {

    operation(item) {
      this.operationVal = item;
      console.log(item);
    },

    //数据回显
    getNoticeInfo() {
     
      this.$http({
        url: '/api/detail',
        method: "get",
        data: {

          noticeid: this.$route.query.noticeid, //修改必填
        },

      })
        .then(res => {
          console.log(res.data)
          this.createFrom.name = res.data.data.title;
          this.createFrom.content = res.data.data.htmlcontent;

          this.createFrom.writeTime = res.data.data.docreltime;
          this.createFrom.creatName = res.data.data.cruser;
        })
        .catch(err => {
          console.log('错误：' + err)
        });
    },

  },
  mounted() {
    // if (this.$route.query.noticeid) {
    this.getNoticeInfo();
    // }
  },
};
</script>

<style>
.newCreate {
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  margin: 0 auto;
  overflow-y: auto;
}
.showForm {
  width: 80%;
  /* height: 100%; */
  background: #fff;
  margin: 0 auto;
  margin-top: 20px;
  padding: 30px;
}
.showForm .el-form-item__label {
  color: #646c8d;
  font-size: 16px;
}
.showForm .el-form-item {
  position: relative;
}
.showForm .el-form-item__content > img {
  position: absolute;
  left: -104px;
  top: 10px;
}
.showForm .el-button {
  color: #fff;
}
.showForm .el-upload-list {
  width: 60%;
}
.showForm .el-input.is-disabled .el-input__inner,
.showForm .el-textarea.is-disabled .el-textarea__inner,
.showForm .el-radio__input.is-disabled + span.el-radio__label {
  background-color: #fff;
  border-color: #e4e7ed;
  color: #606266;
  cursor: pointer;
}
.myQuillEditor .ql-toolbar {
  display: none !important;
}
.myQuillEditor .ql-container {
  border: 1px solid #e4e7ed !important;
  color: #606266 !important;
}
.myQuillEditor .ql-editor {
  font-size: 14px !important;
}
</style>