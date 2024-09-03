import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../src/styles/index.scss'
import '../src/styles/iconfont.css'
import * as utils from './utils/index'
import MetaInfo from 'vue-meta-info'

Vue.use(MetaInfo)
import {Loading, Message, Input} from 'element-ui'

Vue.use(Loading);
Vue.use(Input);
Vue.prototype.$message = Message;

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)


Object.keys(utils).forEach(key => {
  Vue.filter(key, utils[key])
});

String.prototype.splice = function (start, newStr) {
  return this.slice(0, start) + newStr + this.slice(start);
};

Vue.config.productionTip = true

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
