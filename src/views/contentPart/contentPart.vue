<template>
	<div class="subject_box">
		<!-- 左侧导航 -->
		<left-menu :menus="menus" @now-title="getNowTitle" ref="left"></left-menu>

		<!-- 主体部分 -->
		<div class="elMain" style="background: #f2f2f2">
			<div class="node_top">
				<div class="clearfix">
					<div class="node_top_li">
						<img
						src="../../assets/images/jsxmt_rightarrow_20201124.png"
						alt=""
						/>
						<span>分校名称：</span>
						<el-input v-model="bmSelect" :disabled='true'></el-input>
					</div>
					<div class="node_top_li">
						<img
						src="../../assets/images/jsxmt_rightarrow_20201124.png"
						alt=""
						/>
						<span>所属区域：</span>
						<el-input v-model="unitVal" :disabled='true'></el-input>
					</div>
				</div>
				<div class="clearfix">
					<div class="node_top_li">
						<img
						src="../../assets/images/jsxmt_rightarrow_20201124.png"
						alt=""
						/>
						<span>覆盖人数：</span>
						<el-input v-model="countVal" :disabled='true'></el-input>
					</div>
					<div class="node_top_li">
						<img
						src="../../assets/images/jsxmt_rightarrow_20201124.png"
						alt=""
						/>
						<span>影 响 力 ：</span>
						<el-input v-model="affectVal" :disabled='true'></el-input>
					</div>
				</div>
			</div>
			<div v-if="nowTitle == '粉丝分析'" class="charts_part">
				<div class="choose_box">
					<!-- <el-select v-model="chartsSelect" placeholder="请选择">
						<el-option
							v-for="item in chartsOption"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select> -->
					<!-- <el-date-picker
						v-model="chartsTime"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						@change="timedoChange">
					</el-date-picker> -->
				</div>
				<ul class="chart_list  clearfix">
					<li>
						<div class="chartsTitle">总数变化趋势</div>
						<div class="charts_box">
							<lines :linedatas="lineDatas" :height="'100%'" :linelabel="linelabels" ref="totalLine"></lines>
						</div>
					</li>
					<li>
						<div class="chartsTitle">地域分布</div>
						<div class="charts_box">
							<maps :datas="datalist" :height="'100%'" ref="coverMap"></maps>
						</div>
					</li>
				</ul>
			</div>
			<div v-if="nowTitle == '节点网络'" class="charts_part">
				<!-- <ul class="leg_list">
					<li>
						<span class="legbox red"></span> 已入驻有子节点
					</li>
					<li>
						<span class="legbox emptyred"></span> 已入驻无子节点
					</li>
					<li>
						<span class="legbox gray"></span> 未入驻有子节点
					</li>
					<li>
						<span class="legbox emptygray"></span> 未入驻无子节点
					</li>
				</ul> -->
				<!-- <tree :treedatas="treedatas" ref="nodeTree2" @resetDatas="resetDatas1" :height="treeHeight"></tree> -->
				<tree :treedatas="schooltreedatas" ref="nodeTree1" @resetDatas="resetDatas2" :ids="'schoolTree'" :height="schooltreeHeight"></tree>
			</div>
		</div>
	</div>
</template>

