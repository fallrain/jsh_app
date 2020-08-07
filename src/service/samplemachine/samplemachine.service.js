import urls from '../url/specimen.url';
import {
  jGet,
  jPost,
  jPostJson
} from '@/lib/request';

export default {
  queryInventory(data) {
    /* 样品机列表 权限 */
    return jGet(urls.queryInventory, data);
  },
  queryGoodsPrice(data) {
    /* 商品价格 */
    return jGet(urls.queryGoodsPrice, data);
  },
};
