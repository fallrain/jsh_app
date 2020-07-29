import util from '../util/index';

const baseURL = 'commodity/api';
const urls = {
  productDetail(code, codeSale, codeSend) { // 产品-基本信息
    return `/product/detail/${code}?saleTo=${codeSale}&sendTo=${codeSend}`;
  },
  productStock: '/productStock/stock'// 产品-库存
};
util.addPrefix(baseURL, urls);
export default urls;
