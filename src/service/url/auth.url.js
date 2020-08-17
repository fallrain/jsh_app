import util from '../util/index';

const baseURL = 'auth';
const urls = {
  // 根据token获取用户信息
  getUserInfoByToken: '/user/getUserInfoByToken'
};
util.addPrefix(baseURL, urls);
export default urls;
