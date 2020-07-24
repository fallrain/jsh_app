import commodityService from './commodity/commodity.service';

export default {
  install(Vue) {
    Vue.prototype.commodityService = commodityService;
  }
};
