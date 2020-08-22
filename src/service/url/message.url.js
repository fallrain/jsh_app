import util from '../util/index';

const baseURL = 'message/api';
const urls = {
  // 商品列表
  messageList: '/message/page',
  // 首页新闻资讯
  indexList: '/notice/indexList'
};
util.addPrefix(baseURL, urls);
export default urls;
