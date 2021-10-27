<template>
  <div class="newCreate">
    <el-form
      ref="createNoticeFrom"
      :model="createFrom"
      label-width="120px"
      size="medium"
      class="createForm"
      :rules="createNoticeRules"
      :hide-required-asterisk="true"
    >
      <el-form-item label="公告标题" prop="name">
        <img src="../../assets/images/jsxmt_formicon_20201125.png" alt="" />
        <el-input v-model="createFrom.name" style="width: 60%"></el-input>
      </el-form-item>
      <el-form-item label="撰写时间" prop="writeTime">
        <img src="../../assets/images/jsxmt_formicon_20201125.png" alt="" />
        <el-col :span="4">
          <el-date-picker
            v-model="createFrom.writeTime"
            style="width: 200px"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择撰写日期"
          >
          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item
        label="公告内容"
        prop="content"
        style="height: 560px"
        class="richContext"
      >
        <img src="../../assets/images/jsxmt_formicon_20201125.png" alt="" />
        <!-- <el-input
          type="textarea"
          v-model="createFrom.content"
          :rows="10"
          style="width: 60%"
        ></el-input> -->
        <quill-editor
          ref="myTextEditor"
          v-model="createFrom.content"
          :options="editorOption"
          style="height: 500px"
        ></quill-editor>
        <input type="file" hidden ref="fileBtn" @change="handleChange" />
      </el-form-item>
      <!-- <el-form-item label="附件" prop="fileList">
        <img src="../../assets/images/jsxmt_formicon_20201125.png" alt="" />
        <el-upload
          ref="upload"
          action="#"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="createFrom.fileList"
          :on-change="changeFile"
          :before-upload="beforeUpload"
          class="elUpload"
        >
          <el-button size="medium" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>-->
      <el-form-item label="报送类型" prop="sendWay">
        <img src="../../assets/images/jsxmt_formicon_20201125.png" alt="" />
        <el-radio-group v-model="createFrom.sendWay">
          <el-radio :label="1">通知公告</el-radio>
          <el-radio :label="2">分校资讯</el-radio>
        </el-radio-group>
      </el-form-item> 
      <!-- <el-form-item label="定时发送" prop="timing">
        <img src="../../assets/images/jsxmt_formicon_20201125.png" alt="" />
        <el-col :span="4">
          <el-date-picker
            v-model="createFrom.timing"
            style="width: 200px"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
            placeholder="选择发送日期"
          >
          </el-date-picker>
        </el-col>
      </el-form-item> -->
      <el-form-item size="large">
        <el-button
          style="background: #5a8acf"
          @click="createNotice()"
          v-if="!$route.query.noticeid"
          >保存</el-button
        >
        <el-button
          style="background: #5a8acf"
          @click="createNotice($route.query.noticeid)"
          v-if="$route.query.noticeid"
          >保存修改</el-button
        >
        <el-button @click="$router.back(-1)" style="background: #4da8ce"
          >关闭</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend } from "quill-image-extend-module";
