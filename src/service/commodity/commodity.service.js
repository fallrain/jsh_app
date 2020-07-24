import urls from '../url/commodity.url';
import {
  jPost,
} from '@/lib/request';

export default {
  goodsList(data) {
    /* 商品列表 */
    return jPost(urls.goodsList, data);
  },
};
