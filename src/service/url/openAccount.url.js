import util from '../util/index';

const baseURL = 'open/api/v0';
const urls = {
  // 获取验证码
  getCaptcha: '/accounts/captcha',
  //  获取手机验证码
  getVerificationCode: '/sms/verification-code',
  //  检查验证码
  checkVerificationCode: '/sms/code/check',
  // 根据id获取信息
  getUserInfById: userId => `/accounts/${userId}`
};
util.addPrefix(baseURL, urls);
export default urls;
