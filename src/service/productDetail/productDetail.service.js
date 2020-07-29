import {
  jGet, jPost,jPostJson
} from '@/lib/request';
import url from '../url/productDetail.url';
import urls from '../url/productActivity.url';
import urles from '../url/mineCustomer.url';

export default {
  productDetail(code, codeSale, codeSend) {
    /* 产品详情 */
    return jGet(url.productDetail(code, codeSale, codeSend));
  },
  productStock(data) {
    /* 产品-库存 */
    return jPost(url.productStock, data);
  },
  productHostList(codeSale, codeSend) {
    /* 产品详情 */
    return jGet(urls.productHotList(codeSale, codeSend));
  },
  productQueryInter(data) {
    /* 商品详情-查询是否已关注 */
    return jPostJson(urles.productQueryInter, data);
  },
  productAddInter(data) {
    /* 商品详情-添加关注 */
    return jPost(urles.productAddInter, data);
  },
  productRemoveInter(data) {
    /* 商品详情-取消关注 */
    return jPost(urles.productRemoveInter, data);
  },
  productAllActivity(customerCode, sendtoCode, productCode) {
    /* 产品详情 */
    return jGet(urls.productAllActivity(customerCode, sendtoCode, productCode));
  },
};
