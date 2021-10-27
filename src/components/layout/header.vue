<template>
  <div class="header_back">
    <div class="header clearfix">
      <div class="logo">
        <a href="../../../static/visualizedCharts.html" target="_blank"
          ><span>江苏教育信息报送平台</span></a
        >
      </div>
      <!-- <div class="userName">您好：管理员！
                <el-button type="danger" @click="loginOut()">退出</el-button>
            </div> -->
      <div class="navbar">
        <ul>
          <router-link tag="li" to="/home">
            <img src="../../assets/images/jsxmt_syicon_20201125.png" />首页
          </router-link>
          <router-link tag="li" to="/nodePart">
            <img src="../../assets/images/jsxmt_jdicon_20201125.png" />报送
          </router-link>
          <router-link tag="li" to="/contentPart">
            <img src="../../assets/images/jsxmt_nricon_20201125.png" />分析
          </router-link>
          <router-link tag="li" to="/systemPart">
            <img src="../../assets/images/jsxmt_zticon_20201125.png" />管理
          </router-link>

          <!-- <router-link tag="li" to="/dataPart">
					<img src="../../assets/images/jsxmt_sjicon_20201125.png" />排名
				</router-link> -->

          <!-- <li @click="goTest()" v-if="$store.state.type == '1'">
					<img src="../../assets/images/jsxmt_yqicon_20201125.png" />舆情
				</li>
				<router-link tag="li" to="/systemPart" style="border-right: none" v-if="$store.state.type == '1'" >
				<img src="../../assets/images/jsxmt_xticon_20201125.png"/>系统
				</router-link> -->

          <!-- <router-link tag="li" to="/home">首页</router-link>
					<router-link tag="li" to="/showPart">展示</router-link>
					<router-link tag="li" to="/nodePart">节点</router-link>
					<router-link tag="li" to="/contentPart" v-if="$store.state.type == '1'">内容</router-link>
					<router-link tag="li" to="/specialSubject">专题</router-link>
					<router-link tag="li" to="/dataPart">数据</router-link>
					<router-link tag="li" to="/publicSentiment" v-if="$store.state.type == '1'">舆情</router-link>
					<router-link tag="li" to="/systemPart" style="border-right:none;">系统</router-link> -->
        </ul>
        <div class="adminText">
          您好:{{ userName }}！
          <div
            style="display: inline-block; cursor: pointer"
            @mouseout="hideMenu()"
            @mouseover="showMenu()"
          >
            <img
              src="../../assets/images/jsxmt_downarrow_20201125.png"
              alt=""
            />
            <div class="hiddenBox">
              <!-- <div class="hiddenBox_top"></div> -->
              <ul>
                <router-link tag="li" to="/personalInfo">个人信息</router-link>
                <router-link tag="li" to="/modifyPass">修改密码</router-link>
                <li style="border-bottom: none" @click="loginOut()">
                  安全退出
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'currentHead',
  props: {
    msg: String
  },
  data() {
    return {
      centerDialogVisible: false,
      userName: this.$store.getters.getLoginName,

      navList: [
        {
          name: '首页',
          router: 'home'
        },
        {
          name: '展示',
          router: 'showPart'
        },
        {
          name: '节点',
          router: 'nodePart'
        },
        {
          name: '内容',
          router: 'contentPart'
        },
        {
          name: '专题',
          router: 'specialSubject'
        },
        {
          name: '数据',
          router: 'dataPart'
        },
        {
          name: '舆情',
          router: 'publicSentiment'
        },
        {
          name: '系统',
          router: 'systemPart'
        }
      ]
    }
  },
  methods: {
    clickNav(e) {
      if (e.target.nodeName.toLowerCase() === 'li') {
        var index = e.target.dataset.index
      }
    },

    loginOut() {
      // this.$http(
      //   "/user/logout",
      //   {},
      //   (res) => {
      //     //this.$store.commit("setType", "");
      //     this.$store.commit("setLogin", false);
      //     localStorage.removeItem("loginName");
      //     this.$message({
      //       showClose: true,
      //       message: '您已成功退出！',
      //       type: 'success'
      //     });
      //     setTimeout(()=>{
      //       this.$router.push("/login");

      //     },1000);
      //   },
      //   (err) => {
      //     console.log(err);
      //   }
      // );
      this.$http({
        url: '/user/logout',
        method: 'get'
      })
        .then(res => {
          console.log(res.data)
          if (res.data.status == '200') {
            this.$store.commit('setLogin', false)
            //localStorage.removeItem("loginData");
            localStorage.setItem('loginData', JSON.stringify(this.$store.state))
            this.$message({
              showClose: true,
              message: '您已成功退出！',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push('/login')
            }, 1000)
          }
        })
        .catch(err => {
          console.log('错误：' + err)
        })
    },
    showMenu() {
      $('.hiddenBox').show()
    },
    hideMenu() {
      $('.hiddenBox').hide()
    },
    //获取当前登录用户名
    getLoginName() {
      this.$http(
        '/wcm/center.do',
        {
          ServiceId: encodeURI('edu_user'),
          methodname: encodeURI('findLoginUserInfo')
        },
        res => {
          //  console.log(res);
          // this.$store.commit('setLoginName',res.userName)
          this.userName = res.trueName
        },
        err => {
          console.log(err)
        }
      )
    },
    goTest() {
      var testUrl = window.open('_blank')
      testUrl.location =
        'http://www.netinsight.com.cn/netInsight/singleLogin?userName=jsjytrs&password=trs@300229'
    }
  },
  mounted() {
    //this.userName = this.$store.getters.getLoginName;
    // if(this.userName == ""){
    //   this.getLoginName();
    // }
    //this.getLoginName();
    // if(this.$store.state.type == 0){
    //     $(".navbar").width(550)
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header_back {
  width: 100%;
  height: 86px;
  margin-bottom: 1px;
}
.header {
  width: 100%;
  height: 100%;
  position: relative;
  color: #ffffff;

  background: #1b2140;
  background-repeat: no-repeat;
  background-size: 100%;
}
.header .logo {
  font-size: 30px;
  font-weight: bold;

  line-height: 86px;
  padding-left: 50px;
}

.navbar {
  width: 530px;

  height: 56px;
  font-size: 20px;

  position: absolute;
  bottom: 13px;

  right: 0px;
}
.navbar > ul li {
  width: 56px;
  font-size: 16px;
  height: 56px;
  float: left;
  text-align: center;
  color: #fff;
  cursor: pointer;
  background: #313854;
  border-radius: 8px;
  margin-right: 19px;
}

.navbar ul li img {
  width: 20px;
  height: 20px;
  display: block;
  margin: 0 auto;
  margin-top: 8px;
  margin-bottom: 4px;
}
.clear_border {
  border: none !important;
}
.userName {
  position: absolute;
  right: 10%;
  bottom: 20%;
  font-size: 16px;
}
.el-button {
  padding: 4px;
}
.router-link-active {
  background: #5a8acf !important;
}
.adminText {
  clear: both;
  height: 56px;
  width: 170px;
  border-left: 1px solid #9497a5;
  display: inline-block;
  line-height: 56px;
  padding-left: 30px;
  margin-left: 6px;
  font-size: 16px;
  position: relative;
}
.adminText img {
  cursor: pointer;
}
.hiddenBox {
  width: 100px;
  height: 170px;
  position: absolute;
  bottom: -140px;
  right: 0px;
  z-index: 9999;
  display: none;
}
.hiddenBox ul {
  width: 100%;
  background: #2c78c7;
  border-radius: 6px;
  padding: 8px 2px;
  margin-top: 31px;
  box-sizing: border-box;
}
.hiddenBox ul li {
  text-align: center;
  height: 36px;
  line-height: 36px;
  border-bottom: 1px solid #6ca1d8;
}
</style>
