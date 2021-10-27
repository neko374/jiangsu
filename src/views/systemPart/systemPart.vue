<template>
  <div style="background: #e8e8e8; margin-bottom: 140px; height: 100%">
    <div class="subject_box">
      <left-menu :menus="menus" @now-title="getNowTitle" :index="index">
        <ul slot="tree" v-if="this.nowTitle == '节点管理'" class="elTree">
          <el-tree node-key="id" ref="tree" :data="treeData" :props="defaultProps" @node-click="handleNodeClick" highlight-current:true :load="loadDataTree" lazy></el-tree>
        </ul>
      </left-menu>

      <div class="elMain" v-if="nowTitle == '账号管理'">
        <div class="main_top">
          <el-button style="background: #2c78c7; color: #fff" @click="$router.push('/createUser')"><img src="../../assets/images/jsxmt_newCreateimg_20201123.png" />新建</el-button>
          <el-button style="background: #cc0718; color: #fff" @click="doDelete()"><img src="../../assets/images/jsxmt_deleteimg_20201123.png" />删除</el-button>
          <div class="searchBox">
            <el-input v-model="searchVal" clearable> </el-input>
            <div class="searchBtn" @click="getAccountLists()">
              <i class="el-icon-search"></i>
              查询
            </div>
          </div>
        </div>
        <common-table :isShowHeader="isShowHeader" :labels="accountLabels" :tabledata="accountTabledata.data" :showindex="showindex" :showoperation="showoperation" :operatetypes="accountOperatetypes" @operation="operation" @remove="remove" :isStripe="isStripe" :selection="selection" :pagesize="accountPageSize">
          <el-table-column slot="index" label="序号" align="center" type="index" width="60" :index='(index)=>{return (index+1) + (this.accountPageIndex-1)*this.accountPageSize}'>
          </el-table-column>
        </common-table>
        <div style="text-align: center; margin-top: 30px; height: 100px">
          <el-pagination @size-change="handleAccountSizeChange" @current-change="handleAccountCurrentChange" :current-page="accountPageIndex" :page-sizes="[10, 20, 30, 40]" :page-size="accountPageSize" layout="total, sizes, prev, pager, next, jumper" :total="accountTabledata.total">
          </el-pagination>
        </div>
        <el-dialog title="修改信息" :visible.sync="dialogVisible" width="60%" :append-to-body="true" center>
          <span>
            <div class="modifyForm">
              <div style="margin: 20px"></div>
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" ref="formLabelAlign" :rules="rules">
                <el-form-item label="登录名" prop="name">
                  <el-input v-model="formLabelAlign.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="realname">
                  <el-input v-model="formLabelAlign.realname"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="formLabelAlign.phone"></el-input>
                </el-form-item>

                <el-form-item prop="email" label="邮箱" :rules="[
                    { message: '请输入邮箱地址', trigger: 'blur' },
                    {
                      type: 'email',
                      message: '请输入正确的邮箱地址',
                      trigger: ['blur', 'change'],
                    },
                  ]">
                  <el-input v-model="formLabelAlign.email"></el-input>
                </el-form-item>

                <el-form-item label="用户权限" prop="resource">
                  <el-radio-group v-model="formLabelAlign.resource">
                    <el-radio :label="0">管理员</el-radio>
                    <el-radio :label="1">普通用户</el-radio>
                  </el-radio-group>
                </el-form-item>

                <!-- <el-form-item label="单位" prop="region" class="elSelect">
                  <el-input v-model="formLabelAlign.usernodeName" :disabled="true"></el-input>

                </el-form-item> -->

                <!-- <el-form-item>
              <el-button type="primary" @click="submitForm('formLabelAlign')"
                >修改</el-button
              >
              <el-button @click="resetForm('formLabelAlign')" type="success"
                >重置</el-button
              >
            </el-form-item> -->
                <!-- <span class="errText" v-html="errText"></span> -->
              </el-form>
            </div>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="doCancel()">取 消</el-button>
            <el-button type="primary" @click="doupdateSave()">保 存</el-button>
          </span>
        </el-dialog>
      </div>

    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      let reg = /^1[345789]\d{9}$/
      if (!reg.test(value)) {
        callback(new Error('请输入11位手机号'))
      } else {
        callback()
      }
    };

    return {
      nodeClick: false,
      rzPagesize: 10,
      rzPageIndex: 1,
      crrNodeId: "",
      showUser: true,
      nowTitle: "账号管理",
      isStripe: true,
      isShowHeader: true, //是否显示头部label
      searchVal: "",
      searchVal2: "",
      searchVal3: "",
      showindex: true, //是否显示序号
      showoperation: true, //是否显示操作栏
      selection: true, //是否显示checkbox
      operationVal: "",
      index: this.$route.query.index,
      parentNode: [],
      childNode: [],
      conArr: [],
      parentId: 0,
      status: 0,
      type: 0,
      isTrue: 0,
      nodeName: "",
      thisOperation: "",
      thisIndex: 0,
      thisRowData: "",
      dialogVisible: false,
      nodeDialogVisible: false,
      labelPosition: "top",
      pageIndex: 1,
      pageSize: 10,
      accountPageIndex: 1,
      accountPageSize: 10,
      groupPageIndex: 1,
      groupPageSize: 10,
      errText2: "",
      formLabelAlign: {
        name: "",
        realname: "",
        phone: "",
        email: "",
        resource: 0,
        region1: "",
        region2: "",
        region3: "",
        region4: "",
        inputVal: "",
        checkcode: "",
        usernodeName: "",
      },
      nodeChangeForm: {
        name: "",
        sqDate: "",
      },
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
      cityOptions: [],
      areaOptions: [],
      schoolOptions: [],
      removeList: [], //删除选中数组
      removeUserIds: [], //删除用户的id
      nodeRemoveList: [], //删除选中数组
      nodeRemoveUserIds: [], //删除用户的id
      groupRemoveList: [], //删除选中数组
      groupRemoveUserIds: [], //删除用户的id
      userId: 0, //修改时用户的id
      cnId: 0, //修改节点的id
      crrNodeName: "",
      //入驻管理
      operatetypes: [
        { operation: "驳回", background: "background:#b72835", btnId: 1 },
        { operation: "通过", background: "background:#659870", btnId: 2 },
      ],
      inlabels: [
        { prop: "userName", label: "账号", width: "160" },
        { prop: "nodeName", label: "节点名称", width: "120" },
        { prop: "mobile", label: "手机号", width: "120" },
        // { prop: "count", label: "覆盖人数", width: "80" },
        // { prop: "influence", label: "影响力", width: "80" },
        { prop: "parentName", label: "上级单位", width: "150" },
        { prop: "crtime", label: "时间", width: "160" },
      ],
      inTabledata: {
        total: 0,
        currentpage: 1,
        pageSize: 0,
        data: [],
      },
      //账号管理
      accountLabels: [
        { prop: "username", label: "账号名称", width: "120" },
        { prop: "name", label: "真实姓名", width: "120" },

        { prop: "roles", label: "管理员/普通用户", width: "120" },
        { prop: "phone", label: "手机号", width: "120" },
      ],
      accountOperatetypes: [
        { operation: "修改", background: "background:#b72835", btnId: 3 },
      ],
      accountTabledata: {
        total: 0,
        currentpage: 1,
        pageSize: 0,
        data: [],
      },
      //节点用户管理
      nodeAccountLabels: [
        { prop: "userName", label: "用户名", width: "180" },
        { prop: "trueName", label: "真实姓名", width: "180" },
      ],

      nodeAccountTabledata: {
        total: 0,
        currentpage: 1,

        pageSize: 10,
        data: [],
      },
      //节点管理
      groupLabels: [
        { prop: "nodeName", label: "节点名称", width: "220" },
        { prop: "sqTime", label: "授权时间", width: "180" },
      ],
      groupOperatetypes: [
        { operation: "修改", background: "background:#b72835", btnId: 4 },
      ],
      groupAccountTabledata: {
        total: 0,
        currentpage: 1,
        pageSize: 0,
        data: [],
      },

      menus: [

        {
          title: "账号管理",
          img: require("@/assets/images/jsxmt_locationwhite_20201125.png"),
          imgCurr: require("@/assets/images/jsxmt_locationblack_20201125.png"),
        }
      ],

      treeData: [],
      defaultProps: {
        id: "nodeId",
        children: "childList",
        label: "nodeName",
        isLeaf: "isChild",
      },
      dialogFormVisible: false,
      chooseUserList: [],
      chooseUserIds: [],
      isModifySuccess: false,
      rules: {
        realname: [{ required: true, message: '请输入您的真实姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' },
        { type: 'number', validator: checkPhone, message: '请输入11位有效手机号号码', trigger: ['blur', 'change'] }],
        email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        // region1:[{required: true, message: '请选择单位名称', trigger: 'blur' }],
        // region2:[{required: true, message: '请选择单位名称', trigger: 'blur' }],
        // region3:[{required: true, message: '请选择单位名称', trigger: 'blur' }],
        // inputVal:[{required: true, message: '请选择单位名称', trigger: 'blur' }],
      },
    };
  },
  methods: {

    leftMenu(e) {
      $(e.target).addClass("curr");
      $(e.target).siblings().removeClass("curr");
      this.nowTitle = e.target.innerText;

      //     console.log(this.nowTitle)
    },
    //驳回方法
    doJudged(status, userIds) {
      this.$http(
        "/wcm/center.do",
        {
          ServiceId: encodeURI("edu_node"), //写死
          methodname: encodeURI("sqUser"), //写死
          status: status,
          userIds: userIds,
        },
        (res) => {
          this.getMoveInLists();
          // this.tabledata.data = res.data;
          // this.tabledata.total = res.total;
          // // this.tabledata.pageSize = res.pageSize;
          // this.tabledata.currentpage = res.pageIndex;
        },
        () => { }
      );
      // console.log(status)
    },

    //bthId=1 ->驳回  2->通过  3->修改用户  4->修改节点
    operation(index, rows, item) {
      this.thisOperation = item.operation;
      this.thisIndex = index;
      this.thisRowData = rows[index];
      if (item.btnId == 1) {
        this.doJudged(20, rows[index].userId);
      } else if (item.btnId == 2) {
        this.doJudged(30, rows[index].userId);
      } else if (item.btnId == 3) {
        console.log(rows[index]);
        this.dialogVisible = true;
        this.getAccountListsModify(rows[index].id);
        this.userId = rows[index].id;
        // this.nodeId = rows[index].nodeId;
        // console.log(rows[index])
      } else if (item.btnId == 4) {
        this.nodeDialogVisible = true;
        this.getNodeListsModify(rows[index].nodeId);
        this.cnId = rows[index].nodeId;
        this.sqDate = rows[index].sqTime;
      }
    },
    remove(val) {
      
      this.removeList = val;
      console.log(this.removeList);
    },
    removeUser(val) {
      this.nodeRemoveList = val;
      //console.log(this.nodeRemoveList);
    },
    removeGroup(val) {
      this.groupRemoveList = val;
      //console.log(this.nodeRemoveList);
    },
    getNowTitle(item) {
      this.nowTitle = item;
      this.searchVal = "";
    },
    handleNodeClick(data) {
      // console.log(data);
    },
    handleSizeChange(val) {
      this.rzPageSize = val;
      this.getMoveInLists();
    },
    handleCurrentChange(val) {
      this.rzPageIndex = val;
      this.getMoveInLists();
    },
    handleAccountSizeChange(val) {
      this.accountPageSize = val;
      this.getAccountLists();
    },
    handleAccountCurrentChange(val) {
      this.accountPageIndex = val;
      this.getAccountLists();
    },
    handleNodeSizeChange(val) {
      this.nodeAccountTabledata.pageSize = val;
      this.getAccountByNode();
    },
    handleNodeCurrentChange(val) {
      this.nodeAccountTabledata.currentpage = val;
      this.getAccountByNode();
      // console.log(val)
      // console.log( this.nodeAccountTabledata.currentpage)
    },
    handleGroupSizeChange(val) {
      this.groupPageSize = val;
      if (this.crrNodeName == "江苏省教育厅") {
        this.getGroupByNode(1, 0);
      } else if (this.crrNodeName == "高校") {
        this.getGroupByNode(2, 0);
      } else {
        this.getGroupByNode(0, this.crrNodeId);
      }


    },
    handleGroupCurrentChange(val) {
      this.groupPageIndex = val;
      if (this.crrNodeName == "江苏省教育厅") {
        this.getGroupByNode(1, 0);
      } else if (this.crrNodeName == "高校") {
        this.getGroupByNode(2, 0);
      } else {
        this.getGroupByNode(0, this.crrNodeId);
      }
    },
    //入驻管理
    getMoveInLists(nodeId) {
      this.$http(
        "/wcm/center.do",
        {
          ServiceId: encodeURI("edu_node"), //写死
          methodname: encodeURI("sqUserList"), //写死
          nodeId: nodeId,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex,
        },
        (res) => {
          // console.log(res)
          this.inTabledata.data = res.data;
          this.inTabledata.total = res.total;
          this.inTabledata.crtime = res.crtime;
          // this.tabledata.pageSize = res.pageSize;
          // this.inTabledata.currentpage = res.pageIndex;
        },
        () => { }
      );
    },
    // 账号管理  账号新增/修改  用户查询接口
    getAccountLists() {


      this.$http({
        url: '/api/users',
        method: "get",


      })
        .then(res => {
          console.log(res.data)
          this.accountTabledata.total = res.data.data.data.total;
          this.accountTabledata.data = res.data.data.data.userinfo;

         
          console.log(res.data.data.data.userinfo)
          for (var j = 0; j < res.data.data.data.userinfo.length; j++) {
            if (res.data.data.data.userinfo[j].roles == 0) {
              res.data.data.data.userinfo[j].roles = "管理员";
            } else if (res.data.data.data.userinfo[j].roles == 1) {
              res.data.data.data.userinfo[j].roles = "普通用户";
            }
          }
        })
        .catch(err => {
          console.log('错误：' + err)
        });
    },
    //修改用户信息
    getAccountListsModify(userId) {
      
       this.$http({
            url: '/user/getById',
            method: "post",
            
            data: {
               uid: userId,
               
            }
        })
            .then(res => {
                console.log(res.data)
                this.formLabelAlign.name = res.data.user.username;
                this.formLabelAlign.realname = res.data.user.truename;
                this.formLabelAlign.email = res.data.user.email;
                this.formLabelAlign.phone = res.data.user.phone;
                this.formLabelAlign.resource = res.data.user.roles;
              
          this.formLabelAlign.pass = "";
          this.formLabelAlign.checkPass = "";
            })
            .catch(err => {
                console.log('错误：' + err)
            });

      
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
    selectAreaTrigger(params) {
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
    //获取节点Id 和 name
    getIds() {

      //如果第一级选择教育部门，
      if (this.formLabelAlign.region1.value == 1) {

        //如果第二级存在  第三级为空
        if (this.formLabelAlign.region2 && this.formLabelAlign.region3 == "") {
          this.parentId = 0;
          this.nodeId = this.formLabelAlign.region2.value;
          this.nodeName = this.formLabelAlign.region2.label;
          this.parentName = "江苏省教育厅";
        }
        //如果第三级存在
        else if (this.formLabelAlign.region3) {
          if (this.formLabelAlign.region4 == "" && this.formLabelAlign.inputVal == "") {//只到第三级
            this.parentId = this.formLabelAlign.region2.value;
            this.nodeId = this.formLabelAlign.region3.value;
            this.nodeName = this.formLabelAlign.region3.label;
            this.parentName = this.formLabelAlign.region2.label;
          } else if (this.formLabelAlign.region4 == "" && this.formLabelAlign.inputVal != "") {//第四级下拉框为空，填写文本框
            this.parentId = this.formLabelAlign.region3.value;
            this.nodeId = 0;
            this.nodeName = this.formLabelAlign.inputVal;
            this.parentName = this.formLabelAlign.region3.label;
          } else if (this.formLabelAlign.region4 && this.formLabelAlign.inputVal == "") {//第四级选择下拉框，无文本框
            this.parentId = this.formLabelAlign.region3.value;
            this.nodeId = this.formLabelAlign.region4.value;
            this.nodeName = this.formLabelAlign.region4.label;
            this.parentName = this.formLabelAlign.region3.label;
          } else if (this.formLabelAlign.region4 && this.formLabelAlign.inputVal) {//如果第四级选择下拉框，同时也写了文本框，优先注册文本框
            this.parentId = this.formLabelAlign.region3.value;
            this.nodeId = 0;
            this.nodeName = this.formLabelAlign.inputVal;
            this.parentName = this.formLabelAlign.region3.label;
          }
        }

      } else if (this.formLabelAlign.region1.value == 2) {  //高校
        this.parentId = 0;
        this.nodeId = this.formLabelAlign.region2.value;
        this.nodeName = this.nodeName2;
        this.parentName = "高校";
      }
    },
    //删除操作
    doDelete() {
      for (var i = 0; i < this.removeList.length; i++) {
        this.removeUserIds.push(this.removeList[i].id);
      }
      // console.log(this.removeUserIds.join(","));
      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // this.$http(
        //   "/wcm/center.do",
        //   {
         
        //     userIds: this.removeUserIds.join(","),
        //   },
        //   (res) => {
        //     this.$message({
        //       showClose: true,
        //       type: "success",
        //       message: "删除成功!",
        //     });
        //     this.getAccountLists();
        //     removeList = [];
        //     removeUserIds = [];
        //   },
        //   (err) => { }
        // )

       this.$http({
            url: '/user/delete',
            method: "post",
            
            data: {
               uids:this.removeUserIds.join(",")
            }
        })
            .then(res => {
                console.log(res.data)
                this.$message({
              showClose: true,
              type: "success",
              message: "删除成功!",
            });
            this.getAccountLists();
            removeList = [];
            removeUserIds = [];
            })
      });
    },
    // 修改保存
    doupdateSave() {
      this.getIds();
      this.dialogVisible = false;
      let Base64 = require("js-base64").Base64;
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
          password: Base64.encode(this.formLabelAlign.pass),
          nodeId: this.nodeId,
          // isAdmin: this.resource,//是否为管理员
        },
        (res) => {
          //  console.log(this.nodeId);
          if (res.code == 0) {
            this.errText = res.msg;
          } else if (res.code == 1) {
            this.$message({
              showClose: true,
              message: "保存成功!",
              type: "success",
            });
            // this.$router.back(-1);
            this.getAccountLists();
          }
        },
        (err) => {
          this.$message({
            showClose: true,
            message: "保存失败,请重试!",
            type: "error",
          });
        }
      );
    },
    doUpdateGroup() {
      this.nodeDialogVisible = false;
      this.$http(
        "/wcm/center.do",
        {
          ServiceId: encodeURI("edu_node"),
          methodname: encodeURI("saveNode"),
          nodeId: this.cnId,
          nodeName: this.nodeChangeForm.name,
          sqTime: this.nodeChangeForm.sqDate,
          // isAdmin: this.resource,//是否为管理员
        },
        (res) => {
          //    console.log(res);
          if (res.code == 0) {
            this.errText2 = res.msg;
          } else if (res.code == 1) {
            this.$message({
              showClose: true,
              message: "保存成功!",
              type: "success",
            });
            // this.$router.back(-1);
            this.getGroupByNode(this.cnId);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //修改取消
    doCancel() {
      this.dialogVisible = false;
      this.formLabelAlign.usernodeName;
      this.formLabelAlign.region1 = "";
      this.formLabelAlign.region2 = "";
      this.formLabelAlign.region3 = "";
      this.formLabelAlign.inputVal = "";
    },
    doCancelGroup() {
      this.nodeDialogVisible = false;
      // this.getAccountLists();
    },
    changeNodeList() {
      this.showUser = !this.showUser;
      this.searchVal2 = "";
      this.searchVal3 = "";
    },
    loadDataTree(node, resolve) {
      const id = node ? node.data.id : "";
      if (node.level === 0) {
        return resolve([
          { nodeName: "江苏省教育厅", nodeId: "1", isChild: false },
          { nodeName: "高校", nodeId: "2", isChild: false },
        ]);
      }

      if (node.label == "高校") {
        this.$http(
          "/wcm/center.do",
          {
            ServiceId: encodeURI("edu_node"), //写死
            methodname: encodeURI("loadNodeTree"), //写死
            parentId: 0, //默认0

            type: 2, //默认0   0 全部 1部门教育单位 2高校
          },
          (res) => {
            this.childrenList = res.data;
            resolve(this.childrenList);
          },
          () => { }
        );
      } else if (node.label == "江苏省教育厅") {
        this.$http(
          "/wcm/center.do",
          {
            ServiceId: encodeURI("edu_node"), //写死
            methodname: encodeURI("loadNodeTree"), //写死
            parentId: 0, //默认0

            type: 1, //默认0   0 全部 1部门教育单位 2高校
          },
          (res) => {
            this.childrenList = res.data;
            resolve(this.childrenList);
          },
          () => { }
        );
      }
      //if (node.level > 1) return resolve([]);
      if (node.level > 1) {
        this.$http(
          "/wcm/center.do",
          {
            ServiceId: encodeURI("edu_node"), //写死
            methodname: encodeURI("loadNodeTree"), //写死
            parentId: node.data.nodeId, //默认0

            type: 0, //默认0   0 全部 1部门教育单位 2高校
          },
          (res) => {
            this.childrenList = res.data;
            resolve(this.childrenList);
          },
          () => { }
        );
      }
    },

    handleNodeClick(data, node) {
      this.crrNodeId = data.nodeId;
      this.crrNodeName = data.nodeName;
      // this.$router.push("/systemPart?nodeId="+ this.crrNodeId)
      this.getAccountByNode(this.crrNodeId);
      if (data.nodeName == "江苏省教育厅") {
        this.getGroupByNode(1, 0);
      } else if (data.nodeName == "高校") {
        this.getGroupByNode(2, 0);
      } else {
        this.getGroupByNode(0, this.crrNodeId);
      }
      this.nodeClick = true;

    },
    getAccountByNode(nid) {
      this.$http(
        "/wcm/center.do",
        {
          ServiceId: encodeURI("edu_node"), //写死
          methodname: encodeURI("findUsersByNode"), //写死

          status: 30, //默认0  20-驳回  30-通过  1-删除
          nodeId: nid ? nid : "", //是否显示节点信息 默认0  不显示 1 显示
          // pageNum:this.nodeAccountTabledata.currentpage,
          pageIndex: this.nodeAccountTabledata.currentpage,
          pageSize: this.nodeAccountTabledata.pageSize,
          userName: this.searchVal2 ? encodeURI(this.searchVal2) : "",
          //  userName:encodeURI(userName),
          //  trueName:encodeURI(trueName),
          //  mobile:encodeURI(mobile)
        },
        (res) => {
          this.nodeAccountTabledata.total = res.total;
          this.nodeAccountTabledata.data = res.data;

          //把节点名称循环插入accountTabledata.data中
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].nodes.length > 0) {
              this.nodeAccountTabledata.data[i].nodeName =
                res.data[i].nodes[0].nodeName;
            }
          }
        },
        () => { }
      );
    },

    doRemove() {
      for (var i = 0; i < this.nodeRemoveList.length; i++) {
        this.nodeRemoveUserIds.push(this.nodeRemoveList[i].userId);
      }
      if (this.nodeRemoveUserIds.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择您要移除的用户",
          type: "warning",
        });
      } else {
        this.$confirm("是否移除该账号?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$http(
            "/wcm/center.do",
            {
              ServiceId: encodeURI("edu_node"), //写死
              methodname: encodeURI("operUserByNode"), //写死
              type: "remove",
              userIds: this.nodeRemoveUserIds.join(","),
              nodeId: this.crrNodeId,
            },
            (res) => {
              this.getAccountByNode(this.crrNodeId);
            },
            (err) => {
              console.log(err);
            }
          ).catch(() => {
            this.$message({
              showClose: true,
              type: "info",
              message: "已取消删除",
            });
          });
        });
      }
    },
    //删除组织操作
    deletGroup() {
      for (var i = 0; i < this.groupRemoveList.length; i++) {
        this.groupRemoveUserIds.push(this.groupRemoveList[i].nodeId);
      }
      this.$confirm("此操作将永久删除该节点, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http(
          "/wcm/center.do",
          {
            ServiceId: encodeURI("edu_node"), //写死
            methodname: encodeURI("operStatusByIds"), //写死

            nodeIds: this.groupRemoveUserIds.join(","),
            status: "20",
          },
          (res) => {
            this.getGroupByNode(0, this.crrNodeId);
          },
          (err) => {
            console.log(err);
          }
        ).catch(() => {
          this.$message({
            showClose: true,
            type: "info",
            message: "已取消删除",
          });
        });
      });
    },
    getGroupByNode(tid, pid) {
      this.$http(
        "/wcm/center.do",
        {
          ServiceId: encodeURI("edu_node"), //写死
          methodname: encodeURI("findAll"), //写死
          parentId: pid ? pid : 0,
          status: 0, //不传默认0  0正常 20 删除
          type: tid ? tid : "", //是否显示节点信息 默认0  不显示 1 显示
          pageSize: this.groupPageSize,
          pageIndex: this.groupPageIndex,
          nodeName: this.searchVal3 ? encodeURI(this.searchVal3) : "",
          //  userName:encodeURI(userName),
          //  trueName:encodeURI(trueName),
          //  mobile:encodeURI(mobile)
        },
        (res) => {
          //console.log(res.data)
          this.groupAccountTabledata.total = res.total;
          this.groupAccountTabledata.data = res.data;

          //把节点名称循环插入accountTabledata.data中
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].txType == 0) {
              this.groupAccountTabledata.data[i].txType = "无提醒";
            } else if (res.data[i].txType == 1) {
              this.groupAccountTabledata.data[i].txType = "短信";
            } else if (res.data[i].txType == 2) {
              this.groupAccountTabledata.data[i].txType = "平台";
            }
            if (res.data[i].sqTime == "") {
              this.groupAccountTabledata.data[i].sqTime = "不限制";
            }
          }
        },
        () => { }
      );
    },
    getNodeListsModify(nodeId) {
      this.$http(
        "/wcm/center.do",
        {
          ServiceId: encodeURI("edu_node"), //写死
          methodname: encodeURI("findNodeById"), //写死
          nodeId: nodeId, //默认0
        },
        (res) => {
          //修改时页面数据回显
          this.nodeChangeForm.name = res.nodeName;
          this.nodeChangeForm.sqDate = res.sqTime;

          // this.formLabelAlign.resource =  res.data.;
        },
        () => { }
      );
    },
    handleNodeExpand(data, node, self) { },
    // append(data) {
    //     this.$set(data, 'children', []);
    //     data.children.push(newChild);
    //   },
    addUser() {
      this.dialogFormVisible = true;
      this.getAccountLists();

    },
    chooseUser(val) {
      this.chooseUserList = val;

    },


    doChangeNode() {
      this.chooseUserIds = [];
      let Base64 = require("js-base64").Base64;
      for (var i = 0; i < this.chooseUserList.length; i++) {
        this.chooseUserIds.push(this.chooseUserList[i].userId)
      }
      this.$http(
        "/wcm/center.do",
        {
          ServiceId: encodeURI("edu_node"), //写死
          methodname: encodeURI("operUserByNode"), //写死
          type: "add",
          userIds: this.chooseUserIds.join(","),
          nodeId: this.crrNodeId,
        },
        (res) => {
          if (res.code == 1) {
            this.$message({
              showClose: true,
              message: "添加成功!",
              type: "success",
            });

            this.getAccountByNode(this.crrNodeId);
          } else if (res.code == 0) {
            this.$message({
              showClose: true,
              message: "添加失败,请重试!",
              type: "error",
            });
            // setTimeout(()=>{
            this.getAccountByNode(this.crrNodeId);
            // },1000);
          }
          this.chooseUserIds = []

        },
        (err) => {
          this.$message({
            showClose: true,
            message: "添加失败,请重试!",
            type: "error",
          });
          setTimeout(() => {
            this.getAccountByNode(this.crrNodeId);
          }, 1000);
          this.chooseUserIds = []

        }
      )
      this.dialogFormVisible = false;

    },

  },
  mounted() {
    // this.dosomething();
    
    this.getAccountLists();
    console.log("111");
    
  },
  watch: {
    nowTitle: function () {
      this.getMoveInLists();
      this.getAccountLists();
      this.getAccountByNode();
      this.getGroupByNode();
    },
  },
};
</script>

