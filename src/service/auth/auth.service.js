import urls from '../url/auth.url';
import {
  jGet
} from '@/lib/request';

export default {
  addToCart(data) {
    /* 根据token获取用户信息 */
    return jGet(urls.getUserInfoByToken, data);
  },
};
