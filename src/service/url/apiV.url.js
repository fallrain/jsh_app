import util from '../util/index';

const baseURL = 'api/v0';
const urls = {
  getUserPhone: '/account'
};
util.addPrefix(baseURL, urls);
export default urls;
