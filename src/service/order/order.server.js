import url from '../url/order.url';
import urlNoApi from '../url/orderNoApi.url';
import {
  jGet,
  jPost,
  jPostJson
} from '@/lib/request';

export default {
  orderList(data) { // 订单列表
    return jPostJson(url.orderList, data);
  },
  paytoInfo(data) { // 付款方列表
    return jPostJson(urlNoApi.paytoInfo, data);
  },
};
