import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../src/styles/index.scss'
import '../src/styles/iconfont.css'
import * as utils from './utils/index'
import MetaInfo from 'vue-meta-info'

Vue.use(MetaInfo)
import {Collapse, CollapseItem, DatePicker, Pagination, Table, TableColumn, Loading, Message,Input,Icon,Row,Col} from 'element-ui'

Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Table);
Vue.use(Pagination);
Vue.use(DatePicker);
Vue.use(TableColumn);
Vue.use(Loading);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);

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
