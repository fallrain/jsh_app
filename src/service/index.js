import commodityService from './commodity/commodity.service';
import marketService from './market/market.service';
import messageService from './message/message.service';
import productDetailService from './productDetail/productDetail.service';
import mineServer from './mine/mine.server';
import customerService from './customer/customer.service';
import catalogServer from './category/category.service';
import orderServer from './order/order.server';
import cartService from './cart/cart.service';

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
  }
};
