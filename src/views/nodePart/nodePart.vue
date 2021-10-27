<template>
	<div style="background: #e8e8e8; height: 100%">
		<div class="subject_box">
			<left-menu :menus="menus" @now-title="getNowTitle" :index="index" ref="left">

			</left-menu>
			<div v-if="nowTitle == '信息汇总'" class="elMain">

				<div class="main_top">
					<div style="display:inline-block;" >
						<el-button style="background: #2c78c7; color: #fff" @click="$router.push('/createNotice')"><img src="../../assets/images/jsxmt_newCreateimg_20201123.png" />新建</el-button>

					</div>
					<!-- <div class="searchBox">
            <el-input v-model="tzsearchVal" clearable class="myInput">
            </el-input>
            <div class="searchBtn" @click="getNoticeLists(tzsearchVal)">
              <i class="el-icon-search"></i>
              查询
            </div>
          </div> -->
				</div>
				<div class="right_tab">

					<common-table :labels="noticeLabels" :tabledata="noticeTabledata.data" :pagesize="tzpagesize" :showindex="showindex" :showoperation="showoperation" :operatetypes="noticeoperatetypes" @operation="operation" :isStripe="isStripe" :isShowHeader="isShowHeader" @remove="tzremove" @cellClick="noticeCellClick">
						<el-table-column slot="index" label="序号" align="center" type="index" width="60">
						</el-table-column>
					</common-table>
					<div style="text-align: center; margin-top: 30px; height: 100px">
						<el-pagination @size-change="tzhandleSizeChange" @current-change="tzhandleCurrentChange" :current-page="tzpageindex" :page-sizes="[10]" :page-size="tzpagesize" layout="total, prev, pager, next, jumper" :total="noticeTabledata.total">
						</el-pagination>
					</div>
				</div>
				<div style="clear: both"></div>
			</div>
			<div v-if="nowTitle == '分校资讯'" class="elMain">
				<div class="main_top">

					<div class="searchBox">
						<el-input v-model="tzsearchVal" clearable class="myInput">
						</el-input>
						<div class="searchBtn" @click="getNoticeLists(tzsearchVal)">
							<i class="el-icon-search"></i>
							查询
						</div>
					</div>
				</div>
				<div class="right_tab">

					<common-table :labels="noticeLabels" :tabledata="noticeTabledata.data" :pagesize="tzpagesize" :showindex="showindex" :showoperation="showoperation" :operatetypes="noticeoperatetypes" @operation="operation" :isStripe="isStripe" :isShowHeader="isShowHeader" @remove="tzremove" @cellClick="noticeCellClick">
						<el-table-column slot="index" label="序号" align="center" type="index" width="60">
						</el-table-column>
					</common-table>
					<div style="text-align: center; margin-top: 30px; height: 100px">
						<el-pagination @size-change="tzhandleSizeChange" @current-change="tzhandleCurrentChange" :current-page="tzpageindex" :page-sizes="[10]" :page-size="tzpagesize" layout="total, prev, pager, next, jumper" :total="noticeTabledata.total">
						</el-pagination>
					</div>
				</div>
				<div style="clear: both"></div>
			</div>
			<div v-if="nowTitle == '通知公告'" class="elMain">
				<div class="main_top">

					<div class="searchBox">
						<el-input v-model="tzsearchVal" clearable class="myInput">
						</el-input>
						<div class="searchBtn" @click="getNoticeLists(tzsearchVal)">
							<i class="el-icon-search"></i>
							查询
						</div>
					</div>
				</div>
				<div class="right_tab">

					<common-table :labels="noticeLabels" :tabledata="noticeTabledata.data" :pagesize="tzpagesize" :showindex="showindex" :showoperation="showoperation" :operatetypes="noticeoperatetypes" @operation="operation" :isStripe="isStripe" :isShowHeader="isShowHeader" @remove="tzremove" @cellClick="noticeCellClick">
						<el-table-column slot="index" label="序号" align="center" type="index" width="60">
						</el-table-column>
					</common-table>
					<div style="text-align: center; margin-top: 30px; height: 100px">
						<el-pagination @size-change="tzhandleSizeChange" @current-change="tzhandleCurrentChange" :current-page="tzpageindex" :page-sizes="[10]" :page-size="tzpagesize" layout="total, prev, pager, next, jumper" :total="noticeTabledata.total">
						</el-pagination>
					</div>
				</div>
				<div style="clear: both"></div>
			</div>
			<!-- <website-map
        v-if="nowTitle == '平台快速引导'"
        @websiteReturn="websiteReturn"
      ></website-map> -->
			<join-guide v-if="nowTitle == '全媒体接入指南'"></join-guide>
		</div>
	</div>
