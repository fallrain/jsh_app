import urls from '../url/index.url';
import {
  jGet,
} from '@/lib/request';

export default {
  bannerList(data) {
    /* 首页banner图 */
    return jGet(urls.bannerList, data);
  },
};
