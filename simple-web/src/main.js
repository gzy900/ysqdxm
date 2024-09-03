// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import Vuex from 'vuex'
import router from './router'
// import axios from 'axios'
// import echarts from 'echarts'
// import moment from 'moment'

import * as filters from './filters'

let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/chart/scatter')

require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/extension/bmap/bmap')

// require('../data/index')
moment.locale('zh-cn')

Vue.use(Vuex)
Vue.use(ELEMENT)
import store from './store'
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment

// 自定义全局的日期过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

router.beforeEach((to, from, next) => {
  console.log(`realname: ${store.state.realname}, nickname: ${store.state.nickname}`)
  if (to.meta.title) {
    if (to.params && to.params.type === 'blood-pressure-trend') {
      document.title = '血压趋势图'
    } else if (to.params && to.params.type === 'pulse-trend') {
      document.title = '心率趋势图'
    } else {
      document.title = to.meta.title
    }
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')
