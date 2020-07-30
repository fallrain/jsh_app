import urls from '../url/cart.url';
import {
  jPostJson
} from '@/lib/request';

export default {
  addToCart(data) {
    /* 添加到购物车 */
    return jPostJson(urls.addToCart, data);
  }
};
