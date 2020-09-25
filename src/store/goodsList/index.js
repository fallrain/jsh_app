import Vuex from 'vuex';
import Vue from 'vue';
import {
  GOODS_LIST
} from '../mutationsTypes';

Vue.use(Vuex);
export default {
  state: {
    // 购物车是否有新的产品
    isCartUpdate: false
  },
  mutations: {
    /* eslint注释请不要删除 */
    /* eslint-disable no-unused-expressions */
    [GOODS_LIST.UPDATE_IS_CART_UPDATE](state, data) {
      /* 更新【购物车是否有新的产品】状态 */
      state.isCartUpdate = data;
    }
  },
  getters: {
    [GOODS_LIST.GET_IS_CART_UPDATE](state) {
      /* 购物车是否有新的产品 */
      return state.isCartUpdate;
    },
  }
};
