import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Register from '../views/register/register.vue'
import Main from '../views/main/main.vue'
import Home from '../views/home/home.vue'
import NodePart from '../views/nodePart/nodePart.vue'
import ContentPart from '../views/contentPart/contentPart.vue'
import SystemPart from '../views/systemPart/systemPart.vue'
import PersonalInfo from '../views/personalInfo/personalInfo.vue'
import ModifyPass from '../views/personalInfo/modifyPass.vue'
import ShowNotice from '../views/specialSubject/showNotice.vue'
import CreateNotice from '../views/specialSubject/createNotice.vue'
import store from '../store/index.js'
import CreateUser from '../views/systemPart/createUser.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'login'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/main',
    name: 'main',
    component: Main,

    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/nodePart',
        name: 'nodePart',
        component: NodePart
      },
	  {
		  path: '/contentPart',
		  name: 'contentPart',
		  component: ContentPart,
		 
	  },
	  {
		  path: '/systemPart',
		  name: 'systemPart',
		  component: SystemPart,
		 
	  },
	  {
		  path: '/personalInfo',
		  name: 'personalInfo',
		  component: PersonalInfo,
		
	  },
	  {
		  path: '/modifyPass',
		  name: 'modifyPass',
		  component: ModifyPass
		
	  },
    {
      path: '/showNotice',
      name: 'showNotice',
      component: ShowNotice
   
    },
    {
      path: '/createNotice',
      name: 'createNotice',
      component: CreateNotice
      
    },
    {
      path: '/createUser',
      name: 'createUser',
      component: CreateUser
      
    }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

/*****
 * 路由守卫
 */
//  router.beforeEach((to, from, next) => {
//   //我在这里模仿了一个获取用户信息的方法
// console.log(JSON.parse(localStorage.loginData));
// //let isLogin = store.getters.getLogin;
// let isLogin = JSON.parse(localStorage.loginData).isLogin
//   if (isLogin) {
//       //如果用户信息存在则往下执行。
//       next()
//   } else {
//       //如果用户token不存在则跳转到login页面
//       if (to.path === '/login'||to.path === '/register') {
//           next()
//       } else {
//           next('/login')
//       }
//   }
// })
export default router
