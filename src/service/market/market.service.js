import urls from '../url/market.url';
import {
  jGet,
  jPost,
  jPostJson
} from '@/lib/request';

export default {
  activityList(data) {
    /* 活动列表 */
    return jPostJson(urls.activityList, data);
  },
};
