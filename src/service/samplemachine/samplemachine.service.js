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
  },
  getSampleOrder(data) {
    /* 发送短信 */
    return jGet(urls.getSampleOrder, data);
  },
  sendMessage(data) {
    /* 发送短信 */
    return jGet(urls.sendMessage, data);
  },
  submitOrder(data, param) {
    /* 提交订单 */
    return jPostJson(urls.submitOrder(param), data);
  },
  sampleOrderDispose(data) {
    /* 请求订单信息 */
    return jGet(urls.sampleOrderDispose, data);
  }
};
