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
  orderSelfSigned: '/myorder/orderSelfSigned',
  cancelOrderBybstnk(bstnk) {
    return `/myorder/cancelOrder?bstnk=${bstnk}`;
  },
  tctpConfirm(dn, bstnk) {
    return `/myorder/tctpConfirm?dn=${dn}&isItConfirmed=1&bstnk=${bstnk}`;
  }
};
util.addPrefix(baseURL, urls);
export default urls;
