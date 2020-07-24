import util from '../util/index';

const baseURL = 'activity/api';
const urls = {
  // 商品列表
  activityList: '/activity/page',
};
util.addPrefix(baseURL, urls);
export default urls;