</template>

<script>

// import LeftMenu from "../../components/layout/leftMenu";
// import $ from "jquery"
import joinGuide from "../joinGuide/joinGuide.vue";

// @ is an alias to /src
export default {
	name: "Home",
	components: {

		joinGuide,

	},
	data() {
		return {
			isAdmin: false,//是否是管理员
			isUser: false,//是否是普通用户
			removeList: [], //专题删除选中数组
			removeSubjectIds: [], //删除专题的id
			tzremoveList: [], //专题删除选中数组
			tzremovenoticeIds: [], //删除专题的id
			tzpageindex: 1,
			tzpagesize: 10,
			tzsearchVal: "",
			isStripe: true,
			isShowHeader: true,
			showindex: true, //是否显示序号
			showoperation: false, //是否显示操作栏
			operationVal: "",
			selection: true, //是否有多选框
			nowTitle: "信息汇总",
			index: this.$route.query.index,
			docid: "",
			menus: [
				{
					title: "我的报送",
					img: require("@/assets/images/jsxmtfolder_20201123.png"),
					imgCurr: require("@/assets/images/jsxmt_folderblack_20201125.png"),
				},
				// {
				//   title: "分校资讯",
				//   img: require("@/assets/images/jsxmtfolder_20201123.png"),
				//   imgCurr: require("@/assets/images/jsxmt_folderblack_20201125.png"),
				// },
				// {
				//   title: "通知公告",
				//   img: require("@/assets/images/jsxmtfolder_20201123.png"),
				//   imgCurr: require("@/assets/images/jsxmt_folderblack_20201125.png"),
				// },
			],
			isManager: null,
			pageSize: 10,
			tzIndex: 1, //通知公告 分页当前页码
			//通知公告
			noticeLabels: [
				{ prop: "noticetitle", label: "标题", width: "300" },
				{ prop: "docreltime", label: "时间", width: "180" },
				{ prop: "isdelay", label: "类型", width: "100" },
				{ prop: "type", label: "发布人", width: "100" },
				// { prop: "range", label: "下发范围", width: "60" },
			],
			noticeoperatetypes: [
				{ operation: "修改", background: "background:#3fa9f3" },
			],

			noticeTabledata: {
				total: 0,
				data: [],
			},
		};
	},
	mounted() {
		this.getNoticeLists(0);
		// this.isManager = this.$store.getters.getType; //当前如果是管理员1，则不显示接入页面
		// this.checkLogin();
	},
	methods: {
		//操作判断
		operation(index, rows, item) {
			this.thisOperation = item.operation;
			this.thisIndex = index;
			this.thisRowData = rows[index];
			console.log(index);
			console.log(rows);
			console.log(item);
			this.subjectId = rows[index].subjectid; //获取当前专题id
			this.thisSubjectId = this.subjectId;
			this.noticeid = this.thisRowData.noticeid;
			if (item.operation == "修改") {
				this.$router.push("/createNotice?noticeid=" + this.noticeid);
			}
		},
		//通知公告删除操作
		dotzDelete() {
			for (var i = 0; i < this.tzremoveList.length; i++) {
				this.tzremovenoticeIds.push(this.tzremoveList[i].noticeid);
			}
			if (this.tzremovenoticeIds.length > 0) {
				this.$confirm("确定删除吗?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				}).then(() => {
					this.$http(
						"/wcm/center.do",
						{
							ServiceId: encodeURI("edu_notice"), //写死
							methodname: encodeURI("deleteById"), //写死
							noticeid: this.tzremovenoticeIds.join(","),
						},
						(res) => {
							this.$message({
								showClose: true,
								type: "success",
								message: "删除成功!",
							});
							this.getNoticeLists();
						},
						(err) => {
							this.$message({
								showClose: true,
								message: "删除失败,请重试!",
								type: "error",
							});
						}
					).catch(() => {
						this.$message({
							showClose: true,
							type: "info",
							message: "已取消删除",
						});
					});
				});
			} else if (this.tzremovenoticeIds.length == 0) {
				this.$message({
					showClose: true,
					message: "请选择您要删除的内容",
					type: "warning",
				});
			}
		},
		clickData() { },
		getNoticeLists(type) {
			this.$http({
				url: '/api/sendList',
				method: "post",

				data: {
					pageIndex: this.tzpageindex - 1,
					pageSize: 10,
					type: type
				}
			})
				.then(res => {
					

						for (var i = 0; i < res.data.data.rows.length; i++) {

							res.data.data.rows[i].type = this.$store.getters.getTrueName

						}

					
					this.noticeTabledata.data = res.data.data.rows;
					this.noticeTabledata.total = res.data.data.total;
					this.docid = res.data.data.rows.id

				})
				.catch(err => {
					console.log('错误：' + err)
				});
		},
		rightTab(e) {
			$(e.target).addClass("rightTabCurr");
			$(e.target).siblings().removeClass("rightTabCurr");
		},

		// handleEdit(item){
		// 	this.$emit("operation",item)
		// },
		getNowTitle(item) {
			this.tzpageindex = 1;
			this.nowTitle = item;
			if (item == "信息汇总") {
				this.getNoticeLists(0);
			} else if (item == "分校资讯") {
				this.getNoticeLists(1);
			} else if (item == "通知公告") {
				this.getNoticeLists(2);
			}
		},
		// 底部导航，跳转
		doNavjump(e) {
			this.nowTitle = e.target.innerText.replace(" ", "");
			this.$children[0].nowTitle = "";
		},

		//分页 每页条数改变
		tzhandleSizeChange(val) {
			this.tzpagesize = val;
			this.getNoticeLists();
		},
		//分页 当前页码
		tzhandleCurrentChange(val) {
			console.log(val);
			this.tzpageindex = val;
			this.getNoticeLists();
		},

		//通知移除
		tzremove(val) {
			this.tzremoveList = val;
		},
		noticeCellClick(row, column, cell, event) {
			if (column.label == "标题") {
				console.log(row.id);
				let newUrl = this.$router.resolve({
					path: "/showNotice",
					query: {
						noticeid: row.id,
					},
				});
				window.open(newUrl.href, "_blank");
				console.log(row)
				//this.$router.push("/showNotice?noticeid="+row.id)
			}
		},

		//获取登录用户的type和江苏省教育厅
		checkLogin() {
			this.$http('/wcm/edu/checkloginedu.jsp', {}, (res) => {
				if (res.type == 1) {
					this.isAdmin = true;
					this.showoperation = true;
					this.isUser = false;
				} else {
					this.isAdmin = false;
					this.showoperation = false;
					this.isUser = true;
				}
			}, () => { })
		},
	},
};
</script>

