import {
  jGet
} from '@/lib/request';
import url from '../url/productDetail.url';

export default {
  catalog() { // 获取分类类目
    return jGet(url.catalog);
  }
};
