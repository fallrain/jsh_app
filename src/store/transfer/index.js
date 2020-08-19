import Vuex from 'vuex';
import Vue from 'vue';
import {
    TRANSFER
  } from '../mutationsTypes';
  
  Vue.use(Vuex);
  export default {
    state: {
      allOrderList: { // 调货详情页面信息，由调货购物车页传入
      }
    },
    mutations: {
      /* eslint注释请不要删除 */
      /* eslint-disable no-unused-expressions */
      [TRANSFER.UPDATE_TSHOPCART](state, data) {
        state.allOrderList = data;
      }
    },
    getters: {
      [TRANSFER.GET_TSHOPCART](state) {
        /* 订单详情信息 */
        return state.allOrderList;
      },
    }
  };