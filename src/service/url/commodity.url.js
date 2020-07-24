import util from '../util/index';

const baseURL = 'commodity/api';
const urls = {
  // 商品列表
  goodsList: '/product/page',
};
util.addPrefix(baseURL, urls);
export default urls;
