import url from '../url/mineCustomer.url';
import {
  jGet
} from '@/lib/request';

export default {
  mineBaseInfo(code) {
    /* 我的-基础信息 */
    return jGet(url.mineBaseInfo(code));
  },
  mineSignList(code, pageNo) {
    /* 我的-签约信息 */
    return jGet(url.mineSignList(code, pageNo));
  }
};
