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
      // 售达方code
      saletoCode,
      // 送达方code
      sendtoCode,
      // 账户（售达方code?）
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
    console.log('shoppingCart service');

    return jGet(urls.shoppingCart(uid));
  },
  deleteCart(ids) {
    /* 从购物车里删除一个商品 */
    /**
     *@ids(Array)：商品在购物车里的id集合
     * */
    return jPostJson(urls.deleteCart, ids);
  }
};
