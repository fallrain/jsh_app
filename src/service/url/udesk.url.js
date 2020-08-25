import util from '../util/index';

const baseURL = 'coc/api';
const urls = {
  // 首页客服
  getUdesk(code) {
    return `/customers/getCustomerUdeskAreaRelation/${code}`
  }
};
util.addPrefix(baseURL, urls);
export default urls;
