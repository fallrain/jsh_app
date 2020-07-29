import util from '../util/index';

const baseURL = 'order/api';
const urls = {
  orderList: '/myorder/allOrdersQuery' // 订单列表
};
util.addPrefix(baseURL, urls);
export default urls;
