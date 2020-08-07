import commodityService from './commodity/commodity.service';
import marketService from './market/market.service';
import messageService from './message/message.service';
import productDetailService from './productDetail/productDetail.service';
import mineServer from './mine/mine.server';
import customerService from './customer/customer.service';
import catalogServer from './category/category.service';
import orderServer from './order/order.server';
import cartService from './cart/cart.service';
import transfergoodsService from './transfergoods/transfergoods.service';
import indexService from './index/index.service';
import trafficService from './traffic/traffic.service';
import samplemachineService from './samplemachine/samplemachine.service';
import specimenService from './specimen/specimen.service';
import vehicleService from './vehicleList/vehicleList.service';


export default {
  install(Vue) {
    // 全局引用
    // 商品服务
    Vue.prototype.commodityService = commodityService;
    // 营销活动服务
    Vue.prototype.marketService = marketService;
    // 消息服务
    Vue.prototype.messageService = messageService;
    // 产品详情服务
    Vue.prototype.productDetailService = productDetailService;
    // 我的服务
    Vue.prototype.mineServer = mineServer;
    // 用户服务
    Vue.prototype.customerService = customerService;
    // 分类服务
    Vue.prototype.catalogServer = catalogServer;
    // 订单服务
    Vue.prototype.orderServer = orderServer;
    // 购物车服务
    Vue.prototype.cartService = cartService;
    // 调货列表
    Vue.prototype.transfergoodsService = transfergoodsService;
    // 首页轮播图
    Vue.prototype.indexService = indexService;
    // 样品机服务
    Vue.prototype.samplemachineService = samplemachineService;
    // todo 服务名待定
    Vue.prototype.trafficService = trafficService;
    // 整车列表等功能
    Vue.prototype.vehicleService = vehicleService;
  }
};
