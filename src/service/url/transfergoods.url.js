import util from '../util/index';

const baseURL = 'transfer';
const urls = {
  // 调货商品列表
  transferList: '/stock/queryStock',
  // 调货库位
  cargoWareHome: '/cargoQuery/cargoWareHome',
  // 调货配送类型
  cargoSendWay: '/cargoQuery/cargoSendWay'
};
util.addPrefix(baseURL, urls);
export default urls;
