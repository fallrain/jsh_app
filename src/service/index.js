import commodityService from './commodity/commodity.service';
import marketService from './market/market.service';
import messageService from './message/message.service';

export default {
  install(Vue) {
    Vue.prototype.commodityService = commodityService;
    Vue.prototype.marketService = marketService;
    // 全局引用
    Vue.prototype.messageService = messageService;
  }
};
