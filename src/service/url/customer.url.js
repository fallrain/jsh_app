import util from '../util/index';

const baseURL = 'customer';
const urls = {
  // 送达方地址列表
  addressesList: 'customers/auxiliary/addresses',
};
util.addPrefix(baseURL, urls);
export default urls;
