import util from '../util/index';

const baseURL = 'ad/api';
const urls = {
  // 商品列表
  bannerList: '/banner/list',
};
util.addPrefix(baseURL, urls);
export default urls;
