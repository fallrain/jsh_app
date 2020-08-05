import urls from '../url/specimen.url';
import {
  jGet,
  jPost,
  jPostJson
} from '@/lib/request';

export default {
  queryInventory(data) {
    /* 样品机列表 权限 */
    return jGet(urls.queryInventory, data);
  },
  queryBrandAndInvsort(data) {
    /* 产业列表 */
    return jGet(urls.queryBrandAndInvsort, data);
  },
};
