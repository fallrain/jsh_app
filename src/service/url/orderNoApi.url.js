import util from '../util/index';

const baseURL = 'order';
const urls = {
  paytoInfo: '/order/paytoInfo' // 付款方列表
};
util.addPrefix(baseURL, urls);
export default urls;