<style >
.el-tree .el-tree-node__content {
  display: block !important;
}
　　 .el-tree .el-tree-node__children {
  overflow: visible !important;
}

.curr {
  background: #3872c7;
  border-radius: 4px;
}
.main_top {
  margin-bottom: 20px;
}
.main_top span {
  font-size: 16px;
}
.main_top img {
  margin-right: 8px;
  margin-top: -3px;
}
.el-button {
  padding: 10px 16px;
}
.searchBox {
  float: right;
  width: 650px;
  position: relative;
}
.searchBox input {
  width: 100%;
  outline: none;
  border-radius: 18px;
  border: 1px solid #ccc;
}
.nodeManage .searchBox {
  float: right;
  width: 650px;
  position: relative;
}
.nodeManage .searchBox input {
  width: 100%;
  outline: none;
  border-radius: 18px;
  border: 1px solid #ccc;
}
.searchBtn {
  width: 71px;
  height: 36px;
  background: #1e65b8;
  font-size: 18px;
  line-height: 36px;
  color: #fff;
  border-radius: 18px;
  padding-left: 4px;
  position: absolute;
  right: 2px;
  top: 2px;
  cursor: pointer;
}
.el-footer {
  text-align: center;
  font-size: 16px;
  color: #615959;
  margin-top: 40px;
}
.has-gutter tr th {
  background: #e3ecf3 !important;
  border: 1px solid #e0e0e0;
  color: #59618d;
  font-weight: normal;
}
tbody tr td {
  border: 1px solid #e0e0e0;
}
.elTree .el-tree {
  width: calc(100% - 20px);
  margin-left: 20px;
  margin-top: 20px;
  background: #474e69;
}
.elTree .el-tree-node__content {
  background: #474e69;
}
.elTree .is-current {
  background: #e8e8e8;
}

