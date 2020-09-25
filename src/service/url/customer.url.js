import util from '../util/index';

const baseURL = 'customer';
const urls = {
  // 送达方地址列表
  addressesList(status) {
    return `/customers/auxiliary/addresses?status=${status}`;
  },
  // 收藏的商品的数据
  queryCustomerInterestProductByAccount: '/customer/queryCustomerInterestProductByAccount',
  // 添加收藏
  addInterestProduct: '/customer/addInterestProduct',
  // 取消收藏
  removeInterestProduct: '/customer/removeInterestProduct',
  // 余额支付信息
  inquire: '/customers/payerBalanceList/inquire',
  // 获取售达方信息
  getCustomer: '/customers/auxiliary/customer',
  // 获取送达方信息
  getSendCustomer: '/customers/auxiliary/addresses',
  // 获取送达方信息
  getWarehouse(code) {
    return `/cloud/${code}/warehouse?warehouseFlag=YD`;
  },
  // 获取付款方列表
  getcustomersList(code) {
    return `/customers/${code}/payer`;
  },
  // 获取秘钥
  getSecretkey: '/customer/user/secretkey',
  // 关注商品
  queryCustomerInterestProduct: '/customer/queryCustomerInterestProduct',
  changeDefaultSendTo(sendToCode) {
    /* 切换默认送达方信息 */
    return `/customers/auxiliary/relations/${sendToCode}/default`;
  },
  getAccountMsg() {

  },
  // 签约信息
  signedInf: '/rrsCrowdftoUnit/signPage',
  // 签约
  sign: '/rrsCrowdftoUnit/signed',
  // 设置默认
  relations(userId) {
    return `/customers/auxiliary/relations/${userId}/default`;
  },
  fukuanRelations(code1, code2) {
    return `/customers/auxiliary/default/${code1}?salesGroupCode=${code2}`;
  },
  payerBalance(payerCode, salesGroupCode) {
    return `/customers/payerBalance/inquire?payerCode=${payerCode}&salesGroupCode=${salesGroupCode}`;
  },
};
util.addPrefix(baseURL, urls);
export default urls;
