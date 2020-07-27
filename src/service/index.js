import commodityService from './commodity/commodity.service';
import productDetailService from './productDetail/productDetail.service';
import mineServer from './mine/mine.server';

export default {
  install(Vue) {
    Vue.prototype.commodityService = commodityService;
    Vue.prototype.productDetailService = productDetailService;
    Vue.prototype.mineServer = mineServer;
  }
};
