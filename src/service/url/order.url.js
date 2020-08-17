import util from '../util/index';

const baseURL = 'order/api';
const urls = {
  // // 订单列表
  orderList: '/myorder/allOrdersQuery',
  // 基本信息-订单交易状态
  orderMonthSummery: '/myorder/orderMonthSummery'
};
util.addPrefix(baseURL, urls);
export default urls;
