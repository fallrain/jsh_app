import util from '../util/index';

const baseURL = 'transfer';
const urls = {
  // 调货商品列表
  transferList: '/stock/queryStock',
  // 调货库位
  cargoWareHome: '/cargoQuery/cargoWareHome',
  // 调货配送类型
  cargoSendWay: '/cargoQuery/cargoSendWay',
  // 购物车商品数量
  shoppingCartNum: '/queryOrder/shoppingCartNum',
  // 订单详情
  allOrderList: '/queryOrder/cart',
  // 商品修改列表
  updateOrderQty: '/addToCart/updateOrderQty',
  // 删除订单接口
  deleteOrderForm: '/dhDeleteOrder/deleteOrderForm',
  // // 删除订单中产品
  // deleteProduct:'/dhDeleteOrder/deleteProduct',
  // 加入调货购物车
  insertOrder: '/addToCart/insertOrder',
  // 切换付款方
  upDHPayMoney: '/dhDeleteOrder/upDHPayMoney',
  // 清空失效宝贝
  deleteProduct: '/dhDeleteOrder/deleteProduct',
  // 提交订单
  submitDhOrder: '/defaultOrder/submitDhOrder',
  // 订单返回数据
  cargoDispose: '/cargoQuery/cargoDispose'
};
util.addPrefix(baseURL, urls);
export default urls;
