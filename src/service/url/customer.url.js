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
  // 获取售达方信息
  getCustomer: '/customers/auxiliary/customer',
  // 获取送达方信息
  getSendCustomer: '/customers/auxiliary/addresses',
  // 获取送达方信息
  getWarehouse(code) {
    return `/cloud/${code}/warehouse?warehouseFlag=YD`;
  }
};
util.addPrefix(baseURL, urls);
export default urls;
