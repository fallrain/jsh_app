import urls from '../url/commodity.url';
import {
  jPost,
} from '@/lib/request';

export default {
  goodsList(data) {
    /* 商品列表 */
    return jPost(urls.goodsList, data, { noLoading: true });
  },
  getAllPrice(data) {
    /* 商品价格 */
    return jPost(urls.getAllPrice, data);
  },
  getStock(data) {
    /* 商品库存 */
    return jPost(urls.getStock, data);
  },
};
