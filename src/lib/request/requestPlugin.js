import {
  hGet,
  hPost,
  hPostJson
} from '@/lib/request';

const plugin = {
  install(Vue) {
    Vue.prototype.hGet = hGet;
    Vue.prototype.hPost = hPost;
    Vue.prototype.hPostJson = hPostJson;
  }
}
export default plugin;
