import util from '../util/index';

const baseURL = 'coc/api';
const urls = {
  // 区域代码?
  getValueSync: '/v1/customers/valuesync/alter'
};
util.addPrefix(baseURL, urls);
export default urls;
