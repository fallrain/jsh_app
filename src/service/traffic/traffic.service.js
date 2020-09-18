import urls from '../url/traffic.url';
import {
  jGet
} from '@/lib/request';
import url from '../url/productDetail.url';

export default {
  getXYQuota(data) {
    /* 查询产品组的信用额度 */
    return jGet(urls.getXYQuota, data);
  },
  xyChangePayTo(OrderNo, paytoCode, paytoName) {
    /* 查询产品组的信用额度 */
    return jGet(urls.xyChangePayTo(OrderNo, paytoCode, paytoName));
  },
  payByCustomer(OrderNo) {
    /* 整车自主扣款 */
    return jGet(urls.payByCustomer(OrderNo));
  },
  XyCutPayment(OrderNo) {
    /* 信用自主扣款 */
    return jGet(urls.XyCutPayment(OrderNo));
  }
};