<script>
import $ from "jquery";
export default {
	data() {
		return {
			bmSelect: '南京分校',
			menus: [
				{
				title: "粉丝分析",
				img: require("@/assets/images/jsxmt_locationwhite_20201125.png"),
				imgCurr: require("@/assets/images/jsxmt_locationblack_20201125.png"),
				},
				{
				title: "节点网络",
				img: require("@/assets/images/jsxmt_locationwhite_20201125.png"),
				imgCurr: require("@/assets/images/jsxmt_locationblack_20201125.png"),
				},
			],
			value: "",
			unitVal: "华东区域",
			countVal: "201157",
			affectVal: "98",
			nowTitle: "粉丝分析",
			lineDatas: [{
					name: "节点总数",
					type: 'line',
					data: [150, 230, 224, 218, 135, 147, 260],
				}],
			linelabels: ["1月","2月","3月","4月","5月","6月","7月"],
			datalist: [{name:'南京市',value:98},{name:'无锡市',value:55},{name:'徐州市',value:79},{name:'苏州市',value:87},{name:'南通市',value:40},{name:'连云港市',value:48},{name:'淮安市',value:78},{name:'盐城市',value:27},{name:'扬州市',value:59},{name:'镇江市',value:12},{name:'常州市',value:51},{name:'泰州市',value:37},{name:'宿迁市',value:16}],
			chartsTime: "",
			chartsSelect: "选项1",
			chartsOption: [
				{
					value: "选项1",
					label: "全部渠道",
				},
				{
					value: "选项2",
					label: "微信",
				},
				{
					value: "选项3",
					label: "网站",
				}
			],
			lineParams: {
				ServiceId: encodeURI("edu_node"), 
				methodname: encodeURI("getRuZhuQuShi"),
				sttime: "",
				edtime: ""
			},
			mapParams: {
				ServiceId: encodeURI("edu_node"), 
				methodname: encodeURI("getDyfb"),
				sttime: "",
				edtime: ""
			},
			treeParams: {
				ServiceId: encodeURI("edu_node"), 
				methodname: encodeURI("loadNodeTree"),
				parentId: 0, //不传默认0  为顶级节点列表
				type: 1 // 默认0   0 全部 1部门教育单位 2高校
			},
			
				
			schooltreedatas: {
				columnLevel: 1,
				name: "高校",
				type: 2,
				children: [{
     "name": "苏北区",
     "children": [
      {"name": "徐州分校", "value": 3938},
      {"name": "宿迁分校", "value": 3812},
      {"name": "淮安分校", "value": 6714},
      {"name": "连云港分校", "value": 743}
     ]
    },
    {
     "name": "苏中区",
     "children": [
      {"name": "南京分校", "value": 3534},
      {"name": "泰州分校", "value": 5731},
      {"name": "扬州分校", "value": 7840},
      {"name": "常州分校", "value": 4},
      {"name": "镇江分校", "value": 3416}
     ]
    },
    {
     "name": "苏南分校",
     "children": [
      {"name": "苏州分校", "value": 7074},
	  {"name": "无锡分校", "value": 7074}
     ]
    }],
				isOpen: true,
				ischild: true,
				itemStyle: {  color:"#C23531"},
				symbol: "circle"
			},
			schooltreeHeight: 500,
			treeHeight: 500
		};
	},
	mounted() {
		if (this.$route.query.index == 1) {
			this.nowTitle = "粉丝分析";
		} else if (this.$route.query.index == 2) {
			this.nowTitle = "节点网络";
		} 
		this.getLineData();
		//this.getMapData();
		this.getTreeData(2);
		// this.getSchoolTree();
		this.getEcho();
	},
	methods: {
		leftMenu(e) {
			$(e.target).addClass("curr");
			$(e.target).siblings().removeClass("curr");
			this.nowTitle = e.target.innerText;
		},
		getNowTitle(item) {
			this.nowTitle = item;
		},
		/*****
		 * 数据请求 折线图
		 * 总数变化趋势
		 */
		getLineData(){
			this.$http("/wcm/center.do", this.lineParams,
				(res) => {
					var temp = [];
					var times = [];
					for(var i=0; i<res.data.length; i++){
						temp.push(res.data[i].data);
						times.push(res.data[i].time);
					}
					this.linelabels = times;
					this.lineDatas[0].data = temp;
					this.$nextTick(()=>{
						this.$refs.totalLine.initChart();
					});
					console.log("times:"+times)
				}
			);
		},
		/*****
		 * 数据请求 地图
		 */
		getMapData(){
			this.$http("/wcm/center.do", this.mapParams,
				(res) => {
					// var temp = [];
					// for(var i=0; i<res.data.length; i++){
					// 	temp.push({
					// 		name: res.data[i].name.replace("教育局", ""),
					// 		value: res.data[i].value
					// 	});
					// }
					this.datalist = [{name:'南京市',value:32},{name:'无锡市',value:55},{name:'徐州市',value:79},{name:'苏州市',value:87},{name:'南通市',value:40},{name:'连云港市',value:48},{name:'淮安市',value:78},{name:'盐城市',value:27},{name:'扬州市',value:59},{name:'镇江市',value:12},{name:'常州市',value:51},{name:'泰州市',value:37},{name:'宿迁市',value:16}];
					this.$nextTick(()=>{
						this.$refs.coverMap.initCharts();
					});
				}
			);
		},
		timedoChange(value){
			var begin = this.$dateToStr(value[0], "yyyy-MM-dd");
			var end = this.$dateToStr(value[1], "yyyy-MM-dd");
			
			this.mapParams.sttime = begin;
			this.mapParams.edtime = end;
			
			this.lineParams.sttime = begin;
			this.lineParams.edtime = end;
			this.getMapData();
			this.getLineData();
		},
		/*****
		 * 数据请求 节点树
		 * 高校
		 */
		getSchoolTree(){
			this.$http("/wcm/center.do", {
				ServiceId: encodeURI("edu_node"), 
				methodname: encodeURI("loadNodeTree"),
				parentId: 0, //不传默认0  为顶级节点列表
				type: 2// 默认0   0 全部 1部门教育单位 2高校
			},
				(res) => {
					var temp = [];
					for(var i=0; i<res.data.length; i++){
						temp.push({
							columnLevel: 2,
							name: res.data[i].nodeName,
							type: res.data[i].type, // 默认0   0 全部 1部门教育单位 2高校
							ischild: !res.data[i].isChild,
							nodeId: res.data[i].nodeId,
							mineIndex: i,
							itemStyle: res.data[i].rzType == 1?{}:{ borderColor: "#4D4D4D"}
						});
					}
					this.schooltreedatas.children = temp;
					
					// 只有在当前组件才刷新 tree图表
					if(this.nowTitle == "节点网络"){
						this.schooltreeHeight = temp.length * 26;

						this.$nextTick(()=>{ 
							this.$refs.nodeTree1.initChart();
							this.$refs.nodeTree1.resize();
						});
					}
				}
			);
		},
		/*****
		 * 数据请求 节点树
		 * 江苏省教育厅
		 * @param flag 当前是树结构的第几层
		 * @param index 父级数组的索引
		 */
		getTreeData(flag, index, fatherIndex){
			this.$http("/wcm/center.do", this.treeParams,
				(res) => {
					var temp = [];
					for(var i=0; i<res.data.length; i++){
						var tempItem = null;
                        if(res.data[i].rzType == 1){
                        	tempItem = !res.data[i].isChild?{  color:"#C23531"}:{  color:"#ffffff" };
                        }else{
                         	tempItem = !res.data[i].isChild?{ borderColor: "#4D4D4D",color:"#4D4D4D" }:{ borderColor: "#4D4D4D",color:"#ffffff" };
                        }
						
						temp.push({
							columnLevel: flag,
							name: res.data[i].nodeName,
							type: res.data[i].type, // 默认0   0 全部 1部门教育单位 2高校
							ischild: !res.data[i].isChild,
							nodeId: res.data[i].nodeId,
							mineIndex: i,
							fatherIndex: index,
							itemStyle: tempItem,
							symbol: "circle",
							label: res.data[i].rzType == 1?{color: "#C23531"}:{}
						})
					}
					if(flag == 2){
						this.treedatas.children = temp;
					}else if(flag == 3){
						this.treedatas.children[index].children = temp;
					}else if(flag == 4){
						this.treedatas.children[fatherIndex].children[index].children = temp;
					}

					var beforeHeight = this.treeHeight;
					this.treeHeight = temp.length*20 + beforeHeight;
					// 只有在当前组件才刷新 tree图表
					if(this.nowTitle == "节点网络"){
						this.$nextTick(()=>{ 
							this.$refs.nodeTree2.initChart(); 
							this.$refs.nodeTree2.resize();
						});
					}

				}
			);
		},
		/****
		 * 教育厅 节点树点击操作
		 */
		resetDatas1(datas){
			if(!datas.ischild){
				this.open();
				return;
			}

			if(!datas.children || datas.children.length == 0){
				this.treeParams.parentId = datas.nodeId;
				this.getTreeData((datas.columnLevel+1)*1, datas.mineIndex*1, datas.fatherIndex*1);
			}else{
				var beforeHeight = this.treeHeight;
				if(datas.columnLevel == 1){
					this.treeHeight = 100;
				}else{
					this.treeHeight = beforeHeight - datas.children.length*20;
				}
			
				this.$nextTick(()=>{ 
					this.$refs.nodeTree2.initChart();
					this.$refs.nodeTree2.resize();
				});

				datas.children = [];
				if(datas.columnLevel == 1){
					this.treedatas.children = [];
					// this.$set(this.treedatas, 0, datas);
				}else if(datas.columnLevel == 2){
					this.$set(this.treedatas.children, datas.mineIndex, datas);
				}else if(datas.columnLevel == 3){
					this.$set(this.treedatas.children[datas.fatherIndex].children, datas.mineIndex, datas);
				}
			}
		},
		/****
		 * 高校 节点树点击操作
		 */
		resetDatas2(datas){
			if(!datas.ischild){
				this.open();
				return;
			}

			if(datas.children.length == 0){
				this.getSchoolTree();
			}else if(datas.children.length > 0){
				if(datas.isOpen){
					this.schooltreeHeight = 100;
					this.$nextTick(()=>{ 
						this.$refs.nodeTree1.resize();
					});
					datas.isOpen = false;
				}else{
					this.schooltreeHeight = datas.children.length * 26;
					this.$nextTick(()=>{ 
						this.$refs.nodeTree1.resize();
					});
					datas.isOpen = true;
				}
			}
		},
		// open(){
		// 	this.$notify({
		// 		title: '提示',
		// 		message: '当前以下无节点！',
		// 		duration: 2000,
		// 		type: 'warning',
		// 		offset: 200
		// 	});
		// },
		 // 获取所属单位 数结构
    getEcho() {
      this.$http(
        "/wcm/center.do",
        {
          ServiceId: "edu_user", //写死
          methodname: "findLoginUserInfo", //写死
          isGetNode: 1, //是否显示节点信息 0不显示  1显示   默认0
        },
        (res) => {
        //   console.log(res);
		  this.bmSelect = res.nodes[0].nodeName; //节点名称
          this.unitVal = res.nodes[0].parentName; //所属单位
          this.countVal = res.nodes[0].coverNumber; //覆盖人数
          this.affectVal = res.nodes[0].effect; //影响力
        }
      );
    },
	}
};
</script>

