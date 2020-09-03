import util from '../util/index';

const baseURL = 'activity/api';
const urls = {
  xinpin: '/product/xinpin/index',
  baokuan: '/product/baokuan/index',
  ziyuanji: '/product/ziyuanji/index',
  zhuangong: '/product/zhuangong/index',
  // 详情页抢单 反向定制
  allProductActivity: '/activity/allProductActivity'

};
util.addPrefix(baseURL, urls);
export default urls;
