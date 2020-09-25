import urls from '../url/udesk.url';
import {
  jGet
} from '@/lib/request';

export default {
  getUdesk(code, data) {
    /* 查询产品组的信用额度 */
    return jGet(urls.getUdesk(code), data);
  }
};
