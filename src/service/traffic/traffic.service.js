import urls from '../url/cart.url';
import {
  jGet
} from '@/lib/request';

export default {
  getXYQuota(data) {
    /* 查询产品组的信用额度 */
    return jGet(urls.getXYQuota, data);
  }
};
