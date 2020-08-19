import urls from '../url/auth.url';
import {
  jGet
} from '@/lib/request';

export default {
  getUserInfoByToken() {
    /* 根据token获取用户信息 */
    const token = uni.getStorageSync('token');
    return jGet(urls.getUserInfoByToken, {
      token
    });
  },
};
