import util from '../util/index';

const baseURL = 'order';
const urls = {
  paytoInfo: '/order/paytoInfo', // 付款方列表
  sendVerify(code) {
    return `/bestSign/bestsign-account/${code}`; // 获取上上签验证联系方式接口
  },
  mianMi: '/bestSign/mianmi', // 调用15分钟免密支付接口
  send(code) {
    return `/bestSign/verify-code/send/${code}`;
  },
  validateProduct: '/order/post/validate/product', // 拆单校验
  splitOrder: '/order/splitOrder', // 拆单
};
util.addPrefix(baseURL, urls);
export default urls;
