import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Mock from 'mockjs'
import axios from 'axios'

// css公用样式
import '@/assets/public.css'
import less from 'less'
Vue.use(less)

import './mock/index'
// 插件引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

let echarts = require('echarts/lib/echarts')
import "echarts/map/js/world.js";
import "echarts/map/js/china.js";
import "echarts/map/js/province/jiangsu.js"

require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')


require('echarts/lib/chart/graph')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/visualMap');

// 全局组件注册
import container from './components/layout/container.vue';
import tree from './components/echarts/tree.vue';
import maps from './components/echarts/maps.vue';
import lines from './components/echarts/line.vue';
import leftMenu from './components/layout/leftMenu';
import commonTable from './components/commonTable/commonTable';
Vue.component( "container",container)
Vue.component( "tree",tree)
Vue.component( "lines",lines)
Vue.component( "maps",maps)   
Vue.component("leftMenu",leftMenu)
Vue.component("commonTable",commonTable)

window.echarts = echarts


Vue.config.productionTip = false
Vue.prototype.$http = axios;

new Vue({
  axios,
  router,
  store,
  Mock,

  render: h => h(App)
}).$mount('#app')
