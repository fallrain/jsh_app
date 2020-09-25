import urls from '../url/customer.url';
import {
  jGet,
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
  // 余额支付信息
  inquire(data) {
    return jPostJson(urls.inquire, data);
  },
  getSecretkey(data) {
    return jPostJson(urls.getSecretkey, data);
  },
  queryCustomerInterestProduct(data) {
    /* 获取关注商品 */
    const {
      // 账户
      account,
      // 默认售达id
      sendtoCode,
      // 客户id
      customerCode,
      // 产品名
      productName
    } = data;
    return jGet(
      urls.queryCustomerInterestProduct,
      {
        account,
        sendtoCode,
        customerCode,
        productName
      },
      {
        noToast: true
      }
    );
  },
  changeDefaultSendTo(data) {
    /* 更改默认送达方 */
    const {
      // 送达方code
      sendToCode,
    } = data;
    return jGet(urls.changeDefaultSendTo(sendToCode));
  },
  signedInf(data) {
    /* 签约信息 */
    const {
      // 送达方code
      sendtoCode,
    } = data;
    return jGet(urls.signedInf, {
      sendtoCode
    });
  },
  sign(data) {
    /* 签约 */
    const {
      // 送达方code
      sendtoCode,
    } = data;
    return jGet(urls.sign, {
      sendtoCode
    });
  },
  relations(userId) {
    return jGet(urls.relations(userId));
  },
  fukuanRelations(code1, code2) {
    return jGet(urls.fukuanRelations(code1, code2));
  },
  payerBalance(payerCode, salesGroupCode) {
    return jGet(urls.payerBalance(payerCode, salesGroupCode));
  },
};
