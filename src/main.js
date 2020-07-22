import Vue from 'vue';
import App from './App';
import store from './store';
import '@/assets/css/var.scss';
import '@/assets/font/iconfont.css';
import '@/assets/css/base.scss';
import '@/assets/css/common.scss';
import requestPlugin from '@/lib/request/requestPlugin';

Vue.use(requestPlugin);
Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
  ...App,
  store
});
app.$mount();
