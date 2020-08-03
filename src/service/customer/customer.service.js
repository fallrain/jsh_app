import urls from '../url/customer.url';
import {
  jGet,
  jPost,
  jPostJson
} from '@/lib/request';

export default {
  addressesList(data) {
    /* 地址列表 */
    return jGet(urls.addressesList(data));
  },
  getCustomer(data) {
    /* 获取售达方 */
    return jGet(urls.getCustomer(data));
  },
  getSendCustomer(params) {
    /* 获取送达方 */
    return jGet(urls.getSendCustomer, params);
  },
  getWarehouse(data) {
    /* 获取送达方 */
    const {
      customerCode,
      ...params
    } = data;
    return jGet(urls.getWarehouse(data.customerCode), params);
  },
};
