import urls from '../url/apiV.url';
import {
  jGet,
} from '@/lib/request';

export default {
  getUserPhone(data) {
    /* 根据id获取用户信息 */
    return jGet(urls.getUserPhone, data, {
      noToast: true,
      cJsh: true
    });
  },
};