<style scoped>
.guide {
  width: 166px;
  height: 130px;
  background: #232b4f;
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
  margin-top: 90px;
}
.guide img {
  padding: 22px 0px;
}
.curr {
  background: #3872c7;
  border-radius: 4px;
}
.liTitle_box {
  width: 100%;
  height: 40px;
  background: #eaf4fb;
  padding: 5px 0px 0px 11px;
  font-size: 18px;
  color: #fff;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.liTitle_box div {
  width: 133px;
  height: 34px;
  background: #5a8acf;
  line-height: 34px;
}
.liTitle_box div img {
  margin: -3px 11px 0 9px;
}
tbody {
  font-size: 18px;
}

tbody {
  font-size: 16px;
}
.el-table td,
.el-table th {
  padding: 8px 0px;
}
#homeIcon {
  width: 100%;
  position: absolute;
  bottom: 0px;
}
.sp_navbar {
}
.sp_navbar li {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #313754;
  cursor: pointer;
  padding-left: 26px;
  box-sizing: border-box;
  margin-bottom: 1px;
}
/deep/.has-gutter tr th {
  background: #e3ecf3 !important;
  border: 1px solid #e0e0e0;
  color: #59618d;
  font-weight: normal;
}
tbody tr td {
  border: 1px solid #e0e0e0;
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
/deep/.searchBox .el-input__inner {
  width: 100%;
  outline: none;
  border-radius: 18px !important;
  border: 1px solid #ccc;
}
.searchBtn {
  width: 71px;
  height: 36px;
  background: #1e65b8;
  font-size: 18px;
  line-height: 36px;
  color: #fff;
  border-radius: 18px !important;
  padding-left: 4px;
  position: absolute;
  right: 2px;
  top: 2px;
  cursor: pointer;
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
.right_tab > ul {
  width: 382px;
}
.right_tab > ul li {
  display: inline-block;
  width: 127px;
  height: 37px;
  background: url(../../assets/images/jsxmt_nodenoCurr_20201124.png);
  line-height: 37px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}

.right_tab .rightTabCurr {
  background: url(../../assets/images/jsxmt_nodeCurr_20201124.png) !important;
}
.right_tab {
  margin-top: 20px;
}

.distSelect .elSelectin {
  width: 160px;
  display: inline-block;
  margin-right: 10px;
}
.main_top .el-button {
  padding: 0px 10px;
  height: 37px;
  line-height: 37px;
}
</style>
