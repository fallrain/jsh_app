import Vuex from 'vuex';
import Vue from 'vue';
import {
  VEHICLE
} from '../mutationsTypes';

Vue.use(Vuex);
export default {
  state: {
    vehicleDetail: {} // 整车购物车详情页面信息，由列表页传入
  },
  mutations: {
    /* eslint注释请不要删除 */
    /* eslint-disable no-unused-expressions */
    [VEHICLE.UPDATE_VEHICLE](state, data) {
      state.vehicleDetail = data;
    }
  },
  getters: {
    [VEHICLE.GET_VEHICLE](state) {
      /* 订单详情信息 */
      return state.vehicleDetail;
    },
  }
};
