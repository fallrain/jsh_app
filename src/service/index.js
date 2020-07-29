import commodityService from './commodity/commodity.service';
import marketService from './market/market.service';
import messageService from './message/message.service';
import productDetailService from './productDetail/productDetail.service';
import mineServer from './mine/mine.server';

export default {
  install(Vue) {
    Vue.prototype.commodityService = commodityService;
    Vue.prototype.marketService = marketService;
    // 全局引用
    Vue.prototype.messageService = messageService;
     Vue.prototype.productDetailService = productDetailService;
    Vue.prototype.mineServer = mineServer;
  }
};
