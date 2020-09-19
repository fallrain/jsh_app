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
  orderSelfSigned(bstnk) {
    return `/myorder/orderSelfSigned?bstnk=${bstnk}`;
  },
  cancelOrderBybstnk(bstnk) {
    /* 取消订单 */
    return `/myorder/cancelOrder?bstnk=${bstnk}`;
  },
  tctpConfirm(dn, bstnk) {
    return `/myorder/tctpConfirm?dn=${dn}&isItConfirmed=1&bstnk=${bstnk}`;
  },
  buttonReceivedOrder: '/myorder/buttonReceivedOrder', // 物流拒单按钮是否展示判断
  // 物流拒单
  logisticsRejection(dn, flag) {
    return `/myorder/logisticsRejection?dn=${dn}&flag=${flag}`;
  },
};
util.addPrefix(baseURL, urls);
export default urls;
