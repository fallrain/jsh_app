import urls from '../url/commodity.url';
import {
  jPost,
  jPostJson,
  jGet
} from '@/lib/request';

export default {
  cocSearch(code) {
    /* 用户类型 */
    return jGet(urls.cocSearch, code);
  },
};