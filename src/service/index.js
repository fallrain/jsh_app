import commodityService from './commodity/commodity.service';
import messageService from './message/message.service';

export default {
  install(Vue) {
    Vue.prototype.commodityService = commodityService;
    // 全局引用
    Vue.prototype.messageService = messageService
  }
};
