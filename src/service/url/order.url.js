import util from '../util/index';

const baseURL = 'order/api';
const urls = {
  // // 订单列表
  orderList: '/myorder/allOrdersQuery',
  // 基本信息-订单交易状态
  orderMonthSummery: '/myorder/orderMonthSummery',
  // 按钮显示：
  buttonLogicJudgment: '/myorder/buttonLogicJudgment',
  // 自主签收：
  orderSelfSigned: '/myorder/orderSelfSigned'
};
util.addPrefix(baseURL, urls);
export default urls;
