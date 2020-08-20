import util from '../util/index';

const baseURL = 'auth';
const urls = {
  // 根据token获取用户信息
  getUserInfoByToken: '/user/getUserInfoByToken',
  // 根据code获取token
  getTokenByCode: '/appLogin'
};
util.addPrefix(baseURL, urls);
export default urls;
