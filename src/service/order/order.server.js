import url from '../url/order.url';
import urlNoApi from '../url/orderNoApi.url';
import {
  jPostJson,
  jGet
} from '@/lib/request';
import OrderInfoModelForm from '../../model/OrderInfoModelForm';

export default {
  orderList(data) { // 订单列表
    return jPostJson(url.orderList, data);
  },
  paytoInfo(data) { // 付款方列表
    return jPostJson(urlNoApi.paytoInfo, data);
  },
  sendVerify(data) { // 获取上上签验证联系方式接口
    return jPostJson(urlNoApi.sendVerify(data));
  },
  mianMi(data) { //是否免密
    return jGet(urlNoApi.mianMi, data);
  },
  send(data) { // 获取验证码
    return jPostJson(urlNoApi.send(data));
  },
  getOrderMonthSummery(data) {
    /* 基本信息-订单交易状态 */
    const formData = new OrderInfoModelForm(data);
    return jPostJson(url.orderMonthSummery, {
      ...formData,
      pageNo: 1,
      pageSize: 10
    });
  },
  validateProduct(data) { // 拆单校验
    return jPostJson(urlNoApi.validateProduct, data);
  },
};
