import urls from '../url/openAccount.url';
import {
  jGet,
  jPostJson
} from '@/lib/request';
import urles from '@/service/url/mineCustomer.url';

export default {
  getUserInfById(id) {
    /* 根据id获取用户信息 */
    return jGet(urls.getUserInfById(id), null, {
      noToast: true,
      cJsh: true
    });
  },
  getCaptcha(data) {
    /* 获取图形验证码 */
    return jGet(urls.getCaptcha, data, {
      noLoading: true,
      noToast: true,
      cJsh: true
    });
  },
  getVerificationCode(data) {
    /* 发送验证码 */
    const {
      // 电话号码
      phoneNumber,
      // 验证码类型
      verificationCodeType
    } = data;
    return jPostJson(
      urls.getVerificationCode,
      {
        phoneNumber,
        verificationCodeType
      },
      {
        noLoading: true,
        noToast: true,
        cJsh: true
      }
    );
  },
  checkVerificationCode(data) {
    /* 检查验证码 */
    const {
      // 电话号码
      phoneNumber,
      // 验证码类型
      verificationCodeType,
      // 验证码
      verificationCode,
    } = data;
    return jPostJson(
      urls.getVerificationCode,
      {
        phoneNumber,
        verificationCodeType,
        verificationCode
      },
      {
        noLoading: true,
        noToast: true,
        cJsh: true,
        method: 'PUT'
      }
    );
  },
};
