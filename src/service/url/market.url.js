import util from '../util/index';

const baseURL = 'activity';
const urls = {
  // 商品列表
  activityList: '/api/activity/page',
};
util.addPrefix(baseURL, urls);
export default urls;