.elTree .el-tree-node__label {
  color: #fff;
  font-size: 16px;
}
.modifyForm {
  width: 100%;

  background: #fefeff;
  border-radius: 10px;
  padding: 10px 0px 0px 46px;
  box-sizing: border-box;
}

.modifyForm .el-input {
  width: 485px;
}
.elSelectin {
  display: inline-block;
}
.modifyForm .el-form-item__label {
  font-size: 22px !important;
  font-weight: bold !important;
  color: #515151 !important;
}

#codeImage {
  height: 36px;
  cursor: pointer;
  margin-left: 10px;
}
.modifyForm .el-select {
  margin-right: 10px;
}
.lastVal {
  width: 200px;
}
.modifyForm .elSelect .el-select,
.elSelect .el-input {
  width: 150px !important;
}

.elTree
  .el-tree--highlight-current
  .el-tree-node.is-current
  .el-tree-node__content {
  background: #e8e8e8;
  border-radius: 4px 0px 0px 4px;
}
.elTree
  .el-tree--highlight-current
  .el-tree-node.is-current
  .el-tree-node__content
  .el-tree-node__label {
  color: #474e69;
}
.el-tree-node:focus > .el-tree-node__content {
  background-color: transparent !important;
}
.elTree .is-current > .el-tree-node__content > .el-tree-node__label {
  color: #474e69;
}
.elTree .is-current > .el-tree-node__content {
  background: #e8e8e8;
  border-radius: 4px 0px 0px 4px;
}
</style>
