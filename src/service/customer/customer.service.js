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
  getCustomer() {
    /* 获取售达方 */
    return jGet(urls.getCustomer);
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
  getcustomersList(code, data) {
    /* 获取付款方列表 */
    return jGet(urls.getcustomersList(code), data);
  },
  // 收藏的商品的数据
  queryCustomerInterestProductByAccount(data) {
    return jPostJson(urls.queryCustomerInterestProductByAccount, data);
  },
  // 添加收藏
  addInterestProduct(data) {
    return jPostJson(`${urls.addInterestProduct}/${data.customerCode}/${data.account}/${data.productCode}`);
  },
  // 取消收藏
  removeInterestProduct(data) {
    return jPostJson(urls.removeInterestProduct, data);
  },
  inquire(data) {
    return jPostJson(urls.inquire, data);
  }

};
