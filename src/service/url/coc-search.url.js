import util from '../util/index';

const baseURL = 'coc-search/api';
const urls = {
  // 区域代码?
  cocSearch(code) {
    return `/v1/customer/${code}`
  }
};
util.addPrefix(baseURL, urls);
export default urls;
