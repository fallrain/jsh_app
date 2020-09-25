import util from '../util/index';

const baseURL = 'account';
const urls = {
  outstandingAmount(code) { // 我的-基本信息
    return `/rebate/management/delivery/outstandingAmount`;
  },
};
util.addPrefix(baseURL, urls);
export default urls;
