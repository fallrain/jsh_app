import util from '../util/index';

const baseURL = 'customer';
const urls = {
  // 送达方地址列表
  addressesList: '/customers/auxiliary/addresses',
  // 收藏的商品的数据
  queryCustomerInterestProductByAccount: '/customer/queryCustomerInterestProductByAccount',
};
util.addPrefix(baseURL, urls);
export default urls;
