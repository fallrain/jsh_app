import urls from '../url/cart.url';
import {
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
    return jPostJson(urls.getShoppingCartListFromCache(code), params);
  }
};
