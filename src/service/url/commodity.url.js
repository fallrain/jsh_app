import util from '../util/index';

const baseURL = 'commodity/api';
const urls = {
  // 商品列表
  goodsList: '/product/page',
  // 商品价格
  getAllPrice: '/productPrice/allprice',
  // 商品库存
  getStock: '/productStock/stock',
  // 采购首页列表
  list: '/catalog/list',
  //  采购首页搜索栏默认展示数据
  show: '/product/recommend/word/list/show'

};
util.addPrefix(baseURL, urls);
export default urls;
