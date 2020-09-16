import util from '../util/index';

const baseURL = 'order';
const urls = {
  paytoInfo: '/order/paytoInfo', // 付款方列表
  sendVerify(code) {
    return `/bestSign/bestsign-account/${code}`; // 获取上上签验证联系方式接口
  },
  mianMi: '/bestSign/mianmi', // 调用15分钟免密支付接口
  send(code) { // 发送验证码接口
    return `/bestSign/verify-code/send/${code}`;
  },
  validateProduct: '/order/post/validate/product', // 拆单校验
  splitOrder: '/order/splitOrder', // 拆单
  updateOrderInfo: '/order/updateOrderInfo', // 提交订单
  cancelOrder: '/order/cancelOrder', // 取消订单
  getOrderInfo: '/order/post/orderInfo', // 获取订单信息
  getProvince: '/address/get/province', // 获取省份
  // 获取市
  getCity(code) {
    return `/address/get/city/${code}`;
  },
  // 获取区
  getArea(code) {
    return `/address/get/area/${code}`;
  },
  getCollectRemarkAddr: '/address/post/getCollectRemarkAddr', // 直发异地地址列表
  queryJDAddr: '/yd-warehouse/query', // 直发异地地址列表
  getBillInfo(sendtoCode, productGroup) {
    // 获取开票方信息
    return `/billInfo/get/billInfo/${sendtoCode}/${productGroup}`;
  },
  getTctpSwitch: '/order/get/tctpSwitch', // 获取统仓统配白名单
  payByCustomer(OrderNo) { // 反向定制自主扣款
    return `/crowdFunding/payByCustomer/${OrderNo}`;
  },
};
util.addPrefix(baseURL, urls);
export default urls;
