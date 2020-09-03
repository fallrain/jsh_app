import util from '../util/index';

const baseURL = 'specimen';
const urls = {
  // 样品机列表 权限
  queryInventory: '/sampleOrder/queryInventory',
  // 筛选条件获取
  queryBrandAndInvsort: '/query/queryBrandAndInvsort',
  // 查询产品价格
  queryGoodsPrice: '/ypjBase/queryGoodsPrice',
  // 生成样品机单号
  getSampleOrder: '/sampleOrder/YpjQueryBigFormNumService',
  // 发送短信验证
  sendMessage: '/verify-code/send-message',
  // 提交订单
  submitOrder: '/addToCart/submitOrder',
};
util.addPrefix(baseURL, urls);
export default urls;
