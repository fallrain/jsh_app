import url from '../url/order.url';
import {
  jPostJson
} from '@/lib/request';

export default {
  orderList(data) { // 订单列表
    return jPostJson(url.orderList, data);
  }
};
