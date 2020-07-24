import {
  jGet,
  jPost,
  jPostJson
} from '@/lib/request';

const plugin = {
  install(Vue) {
    Vue.prototype.jGet = jGet;
    Vue.prototype.jPost = jPost;
    Vue.prototype.jPostJson = jPostJson;
  }
};
export default plugin;
