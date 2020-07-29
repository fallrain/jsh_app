import commodityService from './commodity/commodity.service';
import marketService from './market/market.service';
import messageService from './message/message.service';
import productDetailService from './productDetail/productDetail.service';
import mineServer from './mine/mine.server';
import customerServer from './customer/customer.service';
import catalogServer from './category/category.service';

export default {
  install(Vue) {
    // 全局引用
    Vue.prototype.commodityService = commodityService;
    Vue.prototype.marketService = marketService;
    Vue.prototype.messageService = messageService;
    Vue.prototype.productDetailService = productDetailService;
    Vue.prototype.mineServer = mineServer;
    Vue.prototype.customerServer = customerServer;
    Vue.prototype.catalogServer = catalogServer;
  }
};
