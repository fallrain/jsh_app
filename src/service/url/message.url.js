import util from '../util/index';

const baseURL = 'message/api';
const urls = {
  // 商品列表
  messageList: '/message/page',
};
util.addPrefix(baseURL, urls);
export default urls;
