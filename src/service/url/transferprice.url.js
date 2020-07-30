import util from '../util/index';

const baseURL = 'commodity/api/productPrice';
const urls = {
  // 商品列表
  transferPriceList: '/allprice',
};
util.addPrefix(baseURL, urls);
export default urls;