<style scoped>
.el-main {
  overflow-x: hidden;
}
.nodePart {
  width: 100%;
  height: 1000px;
  background: #f2f2f2;
  padding: 30px;
  box-sizing: border-box;
}
.node_top {
 
  background: #fff;
  border-radius: 6px;
  padding: 20px 30px;
}
.node_top_li {

	float: left;
  margin: 15px;
}
.node_top_li img {
  margin: 0 10px;
  vertical-align: middle;
  margin-top: -6px;
}
.node_top_li span {
  font-size: 16px;
  color: #646c8d;
  display: inline-block;
  padding-right: 10px;
}
.el-input__inner {
  height: 30px;
}
.el-input__suffix {
  right: -10px;
  top: -5px;
}
.el-input {
  display: inline-block;
  width: 200px !important;
}
.node_con {
  width: 100%;
  margin-top: 20px;
}
.node_tab ul li {
  display: inline-block;
  width: 127px;
  height: 40px;
  background: url(../../assets/images/jsxmt_nodenoCurr_20201124.png);
  line-height: 40px;
  font-size: 18px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
.node_show {
  width: 100%;

  background: #fff;
}
.tabCurr {
  background: url(../../assets/images/jsxmt_nodeCurr_20201124.png) !important;
}
.el-footer {
  text-align: center;
  font-size: 16px;
  color: #615959;
  margin-top: 40px;
}

.charts_part {
	width: 100%;
	
	background: #ffffff;
	margin-top: 20px;
	padding: 10px 0 40px 0;
	
}
.charts_part .choose_box{
		width: 100%;
		text-align: right;
		padding-right: 5%;
		box-sizing: border-box;
		padding-top: 10px;
		.el-select{
			margin-right: 20px;
		}
	}
	.chart_list{
		width: 100%;
		
		height: auto;
		
	}
  .chart_list li{
			width: 43%;
			height: 90%;
			margin: 0 3%;
			margin-top: 10px;
			float: left;
		
		}
  .chart_list li	.chartsTitle{
				font-size: 16px;
				font-weight: bold;
				text-indent: 2rem;
				height: 30px;
				line-height: 30px;
			}
			.charts_box{
				width: 100%;
				height: 700px;
				border: 1px solid #e6e6e6;
				border-radius: 6px;
				background: #f8f8f8;
			}
.leg_list{
	
	
}
.leg_list li{
		font-size: 14px;
		padding-left: 4%;
		padding-bottom: 6px;
		
	}
.leg_list .legbox{
			display: inline-block;
			width: 14px;
			height: 14px;
			border-radius: 50%;
			vertical-align: middle;
			box-sizing: border-box;
		}
		.red{
			background: #C23531;
		}
		.gray{
			background: #4D4D4D;
		}
		.emptyred{
			border: 2px solid #C23531;
		}
		.emptygray{
			border: 2px solid #4D4D4D;
		}
/deep/.el-input__inner{
	height: 40px;
}
/deep/.el-select{
	width: 200px;

}
/deep/.node_top_li .el-input.is-disabled .el-input__inner{
    background-color: #fff !important;
    border-color: #E4E7ED;
    color: #606266;
    cursor:pointer;

}
</style>