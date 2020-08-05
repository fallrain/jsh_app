import util from '../util/index';

const baseURL = 'specimen';
const urls = {
  // 样品机列表 权限
  queryInventory: '/sampleOrder/queryInventory',
  // 筛选条件获取
  queryBrandAndInvsort: '/query/queryBrandAndInvsort',
  // 查询产品价格
  queryGoodsPrice: '/ypjBase/queryGoodsPrice',
};
util.addPrefix(baseURL, urls);
export default urls;
