import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false,
    loginName:'',
    trueName:'',
    email:'',
    phone:''
  },
  getters:{
    
    getLogin(state){
      return state.isLogin;
    },
    getLoginName(state){
      return state.loginName;
    },
    getTrueName(state){
      return state.trueName;
    },
    getEmail(state){
      return state.email;
    },
    getPhone(state){
      return state.phone;
    }
  },
  mutations: {
    setLogin(state,nv){
      state.isLogin = nv;
    },
    setLoginName(state,nv){
      state.loginName = nv;
    },
    setTrueName(state,nv){
      state.trueName = nv;
    },
    setEmail(state,nv){
      state.email = nv;
    },
    setPhone(state,nv){
      state.phone = nv;
    }
  },
  actions: {
  },
  modules: {
  }
})
