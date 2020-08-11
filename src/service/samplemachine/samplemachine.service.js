import urls from '../url/samplemachine.url';
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
  queryBrandAndInvsort(data) {
    /* 查询产品组和品牌 */
    return jGet(urls.queryBrandAndInvsort, data);
  }
};