Quill.register("modules/ImageExtend", ImageExtend);
export default {
  data() {
    return {
      wcmFileList: [],
      uploadLists: [],
      createFrom: {
        name: "",
        sendWay: 1, //1-平台  2-短信
        writeTime: this.getDayTimer(new Date()),
        content: "",
        fileList: [],
        attachment: "",
        timing: "",
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
        placeholder: "编辑文章内容",
      },
    };
  },
  components: {
    quillEditor,
  },
  methods: {
    operation(item) {
      this.operationVal = item;
      console.log(item);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //上传接口
    uploadFile() {
      this.$refs.upload.submit();
    },
    changeFile(file, filelist) {},
    beforeRemove(file, fileList) {
      if (file && file.status === "success") {
        return this.$confirm(`确定移除 ${file.name}？`);
      }
    },
    beforeUpload(files) {
      var vm = this;
      var formdata = new FormData();
      formdata.append("method", "upload");
      formdata.append("ResponseType", 2);
      formdata.append("channelId", 0);
      formdata.append("Type", "DOC_APPENDIX_FILE_SIZE_LIMIT");
      formdata.append("Filedata", files);
      // console.log(formdata.get('Filedata'))
      var xmlobj = new XMLHttpRequest();
      //指定提交类型和选择要发送的地址 设置同步
      xmlobj.open("post", "/wcm/app/system/import_appendix.jsp", true);
      //发送数据
      xmlobj.send(formdata);
      xmlobj.onload = function (res) {
        console.log(files);
        var obj = {};
        var fileListObj = {};
        obj.filename = xmlobj.responseText.split("#")[0];
        obj.orifilename = files.name;
        fileListObj.name = files.name;
        fileListObj.uid = files.uid;
        // fileListObj.url = ;
        vm.wcmFileList.push(obj);
        vm.createFrom.fileList.push(fileListObj);
        console.log(vm.wcmFileList);
        console.log(vm.createFrom.fileList);
      };
      return false;
    },
    //新建通知接口
    createNotice(noticeid) {
      this.$refs["createNoticeFrom"].validate((valid) => {
        if (valid) {
          axios
            .get("/wcm/center.do", {
              params: {
                ServiceId: encodeURI("edu_notice"),
                methodname: encodeURI("saveNotice"),
                title: this.createFrom.name,
                htmlcontent: this.createFrom.content,
                docreltime: this.createFrom.writeTime,
                type: this.createFrom.sendWay,
                delaytime: this.createFrom.timing, // >当前时间  空-立即发送
                file: JSON.stringify(this.wcmFileList),
                noticeid: noticeid, //修改必填
              },
            })
            .then((res) => {
              console.log(this.createFrom.writeTime);
              this.$message({
                showClose: true,
                message: "保存成功",
                type: "success",
              });
              if (noticeid) {
                this.$router.back(-1);
              }
              this.createFrom.name = "";
              this.createFrom.content = "";
              this.createFrom.sendWay = 1;
              this.createFrom.writeTime = new Date();
              this.createFrom.timing = "";
              this.wcmFileList = [];
            })
            .catch((err) => {
              this.$message({
                showClose: true,
                message: "保存失败",
                type: "error",
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //数据回显
    getNoticeInfo(noticeid) {
      axios
        .get("/wcm/center.do", {
          params: {
            ServiceId: encodeURI("edu_notice"),
            methodname: encodeURI("queryNotice"),
            noticeid: noticeid, //修改必填
          },
        })
        .then((res) => {
          this.createFrom.name = res.data.data.title;
          this.createFrom.content = res.data.data.htmlcontent;
          this.createFrom.sendWay = res.data.data.type;
          this.createFrom.timing = res.data.data.delaytime;
          //  this.$router.back(-1);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getDayTimer(data) {
      var date = new Date(data);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var currentdate = y + "-" + m + "-" + d;
      var hh = date.getHours();
      hh = hh < 10 ? "0" + hh : hh;
      var mm = date.getMinutes();
      mm = mm < 10 ? "0" + mm : mm;
      var ss = date.getSeconds();
      ss = ss < 10 ? "0" + ss : ss;
      var time = hh + ":" + mm + ":" + ss;
      return currentdate + " " + time;
    },

    imgHandler(state) {
      if (state) {
        //触发input的单击 ，fileBtn换成自己的
        this.$refs.fileBtn.click();
      }
    },
    handleChange(e) {
      const files = Array.prototype.slice.call(e.target.files);
      if (!files) {
        return;
      }
      let form = new FormData();
      form.append("ResponseType", "2");
      form.append("FileParamName", "upfile");
      form.append("upfile", files[0]);
      //使用了axios请求
      axios({
        url: "/wcm/app/system/file_upload_dowith_ueditor.jsp",
        method: "post",
        data: form,
        withCredentials: true,
      }).then((res) => {
        this.$refs.fileBtn.value = "";
        if (res.data.state === "SUCCESS") {
          let selection = this.$refs.myTextEditor.quill.getSelection();
          //这里就是返回的图片地址，如果接口返回的不是可以访问的地址，要自己拼接
          let imgUrl =
            "/wcm/app/system/read_image.jsp?FileName=" + res.data.url;
          //获取quill的光标，插入图片
          this.$refs.myTextEditor.quill.insertEmbed(
            selection != null ? selection.index : 0,
            "image",
            imgUrl
          );
          //插入完成后，光标往后移动一位
          this.$refs.myTextEditor.quill.setSelection(selection.index + 1);
        }
      });
    },
  },
  mounted() {
    if (this.$route.query.noticeid) {
      this.getNoticeInfo(this.$route.query.noticeid);
    }
    if (this.$refs.myTextEditor) {
      //这里初始化，劫持toolbar的image的handler方法，在mounted中处理

      this.$refs.myTextEditor.quill
        .getModule("toolbar")
        .addHandler("image", this.imgHandler);
    }
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
.createForm {
  width: 80%;
  /* height: 100%; */
  background: #fff;
  margin: 0 auto;
  margin-top: 20px;
  padding: 30px;
}
.createForm .el-form-item__label {
  color: #646c8d;
  font-size: 16px;
}
.createForm .el-form-item {
  position: relative;
}
.createForm .el-form-item__content > img {
  position: absolute;
  left: -104px;
  top: 10px;
}
.createForm .el-button {
  color: #fff;
}
.createForm .el-upload-list {
  width: 60%;
}
.richContext .el-form-item__content {
  height: 560px;
}
.myQuillEditor .ql-editor{
  font-size: 14px !important;
}
</style>