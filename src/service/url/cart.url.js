import util from '../util/index';

const baseURL = 'cart';
const urls = {
  // 添加到购物车
  addToCart: '/shoppingCart/add/cart',
};
util.addPrefix(baseURL, urls);
export default urls;
