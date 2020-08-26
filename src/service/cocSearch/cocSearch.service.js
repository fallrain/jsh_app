import urls from '../url/cocSearch.url';
import {
  jPost,
  jPostJson,
  jGet
} from '@/lib/request';

export default {
  cocSearch(code) {
    /* 用户类型 */
    return jGet(urls.cocSearch(code));
  },
};