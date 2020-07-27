import url from '../url/productDetail.url';
import {
  jGet
} from '@/lib/request';

export default {
  productDetail(code, codeSale, codeSend) {
    /* 产品详情 */
    return jGet(url.productDetail(code, codeSale, codeSend));
  }
};
