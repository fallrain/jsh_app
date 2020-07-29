import urls from '../url/customer.url';
import {
  jGet,
  jPost,
  jPostJson
} from '@/lib/request';

export default {
  activityList(data) {
    /* 地址列表 */
    return jGet(urls.addressesList(data));
  },
};
