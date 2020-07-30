import util from '../util/index';

const baseURL = 'transfer/stock';
const urls = {
  // 商品列表
  transferList: '/queryStock',
};
util.addPrefix(baseURL, urls);
export default urls;
