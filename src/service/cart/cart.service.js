import urls from '../url/cart.url';
import {
  jGet,
  jPostJson
} from '@/lib/request';

export default {
  addToCart(data) {
    /* 添加到购物车 */
    return jPostJson(urls.addToCart, data);
  },
  getShoppingCartListFromCache(data) {
    /* 从缓存获取购物车数据 */
    const {
      code,
      ...params
    } = data;
    return jGet(urls.getShoppingCartListFromCache(code), params);
  },
  getSpecialPrice(data) {
    /* 获取版本价格 */
    const {
      saletoCode,
      sendtoCode,
      account
    } = data;
    return jGet(urls.getSpecialPrice({
      saletoCode,
      sendtoCode,
      account
    }),
    null,
    {
      noToast: true
    });
  },
  shoppingCart(uid) {
    console.log('shoppingCart service')

    return jGet(urls.shoppingCart(uid)); 
  }
};
