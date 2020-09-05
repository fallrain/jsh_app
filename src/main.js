import Vue from 'vue';
import App from './App';
import store from './store';
import 'uview-ui/index.scss';
import '@/assets/css/var.scss';
import '@/assets/font/iconfont.css';
import '@/assets/css/base.scss';
import '@/assets/css/common.scss';
import requestPlugin from '@/lib/request/requestPlugin';
import servicePlugin from '@/service';
import filterPlugin from '@/filter';
import jshUtil from '@/lib/util';
import uView from 'uview-ui';

Vue.use(uView);
Vue.use(requestPlugin);
Vue.use(servicePlugin);
Vue.use(filterPlugin);
Vue.config.productionTip = false;
// 工具类
Vue.prototype.jshUtil = jshUtil;

App.mpType = 'app';

const app = new Vue({
  ...App,
  store
});
app.$mount();
