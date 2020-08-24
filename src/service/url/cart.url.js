import util from '../util/index';

const baseURL = 'cart';
const urls = {
  // 添加到购物车
  addToCart: '/shoppingCart/add/cart',
  // 从缓存获取购物车数据
  getShoppingCartListFromCache(saleToCode) {
    return `/shoppingCart/get/list/cache/${saleToCode}`;
  },
  // 获取版本价格
  getSpecialPrice({
    saletoCode,
    sendtoCode,
    account
  }) {
    return `/price/get/specialPrice/${saletoCode}/${sendtoCode}/${account}`;
  },

  // 售达方详细信息
  shoppingCart(uid) {
    console.log('shoppingCart url');
    return `/shoppingCart/getNumberByValid/${uid}`;
  },
  // 从购物车里移除商品
  deleteCart: '/shoppingCart/delete/cart'
};
util.addPrefix(baseURL, urls);
export default urls;
