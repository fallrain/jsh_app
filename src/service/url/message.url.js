import util from '../util/index';

const baseURL = 'message/api';
const urls = {
  // 商品列表
  messageList: '/message/page',
  // 首页新闻资讯
  indexList: '/notice/indexList',
  // 首页新闻资讯详情
  getInfomation (id) {
    return `/notice/detail/${id}`;
  },
  page:(queryStr) => `/notice/page${queryStr}`
};
util.addPrefix(baseURL, urls);
export default urls;
