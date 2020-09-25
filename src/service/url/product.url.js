import util from '../util/index';

const baseURL = 'product/product';
const urls = {
  getDictionaryByWhere: '/dictionary/getDictionaryByWhere',
};
util.addPrefix(baseURL, urls);
export default urls;
