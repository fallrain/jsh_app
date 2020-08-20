import util from '../util/index';

const baseURL = 'order';
const urls = {
  paytoInfo: '/order/paytoInfo', // 付款方列表
  send(code) {
    return `/bestSign/verify-code/send/${code}`;
  }, // 调货结算验证码
  validateProduct: '/order/post/validate/product', // 拆单校验
};
util.addPrefix(baseURL, urls);
export default urls;
