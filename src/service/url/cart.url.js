import util from '../util/index';

const baseURL = 'cart';
const urls = {
  // 添加到购物车
  addToCart: '/shoppingCart/add/cart',
  // 从缓存获取购物车数据
  getShoppingCartListFromCache(saleToCode) {
    return `/shoppingCart/get/list/cache/${saleToCode}`;
  }
};
util.addPrefix(baseURL, urls);
export default urls;
