import Vue from 'vue';
import App from './App';
import store from './store';
import '@/assets/css/var.scss';
import '@/assets/font/iconfont.css';
import '@/assets/css/base.scss';
import '@/assets/css/common.scss';
import {
  hGet,
  hPost,
  hPostJson
} from '@/lib/request';

Vue.config.productionTip = false;
Vue.prototype.hGet = hGet;
Vue.prototype.hPost = hPost;
Vue.prototype.hPostJson = hPostJson;

App.mpType = 'app';

const app = new Vue({
  ...App,
  store
});
app.$mount();
