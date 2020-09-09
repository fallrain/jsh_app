import Vuex from 'vuex';
import Vue from 'vue';
import {
  ORDER
} from '../mutationsTypes';

Vue.use(Vuex);
export default {
  state: {
    orderDetail: { // 订单详情页面信息，由订单列表页传入
    }
  },
  mutations: {
    /* eslint注释请不要删除 */
    /* eslint-disable no-unused-expressions */
    [ORDER.UPDATE_ORDER](state, data) {
      state.orderDetail = data;
    }
  },
  getters: {
    [ORDER.GET_ORDER](state) {
      /* 订单详情信息 */
      return state.orderDetail;
    }
  }
};
